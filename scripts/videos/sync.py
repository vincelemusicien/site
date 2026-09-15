"""Refresh public channel metadata only; never downloads media."""
import json, os, re, subprocess, sys, tempfile
from pathlib import Path
from datetime import datetime, timezone
ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / 'src/data/videos/catalogue.json'
CHANNEL = 'UCA13Jn6ozikWGsel8B2VaQQ'

def sync():
    binary = os.environ.get('YT_DLP')
    local = ROOT / '.venv-videos/bin/yt-dlp'
    command = [binary] if binary else ([str(local)] if local.exists() else ['yt-dlp'])
    videos = []
    for kind, tab in [('video','videos'), ('live','streams'), ('short','shorts')]:
        result = subprocess.run(command + ['--extractor-args', 'youtube:lang=fr', '--flat-playlist', '--dump-single-json', '--socket-timeout', '20', '--retries', '2', f'https://www.youtube.com/channel/{CHANNEL}/{tab}'], capture_output=True, text=True, timeout=180, check=True)
        data = json.loads(result.stdout)
        if data.get('channel_id', data.get('id')) != CHANNEL:
            raise ValueError('Unexpected YouTube channel')
        entries = data.get('entries', [])
        if not entries: raise ValueError('Empty channel tab: '+tab)
        for rank, e in enumerate(entries):
            if not re.fullmatch(r'[a-zA-Z0-9_-]{11}', e.get('id','')) or not e.get('title'): continue
            videos.append({'id':e['id'], 'title':e['title'], 'format':kind, 'rank':rank})
    # Reject partial responses rather than silently dropping most of the library.
    previous = json.loads(DEST.read_text()) if DEST.exists() else None
    if previous and len(videos) < len(previous['videos']) * .8: raise ValueError('Suspiciously incomplete catalogue')
    seen=set(); videos=[v for v in videos if not (v['id'] in seen or seen.add(v['id']))]
    payload={'channelId':CHANNEL,'channelUrl':'https://www.youtube.com/@vincelemusicien','updatedAt':datetime.now(timezone.utc).isoformat(), 'videos':videos}
    DEST.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(mode='w',dir=DEST.parent,delete=False,encoding='utf-8') as f:
        json.dump(payload,f,ensure_ascii=False,indent=2); f.write('\n'); temporary=f.name
    os.replace(temporary,DEST)
    print(f'YouTube: {len(videos)} public videos refreshed.')

try: sync()
except Exception as error:
    print('YouTube refresh failed: '+str(error),file=sys.stderr)
    if '--optional' in sys.argv and DEST.exists(): print('Building with the last saved catalogue.',file=sys.stderr)
    else: sys.exit(1)
