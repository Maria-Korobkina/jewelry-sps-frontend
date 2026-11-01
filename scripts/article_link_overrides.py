
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent.parent

def apply_link_overrides(articles):
    manifest = ROOT / 'docs/ARTICLE_LINK_OVERRIDES.json'
    if not manifest.exists():
        return articles
    def paragraphs(blocks):
        for block in blocks:
            if block['kind'] == 'list':
                yield from block['items']
            elif block['kind'] == 'table':
                for row in block['rows']:
                    for cell in row:
                        yield from paragraphs(cell['blocks'])
            else:
                yield block
    for entry in json.loads(manifest.read_text(encoding='utf-8')):
        article = next((a for a in articles if a['slug'] == entry['slug']), None)
        if article is None:
            continue
        matches = [p for p in paragraphs(article['blocks']) if p['sourceIndex'] == entry['sourceIndex']]
        assert len(matches) == 1, 'Link source paragraph changed; review before importing'
        assert ''.join(r['text'] for r in matches[0]['runs']) == ''.join(r['text'] for r in entry['runs']), 'Link override must not change legal text'
        matches[0]['runs'] = entry['runs']
    return articles

if __name__ == '__main__':
    path = ROOT / 'src/features/knowledge/articles.ts'
    text = path.read_text(encoding='utf-8-sig')
    start = text.index('= [') + 2
    articles = apply_link_overrides(json.loads(text[start:]))
    path.write_text(text[:start] + json.dumps(articles, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
