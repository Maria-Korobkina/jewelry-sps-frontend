import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../docs/design/logo.png'
import { SideMenu } from './SideMenu'
import { SearchForm } from './SearchForm'
import { useAuth } from '../features/auth/context'
import styles from './Header.module.css'

export function Header() {
  const { state, openAuth, dialogOpen } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <button ref={menuButton} className={styles.menu} onClick={() => setMenuOpen(true)} aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="site-menu">
            <span aria-hidden="true">≡</span> Меню
          </button>
          <Link className={styles.brand} to="/" aria-label="Право на роскошь — главная">
            <img src={logo} alt="" /><span>ПРАВО<br />НА РОСКОШЬ</span>
          </Link>
          <div className={styles.searchArea}>
            <SearchForm className={styles.search} compact />
          </div>
          <Link id="account-link" className={styles.account} to="/account" aria-haspopup={state.user ? undefined : 'dialog'} aria-expanded={state.user ? undefined : dialogOpen} onClick={event => { if (!state.user) { event.preventDefault(); openAuth(event.currentTarget) } }}>Личный кабинет <span aria-hidden="true">↗</span></Link>
        </div>
      </header>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={menuButton} />
    </>
  )
}
