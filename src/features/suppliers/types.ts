export type SupplierCategory = 'all' | 'metals' | 'stones'
export type FilterId = 'metal' | 'form' | 'fineness' | 'product' | 'terms' | 'delivery' | 'stone' | 'origin' | 'cut' | 'format'
export type SupplierFilters = Partial<Record<FilterId, string[]>>
export interface Supplier {
  id: string
  name: string
  category: Exclude<SupplierCategory, 'all'>
  description: string
  tags: string[]
  finenessByMetal: Record<string, string[]>
  website?: string
}
export interface FilterDefinition {
  id: FilterId
  label: string
  category: Exclude<SupplierCategory, 'all'>
  options: { label: string; tags: string[] }[]
}
