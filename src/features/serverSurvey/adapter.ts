import { businessQuestions } from '../business/content.ts'
import { cleanAnswers, getBranch } from '../business/rules.ts'
import { designQuestions } from '../design/content.ts'
import { cleanDesignAnswers, getDesignBranch } from '../design/answers.ts'
import { similarQuestions } from '../similar/content.ts'
import { cleanSimilarAnswers, getSimilarBranch } from '../similar/rules.ts'
import type { SurveyAnswers } from '../../api/resultContracts.ts'
export type Scenario = 'open-business' | 'design-rights' | 'similar-products'
const questionCodes: Record<string, string> = { '1':'q1','2':'q2','3':'q3','4':'q4','5':'q5','6':'q6','7':'q7','7.1':'q7_1','8':'q8','9':'q9','10':'q10' }
const optionCodes: Record<string, Record<string, string>> = {
  '1':{company:'llc'},'2':{both:'produce_sell'},'3':{russian:'contractor_ru'},
  '4':{metals:'metal',stones:'stone',both:'metal_stone',jewelry:'bijou'},
  '5':{russia:'ru',foreign:'abroad',unknown:'undecided'},'6':{shop:'store'},
  '7':{new:'new_only',both:'client_used'},'7.1':{remake:'rework',make:'new_from_client_material'},'8':{yes:'own',other:'others'},
}
export function surveyQuestions(s: Scenario) { return s === 'open-business' ? businessQuestions : s === 'design-rights' ? designQuestions : similarQuestions }
export function serverQuestion(s: Scenario, id: string) { return s === 'open-business' ? questionCodes[id] ?? id : id }
export function localQuestion(s: Scenario, code: string) { return s === 'open-business' ? Object.keys(questionCodes).find(k => questionCodes[k] === code) ?? code : code }
export function serverOptions(s: Scenario, id: string, values: string[]) { return values.map(v => s === 'open-business' ? optionCodes[id]?.[v] ?? v : v) }
export function localOptions(s: Scenario, id: string, values: string[]) { return values.map(v => s === 'open-business' ? Object.keys(optionCodes[id] ?? {}).find(k => optionCodes[id][k] === v) ?? v : v) }
export function applicableQuestions(s: Scenario, a: SurveyAnswers): string[] { return s === 'open-business' ? getBranch(a) : s === 'design-rights' ? getDesignBranch(a) : getSimilarBranch(a) }
export function cleanedAnswers(s: Scenario, a: SurveyAnswers): SurveyAnswers { return (s === 'open-business' ? cleanAnswers(a) : s === 'design-rights' ? cleanDesignAnswers(a) : cleanSimilarAnswers(a)) as SurveyAnswers }
export function scenarioPath(s: string) { return s === 'open-business' ? '/business' : s === 'design-rights' ? '/design/result' : '/similar-products' }
