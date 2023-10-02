// @ts-ignore
import packageLock from '../package-lock.json' assert { type: 'json' }

// @ts-ignore
export const isBun = typeof Bun !== 'undefined'

// @ts-ignore
export const isDeno = typeof Deno !== 'undefined'

export const isElectron =
  // @ts-ignore
  typeof process !== 'undefined' && !!process.versions.electron

export const isNode =
  // @ts-ignore
  !isBun && !isElectron && typeof process !== 'undefined'

export const isEdgeRuntime =
  // @ts-ignore
  typeof EdgeRuntime !== 'undefined'

export const isBrowser =
  typeof navigator !== 'undefined' && navigator.userAgent?.startsWith?.('Mozilla/5.0 ')

const BOWSER = 'https://cdn.jsdelivr.net/npm/bowser@2.11.0/src/bowser.js'

let parsedUserAgent
async function parseUserAgent() {
  const { default: Bowser } = await import(BOWSER)
  parsedUserAgent ||= Bowser.parse(window.navigator.userAgent)
  return parsedUserAgent
}

async function isEngine(engine: string) {
  const userAgentData = await parseUserAgent()
  return userAgentData.engine.name === engine
}

async function isVersionAtLeast(version: number) {
  const userAgentData = await parseUserAgent()
  return parseInt(userAgentData.browser.version.split('.')[0], 10) >= version
}

export const isBlink = isBrowser && (await isEngine('Blink'))

export const isWebKit = isBrowser && (await isEngine('WebKit'))
export const isWebKitAbove17 = isBrowser && isWebKit && (await isVersionAtLeast(17))

export const isGecko = isBrowser && (await isEngine('Gecko'))

export const isWorkerd =
  typeof navigator !== 'undefined' && navigator.userAgent === 'Cloudflare-Workers'
