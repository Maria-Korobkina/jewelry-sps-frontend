export interface ArticleInline {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  href?: string | null
}
export interface ArticleText {
  id: string
  sourceIndex: number
  runs: ArticleInline[]
  references?: { href: string; label: string }[]
  unresolvedLinks?: { href: string; reason: string }[]
}
export type ArticleBlock = (ArticleText & { kind: 'paragraph' | 'heading'; level?: number }) | {
  kind: 'list'
  id: string
  listId: string
  ordered: boolean
  start: number
  items: ArticleText[]
} | {
  kind: 'table'
  id: string
  rows: { blocks: ArticleBlock[]; colSpan: number; rowSpan?: number; header?: boolean }[][]
}
export interface KnowledgeArticle {
  relatedSlugs?: string[]
  downloads?: { title: string; href: string }[]
  slug: string
  title: string
  source: string
  blocks: ArticleBlock[]
}
