import type { StageId, DesignAnswers } from './types.ts'
import { knowledgeLinks } from '../knowledge/links.ts'

export const designArticleSlugs: Partial<Record<StageId, string[]>> = { 1: ['design-rights', 'copyright-protection'], 2: ['patent-publication', 'industrial-design'], 3: ['production-business', 'business-registration', 'after-registration'], 4: ['jewelry-materials', 'precious-metals', 'precious-stones', 'special-account'], 5: ['manufacturer-brief'], 6: ['manufacturer-check', 'foreign-manufacturer'], 7: ['manufacturer-brief', 'manufacturer-check'], 8: ['manufacturer-brief', 'jewelry-materials'], 9: ['manufacturer-check', 'supply-documents'], 10: ['precious-metals', 'online-sales', 'jewelry-store', 'marketplace-sales', 'wholesale-jewelry'] }
export function getDesignStageLinks(id: StageId, answers: DesignAnswers = {}, returnToResult = false) {
  if (answers.materials?.[0] === 'jewelry' && [4, 7, 8, 9, 10].includes(id)) return []
  const sales: Record<string, string> = { online: 'online-sales', marketplace: 'marketplace-sales', shop: 'jewelry-store', wholesale: 'wholesale-jewelry' }
  const existing = id === 10 && answers.sales?.some(value => value in sales) ? ['precious-metals', ...answers.sales.flatMap(value => sales[value] ? [sales[value]] : [])] : designArticleSlugs[id] ?? []
  const additions: Partial<Record<StageId, string[]>> = { 5: ['manufacturer-assignment'], 7: ['contract-and-materials'], 10: ['preparing-for-sale'] }
  const slugs = [...existing, ...(additions[id] ?? [])]
  return knowledgeLinks(slugs, 'design', returnToResult ? undefined : id).map(link => ({ href: link.href, label: link.title }))
}
export function parseStageId(value: string | undefined): StageId | null {
  return value && /^(?:[1-9]|10)$/.test(value) ? Number(value) as StageId : null
}
