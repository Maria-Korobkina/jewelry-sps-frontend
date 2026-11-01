import { useCallback, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SupplierFilter } from '../components/SupplierFilter'
import { SupplierCard } from '../components/SupplierCard'
import { suppliers } from '../features/suppliers/data'
import { cleanSupplierFilters, filterSuppliers, getCategoryFilters, isOptionAvailable } from '../features/suppliers/filters'
import type { FilterId, SupplierCategory, SupplierFilters } from '../features/suppliers/types'
import styles from './SuppliersPage.module.css'
import businessStyles from './BusinessPage.module.css'
import { getCatalogReturn } from '../features/suppliers/navigation'

const categories: { id: SupplierCategory; label: string }[] = [
  { id: 'all', label: 'Все поставщики' },
  { id: 'metals', label: 'Драгоценные металлы' },
  { id: 'stones', label: 'Драгоценные камни' },
]

export function SuppliersPage() {
  const [params, setParams] = useSearchParams()
  const category: SupplierCategory = params.get('category') === 'metals' ? 'metals' : params.get('category') === 'stones' ? 'stones' : 'all'
  return <SupplierCatalog key={category} category={category} params={params} onParamsChange={setParams} />
}

function SupplierCatalog({ category, params, onParamsChange }: {
  category: SupplierCategory
  params: URLSearchParams
  onParamsChange: (params: URLSearchParams) => void
}) {
  const [selection, setSelection] = useState<{ category: SupplierCategory; filters: SupplierFilters }>({ category, filters: {} })
  const [openFilter, setOpenFilter] = useState<FilterId | null>(null)
  const filters = selection.category === category ? selection.filters : {}
  const visible = filterSuppliers(suppliers, category, filters)
  const definitions = getCategoryFilters(category)
  const returnTo = getCatalogReturn(params)
  const setFilterOpen = useCallback((id: FilterId, open: boolean) => setOpenFilter(open ? id : null), [])

  function selectCategory(next: SupplierCategory) {
    const query = new URLSearchParams(params)
    if (next === 'all') query.delete('category')
    else query.set('category', next)
    onParamsChange(query)
    setSelection({ category: next, filters: {} })
    setOpenFilter(null)
  }

  function changeFilter(id: FilterId, values: string[]) {
    const next = cleanSupplierFilters(suppliers, category, { ...filters, [id]: values })
    setSelection({ category, filters: next })
  }

  return (
    <main id="main-content" className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Хлебные крошки"><Link to="/">Главная</Link> / Каталог поставщиков</nav>
      <div className={styles.introduction}><div><h1 className={styles.title}>Каталог поставщиков</h1><p className={styles.intro}>Найдите материалы для вашего ювелирного бизнеса</p></div>
        <aside className={styles.businessCallout}><h2>Ещё не зарегистрировали бизнес?</h2><Link className={businessStyles.primary} to="/business">Составьте маршрут открытия ювелирного бизнеса</Link></aside>
      </div>
      <nav className={styles.returnLinks} aria-label="Вернуться из каталога"><Link className={styles.back} to="/">На главную</Link>{returnTo && <Link className={styles.back} to={returnTo === '/business' || returnTo === '/similar-products' ? returnTo + '?active=1' : returnTo}>Вернуться к маршруту</Link>}</nav>
      <div className={styles.categories} role="group" aria-label="Категория поставщиков">
        {categories.map(item => <button type="button" key={item.id} className={item.id === category ? styles.activeCategory : styles.category} aria-pressed={item.id === category} onClick={() => selectCategory(item.id)}>{item.label}</button>)}
      </div>
      {definitions.length > 0 && <>
        <div className={styles.filters}>
          {definitions.map(definition => <SupplierFilter key={definition.id} definition={definition}
            selected={filters[definition.id] ?? []} open={openFilter === definition.id}
            disabled={definition.id === 'fineness' && !filters.metal?.length}
            isAvailable={value => isOptionAvailable(suppliers, category, definition.id, value, filters)}
            onOpen={open => setFilterOpen(definition.id, open)} onChange={values => changeFilter(definition.id, values)} />)}
        </div>
        <p className={styles.help}>Внутри одного фильтра подходят любые выбранные варианты. Между фильтрами учитываются все условия.{category === 'metals' && !filters.metal?.length && ' Чтобы выбрать пробу или чистоту, сначала выберите металл.'}</p>
        <button type="button" className={styles.reset} onClick={() => { setSelection({ category, filters: {} }); setOpenFilter(null) }}>Сбросить фильтры</button>
      </>}
      <p className={styles.count} role="status">Найдено поставщиков: {visible.length}</p>
      {!visible.length ? <p className={styles.empty} role="status">По выбранным условиям поставщики не найдены</p> : <div className={styles.cards}>
        {visible.map(supplier => <SupplierCard key={supplier.id} supplier={supplier} />)}
      </div>}
    </main>
  )
}
