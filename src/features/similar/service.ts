import { similarQuestions } from './content.ts'
import { calculateSimilarResult } from './rules.ts'
import type { SimilarService } from './types.ts'


export const similarService: SimilarService = {
  async getQuestions() { return similarQuestions },
  async getResult(answers) { return calculateSimilarResult(answers) },
}
