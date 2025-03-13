<template>
    <div>
        <canvas ref="canvasDom"></canvas>
        <div class="test-img"></div>
        <img src="../assets/图片_1.jpg" alt="" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import bgImg from '../assets/初心.png'
import icon from '../assets/icon/lADPBFRycRn13bLNAuPNAs8_719_739.jpg'
import { createSDFData, fillImg, getImagePixels, loadImage } from '../utils'
const canvasDom = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D
onMounted(() => {
    ctx = canvasDom.value.getContext('2d')
    drawBg()
})

async function drawBg() {
    const img = await loadImage(bgImg)
    const { width, height } = img
    canvasDom.value.width = width
    canvasDom.value.height = height
    ctx.drawImage(img, 0, 0)

    const imgs = await Promise.all(
        new Array(15).fill(icon).map((src) => loadImage(src))
    )
    const sdfData = await createSDFData(canvasDom.value)
    console.log('🚀 ~ sdfData:', sdfData)
    fillImg(canvasDom.value, sdfData, imgs)
}
</script>

<style lang="scss" scoped>
.test-img {
    background-image: url('../assets/icon/lADPD3lG5MN-zvzNAfjNAcE_449_504.jpg');
}
</style>
