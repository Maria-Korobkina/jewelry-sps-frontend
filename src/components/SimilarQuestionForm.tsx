import type { SimilarQuestion } from '../features/similar/types'
import styles from '../pages/SimilarPage.module.css'

interface Props { question: SimilarQuestion; values: string[]; error: string; editing: boolean; last: boolean; select(value: string): void; next(): void; back(): void }
export function SimilarQuestionForm({ question, values, error, editing, last, select, next, back }: Props) {
  return <form noValidate onSubmit={event => { event.preventDefault(); next() }}>
    <fieldset className={styles.question} aria-invalid={!!error} aria-describedby={error ? 'similar-hint similar-error' : 'similar-hint'}>
      <legend>{question.title}</legend>
      <p className={styles.hint} id="similar-hint">{question.kind === 'multi' ? 'Можно выбрать несколько вариантов.' : question.id === 'goal' ? 'Выберите одну цель.' : 'Выберите один вариант.'}{question.id === 'evidence' && ' «Ничего из перечисленного» исключает остальные варианты.'}</p>
      <div className={styles.options}>{question.options.map(option => <label key={option.id} className={styles.option}><input type={question.kind === 'multi' ? 'checkbox' : 'radio'} name={'similar-' + question.id} value={option.id} checked={values.includes(option.id)} onChange={() => select(option.id)} /><span>{option.label}</span></label>)}</div>
    </fieldset>
    {error && <p role="alert" className={styles.error} id="similar-error">{error}</p>}
    <div className={styles.actions}><button type="button" className={styles.secondary} onClick={back}>{editing ? 'Отменить редактирование' : '← Назад'}</button><button className={styles.primary} type="submit">{editing ? 'Подтвердить ответ' : last ? 'Посмотреть маршрут' : 'Далее →'}</button></div>
  </form>
}
