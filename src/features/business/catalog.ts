import type { BusinessAnswers, BusinessStep } from './types.ts'
import { catalogHref } from '../suppliers/navigation.ts'

export function isSupplierCatalogMaterial(label: string): boolean {
  return label === 'Каталог поставщиков' || label === 'Каталогом поставщиков'
}

export function getSupplierCatalogLink(step: BusinessStep, answers: BusinessAnswers): string | null {
  const materials = answers['4'] ?? []
  if (step.questionId !== '5' && !step.materials.some(isSupplierCatalogMaterial) && !(step.questionId === '4' && materials[0] === 'both')) return null
  const params = new URLSearchParams({ from: 'business' })
  if (materials.length === 1) {
    if (materials[0] === 'metals') params.set('category', 'metals')
    if (materials[0] === 'stones') params.set('category', 'stones')
  }
  return catalogHref('/business', '/suppliers?' + params.toString())
}
