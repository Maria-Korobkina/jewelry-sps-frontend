import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArticleContent } from '../components/ArticleContent'
import { agreement } from '../features/reference/agreement'
import { fees } from '../features/reference/fees'
import styles from './KnowledgePage.module.css'

export function ReferencePage({ document }: { document: 'agreement' | 'fees' }) {
  const article = document === 'agreement' ? agreement : fees
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) documentElement(hash)?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [document, hash])
  const sections = article.blocks.filter(block => block.kind === 'heading')
  return <main id="main-content" className={styles.page}>
    <nav className={styles.breadcrumb} aria-label="Хлебные крошки"><Link to="/">Главная</Link> / <span aria-current="page">{article.title}</span></nav>
    <article className={styles.article}>
      <h1 className={styles.title}>{article.title}</h1>
      {document === 'fees' && <nav className={styles.content} aria-label="Разделы пошлин"><ul>{sections.map(section => <li key={section.id}><Link to={'/fees#' + section.id}>{'runs' in section && section.runs.map(run => run.text).join('')}</Link></li>)}</ul></nav>}
      <ArticleContent article={article} />
    </article>
  </main>
}

function documentElement(hash: string) {
  return globalThis.document.getElementById(decodeURIComponent(hash.slice(1)))
}
