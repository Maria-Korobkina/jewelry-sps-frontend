import { knowledgeLinks } from '../knowledge/links.ts'
import { designScenarioTitle } from '../design/title.ts'
import type { BusinessStep } from './types.ts'


export function getStepArticleLinks(step: BusinessStep) {
  const specific: Record<string, string[]> = {
    '2.produce': ['production-business'], '2.both': ['production-business', 'after-registration'],
    '3.self': ['manufacturer-obligations'], '3.russian': ['manufacturer-check'], '3.foreign': ['foreign-manufacturer', 'jewelry-import'], '3.mixed': ['mixed-production', 'manufacturer-check'],
    '4.metals': ['precious-metals', 'special-account'], '4.stones': ['precious-stones', 'special-account'], '4.both': ['precious-metals', 'precious-stones', 'special-account'],
    '5.russia': ['supply-documents', 'jewelry-purchase'], '5.foreign': ['jewelry-import', 'supply-documents'], '5.both': ['jewelry-purchase', 'jewelry-import', 'supply-documents'],
    '6.shop': ['jewelry-store'], '6.online': ['online-sales'], '6.marketplace': ['marketplace-sales'], '6.wholesale': ['wholesale-jewelry'],
    '7.new': ['supply-documents'], '7.client': ['client-jewelry'], '7.used': ['used-jewelry'], '7.both': ['client-jewelry', 'used-jewelry'],
    '7.1.repair': ['jewelry-repair'], '7.1.remake': ['jewelry-remaking'], '7.1.make': ['client-materials'], '7.1.several': ['jewelry-repair', 'jewelry-remaking', 'client-materials'],
    '8.yes': ['design-rights', 'trademark-protection'], '8.other': ['supply-documents', 'jewelry-purchase'], '8.both': ['design-rights', 'trademark-protection', 'supply-documents', 'jewelry-purchase'],
    '9.yes': ['employees'], '10.yes': ['check-premises'], '10.no': ['choose-premises'],
  }
  const slugs = specific[step.id] ?? (step.id === '2.services' ? ['jewelry-workshop', 'after-registration']
    : step.id === '1.none' ? ['business-registration']
    : ['4.metals', '4.stones', '4.both'].includes(step.id) ? ['special-account', 'after-registration']
    : ['1.ip', '1.company'].includes(step.id) || step.questionId === '2' ? ['after-registration']
    : ['8.yes', '8.both'].includes(step.id) ? ['design-rights', 'industrial-design'] : [])
  const additions = ['3.russian', '3.foreign', '3.mixed'].includes(step.id) ? ['manufacturer-assignment', 'contract-and-materials'] : ['6.shop', '6.online', '6.marketplace'].includes(step.id) ? ['preparing-for-sale'] : []
  return knowledgeLinks([...slugs, ...additions], 'business')
}

export function getStepSurveyLinks(step: BusinessStep) {
  return step.questionId === '8' && ['yes', 'both'].includes(step.answerId) ? [
    { href: '/design/survey?first=1&from=business', title: designScenarioTitle },
    { href: '/similar-products/survey?first=1&from=business', title: 'Другой производитель предлагает похожие изделия' },
  ] : []
}
