import { productionContract } from '../design/contract.ts'
import { claimTemplates } from './claimTemplates.ts'


export const documentTemplates = [
  { id: 'manufacturing-contract', ...productionContract },
  { id: 'vat-invoice', title: 'Шаблон счёта-фактуры', description: 'Документ Word для заполнения.', href: '/documents/templates/vat-invoice.docx' },
  ...claimTemplates,
]
