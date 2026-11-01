import { ApiError, disabledMessage, isAborted } from './errors.ts'
import { parseAuth, parseRoute, parseRoutes, parseTokens, parseUser } from './contracts.ts'
import { parseClaim, parseRun, validateRunAccess } from './runContracts.ts'
import type { RunAccess, RunAnswer, RunClaim } from './runContracts.ts'
import type { ApiConfig, AuthState, LoginInput, RegisterInput, Tokens } from './types.ts'

export const refreshStorageKey = 'jewelry-auth-refresh-v1'
type TokenStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
interface Dependencies { fetch?: typeof fetch; storage?: () => TokenStorage | undefined; origin?: string | (() => string | undefined) }
export function resolveApiBase(baseUrl: string, origin?: string): string {
  try {

    const relative = baseUrl.startsWith('/') && !baseUrl.startsWith('//')
    if (!relative && !/^https?:\/\//i.test(baseUrl)) throw new Error()
    if (baseUrl.includes('\\')) throw new Error()
    const base = relative ? new URL(baseUrl, origin) : new URL(baseUrl)
    if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash) throw new Error()
    return base.href.replace(/\/+$/, '') + '/'
  } catch { throw new ApiError('configuration', 'Сервис временно недоступен. Попробуйте позже.') }
}
export function readApiConfig(env: Record<string, unknown>): ApiConfig {
  return { enabled: env.VITE_API_ENABLED === 'true', baseUrl: typeof env.VITE_API_BASE_URL === 'string' ? env.VITE_API_BASE_URL.trim().replace(/\/+$/, '') : '' }
}
export function createApiClient(config: ApiConfig, dependencies: Dependencies = {}) {
  let access: string | null = null
  let epoch = 0
  let state: AuthState = { status: config.enabled ? 'anonymous' : 'disabled', user: null, message: '' }
  const listeners = new Set<() => void>()
  let rotation: { epoch: number; promise: Promise<Tokens> } | null = null
  let restoration: Promise<void> | null = null
  const claims = new Map<string, Promise<RunClaim>>()
  const storage = dependencies.storage ?? (() => { try { return globalThis.sessionStorage } catch { return undefined } })
  const transport: typeof fetch = dependencies.fetch ?? ((...args) => globalThis.fetch(...args))
  function emit(next: AuthState) { state = next; listeners.forEach(listener => listener()) }
  function ensureEnabled() { if (!config.enabled) throw new ApiError('disabled', disabledMessage) }
  function refreshToken() { try { return storage()?.getItem(refreshStorageKey) ?? null } catch { return null } }
  function storeRefresh(token: string) {
    try {
      const target = storage(); if (!target) throw new Error()
      target.setItem(refreshStorageKey, token)
    } catch { throw new ApiError('storage', 'Не удалось сохранить сеанс. Разрешите хранение данных для этого сайта и повторите вход.') }
  }
  function clear(message = '') {
    ++epoch; access = null
    try { storage()?.removeItem(refreshStorageKey) } catch {                                            }
    emit({ status: config.enabled ? 'anonymous' : 'disabled', user: null, message })
  }
  function active(version: number) { if (version !== epoch) throw new ApiError('cancelled', 'Действие отменено. Повторите вход при необходимости.') }
  function expired() { clear('Сеанс завершён. Войдите снова.'); return new ApiError('session', 'Сеанс завершён. Войдите снова.') }
  async function send(path: string, options: { body?: unknown; token?: string; runToken?: string; signal?: AbortSignal } = {}) {
    ensureEnabled()
    const origin = typeof dependencies.origin === 'function' ? dependencies.origin() : dependencies.origin ?? (typeof window === 'undefined' ? undefined : window.location.origin)
    const base = resolveApiBase(config.baseUrl, origin)
    const headers: Record<string, string> = { Accept: 'application/json' }
    if (options.body !== undefined) headers['Content-Type'] = 'application/json'
    if (options.token) headers.Authorization = 'Bearer ' + options.token
    if (options.runToken) headers['X-Run-Token'] = options.runToken
    let response: Response
    try {
      response = await transport(new URL(path, base).href, {
        method: options.body === undefined ? 'GET' : 'POST', headers,
        ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
        signal: options.signal, credentials: 'omit', cache: 'no-store', redirect: 'error',
      })
    } catch (error) {
      if (isAborted(error)) throw error
      throw new ApiError('network', 'Не удалось связаться с сервисом. Проверьте соединение и попробуйте ещё раз.')
    }
    if (response.status === 204) return { response, payload: null }
    if (!response.headers.get('content-type')?.toLowerCase().includes('application/json')) throw new ApiError('invalid_response', 'Сервис временно недоступен. Попробуйте позже.', response.status)
    let payload: unknown
    try { payload = await response.json() } catch { throw new ApiError('invalid_response', 'Сервис вернул неожиданный ответ. Попробуйте позже.', response.status) }
    return { response, payload }
  }
  function checked(result: Awaited<ReturnType<typeof send>>, login = false, auth = false) {
    if (result.response.ok) return result.payload
    const fields: ApiError['fields'] = {}
    if (result.payload && typeof result.payload === 'object' && !Array.isArray(result.payload)) {
      const body = result.payload as Record<string, unknown>
      for (const field of ['email', 'password', 'first_name'] as const) {
        const value = body[field]
        if (typeof value === 'string') fields[field] = [value]
        else if (Array.isArray(value)) fields[field] = value.filter((item): item is string => typeof item === 'string')
      }
    }
    const status = result.response.status
    const message = login && status === 401 ? 'Неверный email или пароль.' : status === 400 ? 'Проверьте заполненные поля.' : status === 404 ? auth ? 'Вход временно недоступен. Попробуйте позже.' : 'Маршрут не найден или больше недоступен.' : status === 403 ? 'Доступ временно ограничен. Попробуйте позже.' : 'Не удалось выполнить действие. Попробуйте ещё раз.'
    throw new ApiError('http', message, status, fields)
  }
  function rotate() {
    ensureEnabled()
    if (rotation?.epoch === epoch) return rotation.promise
    const version = epoch; const previous = refreshToken()
    if (!previous) return Promise.reject(expired())
    const promise = (async () => {
      try {
        const result = await send('auth/refresh/', { body: { refresh: previous } })
        if ([400, 401].includes(result.response.status)) { if (version === epoch) throw expired(); active(version) }
        const tokens = parseTokens(checked(result)); const pair = { ...tokens, refresh: tokens.refresh ?? previous }

        if (version === epoch) { storeRefresh(pair.refresh); access = pair.access }
        return pair
      } finally { if (rotation?.epoch === version) rotation = null }
    })()
    rotation = { epoch: version, promise }
    return promise
  }
  async function refreshedAccess() { const version = epoch; const pair = await rotate(); active(version); return pair.access }
  async function authorized(path: string, signal?: AbortSignal, extra: { body?: unknown; runToken?: string } = {}) {
    ensureEnabled()
    const version = epoch
    const initiallyRefreshed = !access
    let token = access ?? await refreshedAccess()
    active(version)
    let result = await send(path, { ...extra, token, signal })
    active(version)
    if (result.response.status === 401) {
      if (initiallyRefreshed && access === token) throw expired()
      token = access && access !== token ? access : await refreshedAccess()
      result = await send(path, { ...extra, token, signal })
      active(version)
      if (result.response.status === 401) throw expired()
    }
    return checked(result)
  }
  async function authenticate(path: string, input: LoginInput | RegisterInput, signal?: AbortSignal) {
    ensureEnabled()
    clear()
    const version = epoch
    const body = { email: input.email.trim(), password: input.password, ...('first_name' in input && input.first_name?.trim() ? { first_name: input.first_name.trim() } : {}) }
    const data = parseAuth(checked(await send(path, { body, signal }), path === 'auth/login/', true))
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
    active(version)
    storeRefresh(data.refresh); access = data.access
    emit({ status: 'authenticated', user: data.user, message: '' })
    return data.user
  }
  function restoreSession(): Promise<void> {
    if (!config.enabled || state.status === 'authenticated') return Promise.resolve()
    if (restoration) return restoration
    if (!refreshToken()) return Promise.resolve()
    const version = epoch
    emit({ status: 'restoring', user: null, message: '' })
    restoration = (async () => {
      try {
        const token = await refreshedAccess()
        const result = await send('me/', { token })
        active(version)

        if (result.response.status === 401) throw expired()
        emit({ status: 'authenticated', user: parseUser(checked(result)), message: '' })
      } catch (error) {
        if (version === epoch) emit({ status: 'anonymous', user: null, message: error instanceof ApiError ? error.message : 'Не удалось восстановить сеанс. Повторите вход.' })
      } finally { restoration = null }
    })()
    return restoration
  }
  return {
    enabled: config.enabled,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener) } },
    getSnapshot: () => state,
    login: (input: LoginInput, signal?: AbortSignal) => authenticate('auth/login/', { email: input.email, password: input.password }, signal),
    register: (input: RegisterInput, signal?: AbortSignal) => authenticate('auth/register/', input, signal),
    async refresh() { await refreshedAccess() },
    restoreSession,
    async createRun(scenario: string, signal?: AbortSignal) {
      ensureEnabled()
      if (!/^[a-z0-9-]+$/.test(scenario)) throw new ApiError('configuration', 'Сценарий недоступен.')
      return parseRun(state.status === 'authenticated' ? await authorized('runs/', signal, { body: { scenario } }) : checked(await send('runs/', { body: { scenario }, signal })))
    },
    async run(run: RunAccess, question?: string, signal?: AbortSignal) {
      ensureEnabled(); validateRunAccess(run)
      const path = 'runs/' + run.runId + '/' + (question ? '?question=' + encodeURIComponent(question) : '')
      return parseRun(run.anonToken ? checked(await send(path, { runToken: run.anonToken, signal })) : await authorized(path, signal))
    },
    async answerRun(run: RunAccess, answer: RunAnswer, signal?: AbortSignal) {
      ensureEnabled(); validateRunAccess(run)
      const path = 'runs/' + run.runId + '/answers/'
      const options = { body: answer, runToken: run.anonToken, signal }
      return parseRun(run.anonToken ? checked(await send(path, options)) : await authorized(path, signal, options))
    },
    async runRoute(run: RunAccess, signal?: AbortSignal) {
      ensureEnabled(); validateRunAccess(run)
      const path = 'runs/' + run.runId + '/route/'
      return parseRoute(run.anonToken ? checked(await send(path, { runToken: run.anonToken, signal })) : await authorized(path, signal))
    },
    async claimRun(run: RunAccess) {
      ensureEnabled(); validateRunAccess(run)
      const key = epoch + ':' + run.runId
      const pending = claims.get(key)
      if (pending) return pending
      const promise = (async () => {
        try {
          const result = parseClaim(await authorized('runs/' + run.runId + '/claim/', undefined, { body: {}, runToken: run.anonToken }))
          if (result.run_id !== run.runId || !result.is_saved) throw new ApiError('invalid_response', 'Не удалось подтвердить сохранение. Попробуйте ещё раз.')
          return result
        } finally { claims.delete(key) }
      })()
      claims.set(key, promise)
      return promise
    },
    async logout() {
      const previous = refreshToken(); const pending = rotation?.epoch === epoch ? rotation.promise : undefined
      clear()
      if (!config.enabled) return

      const pair = await pending?.catch(() => null)
      const token = pair?.refresh ?? previous
      if (token) checked(await send('auth/logout/', { body: { refresh: token } }))
    },
    async me(signal?: AbortSignal) { return parseUser(await authorized('me/', signal)) },
    async routes(page = 1, signal?: AbortSignal) {
      ensureEnabled()
      if (!Number.isSafeInteger(page) || page < 1) throw new ApiError('configuration', 'Недопустимый номер страницы.')

      return parseRoutes(await authorized('me/routes/?page=' + page, signal))
    },
    async route(id: string, signal?: AbortSignal) {
      ensureEnabled()
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) throw new ApiError('configuration', 'Маршрут не найден.')
      return parseRoute(await authorized('routes/' + id + '/', signal))
    },
  }
}
export type ApiClient = ReturnType<typeof createApiClient>
