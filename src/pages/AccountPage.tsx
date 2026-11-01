import { useCallback, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../features/auth/context'
import { useRemoteResource } from '../features/auth/useRemoteResource'
import { ServerRouteView } from '../features/serverSurvey/ServerRouteView'
import { surveyController } from '../features/serverSurvey/controller'
import { newestRoutes, routeCreatedLabel } from '../features/auth/savedRoutes'
import type { Scenario } from '../features/serverSurvey/adapter'
import type { SurveyAnswers } from '../api/resultContracts'
import { disabledMessage, errorMessage } from '../api/errors'
import type { Page, SavedRoute, SavedRouteSummary } from '../api/types'
import styles from './AccountPage.module.css'

function dateLabel(date: string) { const value = new Date(date); return Number.isNaN(value.getTime()) ? 'Дата не указана' : value.toLocaleDateString('ru-RU') }

export function AccountPage() {
  const { client, state, openAuth } = useAuth()
  const { routeId } = useParams()
  const [params] = useSearchParams()
  const rawPage = Number(params.get('page') ?? 1)
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1
  const [logoutBusy, setLogoutBusy] = useState(false)
  const [notice, setNotice] = useState('')
  async function logout() {
    if (logoutBusy) return
    setLogoutBusy(true); setNotice('')
    try { await client.logout() } catch (error) { if (!client.getSnapshot().user) setNotice('Вы вышли на этом устройстве. ' + errorMessage(error)) } finally { setLogoutBusy(false) }
  }
  return <main id="main-content" className={styles.page}>
    <nav aria-label="Хлебные крошки" className={styles.breadcrumb}><Link to="/">Главная</Link> / <Link to="/account">Личный кабинет</Link>{routeId && ' / Сохранённый маршрут'}</nav>
    <h1>Личный кабинет</h1>
    {notice && <p role="status" className={styles.notice}>{notice}</p>}
    {!client.enabled ? <section className={styles.card}><h2>Вход временно недоступен</h2><p>{disabledMessage}</p><button className={styles.secondary} onClick={event => openAuth(event.currentTarget)}>Вход и регистрация</button></section>
      : state.status === 'restoring' ? <p role="status">Восстанавливаем сеанс…</p>
      : !state.user ? <section className={styles.card}><h2>Войдите в личный кабинет</h2>{state.message && <p role="alert">{state.message}</p>}<p>После входа здесь будут доступны ваши сохранённые маршруты.</p><button className={styles.primary} onClick={event => openAuth(event.currentTarget)}>Войти или зарегистрироваться</button>{state.message && <button className={styles.secondary} onClick={() => void client.restoreSession()}>Повторить восстановление сеанса</button>}</section>
      : <>
        <section className={styles.card} aria-label="Данные пользователя"><h2>{[state.user.first_name, state.user.last_name].filter(Boolean).join(' ') || 'Ваш аккаунт'}</h2><p>{state.user.email}</p><p className={styles.muted}>Дата регистрации: {dateLabel(state.user.date_joined)}</p><button className={styles.secondary} disabled={logoutBusy} onClick={() => void logout()}>{logoutBusy ? 'Выходим…' : 'Выйти'}</button></section>
        {routeId ? <RouteDetail key={state.user.id + ':' + routeId} id={routeId} /> : <RoutesList key={state.user.id + ':' + page} page={page} />}
      </>}
  </main>
}

function RoutesList({ page }: { page: number }) {
  const { client } = useAuth()
  const load = useCallback((signal: AbortSignal) => client.routes(page, signal), [client, page])
  const result = useRemoteResource(load)
  if (result.loading) return <p role="status">Загрузка сохранённых маршрутов…</p>
  if (result.error) return <section className={styles.card}><p role="alert">{result.error}</p><button className={styles.secondary} onClick={result.retry}>Повторить загрузку</button></section>
  return result.data && <SavedRoutesView data={result.data} page={page} />
}

export function SavedRoutesView({ data, page }: { data: Page<SavedRouteSummary>; page: number }) {
  return <section aria-labelledby="saved-routes-title"><h2 id="saved-routes-title">Сохранённые маршруты</h2>
    {!data.results.length ? <p>У вас пока нет сохранённых маршрутов.</p> : <div className={styles.grid}>{newestRoutes(data.results).map(route => <article className={styles.card} key={route.id}><h3>{route.scenario_title}</h3><p className={styles.muted}>{route.created_at && Number.isFinite(Date.parse(route.created_at)) ? <time dateTime={route.created_at}>{routeCreatedLabel(route.created_at)}</time> : routeCreatedLabel(route.created_at)}</p><p>{route.kind === 'design' ? 'Материалы и десять этапов' : route.kind === 'similar_products' ? 'Способы защиты прав' : 'Шагов: ' + route.steps_count}</p><Link className={styles.textLink} to={'/account/routes/' + encodeURIComponent(route.id)}>Открыть маршрут</Link></article>)}</div>}
    {(data.previous || data.next) && <nav aria-label="Страницы сохранённых маршрутов" className={styles.pagination}>{data.previous && page > 1 && <Link className={styles.secondary} to={'/account?page=' + (page - 1)}>← Назад</Link>}<span aria-current="page">Страница {page}</span>{data.next && <Link className={styles.secondary} to={'/account?page=' + (page + 1)}>Далее →</Link>}</nav>}
  </section>
}

function RouteDetail({ id }: { id: string }) {
  const { client } = useAuth()
  const load = useCallback(async (signal: AbortSignal) => {
    const route = await client.route(id,signal)

    let answers: SurveyAnswers | undefined
    let answerError = ''
    if (route.scenario === 'open-business') {
      try {answers = (await surveyController(client,route.scenario as Scenario,route.run_id).load())?.answers}
      catch {answerError = 'Не удалось загрузить ваши ответы. Сам сохранённый маршрут доступен ниже.'}
    }
    return {route,answers,answerError}
  }, [client, id])
  const result = useRemoteResource(load)
  return <section><Link className={styles.textLink} to="/account">← Все сохранённые маршруты</Link>
    {result.loading ? <p role="status">Загрузка маршрута…</p> : result.error ? <div className={styles.card}><p role="alert">{result.error}</p><button className={styles.secondary} onClick={result.retry}>Повторить загрузку</button></div> : result.data && <>{result.data.answerError && <p role="alert">{result.data.answerError}</p>}<SavedRouteView route={result.data.route} answers={result.data.answers} /></>}
  </section>
}

export function SavedRouteView({ route, answers }: { route: SavedRoute; answers?: SurveyAnswers }) {
  return <section aria-label="Сохранённый маршрут"><ServerRouteView route={route} answers={answers} /></section>
}
