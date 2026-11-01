import type { FilterDefinition, FilterId, Supplier, SupplierCategory, SupplierFilters } from './types.ts'

function option(label: string, ...tags: string[]) { return { label, tags } }


export const filterDefinitions: FilterDefinition[] = [
  { id: 'metal', label: 'Металл', category: 'metals', options: [
    option('Золото', 'золото'), option('Серебро', 'серебро'), option('Платина', 'платина'),
    option('Палладий', 'палладий'), option('Родий', 'родий'), option('Иридий', 'иридий'), option('Другой', 'рутений', 'осмий'),
  ] },
  { id: 'form', label: 'Форма поставки', category: 'metals', options: [
    option('Гранулы', 'гранулы', 'серебряные гранулы'), option('Слитки', 'слитки'),
    option('Проволока', 'проволока', 'серебряная проволока'),
    option('Лист / полоса / прокат', 'плоский прокат', 'прокат', 'полоса', 'серебряные листы', 'серебряный прокат', 'серебряная полоса'),
    option('Пруток', 'прутки', 'серебряный пруток'), option('Порошок', 'порошок'),
    option('Аноды', 'аноды', 'серебряные аноды', 'золотые аноды'), option('Фольга', 'фольга'),
    option('Припой', 'серебряные припои', 'золотые припои', 'палладиевые припои'), option('Лигатура', 'лигатуры'),
  ] },
  { id: 'fineness', label: 'Проба / чистота', category: 'metals', options: [
    option('999 / 999,9'), option('925'), option('750'), option('585'), option('950'), option('Другая'),
  ] },
  { id: 'product', label: 'Тип продукции', category: 'metals', options: [
    option('Аффинированный металл', 'аффинированные металлы', 'аффинированное золото', 'аффинированное серебро'),
    option('Ювелирный сплав'), option('Лигатура', 'лигатуры'),
    option('Припой', 'серебряные припои', 'золотые припои', 'палладиевые припои'),
    option('Полуфабрикат', 'полуфабрикаты'), option('Техническая продукция', 'технические изделия', 'техническая продукция'),
  ] },
  { id: 'terms', label: 'Условия поставки', category: 'metals', options: [
    option('Оптовые поставки', 'оптовые поставки'), option('Малые партии'),
    option('Изготовление под заказ', 'индивидуальное изготовление', 'изготовление под заказ', 'изготовление по согласованным параметрам', 'изготовление по заявке', 'изготовление по параметрам заказчика'),
    option('Изготовление по техническому заданию', 'изготовление по техническому заданию'),
    option('Работа с ИП'), option('Работа с юридическими лицами', 'юридические лица'),
  ] },
  { id: 'delivery', label: 'Доставка', category: 'metals', options: [
    option('По всей России', 'доставка по всей России', 'доставка по России'), option('Москва', 'доставка по Москве'),
    option('Санкт-Петербург'), option('Другие регионы'), option('Самовывоз', 'самовывоз'), option('Доставка в страны ЕАЭС'),
  ] },
  { id: 'stone', label: 'Вид камня', category: 'stones', options: [
    option('Бриллианты', 'бриллианты'), option('Изумруды', 'изумруды', 'изумруд'), option('Рубины', 'рубины', 'рубин'),
    option('Сапфиры', 'сапфиры', 'сапфир'), option('Александриты', 'александрит'), option('Шпинель', 'шпинель'),
    option('Танзанит', 'танзанит'), option('Топаз', 'топаз'), option('Гранат', 'гранат'), option('Аметист', 'аметист'),
    option('Аквамарин', 'аквамарин'), option('Опал', 'опал'), option('Другие камни', 'цитрин', 'циркон', 'корунд'),
  ] },
  { id: 'origin', label: 'Происхождение камня', category: 'stones', options: [
    option('Натуральные', 'натуральные камни', 'натуральные бриллианты', 'природные камни', 'природные бриллианты', 'исключительно природные бриллианты'),
    option('Выращенные', 'выращенные камни', 'выращенные бриллианты', 'лабораторно выращенные камни', 'лабораторно выращенные бриллианты'),
    option('Синтетические', 'синтетические камни'), option('Гидротермальные', 'гидротермальные камни'),
  ] },
  { id: 'cut', label: 'Форма огранки', category: 'stones', options: [
    option('Круг', 'круг', 'круглые бриллианты', 'круглая огранка'), option('Овал', 'овал'), option('Груша', 'груша'),
    option('Кушон', 'кушон'), option('Принцесса', 'принцесса'), option('Изумрудная'), option('Маркиз', 'маркиз'),
    option('Багет', 'багет'), option('Сердце', 'сердце'), option('Кабошон', 'кабошон'), option('Другие формы', 'октагон', 'эксклюзивная огранка'),
  ] },
  { id: 'format', label: 'Формат поставки', category: 'stones', options: [
    option('Отдельные камни'), option('Калиброванные вставки', 'калиброванные камни', 'различные калибры', 'калибровка'),
    option('Мелкие камни / рассев', 'мелкие бриллианты', 'бриллиантовый рассев'),
    option('Камни под заказ', 'камни под заказ', 'подбор камней под заказ', 'индивидуальный заказ'),
    option('Оптовые партии', 'оптовые поставки', 'оптовые продажи'),
  ] },
]

export function getCategoryFilters(category: SupplierCategory) {
  return filterDefinitions.filter(definition => definition.category === category)
}

function matchesFineness(value: string, actual: string) {
  if (value === '999 / 999,9') return actual === '999' || actual === '999,9'
  if (value === 'Другая') return !['999', '999,9', '925', '750', '585', '950'].includes(actual)
  return actual === value
}

export function matchesOption(supplier: Supplier, id: FilterId, value: string, filters: SupplierFilters): boolean {
  if (id === 'fineness') {
    return (filters.metal ?? []).some(metal => (supplier.finenessByMetal[metal] ?? []).some(actual => matchesFineness(value, actual)))
  }
  const definition = filterDefinitions.find(item => item.id === id)
  const choice = definition?.options.find(item => item.label === value)
  return choice?.tags.some(tag => supplier.tags.includes(tag)) ?? false
}

export function isOptionAvailable(list: Supplier[], category: SupplierCategory, id: FilterId, value: string, filters: SupplierFilters): boolean {
  return list.some(supplier => supplier.category === category && matchesOption(supplier, id, value, filters))
}

export function cleanSupplierFilters(list: Supplier[], category: SupplierCategory, input: SupplierFilters): SupplierFilters {
  const filters: SupplierFilters = {}
  for (const definition of getCategoryFilters(category)) {
    const selected = input[definition.id] ?? []
    const valid = definition.options.filter(choice => selected.includes(choice.label) && isOptionAvailable(list, category, definition.id, choice.label, { ...input, ...filters })).map(choice => choice.label)
    if (valid.length) filters[definition.id] = valid
  }
  if (!filters.metal?.length) delete filters.fineness
  return filters
}

export function filterSuppliers(list: Supplier[], category: SupplierCategory, filters: SupplierFilters): Supplier[] {
  const definitions = getCategoryFilters(category)
  return list.filter(supplier => (category === 'all' || supplier.category === category) && definitions.every(definition => {
    const selected = filters[definition.id] ?? []
    return !selected.length || selected.some(value => matchesOption(supplier, definition.id, value, filters))
  })).sort((a, b) => {
    const first = supplierSortName(a.name)
    const second = supplierSortName(b.name)
    const latinFirst = Number(!/^[a-z]/iu.test(first)) - Number(!/^[a-z]/iu.test(second))
    return latinFirst || supplierNameCollator.compare(first, second)
  })
}

const supplierNameCollator = new Intl.Collator('ru', { sensitivity: 'base' })
function supplierSortName(name: string) {
  return name.trimStart().replace(/^[«»„“”"'‘’\s]+/u, '')
}
