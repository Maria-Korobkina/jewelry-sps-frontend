import { businessQuestions, routeContent } from './content.ts'
import { actionTitles } from './actionTitles.ts'
import type { BusinessAnswers, BusinessResult, QuestionId } from './types.ts'


export function getBranch(answers: BusinessAnswers): QuestionId[] {
  const branch: QuestionId[] = ['1', '2']
  const activity = answers['2']?.[0]
  if (!activity) return branch
  if (activity === 'produce' || activity === 'both') branch.push('3')
  if (activity !== 'services') branch.push('4', '5')
  if (activity === 'sell' || activity === 'both' || activity === 'services') branch.push('6')
  branch.push('7')
  if (answers['7']?.[0] && answers['7'][0] !== 'new') branch.push('7.1')
  branch.push('8', '9', '10')
  return branch
}

export function cleanAnswers(input: BusinessAnswers): BusinessAnswers {
  const valid: BusinessAnswers = {}
  for (const q of businessQuestions) {
    const selected = input[q.id]
    if (!Array.isArray(selected)) continue
    const values = q.options.filter(o => selected.includes(o.id)).map(o => o.id)
    if (values.length && (q.kind === 'multi' || values.length === 1)) valid[q.id] = values
  }
  const branch = getBranch(valid)
  return Object.fromEntries(Object.entries(valid).filter(([id]) => branch.includes(id as QuestionId)))
}

export function changeAnswer(answers: BusinessAnswers, id: QuestionId, values: string[]): BusinessAnswers {
  return cleanAnswers({ ...answers, [id]: values })
}

export function toggleBusinessAnswer(values: string[], value: string, id: QuestionId): string[] {
  const combined = id === '4' ? 'both' : ''
  if (value === combined || (id === '4' && value === 'jewelry')) return values.includes(value) ? [] : [value]
  const current = values.filter(v => v !== combined && !(id === '4' && v === 'jewelry'))
  return current.includes(value) ? current.filter(v => v !== value) : [...current, value]
}

export function getMissingQuestions(input: BusinessAnswers): QuestionId[] {
  const answers = cleanAnswers(input)
  return getBranch(answers).filter(id => !answers[id]?.length)
}

export function calculateResult(input: BusinessAnswers): BusinessResult {
  const answers = cleanAnswers(input)
  const branch = getBranch(answers)
  const incomplete = getMissingQuestions(answers).length > 0
  if (incomplete) throw new Error('Чтобы получить маршрут, ответьте на все обязательные вопросы.')
  return {
    kind: 'calculated', issues: [],
    steps: branch.flatMap(questionId => (answers[questionId] ?? []).map(answerId => {
      const id = questionId + '.' + answerId
      const block = routeContent[id]
      if (!block || !actionTitles[id]) throw new Error('Для выбранных ответов маршрут пока недоступен. Измените ответы или вернитесь позже.')
      return {
        id, questionId, answerId, title: actionTitles[id],
        paragraphs: [...new Set(block.paragraphs)],
        materials: [...new Set(block.materials)],
      }
    })).map((step, index) => ({ ...step, number: index + 1 })),
  }
}
