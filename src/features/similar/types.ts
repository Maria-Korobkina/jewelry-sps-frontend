import type { ArticleBlock } from '../knowledge/types.ts'
export type SimilarObject = 'patent' | 'copyright' | 'trademark'
export type SimilarQuestionId = 'objects' | 'patent' | 'trademark' | 'evidence' | 'goal'
export type SimilarAnswers = Partial<Record<SimilarQuestionId, string[]>>
export interface SimilarQuestion { id: SimilarQuestionId; title: string; kind: 'single' | 'multi'; options: { id: string; label: string }[] }
export interface SimilarMethod { id: string; actionId: string; variant: string; title: string; blocks: ArticleBlock[]; snapshot?: boolean; articleLinks?: { title?: string; label?: string; href: string }[]; downloads?: { title?: string; href: string }[]; supplementarySectionLinks?: { title?: string; href: string }[] }
export interface SimilarRoute { routeId: string; title: string; blocks: ArticleBlock[]; methods: SimilarMethod[] }
export interface SimilarResultSection { id: SimilarObject | 'combined'; routeId?: string; title: string; blocks: ArticleBlock[]; methods: SimilarMethod[]; allMethods?: SimilarMethod[]; incomplete: boolean; articleSlugs: string[] }
export interface SimilarResult { sections: SimilarResultSection[] }
export interface SimilarService { getQuestions(): Promise<SimilarQuestion[]>; getResult(answers: SimilarAnswers): Promise<SimilarResult> }
