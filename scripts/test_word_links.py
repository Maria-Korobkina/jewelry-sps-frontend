
from io import BytesIO
from zipfile import ZipFile
from read_word import read_word

raw=BytesIO()
with ZipFile(raw,'w') as z:
    z.writestr('word/styles.xml','<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"/>')
    z.writestr('word/_rels/document.xml.rels','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="r1" Target="https://example.test/law?req=doc&amp;n=123&amp;dst=456#part"/></Relationships>')
    z.writestr('word/document.xml','''<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>
      <w:p><w:r><w:t>ordinary</w:t></w:r><w:hyperlink r:id="r1"><w:smartTag><w:r><w:t>nested</w:t></w:r></w:smartTag></w:hyperlink><w:r><w:t>ordinary</w:t></w:r></w:p>
      <w:p><w:fldSimple w:instr=' HYPERLINK "https://example.test/field?base=LAW&amp;date=2026" '><w:r><w:t>same</w:t></w:r></w:fldSimple><w:r><w:t>same</w:t></w:r></w:p>
      <w:p><w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText>HYPERLINK "https://example.test/complex?demo=1"</w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>complex</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r><w:r><w:t>after</w:t></w:r></w:p>
      <w:tbl><w:tr><w:tc><w:p><w:hyperlink r:id="r1"><w:r><w:t>table</w:t></w:r></w:hyperlink></w:p></w:tc></w:tr></w:tbl>
    </w:body></w:document>''')
d=read_word(raw.getvalue());ps=d['paragraphs']
assert [r['href'] for r in ps[0]['runs']]==[None,'https://example.test/law?req=doc&n=123&dst=456#part',None]
assert [r['href'] for r in ps[1]['runs']]==['https://example.test/field?base=LAW&date=2026',None]
assert [r['href'] for r in ps[2]['runs']]==['https://example.test/complex?demo=1',None]
assert ps[3]['inTable'] and ps[3]['runs'][0]['href']==ps[0]['runs'][1]['href']
assert d['tableCount']==1
print('OOXML link boundaries verified')
