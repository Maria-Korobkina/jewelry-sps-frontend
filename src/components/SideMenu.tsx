import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import { menuItems } from '../content/home'
import styles from './SideMenu.module.css'

type SideMenuProps = {
  open: boolean
  onClose: () => void
  triggerRef: RefObject<HTMLButtonElement | null>
}

export function SideMenu({ open, onClose, triggerRef }: SideMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    dialog.showModal()
    dialog.querySelector<HTMLButtonElement>('button')?.focus()
    const trigger = triggerRef.current
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [open, triggerRef])

  return (
    <dialog ref={dialogRef} id="site-menu" className={styles.panel} aria-labelledby="menu-title"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
      }}>
      <div className={styles.heading}>
        <button type="button" aria-label="Закрыть меню" onClick={onClose}>Закрыть <span aria-hidden="true">×</span></button>
        <h2 id="menu-title">ПРАВО НА РОСКОШЬ</h2>
      </div>
      <nav aria-label="Основное меню">
        {menuItems.map((item) => <Link key={item.path} to={item.path} onClick={onClose}>{item.title}</Link>)}
      </nav>
    </dialog>
  )
}
