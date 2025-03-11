<template>
    <div ref="container" :style="{ width: props.width, height: props.height }">
        <component v-if="visible" :is="asyncComponent" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props = defineProps<{
    asyncComponent: Object
    width?: string | number
    height?: string | number
    callback?: (e?: Object | Element) => void
    options?: IntersectionObserverInit
    /** 加载策略：visible-可视区域加载，empty-空闲时候加载 */
    strategy?: 'visible' | 'empty'
}>()
const visible = ref(false)
const container = ref(null)

function loadComponent() {
    visible.value = true
}

function onLoadCallback(e?: Object | Element) {
    props.callback && props.callback(e)
}

onMounted(() => {
    console.log(props.asyncComponent)

    // 空闲时候加载
    if (props.strategy && props.strategy === 'empty') {
        // 在 requestIdleCallback 中预加载
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
                loadComponent()
                onLoadCallback(props.asyncComponent)
            })
        }
    } else {
        // 可视区域加载
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadComponent()
                        observer.disconnect()
                        onLoadCallback(entry.target)
                    }
                })
            },
            Object.assign(
                {
                    threshold: 0.1,
                },
                props.options || {}
            )
        )
        if (container.value) observer.observe(container.value)
    }
})
</script>
