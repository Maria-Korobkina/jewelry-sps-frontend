
from zipfile import ZipFile
from io import BytesIO
import xml.etree.ElementTree as ET
import re

NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
W = '{' + NS['w'] + '}'

def hyperlink_target(instruction):

    match = re.search(r'\bHYPERLINK\b(.*)', instruction, re.I | re.S)
    if not match:
        return None
    tokens = re.findall(r'"([^"]*)"|(\S+)', match[1])
    tokens = [quoted or bare for quoted, bare in tokens]
    target, fragment = None, None
    index = 0
    while index < len(tokens):
        token = tokens[index]
        if token.lower() == '\\l' and index + 1 < len(tokens):
            fragment = tokens[index + 1]
            index += 2
        elif token.lower() in ('\\o', '\\t'):
            index += 2
        elif token.startswith('\\'):
            index += 1
        else:
            if target is None:
                target = token
            index += 1
    if fragment is not None:
        return (target or '').split('#', 1)[0] + '#' + fragment
    return target

def read_word(data):
    with ZipFile(BytesIO(data)) as z:
        doc = ET.fromstring(z.read('word/document.xml'))
        styles = ET.fromstring(z.read('word/styles.xml'))
        rels = ET.fromstring(z.read('word/_rels/document.xml.rels'))
        numbering = ET.fromstring(z.read('word/numbering.xml')) if 'word/numbering.xml' in z.namelist() else None
    style_map = {s.get(W + 'styleId'): s for s in styles.findall('w:style', NS)}
    relations = {r.get('Id'): r.get('Target') for r in rels}
    parents = {child: p for p in doc.iter() for child in p}
    default = next((s.get(W + 'styleId') for s in style_map.values() if s.get(W + 'type') == 'paragraph' and s.get(W + 'default') == '1'), None)

    def properties(node):
        return {} if node is None else {p.tag.split('}')[-1]: {k.split('}')[-1]: v for k, v in p.attrib.items()} for p in node}

    def style_properties(sid, kind, seen=None):
        seen = set() if seen is None else seen
        if sid not in style_map or sid in seen:
            return {}
        seen.add(sid)
        style = style_map[sid]
        base = style.find('w:basedOn', NS)
        result = style_properties(base.get(W + 'val'), kind, seen) if base is not None else {}
        result.update(properties(style.find('w:' + kind, NS)))
        return result

    def enabled(fmt, key):
        return key in fmt and fmt[key].get('val', '1') not in ('0', 'false', 'off')

    abstract = {} if numbering is None else {n.get(W + 'abstractNumId'): n for n in numbering.findall('w:abstractNum', NS)}
    nums = {} if numbering is None else {n.get(W + 'numId'): n for n in numbering.findall('w:num', NS)}
    paragraphs = []
    for index, p in enumerate(doc.findall('.//w:body//w:p', NS), 1):
        pstyle = p.find('w:pPr/w:pStyle', NS)
        sid = pstyle.get(W + 'val') if pstyle is not None else default
        pprops = style_properties(sid, 'pPr')
        pprops.update(properties(p.find('w:pPr', NS)))
        numpr = p.find('w:pPr/w:numPr', NS)
        if numpr is None and sid in style_map:
            chain = sid
            while chain in style_map:
                numpr = style_map[chain].find('w:pPr/w:numPr', NS)
                if numpr is not None:
                    break
                base = style_map[chain].find('w:basedOn', NS)
                chain = base.get(W + 'val') if base is not None else None
        list_info = None
        if numpr is not None:
            num_id = numpr.find('w:numId', NS)
            level = numpr.find('w:ilvl', NS)
            num_id = num_id.get(W + 'val') if num_id is not None else None
            level = level.get(W + 'val') if level is not None else '0'
            num = nums.get(num_id)
            abs_id = num.find('w:abstractNumId', NS).get(W + 'val') if num is not None else None
            abs_node = abstract.get(abs_id)
            lvl = abs_node.find(f"w:lvl[@w:ilvl='{level}']", NS) if abs_node is not None else None
            if lvl is not None:
                num_format = lvl.find('w:numFmt', NS)
                start = lvl.find('w:start', NS)
                list_info = {'id': num_id, 'level': int(level), 'format': num_format.get(W + 'val') if num_format is not None else 'bullet', 'start': int(start.get(W + 'val')) if start is not None else 1}
        runs = []
        fields = []
        def field_href(instruction):
            return hyperlink_target(instruction)
        for run in p.findall('.//w:r', NS):
            char = run.find('w:fldChar', NS)
            if char is not None:
                kind = char.get(W+'fldCharType')
                if kind == 'begin': fields.append({'instruction': '', 'href': None})
                elif kind == 'separate' and fields: fields[-1]['href'] = field_href(fields[-1]['instruction'])
                elif kind == 'end' and fields: fields.pop()
            if fields:
                fields[-1]['instruction'] += ''.join(n.text or '' for n in run.findall('w:instrText', NS))
            text = ''.join(n.text or '' if n.tag == W + 't' else '\t' if n.tag == W + 'tab' else '\n' for n in run if n.tag in (W + 't', W + 'tab', W + 'br'))
            if not text:
                continue
            fmt = properties(styles.find('w:docDefaults/w:rPrDefault/w:rPr', NS))
            fmt.update(style_properties(sid, 'rPr'))
            rstyle = run.find('w:rPr/w:rStyle', NS)
            if rstyle is not None:
                fmt.update(style_properties(rstyle.get(W + 'val'), 'rPr'))
            fmt.update(properties(run.find('w:rPr', NS)))
            ancestor = parents.get(run)
            href = fields[-1]['href'] if fields else None
            while ancestor is not None and ancestor is not p:
                if ancestor.tag == W + 'hyperlink':
                    href = relations.get(ancestor.get('{' + NS['r'] + '}id')) or ('#'+ancestor.get(W+'anchor') if ancestor.get(W+'anchor') else None)
                if ancestor.tag == W + 'fldSimple':
                    href = field_href(ancestor.get(W+'instr',''))
                ancestor = parents.get(ancestor)
            runs.append({'text': text, 'bold': enabled(fmt, 'b'), 'italic': enabled(fmt, 'i'),
                         'underline': enabled(fmt, 'u') and fmt.get('u', {}).get('val') != 'none',
                         'href': href, 'format': fmt})
        style_name = style_map[sid].find('w:name', NS) if sid in style_map else None
        ancestry = []
        ancestor = parents.get(p)
        while ancestor is not None:
            ancestry.append(ancestor.tag.split('}')[-1])
            ancestor = parents.get(ancestor)
        paragraphs.append({'index': index, 'text': ''.join(r['text'] for r in runs),
                           'style': style_name.get(W + 'val') if style_name is not None else sid,
                           'properties': pprops, 'list': list_info, 'runs': runs, 'inTable': 'tbl' in ancestry,
                           'fieldInstructions': [n.text for n in p.findall('.//w:instrText', NS)]})
    return {'paragraphs': paragraphs, 'tableCount': len(doc.findall('.//w:tbl', NS)), 'relationships': relations}
