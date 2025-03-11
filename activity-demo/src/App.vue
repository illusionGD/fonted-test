<template>
    <div class="f-z-16 main">
        <index></index>
    </div>
</template>

<script setup lang="ts">
import index from '@/components/index.vue'
console.log('app')
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

ul,
li,
body,
span,
img,
a {
    list-style: none;
    margin: 0;
    padding: 0;
}

body {
    margin: 0;
    padding: 0;
    font-size: 0.16rem;
    font-family: 'MiSans-Regular', 'Microsoft YaHei', sans-serif;
    &::-webkit-scrollbar {
        width: 0.05rem;
        background-color: #000;
    }
}
</style>
