import { ArticleInlineContent as Inline } from './ArticleInlineContent'
import { isStandaloneArticleHeading } from '../features/knowledge/structure'
import type { ArticleBlock, ArticleInline, ArticleText, KnowledgeArticle } from '../features/knowledge/types'
import styles from '../pages/KnowledgePage.module.css'

function inlineRuns(block: ArticleText): ArticleInline[] {
  return [...block.runs, ...(block.references ?? []).map(reference => ({ text: ' ' + reference.label, href: reference.href }))]
}

export function ArticleBlocks({ blocks, fromBusiness = false, fromSimilar = false, fromDesign = false, designStage, searchQuery }: { blocks: ArticleBlock[]; fromBusiness?: boolean; fromSimilar?: boolean; fromDesign?: boolean; designStage?: number; searchQuery?: string }) {
  const origin = fromSimilar ? 'similar-products' : fromDesign ? 'design' : fromBusiness
  return <div className={styles.content}>{blocks.map(block => {
    if (block.kind === 'table') return <div className={styles.tableScroll} key={block.id} tabIndex={0} role="region" aria-label="Таблица"><table><tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, column) => {
      const Cell = cell.header ? 'th' : 'td'
      return <Cell key={column} scope={cell.header ? 'col' : undefined} colSpan={cell.colSpan} rowSpan={cell.rowSpan}><ArticleBlocks blocks={cell.blocks} fromBusiness={fromBusiness} fromSimilar={fromSimilar} fromDesign={fromDesign} designStage={designStage} searchQuery={searchQuery} /></Cell>
    })}</tr>)}</tbody></table></div>
    if (block.kind === 'list') {
      const items = block.items.map(item => <li key={item.id} id={item.id}><Inline runs={inlineRuns(item)} origin={origin} stage={designStage} searchQuery={searchQuery} /></li>)
      return block.ordered ? <ol key={block.id} start={block.start}>{items}</ol> : <ul key={block.id}>{items}</ul>
    }
    const content = <Inline runs={inlineRuns(block)} origin={origin} stage={designStage} searchQuery={searchQuery} labels={block.kind === 'paragraph'} />
    if (block.kind === 'heading' && isStandaloneArticleHeading(block.runs.map(run => run.text).join(''))) return block.level === 3 ? <h3 key={block.id} id={block.id}>{content}</h3> : <h2 key={block.id} id={block.id}>{content}</h2>
    return <p key={block.id} id={block.id}>{content}</p>
  })}</div>
}

export function ArticleContent({ article, fromBusiness = false, fromSimilar = false, fromDesign = false, designStage, searchQuery }: { article: KnowledgeArticle; fromBusiness?: boolean; fromSimilar?: boolean; fromDesign?: boolean; designStage?: number; searchQuery?: string }) {
  return <ArticleBlocks blocks={article.blocks} fromBusiness={fromBusiness} fromSimilar={fromSimilar} fromDesign={fromDesign} designStage={designStage} searchQuery={searchQuery} />
}

