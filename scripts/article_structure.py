


import re

SECTION_TITLES = {
    'Регистрация ИП', 'Регистрация ООО',
    'ВАЖНО! Что добавить именно для ювелирного бизнеса',
}

def standalone_heading(text):
    value = text.strip()
    label = re.sub(r'^(?:Шаг\s+)?\d+(?:\.\d+)*\.?\s+', '', value)
    return (bool(label) and len(value) <= 110 and len(label.split()) <= 16
            and '\n' not in value and not re.search(r'[.!?;]\s+\S', label))

def heading_level(paragraph, next_paragraph):
    text = paragraph['text'].strip()
    if paragraph.get('inTable') or paragraph.get('list'): return None
    if text in SECTION_TITLES: return 2
    if not standalone_heading(text): return None


    numbered = bool(re.match(r'^(?:Шаг\s+)?\d+(?:\.\d+)*\.?\s+\D', text))
    semantic_style = bool(re.fullmatch(r'heading [123]', (paragraph.get('style') or '').lower()))
    if not (numbered or semantic_style) or not next_paragraph: return None
    if standalone_heading(next_paragraph['text']) and re.match(r'^(?:Шаг\s+)?\d+\.?\s+', next_paragraph['text']): return None
    return 3 if re.match(r'^\d+\.\d+\.', text) else 2
