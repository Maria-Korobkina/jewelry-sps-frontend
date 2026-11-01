import { Link } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import styles from './SectionPage.module.css'

export function SectionPage({ title }: { title: string }) {
  return (
    <PageLayout title={title}>
      <Link className={styles.backLink} to="/">Вернуться на главную</Link>
    </PageLayout>
  )
}
