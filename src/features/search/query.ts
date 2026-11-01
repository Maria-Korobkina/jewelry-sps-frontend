export const cleanQuery = (value: string) => value.trim().replace(/\s+/gu, ' ')
export const normalizeSearch = (value: string) => value.toLocaleLowerCase('ru').replaceAll('ё', 'е')
export const queryWords = (value: string) => [...new Set(normalizeSearch(cleanQuery(value)).split(' ').filter(Boolean))]
export function searchHref(query: string): string { return '/search?' + new URLSearchParams({ q: cleanQuery(query) }) }
export function searchArticleHref(href: string, query: string): string {
  const url = new URL(href, 'https://local.invalid')
  url.searchParams.set('search', cleanQuery(query))
  return url.pathname + url.search + url.hash
}
