import { ResultLink as Link } from '../features/serverSurvey/links'
import { SimilarLegalText } from './SimilarLegalText'
import { similarMethodArticleLinks } from '../features/similar/articleLinks'
import { claimsForRoute } from '../features/knowledge/claimTemplates'
import type { SimilarMethod } from '../features/similar/types'
import { claimEscalation, claimEscalationRoutes } from '../features/similar/claimEscalation'
import type { ArticleBlock } from '../features/knowledge/types'
import styles from '../pages/SimilarPage.module.css'

export function SimilarMethodCard({ method, idPrefix, onCourt }: { method: SimilarMethod; idPrefix?: string; onCourt?(trigger: HTMLButtonElement): void }) {
  const escalate = !method.snapshot && method.actionId === 'stop' && claimEscalationRoutes.includes(method.variant)
  const index = method.blocks.findIndex(block => block.kind === 'list')
  const list = method.blocks[index]
  const before: ArticleBlock[] = escalate && list?.kind === 'list' ? [...method.blocks.slice(0, index), { ...list, items: list.items.slice(0, 1) }] : method.blocks
  const after: ArticleBlock[] = escalate && list?.kind === 'list' ? [...(list.items.length > 1 ? [{ ...list, id: list.id + '-continued', items: list.items.slice(1) }] : []), ...method.blocks.slice(index + 1)] : []
  return <article className={styles.method}>
    <SimilarLegalText blocks={before} idPrefix={idPrefix} />
    {escalate && <p className={styles.claimEscalation}>{claimEscalation.introduction} <Link to={claimEscalation.articleHref}>«{claimEscalation.articleTitle}»</Link>. {claimEscalation.instruction} <button type="button" className={styles.inlineAction} onClick={event => onCourt?.(event.currentTarget)}>«Обратиться в суд»</button>.</p>}
    {!!after.length && <SimilarLegalText blocks={after} idPrefix={idPrefix} />}
    <div className={styles.links}>{(method.snapshot ? [...(method.articleLinks ?? []),...(method.supplementarySectionLinks ?? [])].filter((l,i,all) => all.findIndex(v => v.href === l.href) === i) : similarMethodArticleLinks(method.id, method.blocks)).map((link,i) => <Link key={i} to={link.href}>{link.title ?? ('label' in link && typeof link.label === 'string' ? link.label : '')}</Link>)}</div>
    <div className={styles.links}>{(method.snapshot ? method.downloads ?? [] : claimsForRoute(method.variant, method.actionId)).map((template,i) => <a href={template.href} download key={i}>{template.title} — скачать Word</a>)}</div>
  </article>
}
