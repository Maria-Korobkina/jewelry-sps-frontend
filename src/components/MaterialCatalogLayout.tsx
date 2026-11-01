import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from '../pages/KnowledgePage.module.css'

export function MaterialCatalogLayout({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => { heading.current?.focus() }, [])
  return <main id="main-content" className={styles.page}>
    <nav aria-label="Хлебные крошки" className={styles.breadcrumb}><Link to="/">Главная</Link><span aria-hidden="true"> / </span><span aria-current="page">{title}</span></nav>
    <h1 ref={heading} tabIndex={-1} className={styles.title}>{title}</h1>
    <p className={styles.catalogIntro}>{intro}</p>
    {children}
  </main>
}
