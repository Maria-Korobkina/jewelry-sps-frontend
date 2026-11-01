import { changeSimilarAnswer, getSimilarBranch, missingSimilarQuestions } from './rules.ts'
import type { SimilarAnswers, SimilarQuestionId } from './types.ts'
import type { SimilarDraft } from './storage.ts'

export interface SimilarEdit { original: SimilarDraft; answers: SimilarAnswers; question: SimilarQuestionId; values: string[] }
export function beginSimilarEdit(draft: SimilarDraft, question: SimilarQuestionId): SimilarEdit {
  if (!getSimilarBranch(draft.answers).includes(question)) throw new Error('Этот вопрос больше не относится к вашим ответам.')
  return { original: structuredClone(draft), answers: structuredClone(draft.answers), question, values: [...(draft.answers[question] ?? [])] }
}
export function confirmSimilarEdit(edit: SimilarEdit): { edit: SimilarEdit } | { draft: SimilarDraft } {
  const answers = changeSimilarAnswer(edit.answers, edit.question, edit.values)
  const missing = missingSimilarQuestions(answers)
  if (missing.length) return { edit: { ...edit, answers, question: missing[0], values: [...(answers[missing[0]] ?? [])] } }
  return { draft: { version: 1, answers, view: 'result', question: getSimilarBranch(answers).at(-1)! } }
}
