import { similarQuestions } from './content.ts'
import type { SimilarAnswers, SimilarObject, SimilarQuestionId, SimilarResult } from './types.ts'
import { similarRoutes } from './routes.ts'

export function getSimilarObjects(answers: SimilarAnswers): SimilarObject[] {
  const selected = answers.objects ?? []
  return [
    ...(selected.includes('jewelry') ? ['patent' as const] : []),
    ...(selected.some(value => ['design', 'photos'].includes(value)) ? ['copyright' as const] : []),
    ...(selected.some(value => ['name', 'logo'].includes(value)) ? ['trademark' as const] : []),
  ]
}
export function getSimilarBranch(answers: SimilarAnswers): SimilarQuestionId[] {
  const objects = getSimilarObjects(answers)
  if (!objects.length) return ['objects']

  return ['objects', ...(objects.includes('patent') ? ['patent' as const] : []), ...(objects.includes('trademark') ? ['trademark' as const] : []), ...(objects.includes('copyright') ? ['evidence' as const] : []), 'goal']
}
export function cleanSimilarAnswers(input: SimilarAnswers): SimilarAnswers {
  const valid: SimilarAnswers = {}
  for (const question of similarQuestions) {
    const selected = input[question.id]
    if (!Array.isArray(selected)) continue
    let values = question.options.filter(option => selected.includes(option.id)).map(option => option.id)
    if (question.id === 'evidence' && values.includes('none')) values = ['none']
    if (values.length && (question.kind === 'multi' || values.length === 1)) valid[question.id] = values
  }
  const branch = getSimilarBranch(valid)
  return Object.fromEntries(Object.entries(valid).filter(([id]) => branch.includes(id as SimilarQuestionId)))
}
export function toggleEvidence(values: string[], value: string): string[] {
  if (value === 'none') return values.includes('none') ? [] : ['none']
  const previous = values.filter(item => item !== 'none')
  return previous.includes(value) ? previous.filter(item => item !== value) : [...previous, value]
}
export function changeSimilarAnswer(answers: SimilarAnswers, id: SimilarQuestionId, values: string[]): SimilarAnswers {
  return cleanSimilarAnswers({ ...answers, [id]: values })
}
export function missingSimilarQuestions(answers: SimilarAnswers): SimilarQuestionId[] {
  return getSimilarBranch(answers).filter(id => !answers[id]?.length)
}
export function calculateSimilarResult(input: SimilarAnswers): SimilarResult {
  const answers = cleanSimilarAnswers(input)
  if (missingSimilarQuestions(answers).length) throw new Error('Чтобы получить маршрут, ответьте на все обязательные вопросы.')
  const selectedGoal = answers.goal![0]
  const objects = getSimilarObjects(answers)
  const p = objects.includes('patent'), c = objects.includes('copyright'), t = objects.includes('trademark')
  const patent = answers.patent?.[0] === 'yes', trademark = answers.trademark?.[0] === 'yes'
  let routeId: string
  if (p && c && t) routeId = patent && trademark ? 'all-rights' : 'undefined-all-rights'
  else if (p && c) routeId = patent ? 'patent-copyright' : 'pending-patent-copyright'
  else if (p && t) routeId = patent && trademark ? 'patent-trademark' : patent ? 'pending-patent-unregistered' : trademark ? 'pending-no-patent-trademark' : 'pending-no-patent-unregistered'
  else if (c && t) routeId = trademark ? 'copyright-trademark' : 'pending-copyright-unregistered'
  else routeId = p ? patent ? 'patent' : 'no-patent' : c ? 'copyright' : trademark ? 'trademark' : 'unregistered-trademark'
  const route = similarRoutes[routeId]
  const id = objects.length > 1 ? 'combined' : objects[0]
  if (!route) return { sections: [{ id, routeId, title: 'В разработке', blocks: [], methods: [], allMethods: [], incomplete: true, articleSlugs: [] }] }
  const articleSlugs: Record<string, string[]> = {
    patent: ['design-infringement', 'industrial-design'], 'no-patent': ['without-patent', 'copyright-protection'],
    copyright: ['copyright-protection', 'copyright-infringement'], trademark: ['trademark-protection', 'trademark-infringement'],
    'unregistered-trademark': ['trademark-unregistered', 'trademark-protection'],
    'patent-copyright': ['design-infringement', 'copyright-infringement'], 'patent-trademark': ['design-infringement', 'trademark-infringement'],
    'copyright-trademark': ['copyright-infringement', 'trademark-infringement'], 'all-rights': ['design-infringement', 'copyright-infringement', 'trademark-infringement'],
  }
  return { sections: [{ id, routeId, title: route.title, blocks: route.blocks, methods: route.methods.filter(m => m.actionId === selectedGoal), allMethods: route.methods, incomplete: false, articleSlugs: articleSlugs[routeId] ?? [] }] }
}
