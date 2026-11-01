import { Link } from 'react-router-dom'
import { ArticleContent } from '../components/ArticleContent'
import { privacy } from '../features/knowledge/privacy'
import styles from './KnowledgePage.module.css'

export function PrivacyPage() {
  return <main id="main-content" className={styles.page}>
    <nav className={styles.breadcrumb} aria-label="Хлебные крошки"><Link to="/">Главная</Link> / Политика обработки персональных данных</nav>
    <article className={styles.article}>
      <h1 className={styles.title}>{privacy.title}</h1>
      <ArticleContent article={privacy} />
    </article>
  </main>
}
