import { ApiError } from './errors.ts'
import type { ArticleBlock, ArticleInline } from '../features/knowledge/types.ts'
import type { SimilarRoute, SimilarMethod } from '../features/similar/types.ts'

export type SurveyAnswers = Record<string, string[]>
export interface SnapshotLink { href: string; title?: string; label?: string; description?: string }
export interface DesignCard { item: { questionId: string; title: string; stages: number[]; articles: string[]; suppliers?: boolean }; fallbackText: string | null; links: SnapshotLink[] }
export interface DesignSnapshotStage { id: number; title: string; action: string; paragraphs: string[]; goal: string; tasks: string[]; criteria: string[]; links: SnapshotLink[]; downloads: SnapshotLink[] }
export interface DesignSnapshot { kind: 'design'; answers: SurveyAnswers; cards: DesignCard[]; stages: DesignSnapshotStage[] }
export interface SimilarSnapshot { kind: 'similar_products'; answers: SurveyAnswers; status: 'ready' | 'in_development'; caseId: string | null; goal: string; selectedMethodId: string | null; questionOrder: string[]; sectionArticleSlugs: string[]; message: string | null; route: SimilarRoute | null }

export function invalidResult(): never { throw new ApiError('invalid_response', 'Не удалось прочитать маршрут. Возможно, сервис обновляется. Попробуйте позже.') }
export function obj(v: unknown): Record<string, unknown> { return v && typeof v === 'object' && !Array.isArray(v) ? v as Record<string, unknown> : invalidResult() }
export function str(v: unknown): string { return typeof v === 'string' ? v : invalidResult() }
export function list<T>(v: unknown, parse: (v: unknown) => T): T[] { return Array.isArray(v) && v.length <= 10000 ? v.map(parse) : invalidResult() }
function num(v: unknown): number { return typeof v === 'number' && Number.isSafeInteger(v) && v >= 0 ? v : invalidResult() }
export function routeKind(v: unknown): 'steps' | 'design' | 'similar_products' { return v === undefined ? 'steps' : ['steps', 'design', 'similar_products'].includes(str(v)) ? v as 'steps' | 'design' | 'similar_products' : invalidResult() }
export function parseAnswers(v: unknown): SurveyAnswers { return Object.fromEntries(Object.entries(obj(v)).map(([k, a]) => [k, list(a, str)])) }
export function safeSnapshotHref(v: unknown): string {
  const href = str(v)
  if (href.startsWith('/') && !href.startsWith('//') && !href.includes('\\') && ![...href].some(c => c.charCodeAt(0) < 32)) return href
  try { const u = new URL(href); if (['http:', 'https:'].includes(u.protocol) && !u.username && !u.password) return href } catch {                                 }
  return invalidResult()
}
function link(v: unknown): SnapshotLink { const x = obj(v); return { href: safeSnapshotHref(x.href), ...(x.title !== undefined ? { title: str(x.title) } : {}), ...(x.label !== undefined ? { label: str(x.label) } : {}), ...(x.description !== undefined ? { description: str(x.description) } : {}) } }
function inline(v: unknown): ArticleInline { const x = obj(v); return { text: str(x.text), ...(x.href ? { href: safeSnapshotHref(x.href) } : {}) } }
function paragraph(v: unknown) { const x = obj(v); return { id: str(x.id), sourceIndex: num(x.sourceIndex), runs: list(x.runs, inline), ...(x.references ? { references: list(x.references, r => { const a = obj(r); return { href: safeSnapshotHref(a.href), label: str(a.label) } }) } : {}) } }
function blocks(v: unknown, depth = 0): ArticleBlock[] {
  if (depth > 8) return invalidResult()
  return list(v, value => {
    const x = obj(value)
    if (x.kind === 'table') return { kind: 'table', id: str(x.id), rows: list(x.rows, row => list(row, c => { const cell = obj(c); return { colSpan: num(cell.colSpan), ...(cell.rowSpan ? { rowSpan: num(cell.rowSpan) } : {}), blocks: blocks(cell.blocks, depth + 1) } })) }
    if (x.kind === 'list') { if (typeof x.ordered !== 'boolean') return invalidResult(); return { kind: 'list', id: str(x.id), listId: str(x.listId), ordered: x.ordered, start: num(x.start), items: list(x.items, paragraph) } }
    if (x.kind !== 'paragraph' && x.kind !== 'heading') return invalidResult()
    return { ...paragraph(x), kind: x.kind, ...(x.level ? { level: num(x.level) } : {}) }
  })
}
function method(v: unknown): SimilarMethod {
  const x = obj(v)
  return { id: str(x.id), actionId: str(x.actionId), variant: str(x.variant), title: str(x.title), blocks: blocks(x.blocks), snapshot: true, articleLinks: list(x.articleLinks ?? [], link), downloads: list(x.downloads ?? [], link), supplementarySectionLinks: list(x.supplementarySectionLinks ?? [], link) }
}
export function parseDesign(v: unknown): DesignSnapshot {
  const x = obj(v)
  if (x.kind !== 'design') return invalidResult()
  const cards = list(x.cards, v => { const c = obj(v), i = obj(c.item); return { item: { questionId: str(i.questionId), title: str(i.title), stages: list(i.stages, num), articles: list(i.articles, str), ...(i.suppliers !== undefined ? { suppliers: i.suppliers === true } : {}) }, fallbackText: c.fallbackText === null ? null : str(c.fallbackText), links: list(c.links, link) } })
  const stages = list(x.stages, v => { const s = obj(v); return { id: num(s.id), title: str(s.title), action: str(s.action), paragraphs: list(s.paragraphs, str), goal: str(s.goal), tasks: list(s.tasks, str), criteria: list(s.criteria, str), links: list(s.links, link), downloads: list(s.downloads, link) } })
  if (stages.length !== 10 || new Set(stages.map(s => s.id)).size !== 10 || stages.some(s => s.id < 1 || s.id > 10)) return invalidResult()
  return { kind: 'design', answers: parseAnswers(x.answers), cards, stages }
}
export function parseSimilar(v: unknown): SimilarSnapshot {
  const x = obj(v)
  if (x.kind !== 'similar_products' || !['ready', 'in_development'].includes(str(x.status))) return invalidResult()
  const route = x.route === null ? null : (() => { const r = obj(x.route); return { routeId: str(r.routeId), title: str(r.title), blocks: blocks(r.blocks), methods: list(r.methods, method) } })()
  const selectedMethodId = x.selectedMethodId === null ? null : str(x.selectedMethodId), goal = str(x.goal)
  if (x.status === 'ready' && (!route || route.methods.filter(m => m.id === selectedMethodId && m.actionId === goal).length !== 1)) return invalidResult()
  if (x.status === 'in_development' && (route !== null || selectedMethodId !== null)) return invalidResult()
  if (parseAnswers(x.answers).goal?.[0] !== goal) return invalidResult()
  return { kind: 'similar_products', answers: parseAnswers(x.answers), status: x.status as 'ready' | 'in_development', caseId: x.caseId === null ? null : str(x.caseId), goal, selectedMethodId, questionOrder: list(x.questionOrder, str), sectionArticleSlugs: list(x.sectionArticleSlugs, str), message: x.message === null ? null : str(x.message), route }
}
