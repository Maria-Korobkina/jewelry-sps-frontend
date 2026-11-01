
from html.parser import HTMLParser
import json,sys
sys.stdin.reconfigure(encoding='utf-8')
class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True);self.root={'tag':'root','attrs':{},'children':[]};self.stack=[self.root]
    def handle_starttag(self,tag,attrs):
        node={'tag':tag,'attrs':dict(attrs),'children':[]};self.stack[-1]['children'].append(node)
        if tag not in ('area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'):self.stack.append(node)
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i]['tag']==tag:self.stack=self.stack[:i];break
    def handle_data(self,text):self.stack[-1]['children'].append(text)
def text(node):return node if isinstance(node,str) else ''.join(text(c) for c in node['children'])
def walk(node):
    if isinstance(node,str):return
    yield node
    for child in node['children']:yield from walk(child)
out=[]
for html in json.load(sys.stdin):
    p=Parser();p.feed(html);elements=list(walk(p.root))
    def links(node):return [{'href':n['attrs'].get('href'),'text':text(n)} for n in walk(node) if n['tag']=='a']
    out.append({'text':text(p.root),'links':links(p.root),'elements':[{'tag':n['tag'],'id':n['attrs'].get('id'),'text':text(n),'links':links(n)} for n in elements if n['tag'] in ('p','li','h1','h2','h3')]})
json.dump(out,sys.stdout,ensure_ascii=True)
