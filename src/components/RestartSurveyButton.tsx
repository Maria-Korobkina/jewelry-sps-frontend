import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../features/auth/context'
import { newRunService } from '../features/serverSurvey/newRun'
import { surveyController, unfinishedServerDraft } from '../features/serverSurvey/controller'
import { scenarioPath, type Scenario } from '../features/serverSurvey/adapter'
import { localSurveyEntry, surveyRunHref } from '../features/serverSurvey/entry'
import styles from '../pages/BusinessPage.module.css'

export function RestartSurveyButton({scenario,onLocalRestart,disabled = false,label = 'Пройти опрос заново',confirmDraft = false}: {scenario: Scenario;onLocalRestart?(): void;disabled?: boolean;label?: string;confirmDraft?: boolean}) {
  const auth = useContext(AuthContext), navigate = useNavigate()
  const [confirm,setConfirm] = useState(false), [busy,setBusy] = useState(false), [error,setError] = useState('')
  const locked = useRef(false), trigger = useRef<HTMLButtonElement>(null), cancel = useRef<HTMLButtonElement>(null)
  function unfinished() {
    if (auth?.client.enabled) return surveyController(auth.client,scenario).canAccess && unfinishedServerDraft(scenario,sessionStorage)
    const entry = localSurveyEntry(scenario)
    return entry.started && !entry.completed
  }
  async function start(confirmed = false) {
    if (locked.current || disabled) return
    if (!confirmed && (confirmDraft || unfinished())) {setConfirm(true);queueMicrotask(() => cancel.current?.focus());return}
    locked.current = true;setBusy(true);setError('')
    try {
      if (onLocalRestart) {onLocalRestart();navigate(surveyRunHref(scenario));locked.current = false}
      else if (auth?.client.enabled) {
        const run = await newRunService(auth.client).start(scenario)
        navigate((scenario === 'design-rights' ? '/design/survey' : scenarioPath(scenario)) + '?run=' + run.id)
      } else throw new Error('Начать новый опрос сейчас нельзя. Попробуйте позже.')
      setConfirm(false)
    } catch(e) {locked.current = false;setError((e instanceof Error ? e.message : 'Не удалось начать опрос.') + ' Прежний результат и ответы сохранены. Вы можете повторить действие.')}
    finally {setBusy(false)}
  }
  return <div>
    <button ref={trigger} className={styles.secondary} type="button" disabled={disabled || busy} onClick={() => void start()}>{label}</button>
    {busy && <p role="status">Открываем новый опрос…</p>}
    {error && <p role="alert" className={styles.error}>{error}</p>}
    {confirm && <div className={styles.note} role="group" aria-label="Начать новое прохождение"><p role="alert">Будет сброшен только текущий незавершённый черновик этого опроса. Сохранённые маршруты и другие опросы останутся.</p><div className={styles.actions}><button className={styles.primary} disabled={busy} onClick={() => void start(true)}>Начать новое прохождение</button><button ref={cancel} className={styles.secondary} disabled={busy} onClick={() => {setConfirm(false);trigger.current?.focus()}}>Отмена</button></div></div>}
  </div>
}
