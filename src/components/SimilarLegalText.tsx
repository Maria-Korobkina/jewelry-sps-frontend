import { ArticleInlineContent as Inline } from './ArticleInlineContent'
import type { ArticleBlock, ArticleInline, ArticleText } from '../features/knowledge/types'
import styles from './SimilarLegalText.module.css'
import { ArticleBlocks } from './ArticleContent'

function inlineRuns(block: ArticleText): ArticleInline[] {
  return [...block.runs, ...(block.references ?? []).map(reference => ({ text: ' ' + reference.label, href: reference.href }))]
}

export function SimilarLegalText({ blocks, idPrefix = '' }: { blocks: ArticleBlock[]; idPrefix?: string }) {
  return <div className={styles.content}>{blocks.map(block => {
    if (block.kind === 'table') return <ArticleBlocks key={block.id} blocks={[block]} fromSimilar />
    if (block.kind === 'list') return <ul key={block.id}>{block.items.map(item => <li id={idPrefix + item.id} key={item.id}><Inline runs={inlineRuns(item)} origin="similar-products" /></li>)}</ul>
    const content = <Inline runs={inlineRuns(block)} origin="similar-products" labels={block.kind === 'paragraph' ? 'similar' : false} />
    if (block.kind === 'heading') return <h4 id={idPrefix + block.id} key={block.id}>{content}</h4>
    return <p id={idPrefix + block.id} key={block.id}>{content}</p>
  })}</div>
}

