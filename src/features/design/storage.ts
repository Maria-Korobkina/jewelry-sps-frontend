import { migrateDesignAnswers, getDesignBranch, missingDesignQuestions } from './rules.ts'
import type { DesignAnswers, DesignQuestionId, StageId } from './types.ts'
import { designStages } from './content.ts'

export interface DesignDraft { version: 1; answers: DesignAnswers; question: DesignQuestionId; completed: boolean; localRunId?: string }
export const emptyDesignDraft: DesignDraft = { version: 1, answers: {}, question: 'rights', completed: false }
export function freshDesignDraft(): DesignDraft {return {...structuredClone(emptyDesignDraft),localRunId:crypto.randomUUID()}}
export const designDraftKey = 'jewelry-design-survey-v1'
export const designChecklistKey = 'jewelry-design-checklist-v1'
export function readDesignDraft(): DesignDraft {
  try {
    const raw = JSON.parse(sessionStorage.getItem(designDraftKey) ?? 'null')
    if (raw?.version !== 1 || !raw.answers || typeof raw.answers !== 'object') return emptyDesignDraft
    const answers = migrateDesignAnswers(raw.answers)
    const missing = missingDesignQuestions(answers)
    const branch = getDesignBranch(answers)
    return { version: 1, answers, question: raw.completed && missing.length ? missing[0] : branch.includes(raw.question) ? raw.question : missing[0] ?? 'rights', completed: raw.completed === true && !missing.length, ...(/^[0-9a-f-]{36}$/i.test(raw.localRunId ?? '') ? {localRunId:raw.localRunId} : {}) }
  } catch { return emptyDesignDraft }
}
export function writeDesignDraft(draft: DesignDraft): boolean {
  try { sessionStorage.setItem(designDraftKey, JSON.stringify(draft)); return true } catch { return false }
}
export const checklistStatuses = ['Не начат', 'В работе', 'Выполнено по моей проверке', 'Не применимо'] as const
export interface StageChecklist { checked: string[]; status: typeof checklistStatuses[number] }
export type ChecklistDraft = Partial<Record<StageId, StageChecklist>>
function localChecklistKey() {const id = readDesignDraft().localRunId;return designChecklistKey + (id ? ':' + id : '')}
export function readDesignChecklist(): ChecklistDraft {
  try {
    const raw = JSON.parse(sessionStorage.getItem(localChecklistKey()) ?? 'null')
    if (raw?.version !== 1 || !raw.stages) return {}
    const draft: ChecklistDraft = {}
    for (const stage of designStages) {
      const saved = raw.stages[stage.id]
      if (!saved || !Array.isArray(saved.checked)) continue
      const validIds = [...stage.tasks.map((_, i) => 'task-' + i), ...stage.criteria.map((_, i) => 'criterion-' + i)]
      draft[stage.id] = { checked: validIds.filter(id => saved.checked.includes(id)), status: checklistStatuses.includes(saved.status) ? saved.status : 'Не начат' }
    }
    return draft
  } catch { return {} }
}
export function writeDesignChecklist(stages: ChecklistDraft): boolean {
  try { sessionStorage.setItem(localChecklistKey(), JSON.stringify({ version: 1, stages })); return true } catch { return false }
}
