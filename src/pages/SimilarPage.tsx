import { SurveyEntryGate } from '../components/SurveyEntryGate'
import { lazy, Suspense, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../features/auth/context'
const ConnectedSurvey = lazy(() => import('../features/serverSurvey/ConnectedSurvey').then(m => ({default:m.ConnectedSurvey})))
import { Link, useLocation } from 'react-router-dom'
import { SimilarQuestionForm } from '../components/SimilarQuestionForm'
import { QuestionProgress } from '../components/QuestionProgress'
import { SimilarResultView } from '../components/SimilarResultView'
import { RestartSurveyButton } from '../components/RestartSurveyButton'
import { similarIntro, similarHint } from '../features/similar/content'
import { similarService } from '../features/similar/service'
import { changeSimilarAnswer, getSimilarBranch, toggleEvidence } from '../features/similar/rules'
import { beginSimilarEdit, confirmSimilarEdit } from '../features/similar/editing'
import { enterSimilarSurvey } from '../features/similar/entry'
import type { SimilarEdit } from '../features/similar/editing'
import { emptySimilarDraft, readSimilarDraft, writeSimilarDraft } from '../features/similar/storage'
import type { SimilarDraft } from '../features/similar/storage'
import type { SimilarQuestion, SimilarQuestionId, SimilarResult } from '../features/similar/types'
import styles from './SimilarPage.module.css'

export function SimilarPage() {
  const auth = useContext(AuthContext)
  return <SurveyEntryGate scenario="similar-products">{auth?.client.enabled ? <Suspense fallback={<p role="status">Загрузка…</p>}><ConnectedSurvey scenario="similar-products" /></Suspense> : <LocalSimilarPage />}</SurveyEntryGate>
}
function LocalSimilarPage() {
  const location = useLocation()
  const firstQuestion = location.pathname === '/similar-products/survey' && new URLSearchParams(location.search).get('first') === '1'
  const [entry] = useState(() => enterSimilarSurvey(readSimilarDraft(), firstQuestion))
  const [draft, setDraft] = useState(entry.draft)

  const [editing, setEditing] = useState<SimilarEdit | null>(entry.editing)
  const [questions, setQuestions] = useState<SimilarQuestion[]>([])
  const [result, setResult] = useState<SimilarResult | null>(null)
  const [loadError, setLoadError] = useState('')
  const [resultError, setResultError] = useState('')
  const [validation, setValidation] = useState('')
  const [saved, setSaved] = useState(true)
  const [retry, setRetry] = useState(0)
  const heading = useRef<HTMLHeadingElement>(null)
  const view = editing ? 'question' : draft.view
  const id = editing?.question ?? draft.question
  const answers = editing?.answers ?? draft.answers
  const values = editing?.values ?? answers[id] ?? []
  const branch = getSimilarBranch(answers)
  const current = questions.find(question => question.id === id)
  useEffect(() => {
    let active = true
    similarService.getQuestions().then(data => { if (active) { setQuestions(data); setLoadError(data.length ? '' : 'Вопросы пока недоступны.') } }).catch(() => { if (active) setLoadError('Не удалось загрузить вопросы. Попробуйте ещё раз.') })
    return () => { active = false }
  }, [retry])
  useEffect(() => {
    if (draft.view !== 'result' || editing) return
    let active = true
    similarService.getResult(draft.answers).then(data => { if (active) setResult(data) }).catch(() => { if (active) setResultError('Не удалось получить маршрут. Попробуйте ещё раз.') })
    return () => { active = false }
  }, [draft.view, draft.answers, editing, retry])
  useEffect(() => { heading.current?.focus(); window.scrollTo(0, 0) }, [view, id, questions.length])
  function commit(next: SimilarDraft) { setDraft(next); setSaved(writeSimilarDraft(next)); setValidation(''); setResult(null); setResultError('') }
  function restart() { setEditing(null); commit({ ...structuredClone(emptySimilarDraft), view: 'question' }) }
  function select(value: string) {
    if (!current) return
    const next = current.kind === 'single' ? [value] : id === 'evidence' ? toggleEvidence(values, value) : values.includes(value) ? values.filter(item => item !== value) : [...values, value]
    if (editing) setEditing({ ...editing, values: next })
    else commit({ ...draft, answers: changeSimilarAnswer(draft.answers, id, next) })
    setValidation('')
  }
  function next() {
    if (!values.length) { setValidation(current?.kind === 'multi' ? 'Выберите хотя бы один вариант.' : 'Выберите один вариант.'); return }
    if (editing) {
      const confirmed = confirmSimilarEdit(editing)
      if ('edit' in confirmed) setEditing(confirmed.edit)
      else { setEditing(null); commit(confirmed.draft) }
    } else {
      const nextId = branch[branch.indexOf(id) + 1]
      commit({ ...draft, view: nextId ? 'question' : 'result', question: nextId ?? id })
    }
    setValidation('')
  }
  function back() {
    if (editing) { setDraft(editing.original); setEditing(null); setValidation(''); return }
    const index = branch.indexOf(id)
    commit({ ...draft, view: index ? 'question' : 'start', question: index ? branch[index - 1] : 'objects' })
  }
  function edit(id: SimilarQuestionId) { setEditing(beginSimilarEdit(draft, id)); setValidation('') }
  return <main id="main-content" className={styles.page}>
    {new URLSearchParams(location.search).get('from') === 'business' && <Link className={styles.secondary} to="/business">Вернуться к бизнес-маршруту</Link>}
    <nav className={styles.breadcrumb} aria-label="Хлебные крошки"><Link to="/">Главная</Link><span aria-hidden="true"> / </span><span>Другой производитель предлагает похожие изделия</span></nav>
    <h1 ref={heading} tabIndex={-1} className={styles.title}>{view === 'result' ? 'Ваш маршрут' : editing ? 'Изменить ответ' : 'Другой производитель предлагает похожие изделия'}</h1>
    {!saved && <p role="status" className={styles.note}>Не удалось сохранить ответы. Продолжите опрос, не закрывая страницу.</p>}
    {loadError ? <><p role="alert" className={styles.error}>{loadError}</p><button className={styles.secondary} onClick={() => setRetry(n => n + 1)}>Повторить загрузку</button></> : !questions.length ? <p role="status">Загрузка вопросов…</p> : view === 'start' ? <>
      <p className={styles.intro}>{similarIntro}</p><button className={styles.primary} onClick={() => commit({ ...draft, view: 'question', question: 'objects' })}>Составить мой маршрут</button><p className={styles.hint}>{similarHint}</p>
    </> : view === 'question' && current ? <>
      <QuestionProgress className={styles.hint} number={branch.indexOf(id) + 1} />
      <SimilarQuestionForm question={current} values={values} error={validation} editing={!!editing} last={branch.at(-1) === id} select={select} next={next} back={back} />
    </> : <>
      <div className={styles.actions}><a className={styles.secondary} href="#similar-answers">Изменить ответы</a><RestartSurveyButton scenario="similar-products" onLocalRestart={restart} /></div>
      {resultError ? <><p role="alert" className={styles.error}>{resultError}</p><button className={styles.secondary} onClick={() => { setResultError(''); setRetry(n => n + 1) }}>Повторить получение маршрута</button></> : !result ? <p role="status">Формирование маршрута…</p> : <SimilarResultView result={result} questions={questions} answers={draft.answers} edit={edit} />}
    </>}
    <p className={styles.hint}>Сохранение в личный кабинет пока недоступно</p>
    {view === 'question' && !editing && <RestartSurveyButton scenario="similar-products" onLocalRestart={restart} />}
  </main>
}
