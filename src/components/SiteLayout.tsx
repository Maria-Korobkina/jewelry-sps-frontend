import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Link } from 'react-router-dom'
import { CookieNotice } from './CookieNotice'
import styles from './SiteLayout.module.css'

export function SiteLayout() {
  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#main-content">Перейти к содержимому</a>
      <Header />
      <Outlet />
      <footer className={styles.footer}>
        <p>© 2026 Право на роскошь</p>
        <p>Правовой помощник для ювелирной отрасли</p>
        <p className={styles.disclaimer}>Сайт носит справочно-информационный характер.</p>
        <Link to="/agreement">Пользовательское соглашение</Link>
        <Link to="/privacy">Политика обработки персональных данных</Link>
        <p className={styles.update}>Информация актуальна на 22.10.2026</p>
        <p className={styles.feedback}>Нашли неточность? Напишите нам: <span>feedback@pravo-jewelry.example</span></p>
      </footer>
      <CookieNotice />
    </div>
  )
}
