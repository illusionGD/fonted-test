<template>
    <div class="icon-cs bg-contain flex-center">
        <div class="eyes flex-center">
            <div class="eye left"></div>
            <div class="eye right"></div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.icon-cs {
    cursor: pointer;
    position: fixed;
    right: 0;
    bottom: 0.5rem;
    width: 0.8rem;
    height: 0.8rem;
    background-image: url('../assets/images/common/chat-icon-bg.png');
    .eyes {
        margin-top: -0.2rem;
    }
    .eye {
        top: 0;
        background-color: #fff;
        width: 0.05rem;
        height: 0.1rem;
        border-radius: 0.05rem;
        animation: eyeAn 0.5s 5s;
        margin-right: 0.1rem;

        &:last-child {
            margin-right: 0;
        }
    }
}

@keyframes eyeAn {
    to {
        height: 0;
    }
}

@media (max-width: 750px) {
    .icon-cs {
        transform: rotate(-45deg);
        right: -0.2rem;
    }
}
</style>
