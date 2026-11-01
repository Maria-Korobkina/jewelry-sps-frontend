import { articles } from '../knowledge/articles.ts'
import type { RouteLink } from '../../api/types'

export function savedRouteLink(link: RouteLink): string | null {

  if (link.target.startsWith('/') && !link.target.startsWith('//') && !link.target.includes('\\') && ![...link.target].some(c => c.charCodeAt(0) < 32)) {
    const url = new URL(link.target,'https://local.invalid')
    if (link.kind === 'article' && articles.some(a => url.pathname === '/knowledge/' + a.slug)) return link.target
    if (link.kind === 'tool' && url.pathname === '/activities') return link.target
    if (link.kind === 'catalog' && url.pathname === '/suppliers') return link.target
    if (link.kind === 'scenario' && ['/business','/design/survey','/similar-products/survey'].includes(url.pathname)) return link.target
  }
  if (link.kind === 'catalog' && ['metals', 'stones', 'all'].includes(link.target)) return '/suppliers' + (link.target === 'all' ? '' : '?category=' + link.target)
  if (link.kind === 'tool' && link.target === 'okved-check') return '/activities'
  if (link.kind === 'article') {
    const article = articles.find(article => article.slug === link.target || article.title.replace(/[?!.]/g, '').toLowerCase() === link.label.replace(/[?!.]/g, '').toLowerCase())
    if (article) return '/knowledge/' + article.slug
    if (link.target === 'giis-dmdk-chto-eto') return '/knowledge/special-account'

    return null
  }
  if (link.kind === 'external') {
    try { const url = new URL(link.target); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? link.target : null } catch { return null }
  }
  return null
}
