import { useId, useState, type ReactNode } from 'react'
import type { SimilarResult } from '../features/similar/types'
import styles from './SimilarProtectionAccordion.module.css'


export function SimilarProtectionPanel({ id, open, toggle, children }: { id: string; open: boolean; toggle(): void; children: ReactNode }) {
  return <div className={styles.item}>
    <h3 className={styles.heading}><button type="button" id={id + '-button'} aria-expanded={open} aria-controls={id + '-content'} onClick={toggle} className={styles.trigger}>
      <span>Возможные способы защиты нарушенных прав</span>
      <span className={styles.arrow} aria-hidden="true">{open ? '↓' : '→'}</span>
    </button></h3>
    <div id={id + '-content'} role="region" aria-labelledby={id + '-button'} hidden={!open} className={styles.panel}>{children}</div>
  </div>
}

export function SimilarProtectionAccordion({ result, children }: { result: SimilarResult; children: ReactNode }) {
  const id = useId()
  const [state, setState] = useState({ result, open: false })


  const open = state.result === result && state.open
  return <SimilarProtectionPanel id={'similar-protection-' + id} open={open} toggle={() => setState(current => ({ result, open: !(current.result === result && current.open) }))}>{children}</SimilarProtectionPanel>
}
