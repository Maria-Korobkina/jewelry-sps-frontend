import { SurveyEntryGate } from '../components/SurveyEntryGate'
import { lazy, Suspense, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../features/auth/context'
const ConnectedSurvey = lazy(() => import('../features/serverSurvey/ConnectedSurvey').then(m => ({default:m.ConnectedSurvey})))
import { Link } from 'react-router-dom'
import { emptyDraft, readDraft, writeDraft } from '../features/business/draft'
import type { BusinessDraft } from '../features/business/draft'
import { changeAnswer, getBranch, getMissingQuestions, toggleBusinessAnswer } from '../features/business/rules'
import { beginEdit, cancelEdit, confirmEdit } from '../features/business/editing'
import type { BusinessEdit } from '../features/business/editing'
import { businessService } from '../features/business/service'
import { BusinessStepCard } from '../components/BusinessStepCard'
import { RestartSurveyButton } from '../components/RestartSurveyButton'
import { QuestionProgress } from '../components/QuestionProgress'
import type { BusinessQuestion, BusinessResult, QuestionId } from '../features/business/types'
import styles from './BusinessPage.module.css'

export function BusinessPage() {
  const auth = useContext(AuthContext)
  return <SurveyEntryGate scenario="open-business">{auth?.client.enabled ? <Suspense fallback={<p role="status">Загрузка…</p>}><ConnectedSurvey scenario="open-business" /></Suspense> : <LocalBusinessPage />}</SurveyEntryGate>
}
function LocalBusinessPage() {
  const [draft, setDraft] = useState(readDraft)
  const [editing, setEditing] = useState<BusinessEdit | null>(null)
  const [questions, setQuestions] = useState<BusinessQuestion[]>([])
  const [loadError, setLoadError] = useState('')
  const [retry, setRetry] = useState(0)
  const [result, setResult] = useState<BusinessResult | null>(null)
  const [resultError, setResultError] = useState('')
  const [validationError, setValidationError] = useState('')
  const [storageAvailable, setStorageAvailable] = useState(true)
  const heading = useRef<HTMLHeadingElement>(null)
  const error = useRef<HTMLParagraphElement>(null)
  const view = editing ? 'question' : draft.view
  const questionId = editing?.question ?? draft.question
  const answers = editing?.answers ?? draft.answers
  const selectedValues = editing?.values ?? answers[questionId] ?? []
  const branch = getBranch(answers)
  const current = questions.find(q => q.id === questionId)
  const currentIndex = branch.indexOf(questionId)

  useEffect(() => {
    let active = true
    businessService.getQuestions().then(data => {
      if (active) { setQuestions(data); setLoadError(data.length ? '' : 'Вопросы пока недоступны.') }
    }).catch(() => { if (active) setLoadError('Не удалось загрузить вопросы. Попробуйте ещё раз.') })
    return () => { active = false }
  }, [retry])

  useEffect(() => {
    if (draft.view !== 'result' || editing) return
    let active = true
    businessService.getResult(draft.answers).then(data => {
      if (active) setResult(data)
    }).catch(e => { if (active) setResultError(e instanceof Error ? e.message : 'Не удалось получить маршрут.') })
    return () => { active = false }
  }, [draft.view, draft.answers, retry, editing])

  useEffect(() => { heading.current?.focus() }, [view, questionId, questions.length])

  function commit(next: BusinessDraft) {
    setDraft(next)
    setEditing(null)
    setStorageAvailable(writeDraft(next))
    setValidationError('')
    setResult(null)
    setResultError('')
  }

  function openQuestion(id: QuestionId) { commit({ ...draft, view: 'question', question: id }) }
  function editQuestion(id: QuestionId) { setEditing(beginEdit(draft, id)); setValidationError('') }
  function cancelEditing() {
    if (!editing) return
    setDraft(cancelEdit(editing))
    setEditing(null)
    setValidationError('')
  }
  function restart() { commit({ ...emptyDraft, view: 'question' }) }
  function continueSurvey() {
    if (!current) return
    if (!selectedValues.length) {
      setValidationError(current.kind === 'multi' ? 'Выберите хотя бы один вариант.' : 'Выберите один вариант.')
      requestAnimationFrame(() => error.current?.focus())
      return
    }
    if (editing) {
      const confirmed = confirmEdit(editing)
      if (confirmed.view === 'result') commit(confirmed.draft)
      else { setEditing(confirmed.edit); setValidationError('') }
      return
    }
    const nextId = draft.resume ? getMissingQuestions(draft.answers)[0] : branch[currentIndex + 1]
    commit({ ...draft, view: nextId ? 'question' : 'result', question: nextId ?? draft.question,
      needsMaterialSelection: undefined, resume: nextId ? draft.resume : undefined })
  }

  function select(value: string) {
    if (!current) return
    const previous = selectedValues
    const values = current.kind === 'multi'
      ? toggleBusinessAnswer(previous, value, current.id)
      : [value]
    if (editing) { setEditing({ ...editing, values }); setValidationError('') }
    else commit({ ...draft, answers: changeAnswer(draft.answers, current.id, values) })
  }

  const title = view === 'result' ? 'Ваш маршрут' : editing ? 'Изменить ответ' : 'Открыть ювелирный бизнес'
  return (
    <main id="main-content" className={styles.page}>
      <nav aria-label="Хлебные крошки" className={styles.breadcrumb}><Link to="/">Главная</Link><span aria-hidden="true"> / </span>Открыть ювелирный бизнес</nav>
      <h1 ref={heading} tabIndex={-1} className={view === 'start' ? styles.startTitle : styles.title}>{title}</h1>
      {!storageAvailable && <p role="status" className={styles.note}>Не удалось сохранить ваши ответы. Продолжите опрос, не закрывая страницу.</p>}
      {loadError ? <div role="alert"><p>{loadError}</p><button className={styles.secondary} onClick={() => setRetry(n => n + 1)}>Повторить загрузку</button></div>
        : !questions.length ? <p role="status">Загрузка вопросов…</p>
        : view === 'start' ? <>
          <div className={styles.startGrid}>
            <div>
              <p className={styles.intro}>Ответьте на несколько вопросов и получите пошаговый маршрут: от регистрации бизнеса до первой законной продажи изделия</p>
              <button className={styles.primary} onClick={() => openQuestion('1')}>Составить мой маршрут</button>
              <p className={styles.hint}>Покажем только то, что относится к вашему бизнесу.</p>
              <p className={styles.hint}>Сохранение в личный кабинет пока недоступно</p>
              {Object.keys(draft.answers).length > 0 && <RestartSurveyButton scenario="open-business" onLocalRestart={restart} />}
            </div>
            <aside className={styles.startAside}><p>От идеи —<br />к первой<br />продаже.</p><span>Регистрация · материалы<br />производство · продажи</span></aside>
          </div>
          <section className={styles.startFooter}><h2>Маршрут под вашу ситуацию</h2><p>Вопросы зависят от ваших ответов. Вы можете возвращаться к предыдущим вопросам и менять выбранные варианты.</p></section>
        </> : view === 'question' && current ? <>
          <QuestionProgress className={styles.progress} number={currentIndex + 1} />
          {draft.needsMaterialSelection && <p role="status" className={styles.note}>Ранее было выбрано несколько вариантов материалов. Выберите один вариант, чтобы обновить маршрут. Остальные ответы сохранены.</p>}
          {draft.resume && !draft.needsMaterialSelection && <p role="status" className={styles.note}>Чтобы обновить маршрут, ответьте на оставшиеся вопросы. Остальные ответы сохранены.</p>}
          <form className={styles.survey} onSubmit={e => { e.preventDefault(); continueSurvey() }} noValidate>
            <fieldset aria-describedby={validationError ? 'business-choice-help business-error' : 'business-choice-help'} aria-invalid={!!validationError}>
              <legend>{current.title}</legend>
              <p id="business-choice-help" className={styles.hint}>{current.kind === 'multi' ? 'Выберите несколько вариантов' : 'Выберите один вариант'}</p>
              <div className={styles.options}>{current.options.map(option => {
                const checked = selectedValues.includes(option.id)
                return <label key={option.id} className={`${styles.option} ${checked ? styles.selected : ''}`}>
                  <input type={current.kind === 'multi' ? 'checkbox' : 'radio'} name={'business-' + current.id} value={option.id} checked={checked} onChange={() => select(option.id)} />
                  <span>{option.label}</span>
                </label>
              })}</div>
            </fieldset>
            {validationError && <p ref={error} tabIndex={-1} id="business-error" role="alert" className={styles.error}>{validationError}</p>}
            <div className={styles.surveyBottom}>
              <p className={styles.hint}>Сохранение в личный кабинет пока недоступно</p>
              <div className={styles.actions}>
                {editing ? <button type="button" className={styles.secondary} onClick={cancelEditing}>Отменить редактирование</button> : <button type="button" className={styles.secondary} onClick={() => currentIndex > 0 ? openQuestion(branch[currentIndex - 1]) : commit({ ...draft, view: 'start' })}>← Назад</button>}
                <button type="submit" className={styles.primary}>{editing ? 'Подтвердить ответ' : currentIndex === branch.length - 1 ? 'Посмотреть маршрут' : 'Продолжить →'}</button>
              </div>
            </div>
          </form>
          <RestartSurveyButton scenario="open-business" onLocalRestart={restart} />
        </> : view === 'result' ? <>
          {resultError ? <div><p role="alert" className={styles.error}>{resultError}</p><button className={styles.secondary} onClick={() => { setResultError(''); setRetry(n => n + 1) }}>Повторить получение маршрута</button></div> : !result ? <p role="status">Формирование маршрута…</p> : <>
            <p className={styles.intro}>{result.kind === 'calculated' ? 'Пошаговый маршрут для открытия вашего ювелирного бизнеса' : 'Для выбранных ответов маршрут пока недоступен. Вы можете изменить ответы или вернуться позже.'}</p>
            {result.issues.map(issue => <p className={styles.note} key={issue}>{issue}</p>)}
          </>}
          <p className={styles.hint}>Сохранение в личный кабинет пока недоступно</p>
          <div className={styles.resultActions}><a className={styles.secondary} href="#business-answers">Изменить ответы</a><RestartSurveyButton scenario="open-business" onLocalRestart={restart} /></div>
          {result?.steps.map(step => <BusinessStepCard key={step.id} step={step} answers={draft.answers} />)}
          <section id="business-answers" className={styles.answers}><h2>Ваши ответы</h2>{branch.filter(id => draft.answers[id]?.length).map(id => {
            const q = questions.find(item => item.id === id)!
            return <div key={id}><h3 id={'business-answer-question-' + id}>{q.title}</h3><p>{q.options.filter(option => draft.answers[id]?.includes(option.id)).map(option => option.label).join('; ')}</p><button className={styles.secondary} aria-describedby={'business-answer-question-' + id} onClick={() => editQuestion(id)}>Изменить ответ</button></div>
          })}</section>
        </> : null}
    </main>
  )
}
