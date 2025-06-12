<template>
    <span ref="outlineRef">
        <svg
            ref="svgRef"
            width="0"
            height="0"
            viewBox="0 0 0 0"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            wrap
        >
            <text
                v-for="(item, index) in outlineList"
                :key="index"
                v-show="item && item.width >= 0"
                :x="textX"
                :y="textY"
                :fill="textColor"
                :stroke-width="item.width"
                :stroke="item.color"
                :text-decoration="_textDecoration"
            >
                {{ text }}
            </text>
            <text
                ref="textRef"
                x="0"
                y="0"
                font-family="Verdana"
                font-size="64"
                :fill="textColor"
                :text-decoration="_textDecoration"
            >
                {{ text }}
            </text>
        </svg>
    </span>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

const props = defineProps<{
    text: string
    maxWidth?: number
    maxHeight?: number
    outlines?: {
        width: number
        color: string
    }[]
}>()

const outlineList = computed(() => {
    if (!props.outlines) {
        return []
    }
    props.outlines.forEach((item, index) => {
        if (index) {
            item.width = props.outlines[index - 1].width + item.width
        }
        return item
    })

    return props.outlines.reverse()
})
const svgRef = ref<SVGElement>()
const outlineRef = ref<HTMLElement>()
const textRef = ref<SVGTextElement>()
const textColor = ref('')
const textX = ref(0)
const textY = ref(0)
const _textDecoration = ref('')

const ob = new ResizeObserver(() => {
    console.log('resize')
})

onMounted(() => {
    nextTick(() => {
        renderSvg()
        outlineRef.value && ob.observe(outlineRef.value)
    })
})

async function renderSvg() {
    if (!outlineRef.value || !textRef.value || !svgRef.value) return

    const { color, fontSize, fontFamily, textDecoration } = getComputedStyle(
        outlineRef.value
    )

    // 必须先设置字体样式，再测量
    textRef.value.setAttribute('font-size', fontSize)
    textRef.value.setAttribute('fill', color)
    textRef.value.setAttribute('font-family', fontFamily)
    // textRef.value.setAttribute('text-decoration', textDecoration)
    _textDecoration.value = textDecoration

    await nextTick() // 等待渲染完成

    const bbox = textRef.value.getBBox()
    console.log('🚀 ~ bbox:', bbox)
    const descent = bbox.height - Math.abs(bbox.y)
    const outlineW = outlineList.value[0]?.width || 0
    console.log('🚀 ~ outlineList.value:', outlineList.value.length)
    const baselineY = bbox.height - descent
    const svgW = props.maxWidth || bbox.width + outlineW
    console.log('🚀 ~ outlineW:', outlineW)
    console.log('🚀 ~ svgW:', svgW)
    const svgH = props.maxHeight || bbox.height

    svgRef.value.setAttribute('width', `${svgW}`)
    svgRef.value.setAttribute('height', `${svgH}`)
    svgRef.value.setAttribute('viewBox', `0 0 ${svgW} ${svgH}`)

    await nextTick() // 等待渲染完成

    // 设置text位置
    textRef.value.setAttribute('x', `${outlineW / 2}`)
    textRef.value.setAttribute('y', `${baselineY}`)
    textX.value = outlineW / 2
    textY.value = baselineY
}
</script>

<style lang="scss" scoped>
span {
    display: inline-flex;
    text-decoration: inherit;
}
text {
    // text-align: 50px;
    line-height: 50px;
}
</style>
