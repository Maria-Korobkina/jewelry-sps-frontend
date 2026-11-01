import logo from '../../docs/design/logo.png'
import { SectionCard } from '../components/SectionCard'
import { Link } from 'react-router-dom'
import { Faq } from '../components/Faq'
import { sections } from '../sections'
import { features, scenarioDetails } from '../content/home'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <main id="main-content">
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>ПРАВОВОЙ ПОМОЩНИК ДЛЯ ЮВЕЛИРНОЙ ОТРАСЛИ</p>
            <h1 id="hero-title">Ваш дизайн.<br />Ваш бизнес. Ваше право.</h1>
            <p className={styles.intro}>От первого эскиза до выхода на рынок — разберитесь в правовых шагах и найдите инструменты для своей задачи.</p>
            <p className={styles.caption}>Для дизайнеров, мастерских и ювелирных брендов</p>
          </div>
          <img className={styles.heroLogo} src={logo} alt="Логотип «Право на роскошь»: кольцо и весы" />
        </div>
      </section>
      <section id="scenarios" className={styles.section} aria-labelledby="scenarios-title">
        <h2 id="scenarios-title">С чего начнём?</h2>
        <div className={styles.cards}>
          {sections.map((section, index) => <SectionCard key={section.path} to={section.path} title={section.title} {...scenarioDetails[index]} />)}
        </div>
      </section>
      <section className={styles.features} aria-labelledby="features-title">
        <div className={styles.section}>
          <h2 id="features-title">Меньше неопределённости.<br />Больше понятных шагов.</h2>
          <div className={styles.featureGrid}>
            {features.map((feature) => <div key={feature.title}><h3>{feature.href.startsWith('#') ? <a className={styles.featureLink} href={feature.href}>{feature.title}</a> : <Link className={styles.featureLink} to={feature.href}>{feature.title}</Link>}</h3><p>{feature.description}</p></div>)}
          </div>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="faq-title">
        <h2 id="faq-title">Популярные вопросы</h2>
        <Faq />
      </section>
      <section className={styles.about} aria-labelledby="about-title">
        <div className={styles.aboutInner}>
          <h2 id="about-title">Право на роскошь —<br />право создавать.</h2>
          <div>
            <p className={styles.aboutLabel}>О ПРОЕКТЕ</p>
            <p className={styles.intro}>Помогаем участникам ювелирной отрасли ориентироваться в правовых вопросах: от отношений с мастерской до защиты дизайна и бренда.</p>
            <p className={styles.caption}>Материалы и инструменты помогают выбрать следующий шаг. Решение зависит от документов и обстоятельств вашей ситуации.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
