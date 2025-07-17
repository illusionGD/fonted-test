import { ArrayOr, Assets, UnresolvedAsset } from 'pixi.js'
export interface ManifestType {
  bundles: {
    name: BundlesNameType
    /** Assets contained in the bundle. Can be an array of assets or a record mapping aliases to sources. */
    assets:
      | UnresolvedAsset[]
      | Record<string, ArrayOr<string> | UnresolvedAsset>
  }[]
}

export const BUNDLES_NAME_MAP = {
  default: 'default',
  common: 'common',
  game: 'game',
  home: 'home',
  preload: 'preload',
  result: 'result',
  resultAtlas: 'result-atlas'
} as const

export const allBundlesNames: string[] = []

export const loadedBundles: string[] = []

export type BundlesNameType = keyof typeof BUNDLES_NAME_MAP

const manifestJson: ManifestType = { bundles: [] }

async function fetchAssetsManifest(url: string) {
  const response = await fetch(url)
  const manifest = await response.json()
  if (!manifest.bundles) {
    throw new Error('[Assets] Invalid assets manifest')
  }
  return manifest
}

export async function loadManifestJson() {
  const manifest = await fetchAssetsManifest('assets/manifest.json')
  Object.assign(manifestJson, manifest)
  console.log('🚀 ~ manifestJson:', manifestJson.bundles)

  allBundlesNames.push(...manifestJson.bundles.map((item) => item.name))

  await Assets.init({
    manifest: manifestJson,
    basePath: 'assets',
    texturePreference: {
      resolution: 1,
      format: ['avif', 'webp', 'png', 'jpg', 'jpeg']
    }
  })

  return manifestJson
}

export function checkBundleExists(bundle: string) {
  return !!allBundlesNames.find((name) => name === bundle)
}

export async function loadBundles<T>(bundlesName: string | string[]) {
  if (typeof bundlesName === 'string') {
    bundlesName = [bundlesName]
  }
  const loadList = []
  for (let index = 0; index < bundlesName.length; index++) {
    const name = bundlesName[index]
    if (!checkBundleExists(name)) {
      console.log('🚀 ~ Bundle not exists:', name)
      continue
    }
    loadList.push(Assets.loadBundle(name))
  }
  const loadedList = (await Promise.all(loadList)) as T
  console.log('🚀 ~ loadedBundles:', loadedList)
  loadedBundles.push(...bundlesName)

  return loadedList
}

export async function initAssets() {
  await loadManifestJson()
  // 预加载
  await loadBundles(BUNDLES_NAME_MAP.preload)
  // 空闲加载
  Assets.backgroundLoadBundle(
    allBundlesNames.filter((name) => name !== BUNDLES_NAME_MAP.preload)
  )
}
