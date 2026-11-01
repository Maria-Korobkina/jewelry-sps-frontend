import { useLocation } from 'react-router-dom'
import { ResultLink as Link, ArticleReturnContext } from '../features/serverSurvey/links'
import { MaterialCatalogLayout } from '../components/MaterialCatalogLayout'
import { articles } from '../features/knowledge/articles'
import { getArticleReturn } from '../features/knowledge/navigation'
import styles from './KnowledgePage.module.css'

export function KnowledgePage() {
  const { search } = useLocation()
  const returnLink = getArticleReturn(search)
  const suffix = returnLink ? '?from=' + returnLink.from + (returnLink.stage ? '&stage=' + returnLink.stage : '') : ''
  return <ArticleReturnContext value={search}><MaterialCatalogLayout title="База знаний" intro="Статьи об открытии ювелирного бизнеса, работе с изделиями и защите интеллектуальных прав.">
    {returnLink && <Link className={styles.back} to={returnLink.href}>{returnLink.label}</Link>}
    <div className={styles.grid}>{articles.map(article => <article className={styles.card} key={article.slug}>
      <h2><Link to={'/knowledge/' + article.slug + suffix}>{article.title}</Link></h2>
      <Link className={styles.back} to={'/knowledge/' + article.slug + suffix} aria-label={'Читать статью «' + article.title + '»'}>Читать статью →</Link>
    </article>)}</div>
  </MaterialCatalogLayout></ArticleReturnContext>
}
