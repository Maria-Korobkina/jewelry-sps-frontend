
export function safeCatalogReturn(value: string | null): string | null {
  if (!value) return null
  if (/^\/(?:business|similar-products|design\/result|design\/stages\/(?:[1-9]|10))\?(?:run|savedRoute)=[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}(?:#stage-content)?$/i.test(value)) return value
  if (['/business', '/similar-products', '/design/result'].includes(value)) return value
  if (/^\/design\/stages\/(?:[1-9]|10)(?:#stage-content)?$/.test(value)) return value
  if (/^\/account\/routes\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) return value
  return null
}

export function getCatalogReturn(params: URLSearchParams): string | null {
  if (params.has('returnTo')) return safeCatalogReturn(params.get('returnTo'))

  if (params.get('from') === 'business') return '/business'
  if (params.get('from') === 'similar-products') return '/similar-products'
  if (params.get('from') === 'design') {
    const stage = params.get('stage')
    return stage && /^(?:[1-9]|10)$/.test(stage) ? '/design/stages/' + stage + '#stage-content' : '/design/result'
  }
  return null
}

export function catalogHref(returnTo: string, href = '/suppliers'): string {
  const [path, query = ''] = href.split('?')
  const params = new URLSearchParams(query)
  const target = safeCatalogReturn(returnTo)
  if (target) params.set('returnTo', target)
  return path + (params.size ? '?' + params : '')
}
