<template>
    <div ref="tutorials"></div>
</template>

<script setup lang="ts">
import { Application, Graphics } from 'pixi.js'
import { onMounted, ref } from 'vue'
const app = new Application()
globalThis.__PIXI_APP__ = app
const tutorials = ref(null)
onMounted(() => {
    init()
})
window.addEventListener('resize', handleResize)
// 判断是否为移动设备
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
}
function handleResize() {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    const isLandscape = screenWidth > screenHeight
    // 手机设备：强制竖屏（旋转画布）
    if (!isLandscape || isMobile()) {
        // 横屏检测
        // 调整渲染器尺寸
        app.renderer.resize(screenHeight, screenWidth)

        // 旋转画布
        app.stage.rotation = Math.PI / 2
        app.stage.position.set(app.stage.height, 0)
    }
    // PC设备：保持横屏，按比例缩放
    else {
        app.stage.position.set(0, 0)
        app.stage.rotation = 0

        // 调整渲染器尺寸
        app.renderer.resize(screenWidth, screenHeight)
        // app.stage.scale.set(screenWidth / screenHeight)
    }
}
async function init() {
    await app.init({
        background: '#021f4b',
        resizeTo: window,
        autoDensity: true,
        resolution: window.devicePixelRatio || 1,
    })
    if (tutorials.value) {
        tutorials.value.appendChild(app.canvas)
    }

    addStar()
    addMoon()
    addMountains()
    addTrees()
    handleResize()
}

function addStar() {
    const count = 20
    const graphics = new Graphics()
    for (let index = 0; index < count; index++) {
        const x = (index * 0.78695 * app.screen.width) % app.screen.width
        const y = (index * 0.9382 * app.screen.height) % app.screen.height
        const radius = 2 + Math.random() * 3
        const rotation = Math.random() * Math.PI * 2

        graphics
            .star(x, y, 5, radius, 0, rotation)
            .fill({ color: 0xffdf00, alpha: radius / 5 })
    }
    app.stage.addChild(graphics)
}
function addMoon() {
    const graphics = new Graphics().svg(
        `<svg width="111" height="126" viewBox="0 0 111 126" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M9.99794 104.751C44.7207 104.751 72.869 76.6028 72.869 41.8801C72.869 25.9516 66.9455
        11.4065 57.1812 0.327637C87.3034 4.98731 110.363 31.0291 110.363 62.4566C110.363 97.1793
        82.2144 125.328 47.4917 125.328C28.6975 125.328 11.8294 117.081 0.308472 104.009C3.46679
        104.498 6.70276 104.751 9.99794 104.751Z" fill="#FFDF00"/>
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M57.4922 0.682129C75.7709 10.9731 88 29.7256 88 51.1529C88 83.6533 59.8656 110 25.16
        110C16.9934 110 9.19067 108.541 2.03273 105.887C1.44552 105.272 0.870627 104.646 0.308472
        104.008C3.46679 104.497 6.70276 104.75 9.99794 104.75C44.7207 104.75 72.869 76.6018 72.869
        41.8791C72.869 26.1203 67.0711 11.7158 57.4922 0.682129Z" fill="#DEC61A"/>
</svg>`
    )
    graphics.x = app.screen.width / 2 + 100
    graphics.y = app.screen.height / 8
    app.stage.addChild(graphics)
}

function addTrees() {
    const treeWidth = 200
    const y = app.screen.height - 20
    const spacing = 15
    const count = app.screen.width / (treeWidth + spacing) + 1
    const trees = []

    for (let index = 0; index < count; index++) {
        const treeHeight = 225 + Math.random() * 50
        const tree = createTree(treeWidth, treeHeight)

        tree.x = index * (treeWidth + spacing)
        tree.y = y

        app.stage.addChild(tree)
        trees.push(tree)
    }

    app.ticker.add((time) => {
        const dx = time.deltaTime * 3

        trees.forEach((tree) => {
            tree.x -= dx

            if (tree.x <= -(treeWidth / 2 + spacing)) {
                tree.x += count * (treeWidth + spacing) + spacing * 3
            }
        })
    })
}

function createTree(width, height) {
    const trunkWidth = 30
    const trunkHeight = height / 4
    const trunkColor = 0x563929
    const graphics = new Graphics()
        .rect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight)
        .fill({ color: trunkColor })
    const crownHeight = height - trunkHeight
    const crownLevels = 4
    const crownLevelHeight = crownHeight / crownLevels
    const crownWidthIncrement = width / crownLevels
    const crownColor = 0x264d3d

    for (let index = 0; index < crownLevels; index++) {
        const y = -trunkHeight - crownLevelHeight * index
        const levelWidth = width - crownWidthIncrement * index
        const offset = index < crownLevels - 1 ? crownLevelHeight / 2 : 0

        graphics
            .moveTo(-levelWidth / 2, y)
            .lineTo(0, y - crownLevelHeight - offset)
            .lineTo(levelWidth / 2, y)
            .fill({ color: crownColor })
    }
    return graphics
}

function addMountains() {
    const group1 = createMountainGroup()
    const group2 = createMountainGroup()

    group2.x = app.screen.width
    app.ticker.add((time) => {
        const dx = time.deltaTime * 0.5

        group1.x -= dx
        group2.x -= dx

        if (group1.x <= -app.screen.width) {
            group1.x += app.screen.width * 2
        }
        if (group2.x <= -app.screen.width) {
            group2.x += app.screen.width * 2
        }
    })
    app.stage.addChild(group1, group2)
}

function createMountainGroup() {
    const graphics = new Graphics()
    const width = app.screen.width / 2
    const startY = app.screen.height
    const startXLeft = 0
    const startXMiddle = Number(app.screen.width) / 4
    const startXRight = app.screen.width / 2
    const heightLeft = app.screen.height / 2
    const heightMiddle = (app.screen.height * 4) / 5
    const heightRight = (app.screen.height * 2) / 3
    const colorLeft = 0xc1c0c2
    const colorMiddle = 0x7e818f
    const colorRight = 0x8c919f

    graphics
        // Draw the middle mountain
        .moveTo(startXMiddle, startY)
        .bezierCurveTo(
            startXMiddle + width / 2,
            startY - heightMiddle,
            startXMiddle + width / 2,
            startY - heightMiddle,
            startXMiddle + width,
            startY
        )
        .fill({ color: colorMiddle })

        // Draw the left mountain
        .moveTo(startXLeft, startY)
        .bezierCurveTo(
            startXLeft + width / 2,
            startY - heightLeft,
            startXLeft + width / 2,
            startY - heightLeft,
            startXLeft + width,
            startY
        )
        .fill({ color: colorLeft })

        // Draw the right mountain
        .moveTo(startXRight, startY)
        .bezierCurveTo(
            startXRight + width / 2,
            startY - heightRight,
            startXRight + width / 2,
            startY - heightRight,
            startXRight + width,
            startY
        )
        .fill({ color: colorRight })

    return graphics
}
</script>

<style lang="scss" scoped></style>
