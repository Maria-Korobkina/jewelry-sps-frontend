import type { Scenario } from './adapter.ts'
import { isRunId, surveyController } from './controller.ts'
import type { ApiClient } from '../../api/client.ts'
import { ApiError } from '../../api/errors.ts'
import { emptyDraft, readDraft, writeDraft } from '../business/draft.ts'
import { freshDesignDraft, readDesignDraft, writeDesignDraft } from '../design/storage.ts'
import { emptySimilarDraft, readSimilarDraft, writeSimilarDraft } from '../similar/storage.ts'


export function surveyEntrySelected(pathname: string, search: string, online: boolean) {
  const params = new URLSearchParams(search)
  return online ? isRunId(params.get('run')) : params.get('active') === '1' || params.has('edit') || params.get('first') === '1' || pathname === '/design/result'
}
export function surveyRunHref(scenario: Scenario, runId?: string) {
  const path = scenario === 'design-rights' ? '/design/survey' : scenario === 'open-business' ? '/business' : '/similar-products'
  return path + (runId ? '?run=' + runId : '?active=1')
}


export async function accessibleSurveyEntry(client: ApiClient, scenario: Scenario) {
  const controller = surveyController(client,scenario)
  const empty = {started:false,completed:false}
  if (!controller.canAccess) return empty
  try {
    const run = await controller.load()
    if (!run) return empty
    return {started:!!run,completed:!!run?.route,runId:run?.state.id}
  } catch(error) {
    if (error instanceof ApiError && (error.status === 403 || error.status === 404)) return empty
    throw error
  }
}
export function localSurveyEntry(scenario: Scenario) {
  const draft = scenario === 'open-business' ? readDraft() : scenario === 'design-rights' ? readDesignDraft() : readSimilarDraft()
  const completed = 'completed' in draft ? draft.completed : draft.view === 'result'
  const started = completed || ('localRunId' in draft && !!draft.localRunId) || ('view' in draft && draft.view === 'question') || Object.values(draft.answers).some(values => values?.length)
  return {started, completed}
}
export function restartLocalSurvey(scenario: Scenario) {
  const saved = scenario === 'open-business' ? writeDraft({...emptyDraft,view:'question'}) : scenario === 'design-rights' ? writeDesignDraft(freshDesignDraft()) : writeSimilarDraft({...emptySimilarDraft,view:'question'})
  if (!saved) throw new Error('Не удалось сохранить новое прохождение. Разрешите хранение данных в браузере и повторите действие.')
}
