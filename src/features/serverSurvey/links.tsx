/* eslint-disable react/only-export-components */
import { createContext, useContext } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import type { SavedRoute } from '../../api/types'
import { catalogHref } from '../suppliers/navigation'
import { carryArticleContext } from '../knowledge/navigation'
export const SnapshotContext = createContext<{route: SavedRoute; stage?: number} | null>(null)
export const ArticleReturnContext = createContext('')
export function snapshotQuery(route: SavedRoute) { return (route.is_saved ? 'savedRoute=' + route.id : 'run=' + route.run_id) }
export function resultHref(route: SavedRoute) { return route.is_saved ? '/account/routes/' + route.id : (route.scenario === 'open-business' ? '/business' : route.scenario === 'design-rights' ? '/design/result' : '/similar-products') + '?run=' + route.run_id }
export function snapshotHref(href: string, route: SavedRoute, stage?: number): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  const url = new URL(href, 'https://local.invalid')
  if (url.pathname === '/suppliers') return catalogHref(stage ? '/design/stages/' + stage + '?' + snapshotQuery(route) + '#stage-content' : resultHref(route), href)
  if (['/business','/design/survey','/similar-products/survey'].includes(url.pathname)) url.searchParams.set('returnTo',resultHref(route))
  if (url.pathname.startsWith('/knowledge/') || /^\/design\/(?:stages\/\d+|checklist)$/.test(url.pathname)) {
    url.searchParams.delete('run'); url.searchParams.delete('savedRoute')
    url.searchParams.set(route.is_saved ? 'savedRoute' : 'run',route.is_saved ? route.id : route.run_id)
    url.searchParams.set('from',route.scenario === 'open-business' ? 'business' : route.scenario === 'design-rights' ? 'design' : 'similar-products')
    if (stage) url.searchParams.set('stage',String(stage))
  }
  return url.pathname + url.search + url.hash
}
export function ResultLink(props: LinkProps) {
  const context = useContext(SnapshotContext)
  const search = useContext(ArticleReturnContext)
  const to = typeof props.to === 'string' ? context ? snapshotHref(props.to,context.route,context.stage) : carryArticleContext(props.to,search) : props.to
  return <Link {...props} to={to} />
}
