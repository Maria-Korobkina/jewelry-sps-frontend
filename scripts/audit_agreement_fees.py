
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import json
import hashlib
import re

ROOT = Path(__file__).resolve().parent.parent
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
W = '{' + NS['w'] + '}'


def text(node):
    return ''.join(n.text or '' if n.tag == W + 't' else '\t' if n.tag == W + 'tab' else '\n' for run in node.iter(W + 'r') for n in run if n.tag in (W + 't', W + 'tab', W + 'br'))


result = []
for name in ['Пользовательское соглашение.docx', 'Пошлины_Роспатента (2).docx']:
    path = ROOT / 'tests/fixtures/documents/legal' / name
    with ZipFile(path) as archive:
        root = ET.fromstring(archive.read('word/document.xml'))
        relationships = {r.get('Id'): r.get('Target') for r in ET.fromstring(archive.read('word/_rels/document.xml.rels'))}
        hyperlinks = [{'text': text(link), 'href': relationships.get(link.get('{' + NS['r'] + '}id'))} for link in root.findall('.//w:hyperlink', NS)]
        fields = []
        stack = []
        for n in root.iter():
            if n.tag == W + 'fldChar':
                kind = n.get(W + 'fldCharType')
                if kind == 'begin': stack.append('')
                elif kind == 'separate' and stack:
                    match = re.search(r'HYPERLINK\s+"([^"]+)"', stack[-1], re.I)
                    if match: fields.append(match[1].replace('\\&', '&'))
                elif kind == 'end' and stack: stack.pop()
            elif n.tag == W + 'instrText' and stack:
                stack[-1] += n.text or ''
        result.append({'source': name, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                       'paragraphs': [{'index': i + 1, 'text': text(p)} for i, p in enumerate(root.findall('.//w:body//w:p', NS))],
                       'tables': [[[text(cell) for cell in row.findall('w:tc', NS)] for row in table.findall('w:tr', NS)] for table in root.findall('.//w:tbl', NS)],
                       'links': hyperlinks, 'fields': fields})
print(json.dumps(result, ensure_ascii=True))
