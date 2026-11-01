import { createContext, useContext } from 'react'
import type { ApiClient } from '../../api/client'
import type { AuthState } from '../../api/types'

export interface AuthContextValue { client: ApiClient; state: AuthState; openAuth: (trigger?: HTMLElement) => void; dialogOpen: boolean }
export const AuthContext = createContext<AuthContextValue | null>(null)
export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('AuthProvider is required')
  return value
}
