import { knowledgeLinks } from '../knowledge/links.ts'
import type { ArticleBlock } from '../knowledge/types.ts'
export function articleHrefs(blocks: ArticleBlock[]): string[] {
  return blocks.flatMap(block => block.kind === 'table' ? block.rows.flatMap(row => row.flatMap(cell => articleHrefs(cell.blocks))) : (block.kind === 'list' ? block.items.flatMap(item => item.runs) : block.runs).flatMap(run => run.href ? [run.href] : []))
}
export function similarArticleLinks(slugs: string[]) {
  return knowledgeLinks(slugs, 'similar-products')
}
export function similarMethodArticleLinks(id: string, blocks: ArticleBlock[] = []) {
  if (id.startsWith('trademark-') || id.startsWith('unregistered-trademark-')) {
    const slugs = id.endsWith('court') ? ['ip-jurisdiction'] : id.endsWith('learn') ? ['trademark-protection'] : [id.startsWith('unregistered-') ? 'trademark-unregistered' : 'trademark-infringement']
    const inline = articleHrefs(blocks)
    return similarArticleLinks(slugs).filter(link => !inline.some(href => href.split('?')[0] === link.href.split('?')[0]))
  }
  const copyright = id.startsWith('copyright-') || id.startsWith('no-patent-')
  const slugs = id.endsWith('evaluate') || id.endsWith('record') ? [copyright ? 'copyright-infringement' : 'design-infringement'] : id.endsWith('stop') || id.endsWith('court') ? [copyright ? 'copyright-infringement' : 'unanswered-claim'] : id.endsWith('learn') ? [copyright ? 'copyright-protection' : 'industrial-design'] : []
  const inline = articleHrefs(blocks)
  return similarArticleLinks(slugs).filter(link => !inline.some(href => href.split('?')[0] === link.href.split('?')[0]))
}
