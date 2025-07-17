import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import { AssetPack, type AssetPackConfig } from '@assetpack/core'
async function assetpackPlugin() {
  const apConfig: AssetPackConfig = (await import('./assetpack.config.ts')).default
  let mode: ResolvedConfig['command']
  let ap: AssetPack | undefined

  return {
    name: 'vite-plugin-assetpack',
    configResolved(resolvedConfig) {
      mode = resolvedConfig.command
      if (!resolvedConfig.publicDir) return
      if (apConfig.output) return
      const publicDir = resolvedConfig.publicDir.replace(process.cwd(), '')
      apConfig.output = `.${publicDir}/assets/`
    },
    buildStart: async () => {
      if (mode === 'serve') {
        if (ap) return
        ap = new AssetPack(apConfig)
        void ap.watch()
      } else {
        await new AssetPack(apConfig).run()
      }
    },
    buildEnd: async () => {
      if (ap) {
        await ap.stop()
        ap = undefined
      }
    }
  }
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [assetpackPlugin()],
  server: {
    port: 8080
  }
})
