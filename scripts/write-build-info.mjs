import { writeFileSync, mkdirSync } from 'node:fs'
import { randomBytes } from 'node:crypto'

const builtAt = new Date().toISOString()
const buildId = builtAt.replaceAll(':', '-').replace('.', '-') + '-' + randomBytes(4).toString('hex')
mkdirSync('public', { recursive: true })
writeFileSync('public/build-info.json', JSON.stringify({ buildId, builtAt, timeZone: 'UTC' }, null, 2) + '\n')
console.log('Build ID: ' + buildId)
