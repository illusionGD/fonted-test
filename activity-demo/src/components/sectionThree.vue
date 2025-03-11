<template>
    <div class="section section-3 bg-cover flex-col-center">
        <div class="title bg-contain"></div>
        <div class="flex-center">
            <div class="btn-area flex-center bg-contain">香港iGameBUY</div>
            <div class="btn-area flex-center bg-contain">台灣iGameBUY</div>
        </div>
        <div class="plat-desc">請選擇對應平台登入後查看積分</div>
        <ul class="shop-list">
            <li
                v-for="(item, index) in shopList"
                :key="index"
                class="shop-item bg-contain"
                @click="onClick(item)"
            >
                <div class="exchange-limit flex-col-center bg-contain">
                    <span>限兌</span>
                    <span
                        >{{ item.count - item.exchangeNum }}/{{
                            item.count
                        }}</span
                    >
                </div>
                <div
                    v-if="item.exchangeNum >= item.count"
                    class="exchange-status flex-center bg-contain"
                >
                    已满额
                </div>
                <div class="exchange-shop flex-col-center">
                    <div
                        class="shop-img bg-contain"
                        :style="{ 'background-image': `url(${item.imgUrl})` }"
                    ></div>
                    <div class="shop-name">{{ item.name }}</div>
                    <div class="shop-desc">{{ item.desc }}</div>
                </div>
                <div
                    class="btn-exchange bg-contain"
                    :class="{
                        'btn-change-gray': item.exchangeNum >= item.count,
                    }"
                >
                    {{ item.point }} Point
                </div>
            </li>
        </ul>
    </div>
    <Pop v-model:show="showPop">
        <div class="pop-content bg-contain flex-col-center">
            <div class="btn-close bg-contain" @click="showPop = false"></div>
            <div class="pop-title bg-contain"></div>
            <div class="pop-shop-content flex-col-center">
                <img :src="currentShop.imgUrl" alt="" />
                <div class="pop-shop-name">{{ currentShop.name }}</div>
                <div class="pop-shop-desc">{{ currentShop.desc }}</div>
                <div class="pop-exchange-desc">
                    <span>兌換說明：</span>
                    <span
                        >所有實物禮品單個用戶僅限兌換其中一項且限一次，請慎重選擇</span
                    >
                </div>
                <div class="login-tip">請登入後兌換~</div>
            </div>
        </div>
        <div class="btn-list flex-center">
            <div class="pop-btn bg-contain flex-center">香港iGameBUY</div>
            <div class="pop-btn bg-contain flex-center">台灣iGameBUY</div>
        </div>
    </Pop>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Pop from './pop.vue'
import type { ShopType } from '@/types'
import { getShopListApi } from '@/api'
import { isSuccessCode } from '@/utils'
console.log('three')
const showPop = ref(false)
const shopList = ref<ShopType[]>([])
const currentShop = ref<ShopType>(null)

getShopList()
async function getShopList() {
    const { code, data, message } = await getShopListApi()
    if (!isSuccessCode(code)) {
        return
    }
    shopList.value = data
}

function onClick(item: ShopType) {
    currentShop.value = item
    showPop.value = true
}
</script>

<style lang="scss" scoped>
.section-3 {
    padding-bottom: 0.5rem;
}

.title {
    width: 7.63rem;
    height: 2.31rem;
    background-image: url('../assets/images/common/sec2-title.png');
}

.btn-area {
    margin: 0.3rem 0;
    margin-right: 0.2rem;
    width: 5.49rem;
    height: 0.6rem;
    font-size: 0.25rem;
    font-weight: 600;
    cursor: pointer;
    background-image: url('../assets/images/pc/platform-sle.png');
    &:last-child {
        margin-right: 0;
    }
}

.plat-desc {
    text-align: center;
    font-size: 0.35rem;
    color: #ce3d31;
}
.shop-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: 0 0.1rem;
    margin-top: 0.5rem;
    row-gap: 1rem;
    column-gap: 0.1rem;
    .shop-item {
        position: relative;
        padding-top: 0.4rem;
        width: 3.63rem;
        height: 3.42rem;
        background-image: url('../assets/images/common/prize-bg1.png');
    }

    .exchange-limit {
        position: absolute;
        padding-top: 0.05rem;
        left: 0.5rem;
        top: 0.5rem;
        width: 0.56rem;
        height: 0.61rem;
        font-size: 0.2rem;
        font-weight: 600;
        background-image: url('../assets/images/common/prize-label.png');
    }

    .exchange-status {
        position: absolute;
        top: 0.3rem;
        right: 0.25rem;
        width: 0.97rem;
        height: 1.59rem;
        transform: scale(0.8);
        writing-mode: vertical-lr;
        color: #fff;
        font-family: 'DMFT1542118809471';
        font-size: 0.3rem;
        letter-spacing: 0;
        background-image: url('../assets/images/common/prize-tag.png');
    }

    .exchange-shop {
        width: 100%;
        height: 100%;
    }

    .shop-img {
        width: 100%;
        height: 50%;
        background-size: 1.6rem, 1.6rem;
    }
    .shop-name {
        margin: 0.05rem 0;
        text-align: center;
        color: #ffe898; /* 字体颜色 */
        text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black,
            2px 2px 0 black; /* 四个方向投影模拟描边 */
        font-size: 0.2rem; /* 适当调整字体大小 */
        font-weight: bold;
    }

    .btn-change-gray {
        filter: grayscale(1);
    }

    .btn-exchange {
        margin: 0 auto;
        margin-top: -0.5rem;
        padding-top: 0.08rem;
        width: 2.62rem;
        height: 0.98rem;
        font-size: 0.3rem;
        font-weight: 600;
        color: #fff;
        line-height: 0.98rem;
        text-align: center;
        cursor: pointer;
        background-image: url('../assets/images/pc/btn-yellow.webp');
        transition: all 0.5s;
        &:hover {
            transform: translateY(-0.05rem);
        }
    }
}

.pop-content {
    position: relative;
    padding: 0 0.8rem;
    width: 7.42rem;
    height: 6.55rem;
    font-size: 0.2rem;
    background-image: url('../assets/images/pc/pop-exchange-bg.png');
    .pop-title {
        margin-top: -0.2rem;
        width: 4.03rem;
        height: 1.24rem;
        background-image: url('../assets/images/common/pop-cf-t.png');
    }
    .btn-close {
        cursor: pointer;
        right: -0.2rem;
        top: -0.2rem;
        width: 0.87rem;
        height: 0.82rem;
        position: absolute;
        background-image: url('../assets/images/common/close-btn.png');
    }
    img {
        width: 2.6rem;
        height: 2.6rem;
        object-fit: contain;
    }

    .pop-shop-name {
        font-weight: 600;
        font-size: 0.22rem;
    }

    .pop-shop-desc {
        margin: 0.1rem 0;
    }
    .pop-exchange-desc {
        margin: 0.1rem 0 0.5rem 0;
        font-size: 0.16rem;
        text-align: center;
    }
    .login-tip {
        color: red;
    }
}
.pop-btn {
    margin-right: 0.2rem;
    width: 2.62rem;
    height: 0.98rem;
    font-size: 0.25rem;
    cursor: pointer;
    color: #fff;
    background-image: url('../assets/images/pc/btn-yellow.webp');
    &:last-child {
        margin-right: 0;
    }
}

@media (max-width: 750px) {
    .shop-list {
        grid-template-columns: 1fr 1fr;
    }

    .btn-area {
        width: 3.76rem;
        height: 0.76rem;
        background-image: url('../assets/images/mb/platform-sle-m.png');
    }
    .pop-btn {
        width: calc(2.62rem * 1.2);
        height: calc(0.98rem * 1.2);
        font-size: 0.28rem;
    }
    .pop-content {
        .pop-title {
            transform: scale(1.5);
        }
        .pop-shop-name {
            font-size: 0.35rem;
        }
        .pop-shop-desc,
        .pop-exchange-desc {
            font-size: 0.25rem;
        }

        .pop-exchange-desc {
            margin: 0.1rem 0;
        }
        .login-tip {
            font-size: 0.3rem;
        }
    }
}
</style>
