import { Link, useSearchParams } from 'react-router-dom'
import { SearchForm } from '../components/SearchForm'
import { cleanQuery, highlightParts, searchArticleHref, searchMaterials } from '../features/search/search'
import styles from './SearchPage.module.css'

function Highlight({ text, query }: { text: string; query: string }) {
  return highlightParts(text, query).map((part, index) => part.match ? <mark key={index}>{part.text}</mark> : part.text)
}

export function SearchPage() {
  const [params] = useSearchParams()
  const query = cleanQuery(params.get('q') ?? '')
  const results = searchMaterials(query)
  return <main id="main-content" className={styles.page}>
    <nav aria-label="Хлебные крошки"><Link to="/">Главная</Link><span aria-hidden="true"> / </span><span aria-current="page">Поиск</span></nav>
    <h1>Поиск по сайту</h1>
    <SearchForm className={styles.form} />
    <p role="status">{!query ? 'Введите запрос, чтобы найти статью, шаблон или чек-лист.' : 'Найдено материалов: ' + results.length}</p>
    {!!query && !results.length && <p>По вашему запросу ничего не найдено. Попробуйте другое слово или сократите запрос.</p>}
    <div className={styles.results}>{results.map(result => <article className={styles.result} key={result.id}>
      <p className={styles.type}>{result.type}</p>
      <h2>{result.download ? <a href={result.href} download><Highlight text={result.title} query={query} /></a> : <Link to={result.type === 'Статья' ? searchArticleHref(result.href, query) : result.href}><Highlight text={result.title} query={query} /></Link>}</h2>
      <p><Highlight text={result.snippet} query={query} /></p>
      {result.download && <a href={result.href} download>Скачать Word</a>}
    </article>)}</div>
  </main>
}
