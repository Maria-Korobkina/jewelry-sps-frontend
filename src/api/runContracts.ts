import { ApiError } from './errors.ts'

export interface RunAccess { runId: string; anonToken?: string }
export interface RunAnswer { question: string; options?: string[]; grid?: Record<string, string>; skip?: boolean }
export interface RunQuestion {
  code: string; text: string; step_label: string; section_label: string; help_text: string
  kind: 'single' | 'multi' | 'status_grid'; is_required: boolean
  options: { code: string; label: string; is_exclusive: boolean }[]
  selected: string[]; grid_values: Record<string, string>; is_skipped: boolean
}
export interface RunState {
  id: string; scenario: string; status: 'in_progress' | 'completed'; question: RunQuestion | null
  progress: { current: number; total: number }; history: string[]; anon_token?: string
}
export interface RunClaim { run_id: string; status: string; route_id: string | null; is_saved: boolean }
function invalid(): never { throw new ApiError('invalid_response', 'Сервис вернул неожиданный ответ. Попробуйте позже.') }
function object(v: unknown): Record<string, unknown> { return v && typeof v === 'object' && !Array.isArray(v) ? v as Record<string, unknown> : invalid() }
function text(v: unknown): string { return typeof v === 'string' ? v : invalid() }
function bool(v: unknown): boolean { return typeof v === 'boolean' ? v : invalid() }
function integer(v: unknown): number { return typeof v === 'number' && Number.isSafeInteger(v) && v >= 0 ? v : invalid() }
function list<T>(v: unknown, parse: (v: unknown) => T): T[] { return Array.isArray(v) ? v.map(parse) : invalid() }
export function validateRunAccess(access: RunAccess) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(access.runId) || (access.anonToken !== undefined && !/^[A-Za-z0-9_-]{20,200}$/.test(access.anonToken))) throw new ApiError('configuration', 'Прохождение недоступно.')
}
export function parseRun(value: unknown): RunState {
  const v = object(value), progress = object(v.progress)
  if (v.status !== 'completed' && v.status !== 'in_progress') return invalid()
  let question: RunQuestion | null = null
  if (v.question !== null) {
    const q = object(v.question)
    if (!['single', 'multi', 'status_grid'].includes(text(q.kind))) return invalid()
    const grid = object(q.grid_values)
    question = { code: text(q.code), text: text(q.text), step_label: text(q.step_label), section_label: text(q.section_label), help_text: text(q.help_text), kind: q.kind as RunQuestion['kind'], is_required: bool(q.is_required), is_skipped: bool(q.is_skipped), selected: list(q.selected, text), grid_values: Object.fromEntries(Object.entries(grid).map(([key, value]) => [key, text(value)])), options: list(q.options, item => { const o = object(item); return { code: text(o.code), label: text(o.label), is_exclusive: bool(o.is_exclusive) } }) }
  }
  return { id: text(v.id), scenario: text(v.scenario), status: v.status, question, progress: { current: integer(progress.current), total: integer(progress.total) }, history: list(v.history, text), ...(v.anon_token !== undefined ? { anon_token: text(v.anon_token) } : {}) }
}
export function parseClaim(value: unknown): RunClaim {
  const v = object(value)
  return { run_id: text(v.run_id), status: text(v.status), route_id: v.route_id === null ? null : text(v.route_id), is_saved: bool(v.is_saved) }
}
