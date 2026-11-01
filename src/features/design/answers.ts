import { designQuestions } from './content.ts'
import type { DesignAnswers, DesignQuestionId, DesignRecommendation } from './types.ts'
export const readinessStatuses = ['ready', 'not-ready', 'unknown'] as const
export function getDesignBranch(_answers: DesignAnswers): DesignQuestionId[] { return designQuestions.map(q => q.id) }
export function cleanDesignAnswers(input: DesignAnswers): DesignAnswers {
  const answers: DesignAnswers = {}
  for (const q of designQuestions) {
    const selected = input[q.id]
    if (!Array.isArray(selected)) continue
    const valid = q.options.filter(o => selected.includes(o.id)).map(o => o.id)
    if (valid.length === 1) answers[q.id] = valid
  }
  return answers
}
export function migrateDesignAnswers(input: Record<string, unknown>): DesignAnswers {
  const next: Record<string, unknown> = { ...input }
  const materials = input['3']
  if (!next.materials && Array.isArray(materials) && materials.length === 1) {
    const values: Record<string, string> = { both: 'precious', jewelry: 'jewelry', unknown: 'unknown' }
    if (values[materials[0]]) next.materials = [values[materials[0]]]
  }
  const sales = input['7']
  if (!next.sales && Array.isArray(sales) && sales.length === 1 && ['online', 'shop'].includes(sales[0])) next.sales = sales
  return cleanDesignAnswers(next as DesignAnswers)
}
export function changeDesignAnswer(answers: DesignAnswers, id: DesignQuestionId, values: string[]): DesignAnswers { return cleanDesignAnswers({ ...answers, [id]: values }) }
export function toggleSalesAnswer(values: string[], value: string): string[] { return values.includes(value) ? values.filter(v => v !== value) : [...values, value] }
export function isDesignAnswered(answers: DesignAnswers, id: DesignQuestionId): boolean { return Boolean(cleanDesignAnswers(answers)[id]?.length) }
export function missingDesignQuestions(answers: DesignAnswers): DesignQuestionId[] { return getDesignBranch(answers).filter(id => !isDesignAnswered(answers, id)) }
export function recommendDesign(input: DesignAnswers): DesignRecommendation {
  const answers = cleanDesignAnswers(input)
  if (missingDesignQuestions(answers).length) throw new Error('Ответьте на все обязательные вопросы, чтобы получить материалы.')
  return { items: designQuestions.map(q => ({
    questionId: q.id, title: q.title,
    stages: q.id === 'rights' ? [1] : q.id === 'patent' ? [2] : q.id === 'sales' ? answers.sales?.[0] === 'none' ? [] : [3, 10] : [4],
    articles: q.id === 'rights' ? ['design-rights', 'copyright-protection'] : q.id === 'patent' ? ['patent-publication', 'industrial-design'] : q.id === 'sales' ? answers.sales?.[0] === 'none' ? [] : [answers.sales?.[0] === 'online' ? 'online-sales' : 'jewelry-store', 'preparing-for-sale'] : q.id === 'suppliers' ? ['supply-documents', 'jewelry-purchase'] : answers.materials?.[0] === 'precious' ? ['jewelry-materials', 'precious-metals', 'precious-stones'] : ['jewelry-materials'],
    suppliers: q.id === 'suppliers' && answers.suppliers?.[0] === 'no' && answers.materials?.[0] === 'precious',
  })) }
}
