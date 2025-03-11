<template>
    <div class="header flex-row-between">
        <a href="https://www.igamebuy.com/" class="logo bg-contain"></a>
        <ul class="header-nav flex-center">
            <li
                v-for="(item, index) in shopBtnList"
                :class="item.className"
                class="header-nav-item btn-shop bg-contain"
                :key="index"
            >
                <a :href="item.link" target="_blank"></a>
            </li>
            <li
                v-for="(account, index) in accountBtnList"
                :key="index"
                class="header-nav-item btn-account flex-center bg-contain"
                :class="account.className"
                @click.stop="onAccountClick(index)"
            >
                <span>{{ account.name }}</span>
                <i class="icon-down"></i>
                <transition name="fade-slide">
                    <div v-if="account.isOpen" class="sub-list">
                        <li
                            v-for="(sub, index) in account.subList"
                            :key="index"
                            class="sub-item"
                            @click="sub.onClick"
                        >
                            {{ sub.name }}
                        </li>
                    </div>
                </transition>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { isIOS, isMb } from '@/utils'
import { onMounted, onUnmounted, ref } from 'vue'
const shopBtnList = [
    {
        className: 'btn-gp',
        type: 'gp',
        link: 'https://mjjh.vooplus.net/ad/s-cfb1e229',
    },
    {
        className: 'btn-ios',
        type: 'ios',
        link: 'https://mjjh.vooplus.net/ad/s-cfb1e229',
    },
]
const accountBtnList = ref([
    {
        name: '儲值入口',
        isOpen: false,
        subList: [
            {
                name: '港澳新馬iGameBUY',
                onClick: () => {},
            },
            {
                name: '台灣iGameBUY',
                onClick: () => {},
            },
        ],
    },
    {
        className: 'btn-login',
        name: '登入',
        isOpen: false,
        subList: [
            {
                name: '香港 登入',
                onClick: () => {},
            },
            {
                name: '台灣 登入',
                onClick: () => {},
            },
        ],
    },
])
initData()
function initData() {
    if (isMb()) {
        const type = isIOS() ? 'gp' : 'ios'
        const index = shopBtnList.findIndex((item) => item.type === type)
        shopBtnList.splice(index, 1)
    }
}
onMounted(() => {
    document.addEventListener('click', closeAllSubList)
})
onUnmounted(() => {
    document.removeEventListener('click', closeAllSubList)
})

function closeAllSubList() {
    accountBtnList.value.forEach((item, idx) => (item.isOpen = false))
}

function onAccountClick(index: number) {
    accountBtnList.value.forEach((item, idx) => {
        item.isOpen = idx !== index ? false : !item.isOpen
    })
}
</script>

<style lang="scss" scoped>
.header {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    background-color: #ffffff5e;
    padding: 0 0.5rem;
    .logo {
        display: inline-block;
        width: 1.75rem;
        height: 0.39rem;
        background-image: url('../assets/images/common/logo.png');
    }
    .header-nav-item {
        margin-left: 0.2rem;
        position: relative;
        width: 1.5rem;
        height: 0.5rem;
        cursor: pointer;
        font-size: 0.18rem;
        letter-spacing: 2px;
        border-radius: 0.8rem;
        color: #fff;

        &:first-child {
            margin-left: 0;
        }
    }
    .btn-shop {
        a {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .btn-gp {
        background-image: url('../assets/images/common/google.png');
    }
    .btn-ios {
        background-image: url('../assets/images/common/appstore.png');
    }

    .btn-account {
        background-color: #993d27;
    }

    .icon-down {
        margin-left: 0.1rem;
        width: 0.1rem;
        height: 0.1rem;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: translateY(-2px) rotate(45deg);
        display: inline-block;
    }

    .sub-list {
        position: absolute;
        left: 50%;
        bottom: -0.05rem;
        padding: 0.2rem;
        transform: translate(-50%, 100%);
        color: #333;
        background-color: #fff;
        border-radius: 0.2rem;
    }

    .sub-item {
        line-height: 2.5;
        cursor: pointer;
        white-space: nowrap;
    }
}
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translate(-50%, 150%);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translate(-50%, 80%);
}

@media (max-width: 750px) {
    .header {
        height: 0.95rem;
        padding: 0 0.2rem;
        .logo {
            width: 1.84rem;
            height: 0.46rem;
        }

        .header-nav-item {
            width: 1.8rem;
            height: 0.6rem;
            margin-left: 0.1rem;
        }
        .btn-login {
            display: none;
        }
    }
}
</style>
