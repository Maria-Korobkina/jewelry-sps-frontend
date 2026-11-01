import { articles } from '../knowledge/articles.ts'
import type { ArticleBlock } from '../knowledge/types.ts'
import { documentTemplates } from '../knowledge/documentTemplates.ts'
import { checklistMaterials } from '../design/checklistMaterials.ts'
import { designStages } from '../design/content.ts'
import { cleanQuery, normalizeSearch, queryWords } from './query.ts'
import { sections } from '../../sections.ts'
import { scenarioDetails } from '../../content/home.ts'
import { fees } from '../reference/fees.ts'
import { agreement } from '../reference/agreement.ts'
export { cleanQuery, normalizeSearch, queryWords, searchHref, searchArticleHref } from './query.ts'

export type MaterialType = 'Статья' | 'Шаблон' | 'Чек-лист' | 'Раздел'
export interface SearchMaterial { id: string; type: MaterialType; title: string; text: string; href: string; download?: boolean }
export interface SearchResult extends SearchMaterial { snippet: string; score: number }
export function articleText(blocks: ArticleBlock[]): string {
  return blocks.map(block => block.kind === 'table' ? block.rows.map(row => row.map(cell => articleText(cell.blocks)).join(' ')).join(' ')
    : (block.kind === 'list' ? block.items : [block]).map(p => p.runs.map(r => r.text).join('')).join(' ')).join(' ')
}


export function getSearchMaterials(): SearchMaterial[] {
  return [
    ...[fees, agreement].map(document => ({ id: 'reference-' + document.slug, type: 'Раздел' as const, title: document.title, text: articleText(document.blocks), href: '/' + document.slug })),
    ...sections.map((section, index) => ({ id: 'section-' + section.path, type: 'Раздел' as const, title: section.title, text: scenarioDetails[index].description, href: section.path })),
    ...articles.map(a => ({ id: 'article-' + a.slug, type: 'Статья' as const, title: a.title, text: articleText(a.blocks), href: '/knowledge/' + a.slug })),
    ...documentTemplates.map(d => ({ id: 'template-' + d.id, type: 'Шаблон' as const, title: d.title, text: d.description, href: d.href, download: true })),
    ...checklistMaterials.map(c => ({ id: 'checklist-' + c.id, type: 'Чек-лист' as const, title: c.title, text: [c.description, ...designStages.filter(s => c.id === 'all' || String(s.id) === c.id).flatMap(s => [...s.tasks, ...s.criteria])].join(' '), href: c.href })),
  ]
}

export function makeSnippet(text: string, words: string[], limit = 220): string {
  const body = cleanQuery(text)
  const normalized = normalizeSearch(body)
  const positions = words.map(word => normalized.indexOf(word)).filter(i => i >= 0)
  const hit = positions.length ? Math.min(...positions) : 0
  let start = Math.max(0, hit - 65)
  if (start) { const boundary = body.indexOf(' ', start); if (boundary >= 0 && boundary < hit) start = boundary + 1 }
  let end = Math.min(body.length, start + limit)
  if (end < body.length) { const boundary = body.lastIndexOf(' ', end); if (boundary > hit) end = boundary }
  return (start ? '…' : '') + body.slice(start, end) + (end < body.length ? '…' : '')
}

export function searchMaterials(query: string, materials = getSearchMaterials()): SearchResult[] {
  const words = queryWords(query)
  if (!words.length) return []
  const phrase = normalizeSearch(cleanQuery(query))
  return materials.flatMap(material => {
    const title = normalizeSearch(material.title)
    const body = normalizeSearch(material.text)
    if (!words.every(word => title.includes(word) || body.includes(word))) return []
    const score = words.filter(word => title.includes(word)).length * 100 + (title.includes(phrase) ? 20 : 0)
    return [{ ...material, score, snippet: makeSnippet(material.text, words) }]
  }).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ru', { sensitivity: 'base' }))
}


export function highlightParts(text: string, query: string): { text: string; match: boolean }[] {
  const normalized = normalizeSearch(text)
  const ranges: [number, number][] = []
  for (const word of queryWords(query)) {
    let offset = 0
    while (offset < normalized.length) {
      const index = normalized.indexOf(word, offset)
      if (index < 0) break
      ranges.push([index, index + word.length]); offset = index + word.length
    }
  }
  ranges.sort((a, b) => a[0] - b[0])
  const merged: [number, number][] = []
  for (const range of ranges) {
    const last = merged.at(-1)
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1])
    else merged.push([...range])
  }
  const parts = []; let offset = 0
  for (const [start, end] of merged) {
    if (start > offset) parts.push({ text: text.slice(offset, start), match: false })
    parts.push({ text: text.slice(start, end), match: true }); offset = end
  }
  if (offset < text.length) parts.push({ text: text.slice(offset), match: false })
  return parts
}

