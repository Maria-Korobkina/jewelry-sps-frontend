export const claimTemplates = [
  { id: 'copyright-claim', title: 'Претензия о нарушении авторских прав', description: 'Шаблон Word с полями и пояснениями для самостоятельного заполнения.', href: '/documents/claims/copyright-claim.docx' },
  { id: 'patent-claim', title: 'Претензия о нарушении права на промышленный образец', description: 'Шаблон Word для правообладателя патента на промышленный образец.', href: '/documents/claims/industrial-design-claim.docx' },
  { id: 'trademark-claim', title: 'Претензия о нарушении права на товарный знак', description: 'Шаблон Word для правообладателя товарного знака.', href: '/documents/claims/trademark-claim.docx' },
]


const routeClaims: Record<string, string[]> = {
  patent: ['patent-claim'], 'no-patent': ['copyright-claim'], copyright: ['copyright-claim'],
  trademark: ['trademark-claim'], 'unregistered-trademark': [],
  'patent-copyright': ['patent-claim', 'copyright-claim'],
  'patent-trademark': ['patent-claim', 'trademark-claim'],
  'copyright-trademark': ['copyright-claim', 'trademark-claim'],
  'all-rights': ['patent-claim', 'copyright-claim', 'trademark-claim'],
}
export function claimsForRoute(route: string, action: string) {
  if (!['stop', 'compensate', 'court'].includes(action)) return []
  return claimTemplates.filter(template => routeClaims[route]?.includes(template.id))
}
