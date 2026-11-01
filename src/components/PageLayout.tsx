import type { ReactNode } from 'react'
import styles from './PageLayout.module.css'
type PageLayoutProps = { title: string; children: ReactNode }
export function PageLayout({ title, children }: PageLayoutProps) {
  return <main id="main-content" className={styles.page}><h1 className={styles.title}>{title}</h1>{children}</main>
}
