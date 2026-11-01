import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
const SnapshotDesignPage = lazy(() => import('../features/serverSurvey/SnapshotDesignPage').then(m => ({default:m.SnapshotDesignPage})))
import { DesignLayout } from '../components/DesignLayout'
import { DesignStageNavigation } from '../components/DesignStageNavigation'
import { designStages } from '../features/design/content'
import { getDesignStageLinks, parseStageId } from '../features/design/links'
import { readDesignDraft } from '../features/design/storage'
import { productionContract, showProductionContract } from '../features/design/contract'
import { catalogHref } from '../features/suppliers/navigation'
import styles from './DesignPage.module.css'

export function DesignStagePage() {
  const [params] = useSearchParams()
  return params.has('savedRoute') || params.has('run') ? <Suspense fallback={<p role="status">Загрузка…</p>}><SnapshotDesignPage /></Suspense> : <LocalDesignStagePage />
}
function LocalDesignStagePage() {
  const { stageId } = useParams()
  const { hash } = useLocation()
  const id = parseStageId(stageId)
  const stage = designStages.find(item => item.id === id)
  const answers = readDesignDraft().answers
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (hash === '#design-stages') document.getElementById('design-stages')?.scrollIntoView()
    else { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView() }
  }, [id, hash])
  if (!stage) return <DesignLayout title="Этап не найден"><h1 className={styles.title}>Этап не найден</h1><Link to="/design/stages/1#design-stages">Открыть все этапы</Link></DesignLayout>
  return <DesignLayout title={stage.id + '. ' + stage.title}>
    <h1 className={styles.title}>Путь от дизайна до продажи</h1>
    <p className={styles.intro}>Десять этапов реализации украшения. В каждом шаге — действия, пояснения и ссылки на необходимые документы</p>
    <DesignStageNavigation selected={stage.id} />
    <section className={styles.stageContent} aria-labelledby="stage-content">
      <p className={styles.eyebrow}>Этап {stage.id} из 10</p>
      <h2 ref={heading} tabIndex={-1} id="stage-content">{stage.id}. {stage.title}</h2>
      <p className={styles.stageAction}>{stage.action}</p>
      {stage.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      <div className={styles.links}>{getDesignStageLinks(stage.id, answers).map(link => <Link key={link.href} to={link.href}>{link.label}</Link>)}
        {stage.id === 3 && <Link to="/business">Открыть ювелирный бизнес</Link>}
        {[4, 7].includes(stage.id) && <><Link to={catalogHref('/design/stages/' + stage.id + '#stage-content', '/suppliers?category=metals')}>Поставщики драгоценных металлов</Link><Link to={catalogHref('/design/stages/' + stage.id + '#stage-content', '/suppliers?category=stones')}>Поставщики драгоценных камней</Link></>}
        {stage.id === 6 && <Link to="/design/stages/4#stage-content">Проверить требования по материалам и стране изготовления</Link>}
      </div>
      {stage.id === 7 && showProductionContract(answers) && <aside className={styles.note}><h3>{productionContract.title}</h3><p>{productionContract.description}</p><p>Для заказа изготовления у российского подрядчика: изделия из драгоценных металлов и (или) драгоценных камней.</p><a className={styles.textLink} href={productionContract.href} download>Скачать Word</a></aside>}
      <section className={styles.callout}><h3>Задачи и ожидаемый итог</h3><p>{stage.goal}</p><ul>{stage.tasks.map(task => <li key={task}>{task}</li>)}</ul><h3>Этап можно считать подготовленным, когда:</h3><ul>{stage.criteria.map(item => <li key={item}>{item}</li>)}</ul></section>
      <p className={styles.hint}>Сохранение проекта и загрузка документов пока недоступны. Читайте инструкции и сохраняйте свои отметки в чек-листе.</p>
      <div className={styles.actions}>
        <Link className={styles.secondary} to={stage.id === 1 ? '/design' : '/design/stages/' + (stage.id - 1) + '#stage-content'}>← Назад</Link>
        <Link className={styles.secondary} to={'/design/checklist?stage=' + stage.id}>Чек-лист этапа</Link>
        <Link className={styles.primary} to={stage.id === 10 ? '/design/checklist' : '/design/stages/' + (stage.id + 1) + '#stage-content'}>{stage.id === 10 ? 'Итоговый чек-лист' : 'Следующий этап →'}</Link>
      </div>
    </section>
  </DesignLayout>
}
