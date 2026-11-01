import { useState } from 'react'
import { faqQuestions } from '../content/home'
import { faqAnswers } from '../content/faq'
import styles from './Faq.module.css'

export function Faq() {
  const [expanded, setExpanded] = useState<number[]>([])
  return (
    <div className={styles.list}>
      {faqQuestions.map((question, index) => {
        const open = expanded.includes(index)
        return (
          <div className={styles.item} key={question}>
            <h3><button type="button" id={'faq-button-' + index} aria-expanded={open} aria-controls={'faq-answer-' + index}
              onClick={() => setExpanded((current) => open ? current.filter((item) => item !== index) : [...current, index])}>
              {question}<span aria-hidden="true">{open ? '−' : '+'}</span>
            </button></h3>
            <div id={'faq-answer-' + index} role="region" aria-labelledby={'faq-button-' + index} hidden={!open}>
              <p className={styles.answer}>{faqAnswers[index]}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
