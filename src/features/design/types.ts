export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type DesignQuestionId = 'rights' | 'patent' | 'sales' | 'suppliers' | 'materials'
export type DesignAnswers = Partial<Record<DesignQuestionId, string[]>>
export interface DesignQuestion {
  id: DesignQuestionId
  title: string
  kind: 'single' | 'multi' | 'matrix'
  options: { id: string; label: string }[]
}
export interface DesignStage {
  id: StageId
  title: string
  action: string
  paragraphs: string[]
  goal: string
  tasks: string[]
  criteria: string[]
}
export interface StageRecommendation { stageId: StageId; reasons: string[] }
export interface DesignRecommendation { items: { questionId: DesignQuestionId; title: string; stages: StageId[]; articles: string[]; suppliers?: boolean }[] }
