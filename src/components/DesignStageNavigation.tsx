import { Link } from 'react-router-dom'
import { designStages } from '../features/design/content'
import type { StageId } from '../features/design/types'
import styles from '../pages/DesignPage.module.css'

export function DesignStageNavigation({ selected }: { selected: StageId }) {
  return <nav id="design-stages" aria-label="Этапы реализации дизайна" className={styles.stages}>{designStages.map(stage => <Link key={stage.id} className={stage.id === selected ? styles.activeStage : ''} aria-current={stage.id === selected ? 'step' : undefined} to={'/design/stages/' + stage.id + '#stage-content'}>{stage.id}. {stage.title}</Link>)}</nav>
}
