import { SurveyEntryGate } from '../components/SurveyEntryGate'
import { lazy, Suspense, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../features/auth/context'
const ConnectedSurvey = lazy(() => import('../features/serverSurvey/ConnectedSurvey').then(m => ({default:m.ConnectedSurvey})))
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DesignLayout } from '../components/DesignLayout'
import { RestartSurveyButton } from '../components/RestartSurveyButton'
import { QuestionProgress } from '../components/QuestionProgress'
import { designQuestions, designStages } from '../features/design/content'
import { changeDesignAnswer, getDesignBranch, isDesignAnswered, missingDesignQuestions, recommendDesign, toggleSalesAnswer } from '../features/design/rules'
import { freshDesignDraft, readDesignDraft, writeDesignDraft } from '../features/design/storage'
import type { DesignDraft } from '../features/design/storage'
import { beginDesignEdit, confirmDesignEdit } from '../features/design/editing'
import type { DesignEdit } from '../features/design/editing'
import type { DesignQuestionId } from '../features/design/types'
import { knowledgeLinks } from '../features/knowledge/links'
import { catalogHref } from '../features/suppliers/navigation'
import styles from './DesignPage.module.css'


const statusLabels: Record<string, string> = { ready: 'Готово', 'not-ready': 'Не готово', unknown: 'Не знаю' }
export function DesignSurveyPage() {
  const auth = useContext(AuthContext)
  return <SurveyEntryGate scenario="design-rights">{auth?.client.enabled ? <Suspense fallback={<p role="status">Загрузка…</p>}><ConnectedSurvey scenario="design-rights" /></Suspense> : <LocalDesignSurveyPage />}</SurveyEntryGate>
}
function LocalDesignSurveyPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [draft, setDraft] = useState(() => {
    const saved = readDesignDraft()
    return new URLSearchParams(location.search).get('first') === '1' ? { ...saved, question: 'rights' as const } : saved
  })
  const [edit, setEdit] = useState<DesignEdit | null>(() => {
    const params = new URLSearchParams(location.search)
    const requested = (params.get('first') === '1' ? 'rights' : params.get('edit')) as DesignQuestionId | null
    return requested && draft.completed && getDesignBranch(draft.answers).includes(requested) ? beginDesignEdit(draft, requested) : null
  })
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(true)
  const heading = useRef<HTMLHeadingElement>(null)
  const resultView = location.pathname === '/design/result'
  const answers = edit?.answers ?? draft.answers
  const id = edit?.question ?? draft.question
  const branch = getDesignBranch(answers)
  const question = designQuestions.find(item => item.id === id)!
  const values = edit?.values ?? answers[id] ?? []
  useEffect(() => { heading.current?.focus(); window.scrollTo(0, 0) }, [resultView, id])
  function commit(next: DesignDraft) { setDraft(next); setSaved(writeDesignDraft(next)); setError('') }
  function select(next: string[]) {
    if (edit) setEdit({ ...edit, values: next })
    else commit({ ...draft, answers: changeDesignAnswer(draft.answers, id, next), completed: false })
    setError('')
  }
  function next() {
    if (!isDesignAnswered({ ...answers, [id]: values }, id)) { setError(question.kind === 'matrix' ? 'Выберите статус для каждой строки.' : question.kind === 'multi' ? 'Выберите хотя бы один вариант.' : 'Выберите один вариант.'); return }
    if (edit) {
      const confirmed = confirmDesignEdit(edit)
      if ('edit' in confirmed) setEdit(confirmed.edit)
      else { commit(confirmed.draft); setEdit(null); navigate('/design/result') }
    } else {
      const nextId = branch[branch.indexOf(id) + 1]
      commit({ ...draft, question: nextId ?? id, completed: !nextId })
      if (!nextId) navigate('/design/result')
    }
    setError('')
  }
  function startEdit(questionId: DesignQuestionId) { setEdit(beginDesignEdit(draft, questionId)); setError(''); navigate('/design/survey?edit=' + questionId) }
  function cancel() { if (edit) { setDraft(edit.original); setEdit(null); setError(''); navigate('/design/result') } }
  function restart() { setEdit(null); commit(freshDesignDraft()) }
  const result = resultView && draft.completed && !missingDesignQuestions(draft.answers).length ? recommendDesign(draft.answers) : null
  return <DesignLayout title={resultView ? 'Материалы по вашим ответам' : 'Опрос'}>
    {new URLSearchParams(location.search).get('from') === 'business' && <Link className={styles.textLink} to="/business">Вернуться к бизнес-маршруту</Link>}
    <h1 ref={heading} tabIndex={-1} className={styles.title}>{resultView ? 'Материалы по вашим ответам' : edit ? 'Изменить ответ' : 'Подобрать материалы'}</h1>
    {!saved && <p role="status" className={styles.error}>Не удалось сохранить ответы. Продолжите опрос, не закрывая страницу.</p>}
    {resultView ? result ? <>
      {result.items.map(item => <article key={item.questionId} className={styles.card}><h2>{item.title}</h2><div className={styles.links}>{knowledgeLinks(item.articles, 'design').map(link => <Link key={link.href} to={link.href}>{link.title}</Link>)}{item.stages.map(id => <Link key={id} to={'/design/stages/' + id + '#stage-content'}>{designStages.find(stage => stage.id === id)!.title}</Link>)}{item.suppliers && <Link to={catalogHref('/design/result')}>Каталог поставщиков</Link>}{!item.articles.length && !item.stages.length && <p>{designQuestions.find(q => q.id === item.questionId)!.options.find(o => o.id === draft.answers[item.questionId]?.[0])?.label}</p>}</div></article>)}
      <section className={styles.answers}><h2>Ваши ответы</h2>{getDesignBranch(draft.answers).map(questionId => {
        const q = designQuestions.find(item => item.id === questionId)!
        const selected = draft.answers[questionId] ?? []
        return <div key={questionId}><h3 id={'design-answer-' + questionId}>{q.kind === 'matrix' ? 'Готовность этапов' : questionId.startsWith('2') ? 'Уточнение задачи' : q.title}</h3>
          {q.kind === 'matrix' ? <ul>{q.options.map((option, i) => <li key={option.id}>{option.label} — {statusLabels[selected[i]]}</li>)}</ul> : <p>{q.options.filter(option => selected.includes(option.id)).map(option => option.label).join('; ')}</p>}
          <button className={styles.secondary} aria-describedby={'design-answer-' + questionId} onClick={() => startEdit(questionId)}>Изменить ответ</button>
        </div>
      })}</section><RestartSurveyButton scenario="design-rights" onLocalRestart={restart} />
    </> : <><p>Чтобы получить рекомендацию, ответьте на вопросы. Чтение этапов доступно и без опроса.</p><div className={styles.actions}><Link className={styles.primary} to="/design/survey">Продолжить опрос</Link><Link className={styles.secondary} to="/design/stages/1#design-stages">Посмотреть все этапы</Link></div></> : <>
      <QuestionProgress className={`${styles.eyebrow} ${styles.questionProgress}`} number={branch.indexOf(id) + 1} />
      <form noValidate onSubmit={event => { event.preventDefault(); next() }}>
        <fieldset className={styles.question} aria-describedby={error ? 'design-question-hint design-question-error' : 'design-question-hint'} aria-invalid={!!error}>
          <legend>{id.startsWith('2') ? 'Уточнение задачи' : question.title}</legend>
          <p id="design-question-hint" className={styles.hint}>{question.kind === 'matrix' ? 'Выберите один статус для каждой строки.' : question.kind === 'multi' ? 'Можно выбрать несколько способов. «Способ продажи еще не выбран» исключает остальные варианты.' : 'Выберите один вариант.'}</p>
          {question.kind === 'matrix' ? question.options.map((option, i) => <fieldset key={option.id} className={styles.matrix}><legend>{option.label}</legend><div className={styles.matrixChoices}>{Object.entries(statusLabels).map(([status, label]) => <label key={status}><input type="radio" name={'design-ready-' + option.id} checked={values[i] === status} onChange={() => { const next = Array.from({ length: 9 }, (_, index) => values[index] ?? ''); next[i] = status; select(next) }} />{label}</label>)}</div></fieldset>) : <div className={styles.options}>{question.options.map(option => <label className={styles.option} key={option.id}><input type={question.kind === 'multi' ? 'checkbox' : 'radio'} name={'design-' + id} checked={values.includes(option.id)} onChange={() => select(question.kind === 'multi' ? toggleSalesAnswer(values, option.id) : [option.id])} /><span>{option.label}</span></label>)}</div>}
        </fieldset>
        {error && <p id="design-question-error" role="alert" className={styles.error}>{error}</p>}
        <div className={styles.actions}>{edit ? <button type="button" className={styles.secondary} onClick={cancel}>Отменить редактирование</button> : branch.indexOf(id) ? <button type="button" className={styles.secondary} onClick={() => commit({ ...draft, question: branch[branch.indexOf(id) - 1] })}>← Назад</button> : <Link className={styles.secondary} to="/design">Закрыть</Link>}<button type="submit" className={styles.primary}>{edit ? 'Подтвердить ответ' : id === branch.at(-1) ? 'Показать материалы' : 'Далее →'}</button></div>
      </form>
      {draft.completed && <Link className={styles.textLink} to="/design/result">Вернуться к рекомендации</Link>}
      <div className={styles.actions}><RestartSurveyButton scenario="design-rights" onLocalRestart={restart} /></div>
    </>}
  </DesignLayout>
}
