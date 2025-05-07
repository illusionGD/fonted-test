<template>
    <div class="app" ref="pixiView"></div>
</template>

<script setup lang="ts">
import {
    Application,
    Assets,
    Sprite,
    Container,
    Texture,
    TilingSprite,
    DisplacementFilter,
} from 'pixi.js'
import { ref } from 'vue'
const app = new Application()
const pixiView = ref<HTMLElement>(null)
const fishes = []
globalThis.__PIXI_APP__ = app
init()
async function init() {
    await app.init({
        background: '#1099bb',
        resizeTo: window,
        width: window.innerWidth,
        height: window.innerHeight,
    })
    if (pixiView.value) {
        pixiView.value.appendChild(app.canvas)
    }
    await preload()
    addBackground()
    addFishes(fishes)
    addWaterOverlay()
    addDisplacementEffect()
    app.ticker.add((time) => {
        animateFishes(fishes, time)
        animateWaterOverlay(time)
    })
}

function addBackground() {
    const background = Sprite.from('background')
    background.anchor.set(0.5)
    if (app.screen.width > app.screen.height) {
        background.width = app.screen.width * 1.2
        background.scale.y = background.scale.x
    } else {
        background.height = app.screen.height * 1.2
        background.scale.x = background.scale.y
    }
    background.x = app.screen.width / 2
    background.y = app.screen.height / 2
    app.stage.addChild(background)
}

function addFishes(fishes) {
    const fishContainer = new Container()
    app.stage.addChild(fishContainer)
    const fishCount = 20
    const fishAssets = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5']
    for (let i = 0; i < fishCount; i++) {
        const fishAsset = fishAssets[i % fishAssets.length]
        const fish = Sprite.from(fishAsset)

        fish.anchor.set(0.5)

        fish.direction = Math.random() * Math.PI * 2
        fish.speed = 2 + Math.random() * 2
        fish.turnSpeed = Math.random() - 0.8

        fish.x = Math.random() * app.screen.width
        fish.y = Math.random() * app.screen.height
        fish.scale.set(0.5 + Math.random() * 0.2)

        fishContainer.addChild(fish)
        fishes.push(fish)
    }
}

function animateFishes(fishes, time) {
    const delta = time.deltaTime

    const stagePadding = 100
    const boundWidth = app.screen.width + stagePadding * 2
    const boundHeight = app.screen.height + stagePadding * 2
    fishes.forEach((fish) => {
        fish.direction += fish.turnSpeed * 0.01
        fish.x += Math.sin(fish.direction) * fish.speed
        fish.y += Math.cos(fish.direction) * fish.speed
        fish.rotation = -fish.direction - Math.PI / 2

        if (fish.x < -stagePadding) {
            fish.x += boundWidth
        }
        if (fish.x > app.screen.width + stagePadding) {
            fish.x -= boundWidth
        }
        if (fish.y < -stagePadding) {
            fish.y += boundHeight
        }
        if (fish.y > app.screen.height + stagePadding) {
            fish.y -= boundHeight
        }
    })
}

let overlay

function addWaterOverlay() {
    // Create a water texture object.
    const texture = Texture.from('overlay')

    // Create a tiling sprite with the water texture and specify the dimensions.
    overlay = new TilingSprite({
        texture,
        width: app.screen.width,
        height: app.screen.height,
    })

    // Add the overlay to the stage.
    app.stage.addChild(overlay)
}

function animateWaterOverlay(time) {
    // Extract the delta time from the Ticker object.
    const delta = time.deltaTime

    // Animate the overlay.
    overlay.tilePosition.x -= delta
    overlay.tilePosition.y -= delta
}

function addDisplacementEffect() {
    const sprite = Sprite.from('displacement')

    sprite.texture.baseTexture.wrapMode = 'repeat'
    const filter = new DisplacementFilter({
        sprite,
        scale: 50,
    })

    app.stage.filters = [filter]
}

async function preload() {
    const assets = [
        {
            alias: 'background',
            src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg',
        },
        {
            alias: 'fish1',
            src: 'https://pixijs.com/assets/tutorials/fish-pond/fish1.png',
        },
        {
            alias: 'fish2',
            src: 'https://pixijs.com/assets/tutorials/fish-pond/fish2.png',
        },
        {
            alias: 'fish3',
            src: 'https://pixijs.com/assets/tutorials/fish-pond/fish3.png',
        },
        {
            alias: 'fish4',
            src: 'https://pixijs.com/assets/tutorials/fish-pond/fish4.png',
        },
        {
            alias: 'fish5',
            src: 'https://pixijs.com/assets/tutorials/fish-pond/fish5.png',
        },
        {
            alias: 'overlay',
            src: 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png',
        },
        {
            alias: 'displacement',
            src: 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png',
        },
    ]
    await Assets.load(assets)
}
</script>
<style>
body {
    margin: 0;
}
</style>
