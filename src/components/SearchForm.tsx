import { useLocation, useNavigate } from 'react-router-dom'
import { searchHref } from '../features/search/query'

export function SearchForm({ className, compact = false }: { className?: string; compact?: boolean }) {
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const query = params.get('q') ?? params.get('search') ?? ''
  return <form key={query} className={className} role="search" aria-label={compact ? 'Поиск по сайту' : 'Поиск материалов'} action="/search" method="get" onSubmit={event => {
    event.preventDefault()
    navigate(searchHref(String(new FormData(event.currentTarget).get('q') ?? '')))
  }}>
    {compact && <button type="submit" aria-label="Найти"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg></button>}
    <input name="q" type="search" aria-label={compact ? 'Поиск по сайту' : 'Запрос для поиска материалов'} defaultValue={query} placeholder="Найти документ, вопрос или термин" />
    {!compact && <button type="submit">Найти</button>}
  </form>
}
