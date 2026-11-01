import { ApiError } from './errors.ts'
import type { ApiClient } from './client.ts'
import type { RunAccess } from './runContracts.ts'
import type { Page, SavedRoute, SavedRouteSummary } from './types.ts'


export function createServerRunSaver(client: ApiClient, forgetGuest?: (runId: string) => void) {
  type Saved = { route: SavedRoute; routes: Page<SavedRouteSummary> }
  const pending = new Map<string, { signature: string; promise: Promise<Saved> }>()
  const receipts = new Map<string, string>()
  function signature(route: SavedRoute): string {
    const canonical = (value: unknown): unknown => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => [k,canonical(v)])) : value
    return JSON.stringify({ run_id: route.run_id, scenario: route.scenario, scenario_title: route.scenario_title, schema_version: route.schema_version, kind: route.kind ?? 'steps', result: canonical(route.result ?? null),
      steps: route.steps.map(step => ({ number: step.number, title: step.title, body: step.body, links: step.links.map(link => ({ label: link.label, kind: link.kind, target: link.target })) })) })
  }
  function changed() { return new ApiError('configuration', 'Маршрут изменился. Откройте обновлённый результат перед сохранением.') }
  return {
    save(run: RunAccess, displayed: SavedRoute): Promise<Saved> {
      const user = client.getSnapshot().user
      if (!client.enabled || !user) return Promise.reject(new ApiError('session', 'Для сохранения войдите в личный кабинет.'))
      if (!displayed || displayed.run_id !== run.runId || !Array.isArray(displayed.steps)) return Promise.reject(changed())
      const expected = signature(displayed)
      const key = user.id + ':' + run.runId
      const previous = pending.get(key)
      if (previous) return previous.signature === expected ? previous.promise : Promise.reject(changed())
      const promise = (async () => {
        try {
          let routeId = receipts.get(key)
          if (!routeId) {
            const generated = await client.runRoute(run)
            if (generated.run_id !== run.runId || signature(generated) !== expected) throw changed()
            const claimed = generated.is_saved ? {status:'completed',route_id:generated.id,is_saved:true} : await client.claimRun(run)

            if (claimed.status !== 'completed' || !claimed.route_id || !claimed.is_saved) throw new ApiError('invalid_response', 'Завершите опрос перед сохранением маршрута.')
            routeId = claimed.route_id
            receipts.set(key, routeId)
            forgetGuest?.(run.runId)
          }

          const route = await client.route(routeId)
          if (!route.is_saved || route.run_id !== run.runId || client.getSnapshot().user?.id !== user.id) throw new ApiError('invalid_response', 'Не удалось подтвердить сохранение маршрута.')
          if (signature(route) !== expected) throw changed()
          const routes = await client.routes()
          return { route, routes }
        } finally { pending.delete(key) }
      })()
      pending.set(key, { signature: expected, promise })
      return promise
    },
  }
}
