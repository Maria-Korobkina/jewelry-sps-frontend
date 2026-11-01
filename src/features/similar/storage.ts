import { cleanSimilarAnswers, getSimilarBranch, missingSimilarQuestions } from './rules.ts'
import type { SimilarAnswers, SimilarQuestionId } from './types.ts'

export interface SimilarDraft { version: 1; answers: SimilarAnswers; view: 'start' | 'question' | 'result'; question: SimilarQuestionId }
export const emptySimilarDraft: SimilarDraft = { version: 1, answers: {}, view: 'start', question: 'objects' }
export const similarStorageKey = 'jewelry-similar-products-survey-v1'
export function readSimilarDraft(): SimilarDraft {
  try {
    const draft = JSON.parse(sessionStorage.getItem(similarStorageKey) ?? 'null')
    if (draft?.version !== 1 || !draft.answers || typeof draft.answers !== 'object') return emptySimilarDraft
    const answers = cleanSimilarAnswers(draft.answers)
    const branch = getSimilarBranch(answers)
    const missing = missingSimilarQuestions(answers)
    const view = ['start', 'question', 'result'].includes(draft.view) ? draft.view : 'start'
    const removedQuestion = draft.question === 'author' || draft.question === 'competitor'
    const restoredView = removedQuestion && view === 'question' ? missing.length ? 'question' : 'result' : view === 'result' && missing.length ? 'question' : view
    return { version: 1, answers, view: restoredView, question: (view === 'result' || removedQuestion) && missing.length ? missing[0] : branch.includes(draft.question) ? draft.question : missing[0] ?? branch.at(-1)! }
  } catch { return emptySimilarDraft }
}
export function writeSimilarDraft(draft: SimilarDraft): boolean {
  try { sessionStorage.setItem(similarStorageKey, JSON.stringify(draft)); return true } catch { return false }
}
