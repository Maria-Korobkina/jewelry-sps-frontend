import type { BusinessDraft } from './draft.ts'
import { changeAnswer, getBranch, getMissingQuestions } from './rules.ts'
import type { BusinessAnswers, QuestionId } from './types.ts'

export interface BusinessEdit {
  original: BusinessDraft
  answers: BusinessAnswers
  question: QuestionId
  values: string[]
}
export type EditConfirmation = { view: 'question'; edit: BusinessEdit } | { view: 'result'; draft: BusinessDraft }


export function beginEdit(draft: BusinessDraft, question: QuestionId): BusinessEdit {
  if (!getBranch(draft.answers).includes(question)) throw new Error('Этот вопрос больше не относится к вашим ответам.')
  return {
    original: structuredClone(draft), answers: structuredClone(draft.answers),
    question, values: [...(draft.answers[question] ?? [])],
  }
}

export function confirmEdit(edit: BusinessEdit): EditConfirmation {
  const answers = changeAnswer(edit.answers, edit.question, edit.values)


  const missing = getMissingQuestions(answers)
  if (missing.length) return {
    view: 'question',
    edit: { ...edit, answers, question: missing[0], values: [...(answers[missing[0]] ?? [])] },
  }
  return { view: 'result', draft: { version: 1, answers, view: 'result', question: getBranch(answers).at(-1)! } }
}

export function cancelEdit(edit: BusinessEdit): BusinessDraft {
  return structuredClone(edit.original)
}
