import { Link } from 'react-router-dom'
import { getSupplierCatalogLink } from '../features/business/catalog'
import { getStepArticleLinks, getStepSurveyLinks } from '../features/business/articleLinks'
import type { BusinessAnswers, BusinessStep } from '../features/business/types'
import styles from '../pages/BusinessPage.module.css'

export function BusinessStepCard({ step, answers }: { step: BusinessStep; answers: BusinessAnswers }) {
  const catalogLink = getSupplierCatalogLink(step, answers)
  return <article className={styles.step}>
    <p className={styles.stepNumber}>{step.number} шаг</p>
    <div><h2>{step.title}</h2>{step.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      {catalogLink && <Link className={styles.catalogLink} to={catalogLink}>Открыть каталог поставщиков</Link>}
      {step.materials.includes('Проверить виды деятельности') && <Link className={styles.catalogLink} to="/activities">Проверить виды деятельности</Link>}
      {getStepArticleLinks(step).map(link => <Link key={link.href} className={styles.catalogLink} to={link.href}>{link.title}</Link>)}
      {getStepSurveyLinks(step).map(link => <Link key={link.href} className={styles.catalogLink} to={link.href}>{link.title}</Link>)}
    </div>
  </article>
}
