import { useEffect, useRef, useState } from 'react'
import styles from './CookieNotice.module.css'

const storageKey = 'luxury-cookie-notice-dismissed'
function isDismissed() {
  try { return sessionStorage.getItem(storageKey) === '1' } catch { return false }
}
export function CookieNotice() {
  const [dismissed, setDismissed] = useState(isDismissed)
  const notice = useRef<HTMLElement>(null)
  useEffect(() => {
    if (dismissed || !notice.current) return
    const element = notice.current
    const updateSpace = () => document.documentElement.style.setProperty('--cookie-space', (element.getBoundingClientRect().height + 48) + 'px')
    updateSpace()
    const observer = new ResizeObserver(updateSpace)
    observer.observe(element)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty('--cookie-space')
    }
  }, [dismissed])
  function dismiss() {


    try { sessionStorage.setItem(storageKey, '1') } catch {                                                         }
    setDismissed(true)
  }
  if (dismissed) return null
  return (
    <aside ref={notice} className={styles.notice} aria-label="Уведомление о cookies">
      <p>Мы используем cookies для работы сайта и сохранения ваших настроек</p>
      <button className={styles.accept} type="button" onClick={dismiss}>Понятно</button>
      <button className={styles.close} type="button" onClick={dismiss} aria-label="Закрыть уведомление о cookies">×</button>
    </aside>
  )
}
