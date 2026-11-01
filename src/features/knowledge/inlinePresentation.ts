import type { ArticleInline } from './types.ts'


export function inlinePresentation(runs: ArticleInline[]): ArticleInline[][] {
  const chars = runs.flatMap(run => [...run.text].map(text => ({ ...run, text })))
  const normalized: ArticleInline[] = []
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]
    if (/[\t \u00a0]/u.test(char.text)) {
      if (normalized.at(-1)?.text === ' ') continue
      let next = i + 1
      while (next < chars.length && /[\t \u00a0]/u.test(chars[next].text)) next++
      if (next < chars.length && /[,.;:!?]/u.test(chars[next].text)) continue
      normalized.push({ ...char, text: ' ' })
    } else normalized.push(char)
  }
  const groups: ArticleInline[][] = []
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i]
    let href = char.href || undefined
    if (!char.text.trim()) {

      const previous = normalized[i - 1]?.href
      const next = normalized[i + 1]?.href
      href = previous && previous === next ? previous : undefined
    }
    const part = { ...char, href }
    const group = groups.at(-1)
    if (group && group[0].href === href) group.push(part)
    else groups.push([part])
  }
  return groups.map(group => {
    if (!group.some(part => part.text.trim())) group = group.map(part => ({ ...part, href: undefined }))

    const result: ArticleInline[] = []
    for (const part of group) {
      const last = result.at(-1)
      if (last && last.bold === part.bold && last.italic === part.italic && last.underline === part.underline) last.text += part.text
      else result.push({ ...part })
    }
    return result
  })
}
