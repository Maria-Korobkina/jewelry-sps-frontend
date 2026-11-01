import { useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ResultLink as Link, ArticleReturnContext } from '../features/serverSurvey/links'
import { articles } from '../features/knowledge/articles'
import { articleTarget, getArticleReturn } from '../features/knowledge/navigation'
import { knowledgeLinks } from '../features/knowledge/links'
import { ArticleContent } from '../components/ArticleContent'
import { cleanQuery, searchHref } from '../features/search/query'
import styles from './KnowledgePage.module.css'

export function KnowledgeArticlePage() {
  const { slug } = useParams()
  const { search, hash } = useLocation()
  const article = articles.find(item => item.slug === slug)
  const returnLink = getArticleReturn(search)
  const searchQuery = cleanQuery(new URLSearchParams(search).get('search') ?? '')
  const searchBack = searchQuery ? <Link className={styles.back} to={searchHref(searchQuery)}>← Вернуться к результатам поиска</Link> : null
  const heading = useRef<HTMLHeadingElement>(null)
  const listHref = '/knowledge' + (returnLink ? '?from=' + returnLink.from + (returnLink.stage ? '&stage=' + returnLink.stage : '') : '')
  useEffect(() => {
    const anchor = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (anchor) anchor.scrollIntoView()
    else { heading.current?.focus(); window.scrollTo(0, 0) }
  }, [slug, hash])
  return <ArticleReturnContext value={search}><main id="main-content" className={styles.page}>
    <nav aria-label="Хлебные крошки" className={styles.breadcrumb}><Link to="/">Главная</Link><span aria-hidden="true"> / </span><Link to={listHref}>База знаний</Link><span aria-hidden="true"> / </span><span aria-current="page">{article?.title ?? 'Статья не найдена'}</span></nav>
    <article className={styles.article}>
      <h1 ref={heading} tabIndex={-1} className={styles.title}>{article?.title ?? 'Статья не найдена'}</h1>
      <div className={styles.navigation}><Link className={styles.back} to={listHref}>← Все статьи</Link>{searchBack}{returnLink && <Link className={styles.back} to={returnLink.href}>{returnLink.label}</Link>}</div>
      {article ? <ArticleContent article={article} fromBusiness={returnLink?.from === 'business'} fromSimilar={returnLink?.from === 'similar-products'} fromDesign={returnLink?.from === 'design'} designStage={returnLink?.stage} searchQuery={searchQuery} /> : <p>Статья по этому адресу недоступна. Выберите материал в базе знаний.</p>}
      {article?.downloads?.map(download => <p key={download.href}><a className={styles.back} href={download.href} download>{download.title}</a></p>)}
      {article && ['patent-publication', 'industrial-design', 'trademark-protection'].includes(article.slug) && <p><Link className={styles.back} to="/fees">Посмотреть размеры пошлин</Link></p>}
      {!!article?.relatedSlugs?.length && <section className={styles.content} aria-label="Связанные материалы"><h2>Читайте также</h2><ul>{knowledgeLinks(article.relatedSlugs).map(link => <li key={link.href}><Link to={articleTarget(link.href, returnLink?.from === 'business' ? true : returnLink?.from ?? false, returnLink?.stage, searchQuery)}>{link.title}</Link></li>)}</ul></section>}
      {article && <div className={styles.navigation}><Link className={styles.back} to={listHref}>← Все статьи</Link>{searchBack}{returnLink && <Link className={styles.back} to={returnLink.href}>{returnLink.label}</Link>}</div>}
    </article>
  </main></ArticleReturnContext>
}
