import { Link } from 'react-router-dom'
import { MaterialCatalogLayout } from '../components/MaterialCatalogLayout'
import { checklistMaterials } from '../features/design/checklistMaterials'
import { documentTemplates } from '../features/knowledge/documentTemplates'
import styles from './KnowledgePage.module.css'

export function DocumentsPage() {
  return <MaterialCatalogLayout title="Шаблоны документов и чек-листы" intro="Чек-листы помогут проверить готовность этапов реализации украшения. Откройте нужный этап или скачайте Word для ручного заполнения.">
    <div className={styles.grid}>{documentTemplates.map(material => <article className={styles.card} key={material.id}><h2>{material.title}</h2><p className={styles.cardDescription}>{material.description}</p><a className={styles.back} href={material.href} download>Скачать Word</a></article>)}{checklistMaterials.map(material => <article className={styles.card} key={material.id}>
      <h2>{material.title}</h2><p className={styles.cardDescription}>{material.description}</p>
      <div className={styles.cardLinks}><Link className={styles.back} to={material.href}>Открыть чек-лист</Link><a className={styles.back} href={material.wordHref} download>Скачать Word</a></div>
    </article>)}</div>
  </MaterialCatalogLayout>
}
