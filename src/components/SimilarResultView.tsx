import { ResultLink as Link } from '../features/serverSurvey/links'
import { useState } from 'react'
import { SimilarMethodsDialog } from './SimilarMethodsDialog'
import { SimilarLegalText } from './SimilarLegalText'
import { SimilarMethodCard } from './SimilarMethodCard'
import { SimilarProtectionAccordion } from './SimilarProtectionAccordion'
import { articleHrefs, similarArticleLinks, similarMethodArticleLinks } from '../features/similar/articleLinks'
import { getSimilarBranch } from '../features/similar/rules'
import type { SimilarAnswers, SimilarQuestion, SimilarQuestionId, SimilarResult } from '../features/similar/types'
import styles from '../pages/SimilarPage.module.css'

export function SimilarResultView({ result, questions, answers, edit, hideAnswers = false }: { result: SimilarResult; questions: SimilarQuestion[]; answers: SimilarAnswers; edit(id: SimilarQuestionId): void; hideAnswers?: boolean }) {
  const [dialog, setDialog] = useState<{ result: SimilarResult; section: number; trigger: HTMLElement; action?: 'court' } | null>(null)
  const dialogSection = dialog?.result === result ? result.sections[dialog.section] : null
  return <>
    {result.sections.length > 1 && <nav className={styles.contents} aria-label="Выбранные объекты">{result.sections.map(section => <a key={section.id} href={'#similar-section-' + section.id}>{section.title}</a>)}</nav>}
    {result.sections.map((section, index) => <section id={'similar-section-' + section.id} key={section.id} className={styles.resultSection} aria-labelledby={'similar-title-' + section.id}>
      <h2 id={'similar-title-' + section.id}>{section.title}</h2><SimilarLegalText blocks={section.blocks.filter(block => !section.methods.length || block.kind === 'list' || block.kind === 'table' || !/^Возможные способы защиты нарушенн(?:ого права|ых прав):?$/.test(block.runs.map(run => run.text).join('').trim()))} />
      {section.incomplete && <p className={styles.note}>Подробные рекомендации для этой ситуации пока недоступны</p>}
      <div className={styles.links}>{similarArticleLinks(section.articleSlugs).filter(link => !articleHrefs(section.blocks).some(href => href.split('?')[0] === link.href.split('?')[0]) && !section.methods.some(method => similarMethodArticleLinks(method.id).some(item => item.href === link.href))).map(link => <Link key={link.href} to={link.href}>{link.title}</Link>)}</div>
      {!!section.methods.length && <SimilarProtectionAccordion result={result}>{section.methods.map(method => <SimilarMethodCard key={method.id} method={method} onCourt={trigger => setDialog({ result, section: index, trigger, action: 'court' })} />)}<button className={styles.secondary} type="button" aria-haspopup="dialog" onClick={event => setDialog({ result, section: index, trigger: event.currentTarget })}>Ознакомьтесь со всеми возможными способами защиты</button></SimilarProtectionAccordion>}
    </section>)}
    {dialogSection && <SimilarMethodsDialog section={dialogSection} trigger={dialog!.trigger} targetAction={dialog!.action} close={() => setDialog(null)} />}
    {!hideAnswers && <section className={styles.answers} id="similar-answers"><h2>Ваши ответы</h2>{getSimilarBranch(answers).map(id => {
      const question = questions.find(q => q.id === id)!
      return <div key={id}><h3 id={'similar-answer-' + id}>{question.title}</h3><p>{question.options.filter(option => answers[id]?.includes(option.id)).map(option => option.label).join('; ')}</p><button className={styles.secondary} aria-describedby={'similar-answer-' + id} onClick={() => edit(id)}>Изменить ответ</button></div>
    })}</section>}
  </>
}
