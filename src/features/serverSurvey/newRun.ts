import type { ApiClient } from '../../api/client.ts'
import type { RunState } from '../../api/runContracts.ts'
import { ApiError } from '../../api/errors.ts'
import { guestRunStore } from '../../api/guestRuns.ts'
import { activateFreshRun } from './controller.ts'
import type { Scenario } from './adapter.ts'

type Store = Pick<Storage,'getItem' | 'setItem'>
export const newRunStorageKey = 'jewelry-new-survey-runs-v1'
type Candidate = {id: string; created?: RunState; ownerId?: number}


export function createNewRunService(client: ApiClient, storage: Store) {
  const originalStorage = storage
  storage = {getItem:key => originalStorage.getItem(key),setItem(key,value) {try {originalStorage.setItem(key,value)} catch {throw new ApiError('storage','Не удалось сохранить новое прохождение в этой вкладке. Разрешите хранение данных и повторите действие.')}}}
  const pending = new Map<Scenario,Promise<RunState>>(), candidates = new Map<Scenario,Candidate>()
  function records(): Partial<Record<Scenario,Candidate>> {try {const value = JSON.parse(storage.getItem(newRunStorageKey) ?? '{}');return value && typeof value === 'object' && !Array.isArray(value) ? value : {}} catch {return {}}}
  function write(scenario: Scenario,candidate?: Candidate) {
    const all = records()
    if (candidate) all[scenario] = {id:candidate.id,ownerId:candidate.ownerId}
    else delete all[scenario]
    storage.setItem(newRunStorageKey,JSON.stringify(all))
  }
  const guests = guestRunStore(storage)
  return {
    start(scenario: Scenario) {
      const previous = pending.get(scenario)
      if (previous) return previous
      const work = (async () => {
        if (!client.enabled) throw new ApiError('disabled','Опрос временно недоступен.')
        let candidate = candidates.get(scenario) ?? records()[scenario]
        if (candidate?.ownerId && candidate.ownerId !== client.getSnapshot().user?.id) throw new ApiError('session','Войдите в аккаунт, в котором вы начали новое прохождение.')
        if (!candidate) {
          storage.setItem(newRunStorageKey,JSON.stringify(records()))


          const created = await client.createRun(scenario)
          candidate = {id:created.id,created,ownerId:created.anon_token ? undefined : client.getSnapshot().user?.id}
          candidates.set(scenario,candidate)
        }
        if (candidate.created) guests.remember(candidate.created)
        write(scenario,candidate)
        const access = guests.access(candidate.id,scenario) ?? {runId:candidate.id}
        const state = await client.run(access)
        if (state.id !== candidate.id || state.scenario !== scenario || state.status !== 'in_progress' || state.history.length || !state.question || state.question.selected.length || state.question.is_skipped || Object.keys(state.question.grid_values).length || state.progress.current !== 1) throw new ApiError('invalid_response','Не удалось открыть пустой опрос. Прежний результат сохранён. Попробуйте ещё раз.')
        activateFreshRun(scenario,state,candidate.ownerId,storage)
        write(scenario)
        candidates.delete(scenario)
        return state
      })().finally(() => pending.delete(scenario))
      pending.set(scenario,work);return work
    },
  }
}
const services = new WeakMap<ApiClient,ReturnType<typeof createNewRunService>>()
export function newRunService(client: ApiClient) {
  let service = services.get(client)
  if (!service) {
    try {service = createNewRunService(client,sessionStorage)} catch {throw new ApiError('storage','Разрешите хранение данных для этого сайта, чтобы начать новое прохождение.')}
    services.set(client,service)
  }
  return service
}
