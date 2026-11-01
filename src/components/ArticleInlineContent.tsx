import { Fragment, type ReactNode } from 'react'
import { ResultLink as Link } from '../features/serverSurvey/links'
import { articleTarget } from '../features/knowledge/navigation'
import { articleLabelLength } from '../features/knowledge/emphasis'
import { inlinePresentation } from '../features/knowledge/inlinePresentation'
import type { ArticleInline } from '../features/knowledge/types'

export function ArticleInlineContent({ runs, origin = false, stage, searchQuery, labels = false }: {
  runs: ArticleInline[]; origin?: boolean | 'similar-products' | 'design'; stage?: number; searchQuery?: string; labels?: boolean | 'similar'
}) {
  const groups = inlinePresentation(runs)
  const labelLength = labels === 'similar' ? groups.flat().map(run => run.text).join('').match(/^(Что делать|Итог):?/)?.[0].length ?? 0 : labels ? articleLabelLength(groups.flat()) : 0
  let offset = 0
  return groups.map((group, index) => {
    const href = group[0].href
    const content: ReactNode = group.map((run, part) => {
      const emphasized = Math.max(0, Math.min(run.text.length, labelLength - offset))
      offset += run.text.length
      return <Fragment key={part}>{emphasized ? <><strong>{run.text.slice(0, emphasized)}</strong>{run.text.slice(emphasized)}</> : run.text}</Fragment>
    })
    if (href?.startsWith('/')) return <Link key={index} to={articleTarget(href, origin, stage, searchQuery)}>{content}</Link>
    if (href && /^https?:\/\//i.test(href)) return <a key={index} href={href} target="_blank" rel="noopener noreferrer">{content}</a>
    return <Fragment key={index}>{content}</Fragment>
  })
}
