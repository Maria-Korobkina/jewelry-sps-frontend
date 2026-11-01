import { readDraft } from '../business/draft.ts'
import { getMissingQuestions } from '../business/rules.ts'
import { readSimilarDraft } from '../similar/storage.ts'
import { missingSimilarQuestions } from '../similar/rules.ts'
import { readDesignDraft } from '../design/storage.ts'
import { searchArticleHref } from '../search/query.ts'
import { catalogHref } from '../suppliers/navigation.ts'

export function canReturnToBusiness(search: string): boolean {
  if (new URLSearchParams(search).get('from') !== 'business') return false
  const draft = readDraft()
  return draft.view === 'result' && getMissingQuestions(draft.answers).length === 0
}

export function getArticleReturn(search: string): { from: 'business' | 'similar-products' | 'design'; stage?: number; href: string; label: string } | null {
  const context = new URLSearchParams(search), from = context.get('from')
  const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i
  const saved = uuid.test(context.get('savedRoute') ?? '') ? context.get('savedRoute') : null, run = uuid.test(context.get('run') ?? '') ? context.get('run') : null
  if ((saved && uuid.test(saved) || run && uuid.test(run)) && ['business','design','similar-products'].includes(from ?? '')) {
    const source = from as 'business' | 'design' | 'similar-products', stage = context.get('stage')
    const query = saved ? 'savedRoute=' + saved : 'run=' + run
    if (source === 'design' && /^(?:[1-9]|10)$/.test(stage ?? '')) return {from:source,stage:Number(stage),href:'/design/stages/' + stage + '?' + query + '#stage-content',label:'← Вернуться к этапу'}
    return {from:source,href:saved ? '/account/routes/' + saved : (source === 'business' ? '/business' : source === 'design' ? '/design/result' : '/similar-products') + '?run=' + run,label:'← Вернуться к маршруту'}
  }
  if (canReturnToBusiness(search)) return { from: 'business', href: '/business?active=1', label: '← Вернуться к маршруту' }
  if (new URLSearchParams(search).get('from') === 'similar-products') {
    const draft = readSimilarDraft()
    if (draft.view === 'result' && !missingSimilarQuestions(draft.answers).length) return { from: 'similar-products', href: '/similar-products?active=1', label: '← Вернуться к маршруту' }
  }
  const params = new URLSearchParams(search)
  if (params.get('from') === 'design') {
    const stage = params.get('stage') ?? ''
    if (/^(?:[1-9]|10)$/.test(stage)) return { from: 'design', stage: Number(stage), href: '/design/stages/' + stage + '#stage-content', label: '← Вернуться к этапу' }
    if (readDesignDraft().completed) return { from: 'design', href: '/design/result', label: '← Вернуться к рекомендации' }
  }
  return null
}

export function articleTarget(href: string, origin: boolean | 'similar-products' | 'design', stage?: number, searchQuery?: string): string {
  if (origin && (href === '/suppliers' || href.startsWith('/suppliers?'))) return catalogHref(origin === true ? '/business' : origin === 'similar-products' ? '/similar-products' : stage ? '/design/stages/' + stage + '#stage-content' : '/design/result', href)
  if (searchQuery && href.startsWith('/knowledge/')) href = searchArticleHref(href, searchQuery)
  if (!origin || !(href.startsWith('/knowledge/') || (origin === true && href === '/suppliers'))) return href
  const url = new URL(href, 'https://local.invalid')
  url.searchParams.set('from', origin === true ? 'business' : origin)
  if (origin === 'design' && stage) url.searchParams.set('stage', String(stage))
  return url.pathname + url.search + url.hash
}


export function carryArticleContext(href: string, search: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  const back = getArticleReturn(search), source = new URLSearchParams(search)
  if (!back || !(source.has('savedRoute') || source.has('run'))) return href
  const url = new URL(href,'https://local.invalid')
  if (url.pathname === '/suppliers') return catalogHref(back.href,href)
  if (url.pathname === '/knowledge' || url.pathname.startsWith('/knowledge/')) {
    const key = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(source.get('savedRoute') ?? '') ? 'savedRoute' : 'run'
    url.searchParams.set(key,source.get(key)!)
    url.searchParams.set('from',back.from)
    if (back.stage) url.searchParams.set('stage',String(back.stage))
  }
  return url.pathname + url.search + url.hash
}
