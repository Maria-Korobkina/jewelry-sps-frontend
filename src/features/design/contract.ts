import type { DesignAnswers } from './types.ts'
export const productionContract = {
  title: 'Договор подряда на изготовление ювелирных изделий',
  description: 'Шаблон договора с условиями изготовления, передачи материалов и приёмки ювелирных изделий',
  href: '/documents/contracts/jewelry-manufacturing-contract.docx',
}
export function showProductionContract(answers: DesignAnswers): boolean { return answers.materials?.[0] !== 'jewelry' }
