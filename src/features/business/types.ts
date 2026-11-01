export type QuestionId = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '7.1' | '8' | '9' | '10'
export type BusinessAnswers = Partial<Record<QuestionId, string[]>>
export interface BusinessQuestion {
  id: QuestionId
  title: string
  kind: 'single' | 'multi'
  options: { id: string; label: string }[]
}
export interface RouteContent {
  paragraphs: string[]
  materials: string[]
}
export interface BusinessStep extends RouteContent {
  id: string
  questionId: QuestionId
  answerId: string
  number: number
  title: string
}
export interface BusinessResult {
  kind: 'calculated' | 'needs-clarification'
  issues: string[]
  steps: BusinessStep[]
}
export interface BusinessService {
  getQuestions(): Promise<BusinessQuestion[]>
  getResult(answers: BusinessAnswers): Promise<BusinessResult>
}
