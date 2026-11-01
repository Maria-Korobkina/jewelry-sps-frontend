import { designScenarioTitle } from './features/design/title.ts'
export const sections = [
  { path: '/design', title: designScenarioTitle },
  { path: '/business', title: 'Открыть ювелирный бизнес' },
  { path: '/similar-products', title: 'Другой производитель предлагает похожие изделия' },
] as const
