import { validateRunAccess } from './runContracts.ts'
import type { RunAccess, RunState } from './runContracts.ts'


export const guestRunStorageKey = 'jewelry-guest-runs-v1'
type Store = Pick<Storage, 'getItem' | 'setItem'>
export function guestRunStore(storage: Store) {
  function records(): Record<string, { scenario: string; anonToken: string }> {
    try {
      const value = JSON.parse(storage.getItem(guestRunStorageKey) ?? '{}')
      if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
      const result: Record<string, { scenario: string; anonToken: string }> = {}
      for (const [id, entry] of Object.entries(value)) {
        if (!entry || typeof entry !== 'object') continue
        const v = entry as Record<string, unknown>
        if (typeof v.scenario !== 'string' || typeof v.anonToken !== 'string') continue
        try { validateRunAccess({ runId: id, anonToken: v.anonToken }); result[id] = { scenario: v.scenario, anonToken: v.anonToken } } catch {                                    }
      }
      return result
    } catch { return {} }
  }
  return {
    remember(run: RunState) {
      if (!run.anon_token) return
      validateRunAccess({ runId: run.id, anonToken: run.anon_token })
      storage.setItem(guestRunStorageKey, JSON.stringify({ ...records(), [run.id]: { scenario: run.scenario, anonToken: run.anon_token } }))
    },
    access(runId: string, scenario: string): RunAccess | null {
      const entry = records()[runId]
      return entry?.scenario === scenario ? { runId, anonToken: entry.anonToken } : null
    },
    forget(runId: string) { const all = records(); delete all[runId]; storage.setItem(guestRunStorageKey, JSON.stringify(all)) },
  }
}
