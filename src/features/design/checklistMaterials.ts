import { designStages } from './content.ts'


export const checklistMaterials = [
  { id: 'all', title: 'Полный чек-лист реализации дизайна', description: 'Проверка готовности всех десяти этапов: от прав на дизайн до подготовки к продаже.', href: '/design/checklist', wordHref: '/documents/design/checklist-all.docx' },
  ...designStages.map(stage => ({ id: String(stage.id), title: 'Чек-лист: ' + stage.title, description: stage.goal, href: '/design/checklist?stage=' + stage.id, wordHref: '/documents/design/checklist-' + stage.id + '.docx' })),
]
