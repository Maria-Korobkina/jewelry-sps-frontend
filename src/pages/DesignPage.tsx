import { SurveyEntryGate } from '../components/SurveyEntryGate'
import { Link } from 'react-router-dom'
import { DesignLayout } from '../components/DesignLayout'
import { designIntro } from '../features/design/content'
import { designScenarioTitle } from '../features/design/title'
import styles from './DesignPage.module.css'

export function DesignPage() {
  return <SurveyEntryGate scenario="design-rights"><DesignLayout title={designScenarioTitle}>
    <h1 className={styles.startTitle}>{designScenarioTitle}</h1>
    <p className={styles.intro}>{designIntro}</p>
    <div className={styles.actions}><Link className={styles.primary} to="/design/stages/1#stage-content">Начать реализацию дизайна</Link><Link className={styles.secondary} to="/design/stages/1#design-stages">Посмотреть все этапы</Link></div>
    <section className={styles.callout}><h2>Не знаете, с чего начать?</h2><p>Ответьте на вопросы — мы подберём материалы по вашим ответам.</p><Link className={styles.primary} to="/design/survey">Подобрать материалы</Link></section>
  </DesignLayout></SurveyEntryGate>
}
