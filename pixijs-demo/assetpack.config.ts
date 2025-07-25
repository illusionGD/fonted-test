import { pixiPipes } from '@assetpack/core/pixi'


export default {
  entry: './raw-assets',
  output: './public/assets',
  pipes: [
    ...pixiPipes({
        resolutions: { default: 1},
        compression: {webp: false},
        manifest: {createShortcuts: true},
        cacheBust: true
    })
  ]
}
