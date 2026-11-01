import { useEffect, useRef, useState, type RefObject } from 'react'
import { useAuth } from '../features/auth/context'
import { validateAuth, type AuthFieldErrors, type AuthFields } from '../features/auth/validation'
import { ApiError, disabledMessage, errorMessage, isAborted } from '../api/errors'
import styles from './AuthDialog.module.css'

export function AuthDialog({ onClose, triggerRef }: { onClose(): void; triggerRef: RefObject<HTMLElement | null> }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [registration, setRegistration] = useState(false)
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element.showModal()
    element.querySelector<HTMLInputElement>('input')?.focus()
    const trigger = triggerRef.current
    return () => {
      element.close(); document.body.style.overflow = previousOverflow
      const target = trigger?.isConnected ? trigger : document.getElementById('account-link')
      target?.focus()
    }
  }, [triggerRef])
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="auth-title" aria-describedby="auth-intro"
    onCancel={event => { event.preventDefault(); onClose() }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return
      const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href], [tabindex="0"]'))
      const first = elements[0], last = elements.at(-1)
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }}>
    <button className={styles.close} type="button" onClick={onClose} aria-label="Закрыть окно входа">×</button>
    <h2 id="auth-title">{registration ? 'Регистрация' : 'Вход в личный кабинет'}</h2>
    <p id="auth-intro" className={styles.intro}>{registration ? 'Создайте аккаунт, чтобы открывать сохранённые маршруты.' : 'Войдите, чтобы открыть свои сохранённые маршруты.'}</p>
    <AuthForm key={registration ? 'register' : 'login'} registration={registration} onSuccess={onClose} />
    <p className={styles.switch}>{registration ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта?'} <button type="button" onClick={() => { setRegistration(value => !value); requestAnimationFrame(() => dialog.current?.querySelector<HTMLInputElement>('input')?.focus()) }}>{registration ? 'Войти' : 'Зарегистрироваться'}</button></p>
  </dialog>
}

function PasswordField({ id, label, value, onChange, disabled, errors, registration }: { id: string; label: string; value: string; onChange(value: string): void; disabled: boolean; errors?: string[]; registration: boolean }) {
  const [shown, setShown] = useState(false)
  return <div className={styles.field}>
    <label htmlFor={id}>{label}</label>
    <div className={styles.password}><input id={id} name={id} type={shown ? 'text' : 'password'} value={value} onChange={event => onChange(event.target.value)} disabled={disabled} required autoComplete={registration ? 'new-password' : 'current-password'} aria-invalid={!!errors?.length} aria-describedby={errors?.length ? id + '-error' : undefined} />
      <button type="button" disabled={disabled} aria-label={(shown ? 'Скрыть' : 'Показать') + ' ' + label.toLowerCase()} aria-pressed={shown} onClick={() => setShown(value => !value)}>{shown ? 'Скрыть' : 'Показать'}</button></div>
    {!!errors?.length && <p id={id + '-error'} className={styles.error}>{errors.join(' ')}</p>}
  </div>
}

export function AuthForm({ registration, onSuccess }: { registration: boolean; onSuccess(): void }) {
  const { client } = useAuth()
  const [fields, setFields] = useState<AuthFields>({ email: '', password: '', confirmation: '', first_name: '' })
  const [errors, setErrors] = useState<AuthFieldErrors>({})
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const request = useRef<AbortController | null>(null)
  const form = useRef<HTMLFormElement>(null)
  useEffect(() => () => { request.current?.abort() }, [])
  function change(name: keyof AuthFields, value: string) { setFields(previous => ({ ...previous, [name]: value })); setErrors(previous => ({ ...previous, [name]: undefined })); setMessage('') }
  function focusError() { requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()) }
  async function submit() {
    if (!client.enabled) { setMessage(disabledMessage); return }
    if (request.current) return
    const nextErrors = validateAuth(fields, registration)
    setErrors(nextErrors); setMessage('')
    if (Object.keys(nextErrors).length) { focusError(); return }
    const controller = new AbortController(); request.current = controller; setBusy(true)
    try {
      if (registration) await client.register({ email: fields.email, password: fields.password, first_name: fields.first_name }, controller.signal)
      else await client.login({ email: fields.email, password: fields.password }, controller.signal)
      if (!controller.signal.aborted) { setFields({ email: '', password: '', confirmation: '', first_name: '' }); onSuccess() }
    } catch (error) {
      if (!controller.signal.aborted && !isAborted(error)) { setErrors(error instanceof ApiError ? error.fields : {}); setMessage(errorMessage(error)); focusError() }
    } finally { if (!controller.signal.aborted) setBusy(false); request.current = null }
  }
  return <form ref={form} noValidate aria-busy={busy} onSubmit={event => { event.preventDefault(); void submit() }}>
    {!client.enabled && <p className={styles.notice} role="status">{disabledMessage}</p>}
    {registration && <div className={styles.field}><label htmlFor="auth-name">Имя <span className={styles.optional}>(необязательно)</span></label><input id="auth-name" name="first_name" autoComplete="given-name" value={fields.first_name} maxLength={150} disabled={busy} onChange={event => change('first_name', event.target.value)} aria-invalid={!!errors.first_name?.length} aria-describedby={errors.first_name?.length ? 'auth-name-error' : undefined} />{!!errors.first_name?.length && <p className={styles.error} id="auth-name-error">{errors.first_name.join(' ')}</p>}</div>}
    <div className={styles.field}><label htmlFor="auth-email">Email</label><input id="auth-email" name="email" type="email" autoComplete="email" required disabled={busy} value={fields.email} onChange={event => change('email', event.target.value)} aria-invalid={!!errors.email?.length} aria-describedby={errors.email?.length ? 'auth-email-error' : undefined} />{!!errors.email?.length && <p id="auth-email-error" className={styles.error}>{errors.email.join(' ')}</p>}</div>
    <PasswordField id="auth-password" label="Пароль" value={fields.password} onChange={value => change('password', value)} disabled={busy} errors={errors.password} registration={registration} />
    {registration && <PasswordField id="auth-confirmation" label="Подтверждение пароля" value={fields.confirmation} onChange={value => change('confirmation', value)} disabled={busy} errors={errors.confirmation} registration />}
    {message && <p role="alert" className={styles.error}>{message}</p>}
    <button className={styles.submit} type="submit" disabled={busy || !client.enabled}>{busy ? 'Подождите…' : registration ? 'Зарегистрироваться' : 'Войти'}</button>
    {busy && <p role="status" className={styles.intro}>Подождите, выполняется вход…</p>}
  </form>
}
