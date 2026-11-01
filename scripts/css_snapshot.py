
from pathlib import Path
import json
import re
import hashlib

ROOT = Path(__file__).resolve().parent.parent
WIDTHS = [360, 375, 390, 430, 1280, 1440]

def active_css(source, width):
    output, position = [], 0
    while True:
        match = re.search(r'@media\b', source[position:])
        if not match:
            output.append(source[position:])
            break
        start = position + match.start()
        opening = source.index('{', start)
        depth, end = 1, opening + 1
        while depth:
            depth += (source[end] == '{') - (source[end] == '}')
            end += 1
        output.append(source[position:start])
        condition = source[start:opening]
        limit = re.search(r'max-width:\s*(\d+)px', condition)
        if limit and width <= int(limit[1]):
            output.append(active_css(source[opening+1:end-1], width))
        elif not limit:
            output.append(source[start:end])
        position = end
    return re.sub(r'\s+', ' ', ''.join(output)).strip()

def digest(source, width):
    return hashlib.sha256(active_css(source, width).encode()).hexdigest()

