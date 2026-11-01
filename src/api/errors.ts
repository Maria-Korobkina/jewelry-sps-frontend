export type ErrorCode = 'disabled' | 'configuration' | 'network' | 'invalid_response' | 'http' | 'session' | 'cancelled' | 'storage'
export class ApiError extends Error {
  readonly code: ErrorCode
  readonly status?: number
  readonly fields: Partial<Record<'email' | 'password' | 'first_name', string[]>>
  constructor(code: ErrorCode, message: string, status?: number, fields: ApiError['fields'] = {}) {
    super(message); this.name = 'ApiError'; this.code = code; this.status = status; this.fields = fields
  }
}
export const disabledMessage = 'Вход и личный кабинет временно недоступны. Попробуйте позже.'
export function errorMessage(error: unknown) { return error instanceof ApiError ? error.message : 'Не удалось выполнить действие. Попробуйте ещё раз.' }
export function isAborted(error: unknown) { return error instanceof Error && error.name === 'AbortError' }
