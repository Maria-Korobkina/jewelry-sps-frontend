import { businessQuestions } from './content.ts'
import { calculateResult } from './rules.ts'
import type { BusinessService } from './types.ts'


export const businessService: BusinessService = {
  async getQuestions() { return businessQuestions },
  async getResult(answers) { return calculateResult(answers) },
}
