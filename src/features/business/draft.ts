import { cleanAnswers, getBranch, getMissingQuestions } from './rules.ts'
import type { BusinessAnswers, QuestionId } from './types.ts'

export interface BusinessDraft {
  version: 1
  answers: BusinessAnswers
  view: 'start' | 'question' | 'result'
  question: QuestionId
  needsMaterialSelection?: boolean
  resume?: boolean
}
export const emptyDraft: BusinessDraft = { version: 1, answers: {}, view: 'start', question: '1' }
const key = 'business-survey-draft-v1'

export function readDraft(): BusinessDraft {
  try {
    const draft = JSON.parse(sessionStorage.getItem(key) ?? 'null')
    if (draft?.version !== 1 || !draft.answers || typeof draft.answers !== 'object') return emptyDraft
    const answers = cleanAnswers(draft.answers)
    const branch = getBranch(answers)

    const needsMaterialSelection = false
    const missing = draft.view === 'result' ? getMissingQuestions(answers)[0] : undefined
    return {
      version: 1, answers,
      view: needsMaterialSelection || missing ? 'question' : ['start', 'question', 'result'].includes(draft.view) ? draft.view : 'start',
      question: needsMaterialSelection ? '4' : missing ?? (branch.includes(draft.question) ? draft.question : '1'),
      ...(needsMaterialSelection ? { needsMaterialSelection: true, resume: true } : draft.resume || missing ? { resume: true } : {}),
    }
  } catch { return emptyDraft }
}

export function writeDraft(draft: BusinessDraft): boolean {
  try { sessionStorage.setItem(key, JSON.stringify(draft)); return true }
  catch { return false }
}
