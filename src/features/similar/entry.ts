import { beginSimilarEdit } from './editing.ts'
import type { SimilarEdit } from './editing.ts'
import type { SimilarDraft } from './storage.ts'


export function enterSimilarSurvey(saved: SimilarDraft, first: boolean): { draft: SimilarDraft; editing: SimilarEdit | null } {
  if (!first) return { draft: saved, editing: null }
  if (saved.answers.objects?.length) return { draft: saved, editing: beginSimilarEdit(saved, 'objects') }
  return { draft: { ...saved, view: 'question', question: 'objects' }, editing: null }
}
