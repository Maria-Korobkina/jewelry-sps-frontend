import { Link } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import styles from './SectionPage.module.css'

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <PageLayout title={title}>
      <p>Раздел пока недоступен. Вы можете вернуться на главную или зайти позже.</p>
      <Link className={styles.backLink} to="/">Вернуться на главную</Link>
    </PageLayout>
  )
}
