
export function isStandaloneArticleHeading(text: string): boolean {
  const value = text.trim()
  if (value === 'ВАЖНО! Что добавить именно для ювелирного бизнеса') return true
  const label = value.replace(/^(?:Шаг\s+)?\d+(?:\.\d+)*\.?\s+/u, '')
  return Boolean(label) && value.length <= 110 && label.split(/\s+/u).length <= 16 && !value.includes('\n') && !/[.!?;]\s+\S/u.test(label)
}
