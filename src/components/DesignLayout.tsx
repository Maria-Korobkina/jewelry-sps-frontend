import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { designScenarioTitle } from '../features/design/title'
import styles from '../pages/DesignPage.module.css'

export function DesignLayout({ title, children }: { title: string; children: ReactNode }) {
  return <main id="main-content" className={styles.page}>
    <nav className={styles.breadcrumb} aria-label="Хлебные крошки"><Link to="/">Главная</Link><span aria-hidden="true"> / </span><Link to="/design">{designScenarioTitle}</Link>{title !== designScenarioTitle && <><span aria-hidden="true"> / </span><span aria-current="page">{title}</span></>}</nav>
    {children}
  </main>
}
