import { Link } from 'react-router-dom'
import styles from './SectionCard.module.css'

type SectionCardProps = { to: string; title: string; label: string; description: string }
export function SectionCard({ to, title, label, description }: SectionCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.label}>{label}</p>
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Link className={styles.link} to={to} aria-label={title + ' — разобраться'}>Разобраться <span aria-hidden="true">↗</span></Link>
    </article>
  )
}
