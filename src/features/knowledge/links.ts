import { articles } from './articles.ts'
export type ArticleOrigin = 'business' | 'similar-products' | 'design'
const bySlug = new Map(articles.map(article => [article.slug, article]))
export function knowledgeLinks(slugs: string[], origin?: ArticleOrigin, stage?: number) {
  return [...new Set(slugs)].map(slug => {
    const article = bySlug.get(slug)
    if (!article) throw new Error('Unknown published article: ' + slug)
    const query = new URLSearchParams()
    if (origin) query.set('from', origin)
    if (origin === 'design' && stage) query.set('stage', String(stage))
    return { title: article.title, href: '/knowledge/' + slug + (query.size ? '?' + query : '') }
  })
}
