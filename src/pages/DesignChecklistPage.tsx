import { lazy, Suspense, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { DesignLayout } from '../components/DesignLayout'
const SnapshotDesignPage = lazy(() => import('../features/serverSurvey/SnapshotDesignPage').then(m => ({default:m.SnapshotDesignPage})))
import { designStages } from '../features/design/content'
import { parseStageId } from '../features/design/links'
import { checklistStatuses, readDesignChecklist, writeDesignChecklist } from '../features/design/storage'
import type { StageChecklist } from '../features/design/storage'
import type { StageId } from '../features/design/types'
import styles from './DesignPage.module.css'

export function DesignChecklistPage() {
  const [params] = useSearchParams()
  return params.has('savedRoute') || params.has('run') ? <Suspense fallback={<p role="status">Загрузка…</p>}><SnapshotDesignPage checklist /></Suspense> : <LocalDesignChecklistPage />
}
function LocalDesignChecklistPage() {
  const [params] = useSearchParams()
  const requested = params.get('stage')
  const selected = parseStageId(requested ?? undefined)
  const [draft, setDraft] = useState(readDesignChecklist)
  const [saved, setSaved] = useState(true)
  function update(id: StageId, next: StageChecklist) {
    const updated = { ...draft, [id]: next }
    setDraft(updated); setSaved(writeDesignChecklist(updated))
  }
  if (requested && !selected) return <DesignLayout title="Чек-лист"><h1 className={styles.title}>Этап не найден</h1><Link to="/design/checklist">Открыть полный чек-лист</Link></DesignLayout>
  const stages = selected ? designStages.filter(stage => stage.id === selected) : designStages
  return <DesignLayout title="Чек-лист">
    <h1 className={styles.title}>{selected ? 'Чек-лист этапа ' + selected : 'Итоговый чек-лист'}</h1>
    <p className={styles.note}>Отметки отражают вашу самостоятельную проверку. Они не означают юридическую проверку, получение патента или выполнение действий государственным органом. Черновик сохраняется в текущем браузере до закрытия вкладки.</p>
    {!saved && <p role="status" className={styles.error}>Не удалось сохранить отметки. Продолжите, не закрывая страницу.</p>}
    <div className={styles.actions}><a className={styles.primary} download href="/documents/design/checklist-all.docx">Скачать полный чек-лист Word</a>{selected && <a className={styles.secondary} download href={'/documents/design/checklist-' + selected + '.docx'}>Скачать чек-лист этапа Word</a>}{selected && <Link className={styles.secondary} to="/design/checklist">Все чек-листы</Link>}</div>
    {stages.map(stage => {
      const current = draft[stage.id] ?? { checked: [], status: 'Не начат' }
      const toggle = (key: string) => update(stage.id, { ...current, checked: current.checked.includes(key) ? current.checked.filter(item => item !== key) : [...current.checked, key] })
      return <section className={styles.card} key={stage.id} aria-labelledby={'checklist-title-' + stage.id}>
        <h2 id={'checklist-title-' + stage.id}>{stage.id}. {stage.title}</h2><p><strong>Цель этапа: </strong>{stage.goal}</p>
        <fieldset className={styles.checks}><legend>Пункты проверки</legend>{stage.tasks.map((task, i) => <label key={i}><input type="checkbox" checked={current.checked.includes('task-' + i)} onChange={() => toggle('task-' + i)} /><span>{task}</span></label>)}</fieldset>
        <fieldset className={styles.checks}><legend>Этап можно считать подготовленным, когда:</legend>{stage.criteria.map((item, i) => <label key={i}><input type="checkbox" checked={current.checked.includes('criterion-' + i)} onChange={() => toggle('criterion-' + i)} /><span>{item}</span></label>)}</fieldset>
        <fieldset className={styles.statuses}><legend>Статус этапа</legend>{checklistStatuses.map(status => <label key={status}><input type="radio" name={'status-' + stage.id} checked={current.status === status} onChange={() => update(stage.id, { ...current, status })} />{status}</label>)}</fieldset>
        <Link className={styles.textLink} to={'/design/stages/' + stage.id + '#stage-content'}>Вернуться к этапу {stage.id}</Link>
      </section>
    })}
  </DesignLayout>
}
