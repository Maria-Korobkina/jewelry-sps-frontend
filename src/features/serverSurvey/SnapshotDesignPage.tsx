import { useCallback, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/context'
import { useRemoteResource } from '../auth/useRemoteResource'
import { surveyController, isRunId } from './controller'
import { SnapshotContext, ResultLink, resultHref, snapshotQuery } from './links'
import type { DesignSnapshot, DesignSnapshotStage } from '../../api/resultContracts'
import type { SavedRoute } from '../../api/types'
import { DesignLayout } from '../../components/DesignLayout'
import { checklistStatuses, type StageChecklist } from '../design/storage'
import { ApiError } from '../../api/errors'
import styles from '../../pages/DesignPage.module.css'

export function SnapshotDesignPage({checklist = false}: {checklist?: boolean}) {
  const {client,state,openAuth} = useAuth(), [params] = useSearchParams(), {stageId} = useParams()
  const saved = params.get('savedRoute'), run = params.get('run'), id = Number(checklist ? params.get('stage') : stageId)
  const load = useCallback(async () => {
    if (!client.enabled) throw new Error('Сохранённый маршрут временно недоступен.')
    if (saved && !state.user && state.status !== 'restoring') throw new ApiError('session','Войдите, чтобы открыть сохранённый маршрут.')
    const route = isRunId(saved) ? await client.route(saved) : isRunId(run) ? (await surveyController(client,'design-rights',run).load())?.route : null
    if (!route || route.kind !== 'design' || route.result?.kind !== 'design') throw new Error('Не удалось открыть материалы этого прохождения.')
    return route
  },[client,saved,run,state.status,state.user])
  const resource = useRemoteResource(load)
  if (saved && !state.user) return <DesignLayout title="Сохранённый маршрут"><p>Войдите, чтобы открыть сохранённый маршрут.</p><button onClick={e => openAuth(e.currentTarget)}>Войти</button></DesignLayout>
  if (resource.loading) return <DesignLayout title="Этап"><p role="status">Загрузка материалов…</p></DesignLayout>
  if (resource.error || !resource.data) return <DesignLayout title="Этап"><p role="alert">{resource.error}</p><button onClick={resource.retry}>Повторить</button></DesignLayout>
  const route = resource.data, result = route.result as DesignSnapshot, stage = result.stages.find(s => s.id === id)
  if (checklist) return <SnapshotChecklist key={route.id + ':' + id} route={route} stages={id ? stage ? [stage] : [] : result.stages} />
  return <SnapshotStageView route={route} id={id} />
}
export function SnapshotStageView({route,id}: {route: SavedRoute;id: number}) {
  const result = route.result as DesignSnapshot, stage = result.stages.find(s => s.id === id)
  return <SnapshotContext value={{route,stage:id}}><DesignLayout title={stage?.title ?? 'Этап не найден'}>
    <Link className={styles.textLink} to={resultHref(route)}>← Вернуться к маршруту</Link><h1 className={styles.title}>Путь от дизайна до продажи</h1>
    <nav id="design-stages" className={styles.stages} aria-label="Все этапы">{result.stages.map(s => <Link key={s.id} className={s.id === id ? styles.activeStage : undefined} aria-current={s.id === id ? 'step' : undefined} to={'/design/stages/' + s.id + '?' + snapshotQuery(route) + '#stage-content'}>{s.id}. {s.title}</Link>)}</nav>
    {!stage ? <p>Этап не найден.</p> : <section className={styles.stageContent}>
      <h2 id="stage-content">{stage.id}. {stage.title}</h2><p className={styles.stageAction}>{stage.action}</p>{stage.paragraphs.map((p,i) => <p key={i}>{p}</p>)}
      <div className={styles.links}>{stage.links.map((l,i) => <ResultLink to={l.href} key={i}>{l.label ?? l.title}</ResultLink>)}</div>
      {stage.downloads.map((d,i) => <aside className={styles.note} key={i}><h3>{d.title}</h3>{d.description && <p>{d.description}</p>}<a href={d.href} download>Скачать Word</a></aside>)}
      <section className={styles.callout}><h3>Задачи и ожидаемый итог</h3><p>{stage.goal}</p><ul>{stage.tasks.map((t,i) => <li key={i}>{t}</li>)}</ul><h3>Этап можно считать подготовленным, когда:</h3><ul>{stage.criteria.map((t,i) => <li key={i}>{t}</li>)}</ul></section>
      <div className={styles.actions}>{id > 1 && <ResultLink className={styles.secondary} to={'/design/stages/' + (id-1) + '#stage-content'}>← Назад</ResultLink>}<ResultLink className={styles.secondary} to={'/design/checklist?stage=' + id}>Чек-лист этапа</ResultLink><ResultLink className={styles.primary} to={id < 10 ? '/design/stages/' + (id+1) + '#stage-content' : '/design/checklist'}>{id < 10 ? 'Следующий этап →' : 'Итоговый чек-лист'}</ResultLink></div>
    </section>}
  </DesignLayout></SnapshotContext>
}
export function SnapshotChecklist({route,stages}: {route: SavedRoute;stages: DesignSnapshotStage[]}) {
  const key = 'jewelry-server-checklist:' + route.id
  const [draft,setDraft] = useState<Record<number,StageChecklist>>(() => {try {const a = JSON.parse(sessionStorage.getItem(key) ?? '{}');return a && typeof a === 'object' && !Array.isArray(a) ? a : {}} catch {return {}}})
  const [error,setError] = useState('')
  function update(id: number,value: StageChecklist) {const next = {...draft,[id]:value};setDraft(next);try {sessionStorage.setItem(key,JSON.stringify(next))} catch {setError('Не удалось сохранить отметки в этой вкладке.')}}
  return <SnapshotContext value={{route}}><DesignLayout title="Чек-лист"><h1 className={styles.title}>{stages.length === 1 ? 'Чек-лист этапа ' + stages[0].id : 'Итоговый чек-лист'}</h1><Link to={resultHref(route)}>← Вернуться к маршруту</Link><p className={styles.note}>Отметки отражают вашу самостоятельную проверку. Они не означают юридическую проверку, получение патента или выполнение действий государственным органом. Черновик сохраняется в текущем браузере до закрытия вкладки.</p>{error && <p role="alert">{error}</p>}
    <div className={styles.actions}><a className={styles.primary} download href="/documents/design/checklist-all.docx">Скачать полный чек-лист Word</a>{stages.length === 1 && <><a className={styles.secondary} download href={'/documents/design/checklist-' + stages[0].id + '.docx'}>Скачать чек-лист этапа Word</a><ResultLink className={styles.secondary} to="/design/checklist">Все чек-листы</ResultLink></>}</div>
    {stages.map(s => {
      const raw = draft[s.id], current: StageChecklist = {checked:Array.isArray(raw?.checked) ? raw.checked : [],status:checklistStatuses.includes(raw?.status) ? raw.status : 'Не начат'}
      const toggle = (id: string) => update(s.id,{...current,checked:current.checked.includes(id) ? current.checked.filter(v => v !== id) : [...current.checked,id]})
      return <section key={s.id} className={styles.card}><h2>{s.id}. {s.title}</h2><p><strong>Цель этапа: </strong>{s.goal}</p>
        <fieldset className={styles.checks}><legend>Пункты проверки</legend>{s.tasks.map((t,i) => <label key={i}><input type="checkbox" checked={current.checked.includes('task-' + i)} onChange={() => toggle('task-' + i)} />{t}</label>)}</fieldset>
        <fieldset className={styles.checks}><legend>Этап можно считать подготовленным, когда:</legend>{s.criteria.map((t,i) => <label key={i}><input type="checkbox" checked={current.checked.includes('criterion-' + i)} onChange={() => toggle('criterion-' + i)} />{t}</label>)}</fieldset>
        <fieldset className={styles.statuses}><legend>Статус этапа</legend>{checklistStatuses.map(status => <label key={status}><input type="radio" name={'snapshot-status-' + s.id} checked={current.status === status} onChange={() => update(s.id,{...current,status})}/>{status}</label>)}</fieldset>
        <ResultLink to={'/design/stages/' + s.id + '#stage-content'}>Вернуться к этапу {s.id}</ResultLink>
      </section>
    })}</DesignLayout></SnapshotContext>
}
