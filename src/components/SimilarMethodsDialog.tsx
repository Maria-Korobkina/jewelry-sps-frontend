import { useEffect, useId, useRef } from 'react'
import type { SimilarResultSection } from '../features/similar/types'
import { SimilarMethodCard } from './SimilarMethodCard'
import styles from './SimilarMethodsDialog.module.css'
import { focusCourtMethod } from '../features/similar/claimEscalation'


export function SimilarMethodsDialog({ section, trigger, targetAction, close }: { section: SimilarResultSection; trigger: HTMLElement | null; targetAction?: 'court'; close(): void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const id = useId()
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element.showModal()
    if (targetAction !== 'court' || !focusCourtMethod(element)) element.querySelector<HTMLButtonElement>('button')?.focus()
    return () => { element.close(); document.body.style.overflow = overflow; if (trigger?.isConnected) trigger.focus() }
  }, [trigger, targetAction])
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby={id} onCancel={event => { event.preventDefault(); close() }} onKeyDown={event => {
    if (event.key !== 'Tab') return
    const targets = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]')]
    const first = targets[0], last = targets.at(-1)
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }}>
    <button type="button" className={styles.close} aria-label="Закрыть все способы защиты" onClick={close}>×</button>
    <h2 id={id}>Все возможные способы защиты</h2>
    <p>{section.title}</p>
    {section.allMethods?.map(method => <section key={method.id} className={styles.method}><h3 tabIndex={-1} data-method-action={method.actionId}>{method.title}</h3><SimilarMethodCard method={method} idPrefix={'all-' + id + '-'} onCourt={() => focusCourtMethod(dialog.current)} /></section>)}
  </dialog>
}
