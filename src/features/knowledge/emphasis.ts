import type { ArticleInline } from './types.ts'


export function articleLabelLength(runs: ArticleInline[]): number {
  const text = runs.map(run => run.text).join('')
  const label = text.match(/^([^\n:!]{1,39}[:!])(?=\s|$)/)?.[1]
  if (!label || label.trim().split(/\s+/).length > 5) return 0
  return label.length
}
