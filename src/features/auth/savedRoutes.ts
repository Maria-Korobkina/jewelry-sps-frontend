import type { SavedRouteSummary } from '../../api/types.ts'

export function newestRoutes(routes: SavedRouteSummary[]): SavedRouteSummary[] {
  const timestamp = (route: SavedRouteSummary) => {const time = Date.parse(route.created_at);return Number.isFinite(time) ? time : -Infinity}
  return [...routes].sort((a,b) => timestamp(b) - timestamp(a))
}
export function routeCreatedLabel(value: string): string {
  const date = new Date(value)
  if (!value || Number.isNaN(date.getTime())) return 'Дата создания маршрута не указана'
  return 'Маршрут создан ' + new Intl.DateTimeFormat('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Moscow'}).format(date) + ' (МСК)'
}
