export const claimEscalationRoutes = ['copyright', 'trademark', 'unregistered-trademark', 'patent-copyright', 'patent-trademark', 'copyright-trademark', 'all-rights']
export const claimEscalation = {
  articleTitle: 'Что делать, если конкурент не реагирует на претензию?',
  articleHref: '/knowledge/unanswered-claim?from=similar-products',
  introduction: 'Советуем ознакомиться со статьёй:',
  instruction: 'При отсутствии ответа на претензию в течение 30 дней со дня направления претензии перейдите к способу',
}

export function focusCourtMethod(root: ParentNode | null): boolean {
  const heading = root?.querySelector<HTMLElement>('[data-method-action="court"]')
  if (!heading) return false
  heading.focus({ preventScroll: true })
  heading.scrollIntoView({ block: 'start', behavior: 'smooth' })
  return true
}
