import type { Supplier } from '../features/suppliers/types'
import styles from './SupplierCard.module.css'

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return <article className={styles.card}>
    <h2>{supplier.name}</h2>
    <p className={styles.description}>{supplier.description}</p>
    {supplier.website && <a className={styles.website} href={supplier.website} target="_blank" rel="noopener noreferrer">Перейти на сайт</a>}
  </article>
}
