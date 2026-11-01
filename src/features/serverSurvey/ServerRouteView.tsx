import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import type { SavedRoute } from '../../api/types'
import type { SurveyAnswers } from '../../api/resultContracts'
import { savedRouteLink } from '../auth/routeLinks'
import { SimilarResultView } from '../../components/SimilarResultView'
import { RestartSurveyButton } from '../../components/RestartSurveyButton'
import { similarQuestions } from '../similar/content'
import { applicableQuestions, scenarioPath, surveyQuestions, type Scenario } from './adapter'
import { ResultLink, SnapshotContext, snapshotQuery } from './links'
import styles from '../../pages/BusinessPage.module.css'
import design from '../../pages/DesignPage.module.css'

export function ServerAnswers({route,answers,edit}: {route: SavedRoute;answers: SurveyAnswers;edit?(id: string): void}) {
  const scenario = route.scenario as Scenario, questions = surveyQuestions(scenario)
  return <section className={styles.answers}><h2>Ваши ответы</h2>{applicableQuestions(scenario,answers).filter(id => answers[id]?.length).map(id => {
    const q = questions.find(q => q.id === id)
    if (!q) return null
    return <div key={id}><h3 id={'server-answer-' + id}>{q.title}</h3><p>{q.options.filter(o => answers[id].includes(o.id)).map(o => o.label).join('; ')}</p>{edit ? <button className={styles.secondary} aria-describedby={'server-answer-' + id} onClick={() => edit(id)}>Изменить ответ</button> : <Link className={styles.secondary} aria-describedby={'server-answer-' + id} to={scenarioPath(scenario) + '?run=' + route.run_id + '&edit=' + encodeURIComponent(id)}>Изменить ответ</Link>}</div>
  })}</section>
}
export function ServerRouteView({route,answers,edit,restartDisabled = false}: {route: SavedRoute;answers?: SurveyAnswers;edit?(id: string): void;restartDisabled?: boolean}) {
  const result = route.result
  const similar = useMemo(() => result?.kind === 'similar_products' ? {sections: result.route ? [{id:'combined' as const,routeId:result.route.routeId,title:result.route.title,blocks:result.route.blocks,methods:result.route.methods.filter(m => m.id === result.selectedMethodId),allMethods:result.route.methods,incomplete:false,articleSlugs:result.sectionArticleSlugs}] : []} : null,[result])
  return <SnapshotContext value={{route}}><section aria-label="Маршрут"><h2>{route.scenario_title}</h2>
    {route.kind === 'design' && result?.kind === 'design' ? <>
      {result.cards.map((card,i) => <article className={design.card} key={i}><h3>{card.item.title}</h3>{card.fallbackText && <p>{card.fallbackText}</p>}<div className={design.links}>{card.links.map((link,j) => <ResultLink key={j} to={link.href}>{link.title ?? link.label}</ResultLink>)}</div></article>)}
      <nav id="design-stages" aria-label="Все этапы" className={design.card}><h3>Все десять этапов</h3><ol>{result.stages.map(stage => <li key={stage.id}><Link to={'/design/stages/' + stage.id + '?' + snapshotQuery(route) + '#stage-content'}>{stage.title}</Link></li>)}</ol></nav>
      <ServerAnswers route={route} answers={result.answers} edit={edit} />
    </> : route.kind === 'similar_products' && result?.kind === 'similar_products' ? <>
      {result.status === 'in_development' && <p className={styles.note}>{result.message ?? 'Рекомендации для этой ситуации пока в разработке.'}</p>}
      <SimilarResultView result={similar!} questions={similarQuestions} answers={result.answers} edit={id => edit?.(id)} hideAnswers />
      <ServerAnswers route={route} answers={result.answers} edit={edit} />
    </> : <>
      {!route.steps.length && <p>В этом маршруте пока нет шагов.</p>}
      {route.steps.map((step,i) => <article key={i} className={styles.step}><p className={styles.stepNumber}>{i+1} шаг</p><div><h3>{step.title}</h3><p style={{whiteSpace:'pre-line'}}>{step.body}</p><ul>{step.links.map((link,j) => {const href = savedRouteLink(link);return <li key={j}>{href ? href.startsWith('/') ? <ResultLink to={href}>{link.label}</ResultLink> : <a href={href} target="_blank" rel="noopener noreferrer">{link.label}</a> : <span>{link.label} — материал пока недоступен</span>}</li>})}</ul></div></article>)}
      {answers && <ServerAnswers route={route} answers={answers} edit={edit} />}
    </>}
    {['open-business','design-rights','similar-products'].includes(route.scenario) && <RestartSurveyButton scenario={route.scenario as Scenario} disabled={restartDisabled} />}
  </section></SnapshotContext>
}
