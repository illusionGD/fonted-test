<template>
    <div class="float">
        <div
            class="content content-open bg-contain"
            :class="`${isOpen ? 'show' : 'hide'}`"
        >
            <ul class="nav-list flex-col-center p-ab-row-center">
                <li
                    v-for="(item, index) in props.sectionList"
                    :key="index"
                    class="nav-item"
                    :class="{ 'nav-item-active': activeIndex === index }"
                    @click="item.onClick"
                >
                    {{ item.label }}
                </li>
            </ul>
            <div class="arrow bg-contain left-arrow" @click="showFloat"></div>
        </div>
        <div
            class="content content-close bg-contain"
            :class="`${isOpen ? 'hide' : 'show'}`"
            @click="showFloat"
        >
            <div class="arrow bg-contain right-arrow"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { observeElements } from '@/utils'
import { onMounted, ref } from 'vue'
export interface FloatComponentSectionType {
    className?: string
    label: string
    onClick?: () => void
}
const props = defineProps<{
    sectionList: FloatComponentSectionType[]
}>()
const isOpen = ref(true)
const activeIndex = ref(-1)

onMounted(() => {
    listDomVisible()
})

function showFloat() {
    isOpen.value = !isOpen.value
    console.log('🚀 ~ isOpen.value:', isOpen.value)
}
function listDomVisible() {
    if (!props.sectionList) {
        return
    }
    const classNameList = props.sectionList
        .filter((item) => item.className)
        .map((item) => item.className)

    observeElements(classNameList, {
        onVisible: (e) => {
            const className = e.getAttribute('class')
            activeIndex.value = classNameList.findIndex((item) =>
                className.includes(item.replace('.', ''))
            )
        },
        once: false,
    })
}
</script>

<style lang="scss" scoped>
.float {
    position: fixed;
    width: 2rem;
    height: 3rem;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.show {
    right: 0;
}
.hide {
    right: -5rem;
}
.content {
    transition: all 0.5s;
    position: absolute;
}

.arrow {
    position: absolute;
    width: 0.35rem;
    height: 0.34rem;
    cursor: pointer;
    background-image: url('../assets/images/common/left-arrow.webp');
}
.left-arrow {
    right: 0.2rem;
    bottom: 0.45rem;
    transform: scaleX(-1);
    animation: arrowLeftAn 1s infinite alternate;
}
.right-arrow {
    left: 0.5rem;
    bottom: 0.25rem;
    animation: arrowRightAn 1s infinite alternate;
}
.content-open {
    width: 100%;
    height: 100%;
    background-image: url('../assets/images/common/sidebar-bg.png');
    .nav-list {
        bottom: 0.5rem;
        color: #fff;
    }

    .nav-item {
        margin-bottom: 0.06rem;
        cursor: pointer;
        &:hover {
        }
    }

    .nav-item-active {
        color: #ffb649;
    }
}

.content-close {
    cursor: pointer;
    width: 1.67rem;
    height: 2.44rem;
    background-image: url('../assets/images/common/sidebar-elm.png');
}

@keyframes arrowLeftAn {
    to {
        opacity: 0.5;
        transform: scaleX(-1) translateX(-0.1rem);
    }
}
@keyframes arrowRightAn {
    to {
        opacity: 0.5;
        transform: translateX(0.1rem);
    }
}

@media (max-width: 750px) {
    .content-open {
        width: 3.6rem;
        height: 5.15rem;
        .nav-list {
            bottom: 0.8rem;
        }
        .nav-item {
            font-size: 0.26rem;
            margin: 0.1rem 0;
        }
        .left-arrow {
            left: 0.6rem;
            bottom: 0.8rem;
            right: unset;
        }
    }
    .content-close {
        bottom: 0;
        transform: translateY(0);
    }
}
</style>
