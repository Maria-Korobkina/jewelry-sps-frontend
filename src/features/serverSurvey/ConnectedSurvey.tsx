import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/context'
import { readDraft } from '../business/draft'
import { readDesignDraft } from '../design/storage'
import { readSimilarDraft } from '../similar/storage'
import type { SurveyAnswers } from '../../api/resultContracts'
import type { SavedRoute } from '../../api/types'
import { applicableQuestions, cleanedAnswers, localOptions, localQuestion, scenarioPath, serverOptions, surveyQuestions, type Scenario } from './adapter'
import { isRunId, surveyController, type LoadedRun } from './controller'
import { ServerRouteView } from './ServerRouteView'
import { safeCatalogReturn } from '../suppliers/navigation'
import { RestartSurveyButton } from '../../components/RestartSurveyButton'
import styles from '../../pages/BusinessPage.module.css'

const titles: Record<Scenario,string> = {'open-business':'Открыть ювелирный бизнес','design-rights':'Оформить права на дизайн','similar-products':'Другой производитель предлагает похожие изделия'}
function legacyAnswers(s: Scenario): SurveyAnswers {
  const draft = s === 'open-business' ? readDraft() : s === 'design-rights' ? readDesignDraft() : readSimilarDraft()
  const answers = cleanedAnswers(s,draft.answers as SurveyAnswers)
  const complete = 'completed' in draft ? draft.completed : draft.view === 'result'
  if (complete) return answers
  const branch = applicableQuestions(s,answers), before = branch.slice(0,branch.indexOf(draft.question))
  return Object.fromEntries(Object.entries(answers).filter(([id]) => before.includes(id)))
}
export function ConnectedSurvey({scenario}: {scenario: Scenario}) {
  const {client,state,openAuth} = useAuth(), [params] = useSearchParams(), navigate = useNavigate()
  const requested = params.get('run'), runId = isRunId(requested) ? requested : undefined
  const controller = useMemo(() => surveyController(client,scenario,runId),[client,scenario,runId])
  const [loaded,setLoaded] = useState<LoadedRun | null>(null), [loading,setLoading] = useState(true)
  const loadedRef = useRef<LoadedRun | null>(null)
  const displayedController = useRef(controller)
  const [error,setError] = useState(''), [busy,setBusy] = useState(false), lock = useRef(false)
  const [questionId,setQuestionId] = useState(''), [values,setValues] = useState<string[]>([])
  const [editing,setEditing] = useState<SurveyAnswers | null>(null)
  const [confirmedEdit,setConfirmedEdit] = useState(false)
  const attemptedSave = useRef(false), heading = useRef<HTMLHeadingElement>(null)
  const questions = surveyQuestions(scenario)
  const legacy = useMemo(() => legacyAnswers(scenario),[scenario])
  const requestedEdit = params.get('edit') ?? (params.get('first') === '1' ? questions[0].id : null)
  const show = useCallback((next: LoadedRun | null) => {
    setLoaded(next)
    loadedRef.current = next
    if (next?.state.question) {
      const id = localQuestion(scenario,next.state.question.code)
      setQuestionId(id);setValues(controller.draft(id) ?? localOptions(scenario,id,next.state.question.selected))
    } else {setQuestionId('');setValues([])}
  },[controller,scenario])
  const beginEdit = useCallback((id: string, current: LoadedRun) => {
    if (!applicableQuestions(scenario,current.answers).includes(id)) return
    setConfirmedEdit(false)
    setEditing(structuredClone(current.answers));setQuestionId(id);setValues(current.answers[id] ?? []);setError('')
  },[scenario])
  useEffect(() => {
    let active = true
    if (state.status === 'restoring') return
    if (displayedController.current !== controller) {
      displayedController.current = controller
      loadedRef.current = null
      attemptedSave.current = false
      setError('');setEditing(null);setConfirmedEdit(false);setLoading(true)
    }


    if (controller.pendingSave && loadedRef.current?.route && state.user) return
    controller.load().then(next => {
      if (!active) return
      show(next);setLoading(false)
      if (requestedEdit && next?.route) beginEdit(requestedEdit,next)
    }).catch(e => {if (active) {setLoaded(null);setError(e.message);setLoading(false)}})
    return () => {active = false}

  },[controller,state.status,state.user,show,beginEdit,requestedEdit])
  const isEditing = editing !== null
  useEffect(() => {heading.current?.focus()},[questionId,loaded?.route?.id,isEditing])
  async function perform(work: () => Promise<void>) {
    if (lock.current) return
    lock.current = true;setBusy(true);setError('')
    try {await work()} catch(e) {setError(e instanceof Error ? e.message : 'Не удалось выполнить действие. Попробуйте ещё раз.')} finally {lock.current = false;setBusy(false)}
  }
  const save = useCallback(async (route: SavedRoute) => {
    const next = await controller.save(route)
    setLoaded(current => current ? {...current,route:next} : current)
  },[controller])
  useEffect(() => {
    if (!state.user || !controller.pendingSave || !loaded?.route || attemptedSave.current) return
    attemptedSave.current = true
    void perform(() => save(loaded.route!))
  },[state.user,controller,loaded?.route,save])
  async function start(migrate = false) {
    await perform(async () => {
      const migrating = !controller.runId
      let next = await controller.start()
      const answers = migrating && migrate ? legacy : {}
      if (Object.keys(answers).length) next = await controller.synchronize(answers)
      if (migrating && migrate && next?.state.question) {
        const prior = scenario === 'open-business' ? readDraft() : scenario === 'design-rights' ? readDesignDraft() : readSimilarDraft()
        const id = localQuestion(scenario,next.state.question.code), pending = (prior.answers as SurveyAnswers)[id]
        if (pending?.length) controller.setDraft(id,pending)
      }
      show(next)
    })
  }
  async function confirm() {
    if (!values.length) {setError('Выберите ответ.');return}
    const answers = cleanedAnswers(scenario,{...(editing ?? loaded?.answers ?? {}),[questionId]:values})
    if (editing) {
      const missing = applicableQuestions(scenario,answers).find(id => !answers[id]?.length)
      if (missing) {setEditing(answers);setQuestionId(missing);setValues([]);setError('');return}
    }
    await perform(async () => {
      if (editing) {


        setConfirmedEdit(true)
        for (const [id,values] of Object.entries(answers)) if (JSON.stringify(values) !== JSON.stringify(loaded?.answers[id])) controller.setDraft(id,values)
      }
      const next = await controller.synchronize(answers)
      setEditing(null);setConfirmedEdit(false);show(next)
      if (next?.route) navigate(scenarioPath(scenario) + '?run=' + next.state.id,{replace:true})
    })
  }
  function select(value: string) {
    const q = questions.find(q => q.id === questionId)
    const exclusive = scenario === 'open-business' && questionId === '4' ? ['both','jewelry'] : scenario === 'similar-products' && questionId === 'evidence' ? ['none'] : []
    const next = q?.kind === 'single' ? [value] : values.includes(value) ? values.filter(v => v !== value) : exclusive.includes(value) ? [value] : [...values.filter(v => !exclusive.includes(v)),value]
    setValues(next);setError('')
    if (!editing) {try {controller.setDraft(questionId,next)} catch {setError('Не удалось сохранить черновик. Не закрывайте страницу до отправки ответа.')}}
  }
  const current = questions.find(q => q.id === questionId)
  const returnTo = safeCatalogReturn(params.get('returnTo'))
  const serverQ = loaded?.state.question
  const mismatch = !!(!editing && serverQ && (!current || current.kind !== serverQ.kind || serverQ.options.length !== current.options.length || serverQ.options.some(o => !current.options.some(local => serverOptions(scenario,current.id,[local.id])[0] === o.code))))
  const answers = editing ?? loaded?.answers ?? {}, branch = applicableQuestions(scenario,answers)
  return <main id="main-content" className={styles.page}>
    <nav className={styles.breadcrumb} aria-label="Хлебные крошки"><Link to="/">Главная</Link> / {titles[scenario]}</nav>
    <h1 className={styles.title} ref={heading} tabIndex={-1}>{editing ? 'Изменить ответ' : titles[scenario]}</h1>
    {returnTo && <Link className={styles.catalogLink} to={returnTo}>← Вернуться к маршруту</Link>}
    {(loading || state.status === 'restoring' || (loaded && loaded.state.id !== controller.runId)) ? <p role="status">Загрузка опроса…</p> : <>
      {error && <p className={styles.error} role="alert">{error}</p>}
      {busy && <p role="status">Сохраняем изменения…</p>}
      {!loaded && <><p className={styles.intro}>Ответьте на вопросы, чтобы получить материалы для вашей ситуации. Если вы уже начали опрос, продолжите с сохранёнными ответами.</p><button className={styles.primary} disabled={busy} onClick={() => void start()}>Начать или продолжить опрос</button>{!controller.runId && Object.keys(legacy).length > 0 && <button className={styles.secondary} disabled={busy} onClick={() => void start(true)}>Продолжить прежний черновик</button>}{error && <RestartSurveyButton scenario={scenario} disabled={busy} />}</>}
      {mismatch ? <p role="alert" className={styles.note}>Вопросы обновляются. Продолжить этот опрос пока нельзя. Ваши ответы сохранены; попробуйте позже.</p> : (editing || loaded?.state.question) && current ? <form className={styles.survey} onSubmit={e => {e.preventDefault();void confirm()}}>
        <p className={styles.progress}>Вопрос {Math.max(0,branch.indexOf(current.id)) + 1}</p>
        <fieldset disabled={busy}><legend>{current.title}</legend><p className={styles.hint}>{current.kind === 'multi' ? 'Можно выбрать несколько вариантов' : 'Выберите один вариант'}</p><div className={styles.options}>{current.options.map(o => <label key={o.id} className={styles.option + (values.includes(o.id) ? ' ' + styles.selected : '')}><input type={current.kind === 'multi' ? 'checkbox' : 'radio'} name={'answer-' + current.id} value={o.id} checked={values.includes(o.id)} onChange={() => select(o.id)} /><span>{o.label}</span></label>)}</div></fieldset>
        {confirmedEdit && error && <p className={styles.note}>Изменение уже подтверждено. Часть ответов могла сохраниться. Повторите отправку, чтобы завершить обновление маршрута.</p>}
        <div className={styles.actions} style={{marginTop:32}}>{editing ? !confirmedEdit && <button type="button" className={styles.secondary} disabled={busy} onClick={() => {setEditing(null);show(loaded);setError('')}}>Отменить изменение</button> : branch.indexOf(questionId) > 0 && <button type="button" className={styles.secondary} disabled={busy} onClick={() => {const id = branch[branch.indexOf(questionId)-1];beginEdit(id,loaded!)}}>← Назад</button>}<button className={styles.primary} disabled={busy}>{confirmedEdit ? 'Повторить отправку' : editing ? 'Подтвердить ответ' : 'Продолжить'}</button></div>
      </form> : loaded?.route && <>
        {error && <button className={styles.secondary} disabled={busy} onClick={() => void perform(async () => show(await controller.load()))}>Обновить маршрут</button>}
        <div className={styles.resultActions}>{loaded.route.is_saved ? <p role="status">Сохранено в личном кабинете. <Link to={'/account/routes/' + loaded.route.id}>Открыть сохранённый маршрут</Link></p> : <button className={styles.primary} disabled={busy} onClick={e => {const trigger = e.currentTarget;void perform(async () => {controller.requestSave();attemptedSave.current = false;if (!state.user) openAuth(trigger);else {attemptedSave.current = true;await save(loaded.route!)}})}}>Сохранить в личный кабинет</button>}</div>
        <ServerRouteView route={loaded.route} answers={loaded.answers} edit={id => beginEdit(id,loaded)} restartDisabled={busy} />
      </>}
    </>}
    {loaded?.state.question && !editing && <RestartSurveyButton scenario={scenario} disabled={busy} />}
  </main>
}
