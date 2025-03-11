<template>
    <div class="section section-4 bg-cover flex-col-center">
        <div class="section section-3-4-bg bg-cover"></div>
        <div class="content flex-col-center p-ab-center">
            <div class="title bg-contain"></div>
            <ul class="coupon-list">
                <li
                    v-for="(coupon, index) in couponList"
                    :key="index"
                    class="coupon-item bg-contain"
                >
                    <div class="left flex-col-center">
                        <span class="coupon-money">
                            {{ coupon.money }}<span class="unit">HKD$</span>
                        </span>
                        <span class="coupon-limit">{{ coupon.limit }}</span>
                    </div>
                    <div class="right flex-col-center">
                        <p class="coupon-name">{{ coupon.name }}</p>
                        <p class="coupon-total">{{ coupon.getDesc }}</p>
                        <p class="coupon-time">有效期至{{ coupon.time }}</p>
                        <p class="coupon-desc">{{ coupon.desc }}</p>
                    </div>
                    <div
                        class="btn-coupon flex-center"
                        :class="`${coupon.hadGet ? 'btn-got' : 'btn-get'}`"
                    >
                        {{ coupon.hadGet ? '已领完' : '领取' }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCouponListApi } from '@/api'
import type { CouponType } from '@/types'
import { ref } from 'vue'

const couponList = ref<CouponType[]>([])

getCouponList()
async function getCouponList() {
    const { data } = await getCouponListApi()
    couponList.value = data
}
</script>

<style lang="scss" scoped>
.section-3-4-bg {
    margin-top: -0.5rem;
    width: 100%;
    height: 14.09rem;
    background-image: url('../assets/images/pc/sec3-bg-pc.webp');
}

.title {
    width: 7.63rem;
    height: 2.34rem;
    background-image: url('../assets/images/common/sec3-title.png');
}

.coupon-list {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0.2rem;
    column-gap: 0.3rem;

    .coupon-item {
        position: relative;
        width: 5.92rem;
        height: 2.15rem;
        background-image: url('../assets/images/pc/discount-bg.png');
    }

    .left {
        position: absolute;
        left: 0;
        top: 0.5rem;
        width: 2.8rem;
    }

    .coupon-money {
        margin-bottom: 0.1rem;
        font-family: 'DMFT1542118809471';
        font-size: 0.83rem;
        letter-spacing: -6px;

        background: linear-gradient(#f8d595, #fff);
        -webkit-background-clip: text; /* 仅对文字区域裁剪背景 */
        -webkit-text-fill-color: transparent; /* 让文字颜色透明，显示背景 */
        .unit {
            line-height: 0.16rem;
            letter-spacing: 0;
            font-size: 0.16rem;
            margin-left: -0.05rem;
        }
    }

    .coupon-limit {
        color: #fff;
        font-size: 0.16rem;
    }

    .right {
        position: absolute;
        right: 1.2rem;
        align-items: flex-start;
    }

    .coupon-name {
        font-family: 'DMFT1542118809471';
        margin-bottom: 0.2rem;
        font-size: 0.35rem;
    }

    .coupon-total {
        margin: 0;
        line-height: 0.05rem;
        color: #ad4037;
        font-size: 0.16rem;
    }

    .coupon-desc {
        margin-top: 0.2rem;
        color: #ad4037;
    }

    .btn-coupon {
        position: absolute;
        bottom: 0.2rem;
        right: 0.15rem;
        width: 0.85rem;
        height: 0.32rem;
        font-size: 0.16rem;
        color: #fff;
        background-color: #bc3531;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'DMFT1542118809471';
        &::before {
            position: absolute;
            border-radius: 5px;
            width: 90%;
            height: 90%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            content: '';
            display: block;
            border: 1px dashed #fff;
        }
    }
    .btn-got {
        background-color: #aba6a1;
    }
}

@media (max-width: 750px) {
    .title {
        width: calc(7.63rem * 0.85);
        height: calc(2.34rem * 0.85);
    }

    .coupon-list {
        margin-top: 0.1rem;
        grid-template-columns: 1fr;
        row-gap: 0.1rem;

        .coupon-item {
            width: 6.82rem;
            height: 2.15rem;
            background-image: url('../assets/images/mb/discount-bg-m.png');
        }

        .coupon-money {
            font-size: 0.92rem;
            margin-bottom: 0;
            letter-spacing: -6px;
            .unit {
                margin-left: 0rem;
                letter-spacing: 0px;
                font-size: 0.25rem;
            }
        }

        .coupon-limit {
            margin-top: -0.15rem;
            font-size: 0.25rem;
        }

        .right {
            left: 3rem;
            right: unset;
        }
        .coupon-name {
            font-size: 0.5rem;
            margin: 0.3rem 0 0.1rem 0;
        }

        .coupon-total,
        .coupon-time,
        .coupon-desc {
            font-size: 0.25rem;
        }
        .coupon-time {
            margin: 0.1rem 0;
        }
        .coupon-desc {
            margin-top: 0rem;
            text-decoration: underline;
        }

        .btn-coupon {
            font-size: 0.35rem;
            writing-mode: vertical-lr;
            width: 0.9rem;
            height: 1.6rem;
        }
    }

    .section-3-4-bg {
        margin-top: 0;
        width: 100%;
        height: 14.4rem;
        background-image: url('../assets/images/mb/sec3-bg-wap.webp');
    }
}
</style>
