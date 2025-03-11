<template>
    <div class="pc-banner bg-cover">
        <top-header></top-header>
        <section-one></section-one>
        <sectionTwo></sectionTwo>
        <section-two></section-two>
        <section-three ref="sectionThree"></section-three>
        <section-four ref="sectionFive"></section-four>
        <section-five></section-five>
        <activity-footer></activity-footer>
        <float :section-list="navList"></float>
        <btn-cs></btn-cs>
    </div>
</template>

<script setup lang="ts">
import SectionOne from './sectionOne.vue'
import SectionTwo from './sectionTwo.vue'
import SectionThree from './sectionThree.vue'
import SectionFour from './sectionFour.vue'
import SectionFive from './sectionFive.vue'
import activityFooter from './footer.vue'
import TopHeader from './TopHeader.vue'
import Float, { type FloatComponentSectionType } from './float.vue'
import BtnCs from './btnCs.vue'
import { defineAsyncComponent, ref } from 'vue'

const navList = ref<FloatComponentSectionType[]>([
    {
        className: '.section-3',
        label: '積分兌換',
        onClick: () => {
            scrollSection('.section-3')
        },
    },
    {
        className: '.section-4',
        label: '驚喜福利券',
        onClick: () => {
            scrollSection('.section-4')
        },
    },
    {
        label: 'TOP',
        onClick: () => {
            scrollSection(0)
        },
    },
])

function scrollSection(section: string | number | null) {
    const behavior = 'smooth'
    if (typeof section === 'number') {
        window.scrollTo({
            top: 0,
            behavior,
        })
        return
    }

    if (!section) {
        return
    }

    const { offsetTop } = document.querySelector(section) as HTMLElement
    window.scrollTo({
        top: offsetTop,
        behavior,
    })
}
</script>

<style lang="scss" scoped>
.pc-banner {
    max-width: 19.2rem;
    overflow-x: hidden;
    background-image: url('../assets/images/common/bg.webp');
}

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
    .pc-banner {
        width: 100%;
        max-width: 100%;
    }
}
</style>
