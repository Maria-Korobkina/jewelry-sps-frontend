import type { ApiClient } from '../../api/client.ts'
import { guestRunStore } from '../../api/guestRuns.ts'
import { createServerRunSaver } from '../../api/saveServerRun.ts'
import { ApiError } from '../../api/errors.ts'
import type { SavedRoute } from '../../api/types.ts'
import type { RunAccess, RunState } from '../../api/runContracts.ts'
import type { SurveyAnswers } from '../../api/resultContracts.ts'
import { applicableQuestions, localOptions, localQuestion, serverOptions, serverQuestion, type Scenario } from './adapter.ts'
export const serverSurveyStorageKey = 'jewelry-server-surveys-v1'
type Store = Pick<Storage, 'getItem' | 'setItem'>
type Entry = { scenario: Scenario; runId?: string; ownerId?: number; creationPending?: boolean; completed?: boolean; answers: SurveyAnswers; drafts: SurveyAnswers; pendingSave?: boolean }
type Database = { active: Partial<Record<Scenario, string>>; runs: Record<string, Entry>; intents: Partial<Record<Scenario, boolean>> }
export interface LoadedRun { state: RunState; answers: SurveyAnswers; route: SavedRoute | null }
export const isRunId = (v: string | null | undefined): v is string => !!v && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v)
export function createSurveyController(client: ApiClient, scenario: Scenario, storage: Store, requestedId?: string) {
  const checkedStorage: Store = {getItem:key => storage.getItem(key),setItem(key,value) {try {storage.setItem(key,value)} catch {throw new ApiError('storage','Не удалось сохранить прохождение в этой вкладке. Не закрывайте страницу и повторите действие.')}}}
  function db(): Database { try { const d = JSON.parse(storage.getItem(serverSurveyStorageKey) ?? 'null'); if (d?.active && d.runs && d.intents) return d } catch {                  } return {active:{},runs:{},intents:{}} }
  const initial = db(), id = requestedId ?? initial.active[scenario]
  let record: Entry = id && initial.runs[id]?.scenario === scenario ? initial.runs[id] : {scenario, ...(isRunId(requestedId) ? {runId:requestedId} : {}), creationPending:!requestedId && initial.intents[scenario], answers:{},drafts:{}}
  let volatileAnon: string | undefined
  const guest = guestRunStore(checkedStorage), saver = createServerRunSaver(client, runId => {volatileAnon = undefined;record.ownerId = client.getSnapshot().user?.id;guest.forget(runId)})
  let pending: Promise<LoadedRun | null> | null = null
  function persist() {
    const d = db()

    if (record.runId) { d.runs[record.runId] = record; if (!requestedId && (!d.active[scenario] || d.active[scenario] === record.runId)) d.active[scenario] = record.runId; delete d.intents[scenario] }
    else if (record.creationPending) d.intents[scenario] = true
    checkedStorage.setItem(serverSurveyStorageKey, JSON.stringify(d))
  }
  function access(): RunAccess {
    if (!record.runId) throw new Error('Начните опрос.')
    if (record.ownerId && record.ownerId !== client.getSnapshot().user?.id) throw new Error('Войдите в аккаунт, которому принадлежит этот маршрут.')
    if (record.ownerId) return {runId:record.runId}
    return guest.access(record.runId, scenario) ?? {runId:record.runId,...(volatileAnon ? {anonToken:volatileAnon} : {})}
  }
  async function ensure() {
    if (!client.enabled) throw new Error('Опрос временно недоступен.')
    if (record.runId) return
    if (record.creationPending) throw new Error('Не удалось подтвердить начало опроса. Начните новый опрос, чтобы продолжить.')
    record.creationPending = true; persist()
    const state = await client.createRun(scenario)
    if (state.scenario !== scenario) throw new Error('Не удалось открыть выбранный опрос.')

    volatileAnon = state.anon_token
    record = {...record,runId:state.id,creationPending:false,ownerId:state.anon_token ? undefined : client.getSnapshot().user?.id}
    guest.remember(state);persist()
  }
  async function read(): Promise<LoadedRun | null> {
    if (!record.runId) return null
    const state = await client.run(access())
    if (state.scenario !== scenario) throw new Error('Это прохождение относится к другому опросу.')
    const answers: SurveyAnswers = {}
    for (const code of state.history) {
      const answered = await client.run(access(), code), q = answered.question
      if (q?.code === code) { const local = localQuestion(scenario, code); answers[local] = localOptions(scenario, local, q.selected) }
    }
    const route = state.status === 'completed' ? await client.runRoute(access()) : null
    record.answers = answers
    record.completed = state.status === 'completed'
    if (route?.is_saved && client.getSnapshot().user) { record.ownerId = client.getSnapshot().user!.id; record.pendingSave = false }
    persist(); return {state,answers,route}
  }
  function once(work: () => Promise<LoadedRun | null>) { if (!pending) pending = work().finally(() => { pending = null }); return pending }
  return {
    get canAccess() {return !record.ownerId || record.ownerId === client.getSnapshot().user?.id},
    get runId() {return record.runId}, get pendingSave() {return record.pendingSave === true},
    draft(question: string) { return record.drafts[question] },
    setDraft(question: string, values: string[]) {record.drafts[question] = values; if (record.runId) persist()},
    load: () => once(read), start: () => once(async () => {await ensure();return read()}),
    synchronize: (answers: SurveyAnswers) => once(async () => {
      await ensure(); let loaded = await read()
      for (const id of applicableQuestions(scenario, answers)) {
        const values = answers[id]
        if (!values?.length || JSON.stringify(values) === JSON.stringify(loaded?.answers[id])) continue
        const state = await client.answerRun(access(), {question:serverQuestion(scenario,id),options:serverOptions(scenario,id,values)})
        record.answers[id] = values; delete record.drafts[id]
        const visible = state.history.map(code => localQuestion(scenario, code))
        record.answers = Object.fromEntries(Object.entries(record.answers).filter(([k]) => visible.includes(k))); persist()
        loaded = {state,answers:{...record.answers},route:null}
      }
      const current = await read()
      if (current?.route) {record.drafts = {};persist()}
      return current
    }),
    requestSave() {record.pendingSave = true;persist()},
    async save(route: SavedRoute) { const saved = await saver.save(access(),route); record.ownerId = client.getSnapshot().user?.id; record.pendingSave = false; persist(); return saved.route },
    reset() { if (pending) throw new Error('Дождитесь завершения запроса.'); const d = db(); delete d.active[scenario]; delete d.intents[scenario]; checkedStorage.setItem(serverSurveyStorageKey,JSON.stringify(d)); record = {scenario,answers:{},drafts:{}}; volatileAnon = undefined },
  }
}
export type SurveyController = ReturnType<typeof createSurveyController>
const controllers = new WeakMap<ApiClient, Map<string, SurveyController>>()
export function surveyController(client: ApiClient, scenario: Scenario, requestedId?: string) {
  let all = controllers.get(client); if (!all) {all = new Map();controllers.set(client,all)}
  const key = scenario + ':' + (requestedId ?? 'active')
  let controller = all.get(key)
  if (!requestedId && controller) {
    try {const active = JSON.parse(sessionStorage.getItem(serverSurveyStorageKey) ?? '{}').active?.[scenario]; if (active !== controller.runId) controller = undefined} catch {                                                        }
  }
  if (requestedId && controller?.runId !== requestedId) controller = undefined
  if (!controller && requestedId) controller = [...all.values()].find(c => c.runId === requestedId)
  if (!controller) {
    let storage: Store
    try {storage = sessionStorage} catch {storage = {getItem:() => null,setItem:() => {throw new Error('Unavailable')}}}
    controller = createSurveyController(client,scenario,storage,requestedId)
  }
  all.set(key,controller);return controller
}

export function unfinishedServerDraft(scenario: Scenario, storage: Store): boolean {
  try {
    const db: Database = JSON.parse(storage.getItem(serverSurveyStorageKey) ?? '{}'), entry = db.runs?.[db.active?.[scenario] ?? '']
    if (!entry) return false
    const completed = entry.completed ?? applicableQuestions(scenario,entry.answers).every(id => entry.answers[id]?.length)
    return !!entry.runId && !completed
  } catch {return false}
}

export function activateFreshRun(scenario: Scenario, state: RunState, ownerId: number | undefined, storage: Store) {
  const db: Database = JSON.parse(storage.getItem(serverSurveyStorageKey) ?? 'null') ?? {active:{},runs:{},intents:{}}
  db.runs[state.id] = {scenario,runId:state.id,ownerId,completed:false,answers:{},drafts:{}}
  db.active[scenario] = state.id
  delete db.intents[scenario]
  storage.setItem(serverSurveyStorageKey,JSON.stringify(db))
}
