import { changeDesignAnswer, getDesignBranch, missingDesignQuestions } from './rules.ts'
import type { DesignAnswers, DesignQuestionId } from './types.ts'
import type { DesignDraft } from './storage.ts'

export interface DesignEdit { original: DesignDraft; answers: DesignAnswers; question: DesignQuestionId; values: string[] }
export function beginDesignEdit(draft: DesignDraft, question: DesignQuestionId): DesignEdit {
  if (!getDesignBranch(draft.answers).includes(question)) throw new Error('Этот вопрос больше не относится к вашим ответам.')
  return { original: structuredClone(draft), answers: structuredClone(draft.answers), question, values: [...(draft.answers[question] ?? [])] }
}
export function confirmDesignEdit(edit: DesignEdit): { edit: DesignEdit } | { draft: DesignDraft } {
  const answers = changeDesignAnswer(edit.answers, edit.question, edit.values)
  const missing = missingDesignQuestions(answers)
  if (missing.length) return { edit: { ...edit, answers, question: missing[0], values: [...(answers[missing[0]] ?? [])] } }
  return { draft: { version: 1, answers, completed: true, question: getDesignBranch(answers).at(-1)! } }
}
