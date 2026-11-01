import { ApiError } from './errors.ts'
import type { AuthResponse, Page, RouteLink, RouteStep, SavedRoute, SavedRouteSummary, Tokens, User } from './types.ts'
import { parseDesign, parseSimilar, routeKind } from './resultContracts.ts'

function invalid(): never { throw new ApiError('invalid_response', 'Сервис вернул неожиданный ответ. Попробуйте позже.') }
function object(value: unknown): Record<string, unknown> { return typeof value === 'object' && value !== null && !Array.isArray(value) ? value as Record<string, unknown> : invalid() }
function string(value: unknown) { return typeof value === 'string' ? value : invalid() }
function number(value: unknown) { return typeof value === 'number' && Number.isFinite(value) ? value : invalid() }
function array<T>(value: unknown, parse: (item: unknown) => T): T[] { return Array.isArray(value) ? value.map(parse) : invalid() }
export function parseUser(value: unknown): User {
  const v = object(value)
  return { id: number(v.id), email: string(v.email), first_name: string(v.first_name), last_name: string(v.last_name), date_joined: string(v.date_joined) }
}
export function parseTokens(value: unknown): Tokens {
  const v = object(value)
  if (!v.access || (v.refresh !== undefined && !v.refresh)) return invalid()
  return { access: string(v.access), ...(v.refresh !== undefined ? { refresh: string(v.refresh) } : {}) }
}
export function parseAuth(value: unknown): AuthResponse {
  const v = object(value); const tokens = parseTokens(v)
  if (!tokens.refresh) return invalid()
  return { user: parseUser(v.user), access: tokens.access, refresh: tokens.refresh }
}
function parseSummary(value: unknown): SavedRouteSummary {
  const v = object(value)
  return { id: string(v.id), run_id: string(v.run_id), scenario: string(v.scenario), scenario_title: string(v.scenario_title), steps_count: number(v.steps_count), kind: routeKind(v.kind), created_at: string(v.created_at), updated_at: string(v.updated_at) }
}
export function parseRoutes(value: unknown): Page<SavedRouteSummary> {
  const v = object(value)
  return { count: number(v.count), next: v.next === null ? null : string(v.next), previous: v.previous === null ? null : string(v.previous), results: array(v.results, parseSummary) }
}
function parseLink(value: unknown): RouteLink { const v = object(value); return { label: string(v.label), kind: string(v.kind), target: string(v.target) } }
function parseStep(value: unknown): RouteStep { const v = object(value); return { number: string(v.number), title: string(v.title), body: string(v.body), links: array(v.links, parseLink) } }
export function parseRoute(value: unknown): SavedRoute {
  const v = object(value)
  if (typeof v.is_saved !== 'boolean') return invalid()
  const kind = routeKind(v.kind)
  return { id: string(v.id), run_id: string(v.run_id), scenario: string(v.scenario), scenario_title: string(v.scenario_title), schema_version: number(v.schema_version), is_saved: v.is_saved, kind, steps: array(v.steps, parseStep), result: kind === 'design' ? parseDesign(v.result) : kind === 'similar_products' ? parseSimilar(v.result) : null }
}
