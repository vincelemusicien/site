import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
const optional = process.argv.includes('--optional');
const result = spawnSync('python3', ['scripts/videos/sync.py'], { stdio: 'inherit' });
if (result.status !== 0) {
  if (optional && existsSync('src/data/videos/catalogue.json')) {
    console.warn('YouTube: refresh unavailable; using the last saved catalogue.');
  } else {
    console.error(result.error?.message || 'YouTube refresh failed. Run npm run videos:setup.');
    process.exit(1);
  }
}
