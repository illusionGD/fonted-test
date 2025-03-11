<template>
    <div class="section section-1 bg-cover">
        <div class="slogan p-ab-row-center">
            <div class="slogan-logo bg-contain p-ab-row-center"></div>
            <div class="slogan-txt bg-contain p-ab-row-center"></div>
            <div class="activity-time flex-center bg-contain p-ab-row-center">
                活動時間：1月21日00:00:00至3月21日00:00:00
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
console.log('section')
</script>

<style lang="scss" scoped>
.section-1 {
    height: 10.8rem;
    background-image: url('../assets/images/pc/top-bg.jpg');

    .slogan {
        top: 5.1rem;
        height: 7.1rem;
    }

    .slogan-logo {
        width: 5.4rem;
        height: 1.29rem;
        background-image: url('../assets/images/common/joint-logo.png');
    }

    .slogan-txt {
        top: 0.71rem;
        width: 10.46rem;
        height: 2.88rem;
        background-image: url('../assets/images/common/slogan.png');
    }

    .activity-time {
        top: 3.42rem;
        width: 10.07rem;
        height: 0.6rem;
        color: #f2e3c8;
        font-size: 0.28rem;
        font-family: 'STKaiti', 'KaiTi', sans-serif;
        background-image: url('../assets/images/common/time-bg.png');
        &::before {
            display: block;
            content: '';
            // @extend .bg-contain;
            background-size: contain;
            width: 0.77rem;
            height: 0.32rem;
            background-image: url('../assets/images/common/decorate-1.png');
        }
        &::after {
            display: block;
            content: '';
            // @extend .bg-contain;
            background-size: contain;
            width: 0.77rem;
            height: 0.32rem;
            background-image: url('../assets/images/common/decorate-2.png');
        }
    }
}

@media (max-width: 750px) {
    .section-1 {
        height: 13.34rem !important;
        background-image: url('../assets/images/mb/kv-m.jpg') !important;
        .slogan {
            // transform: scale(0.72);
            top: 8rem;
        }
        .slogan-logo {
            width: 4.35rem;
            height: 1.12rem;
        }

        .slogan-txt {
            height: 2.09rem;
            width: 7.2rem;
        }

        .activity-time {
            top: 2.72rem;
            width: 7.5rem;
        }
    }
}
</style>
