<template>
    <Teleport to="body">
        <div v-if="show" class="modal-overlay" @click="close">
            <div @click.stop>
                <slot></slot>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    show: boolean // 由父组件控制显示/隐藏
}>()

const emit = defineEmits(['update:show'])

const close = () => {
    emit('update:show', false)
}
</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.close-btn {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background: red;
    color: white;
    cursor: pointer;
}
</style>
