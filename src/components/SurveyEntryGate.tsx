import { useContext, useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../features/auth/context'
import { surveyController } from '../features/serverSurvey/controller'
import type { Scenario } from '../features/serverSurvey/adapter'
import { accessibleSurveyEntry, localSurveyEntry, restartLocalSurvey, surveyEntrySelected, surveyRunHref } from '../features/serverSurvey/entry'
import { RestartSurveyButton } from './RestartSurveyButton'
import styles from '../pages/BusinessPage.module.css'
import entryStyles from './SurveyEntryGate.module.css'

const titles: Record<Scenario,string> = {'open-business':'Открыть ювелирный бизнес','design-rights':'Оформить права на дизайн','similar-products':'Другой производитель предлагает похожие изделия'}
type Entry = {started: boolean;completed: boolean;runId?: string}

export function SurveyEntryActions({scenario,entry,online}: {scenario: Scenario;entry: Entry;online: boolean}) {
  const previous = !online && entry.completed && scenario === 'design-rights' ? '/design/result' : surveyRunHref(scenario,entry.runId)
  return <div className={entryStyles.actions}>
    <div className={entryStyles.primaryActions}>
      {entry.started && <Link className={styles.primary} to={previous}>{entry.completed ? 'Открыть предыдущий маршрут' : 'Продолжить опрос'}</Link>}
      <RestartSurveyButton scenario={scenario} confirmDraft={entry.started && !entry.completed} label={entry.started ? entry.completed ? 'Пройти опрос заново' : 'Начать заново' : 'Начать опрос'} onLocalRestart={online ? undefined : () => restartLocalSurvey(scenario)} />
    </div>
    {scenario === 'design-rights' && <Link className={styles.secondary} to="/design/stages/1#design-stages">Посмотреть все этапы</Link>}
  </div>
}

export function SurveyEntryGate({scenario,children}: {scenario: Scenario;children: ReactNode}) {
  const auth = useContext(AuthContext), location = useLocation(), online = !!auth?.client.enabled
  const selected = surveyEntrySelected(location.pathname,location.search,online)


  const controller = online && auth ? surveyController(auth.client,scenario) : null
  const [retry,setRetry] = useState(0)
  const requestKey = location.key + ':' + controller?.runId + ':' + auth?.state.status + ':' + auth?.state.user?.id + ':' + retry
  const [snapshot,setSnapshot] = useState<{key: string;entry: Entry | null;error: string}>(() => ({key:requestKey,entry:online ? null : localSurveyEntry(scenario),error:''}))
  const entry = snapshot.key === requestKey ? snapshot.entry : null
  const error = snapshot.key === requestKey ? snapshot.error : ''
  useEffect(() => {
    if (selected || auth?.state.status === 'restoring') return
    let active = true
    Promise.resolve().then(async () => {
      if (!controller) return localSurveyEntry(scenario)
      return accessibleSurveyEntry(auth!.client,scenario)
    }).then(entry => {if (active) setSnapshot({key:requestKey,entry,error:''})})
      .catch(e => {if (active) setSnapshot({key:requestKey,entry:null,error:e instanceof Error ? e.message : 'Не удалось открыть предыдущее прохождение.'})})
    return () => {active = false}
  },[selected,controller,scenario,auth?.state.status,auth?.client,requestKey])
  if (selected) return children
  return <main id="main-content" className={styles.page}>
    <nav className={styles.breadcrumb} aria-label="Хлебные крошки"><Link to="/">Главная</Link> / <Link to={scenario === 'design-rights' ? '/design' : scenario === 'open-business' ? '/business' : '/similar-products'}>{titles[scenario]}</Link></nav>
    <h1 className={styles.title}>{titles[scenario]}</h1>
    <p className={styles.intro}>Ответьте на вопросы, чтобы получить материалы по вашей ситуации.</p>
    {entry ? <SurveyEntryActions scenario={scenario} entry={entry} online={online} /> : error ? <><p role="alert" className={styles.error}>{error}</p><div className={styles.actions}><button className={styles.secondary} onClick={() => setRetry(n => n + 1)}>Повторить загрузку</button><RestartSurveyButton scenario={scenario} /></div></> : <p role="status">Проверяем сохранённое прохождение…</p>}
  </main>
}
