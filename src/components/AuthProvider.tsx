import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { apiClient } from '../api/index'
import type { ApiClient } from '../api/client'
import { AuthContext } from '../features/auth/context'
import { AuthDialog } from './AuthDialog'

export function AuthProvider({ children, client = apiClient }: { children: ReactNode; client?: ApiClient }) {
  const state = useSyncExternalStore(client.subscribe, client.getSnapshot, client.getSnapshot)
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLElement | null>(null)
  useEffect(() => { if (client.enabled) void client.restoreSession() }, [client])
  function openAuth(element?: HTMLElement) { trigger.current = element ?? document.activeElement as HTMLElement | null; setOpen(true) }
  return <AuthContext value={{ client, state, openAuth, dialogOpen: open }}>
    {children}
    {open && <AuthDialog onClose={() => setOpen(false)} triggerRef={trigger} />}
  </AuthContext>
}
