"""Retrieve public portraits linked by the official program page for review."""
import concurrent.futures
import hashlib
import json
from pathlib import Path
import urllib.request

out = Path('portrait-downloads')
out.mkdir(exist_ok=True)
items = json.loads(Path('docs/teacher-photo-sources.json').read_text())

def fetch(item):
    result = {'name': item['name'], 'url': item['url'], 'filename': item['filename']}
    try:
        request = urllib.request.Request(item['url'], headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(request, timeout=30) as response:
            mime = response.headers.get('Content-Type', '')
            data = response.read(10 * 1024 * 1024)
        if not mime.startswith('image/'):
            raise ValueError('Expected image; got ' + mime)
        (out / item['filename']).write_bytes(data)
        result.update(status='downloaded', bytes=len(data), sha256=hashlib.sha256(data).hexdigest())
    except Exception as error:
        result.update(status='unavailable', error=str(error))
    print(json.dumps(result, ensure_ascii=False), flush=True)
    return result

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(fetch, items))
(out / 'results.json').write_text(json.dumps(results, ensure_ascii=False, indent=2))
