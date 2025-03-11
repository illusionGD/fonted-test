<template>
    <div class="section section-2 bg-cover">
        <div class="section s-1-2-bg bg-contain"></div>
        <div class="content p-ab-row-center bg-contain">
            <div class="left-role bg-contain"></div>
            <div class="reward-list">
                <li
                    v-for="(reward, index) in rewardList"
                    :key="index"
                    class="reward-item bg-contain"
                    :class="reward.className"
                ></li>
            </div>
            <div class="activity-info">
                <div class="activity-title bg-contain"></div>
                <div class="activity-desc">
                    <p>水墨畫風武俠題材手遊「繪夢江湖」現已火爆開服</p>
                    <p>iGameBUY × 繪夢江湖展開送大禮專屬活動</p>
                    <p class="p-red">享九折儲值同時可換取豐富禮品！</p>
                    <br />
                    <p>活動期間儲值可獲得活動Point*，憑Point可兌換：</p>
                    <p class="p-w">iPadMini7/PS5Slim光碟版/SwitchOLED</p>
                    <p class="p-w">
                        /PSPortal海量iG幣/豪華遊戲虛寶/iG滿減現金券
                    </p>
                    <p class="p-red">*各項禮品數量有限，各位大俠萬勿錯過哦！</p>
                </div>
                <div class="info-link bg-contain">
                    *每消費 1HKD/1.04MOP/0.18SGD/0.59MYR/3.86NT=1Point
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
console.log('two')

const rewardList = ref(
    new Array(4).fill(1).map((item, index) => {
        return { className: `reward-${index + 1}` }
    })
)
</script>

<style lang="scss" scoped>
.s-1-2-bg {
    margin-top: -3rem;
    width: 19.2rem;
    height: 15.33rem;
    background-image: url('../assets/images/pc/sec1-bg-pc.webp');
    pointer-events: none;
}
.section-2 {
    .content {
        bottom: 2.2rem;
        width: 12.94rem;
        height: 8.92rem;
        left: 54%;
        background-image: url('../assets/images/pc/sec1-bg.png');
    }
    .left-role {
        position: relative;
        left: 0;
        top: -0.9rem;
        transform: translateX(-30%);
        width: 8.95rem;
        height: 11.95rem;
        background-image: url('../assets/images/pc/girl.png');
    }
    .activity-title {
        position: absolute;
        right: -0.1rem;
        top: -0.4rem;
        width: 7.63rem;
        height: 2.33rem;
        background-image: url('../assets/images/common/sec1-title.png');
    }
    .activity-info {
        position: absolute;
        top: 0;
        right: 0;
    }
    .activity-desc {
        position: relative;
        top: 2rem;
        right: 0.8rem;
        font-size: 0.25rem;

        p {
            line-height: 0.2rem;
        }
        .p-w {
            font-weight: 600;
            font-size: 0.23rem;
        }
    }

    .p-red {
        font-weight: 600;
        color: #e13c39;
    }

    .reward-list {
        top: 0.2rem;
        left: 2rem;
        z-index: 2;
        position: absolute;
        width: 2rem;
        height: 100%;
        @keyframes rewardScale {
            to {
                transform: scale(1.05);
                filter: brightness(1.5);
            }
        }
        .reward-item {
            position: absolute;
            aspect-ratio: 1;
            animation-name: rewardScale;
            animation-duration: 2s;
            animation-direction: alternate;
            animation-iteration-count: infinite;
        }
        .reward-1 {
            animation-delay: 0;
            width: 2.35rem;
            top: 0.2rem;
            left: -0.1rem;
            background-image: url('../assets/images/common/bubble1.png');
        }
        .reward-2 {
            animation-delay: 0.5s;
            width: 2.24rem;
            top: 1.5rem;
            left: 1.7rem;
            background-image: url('../assets/images/common/bubble2.png');
        }
        .reward-3 {
            animation-delay: 1s;
            width: 1.75rem;
            top: 2.8rem;
            left: 0.5rem;
            background-image: url('../assets/images/common/bubble3.png');
        }
        .reward-4 {
            animation-delay: 1.5s;
            width: 2.71rem;
            top: 3.5rem;
            left: 1.8rem;
            background-image: url('../assets/images/common/bubble4.png');
        }
    }

    .info-link {
        right: 1rem;
        top: 3rem;
        position: relative;
        width: 5.59rem;
        height: 0.5rem;
        white-space: nowrap;
        color: #e2cfb1;
        text-align: center;
        line-height: 0.5rem;
        font-weight: 600;
        font-size: 0.18rem;
        background-image: url('../assets/images/pc/foot-p.png');
    }
}

@media (max-width: 750px) {
    .section-2 {
        .s-1-2-bg {
            margin-top: -1rem;
            width: 100%;
            height: 13.96rem;
            background-image: url('../assets/images/mb/sec1-bg-wap.webp');
        }

        .content {
            left: 51%;
            bottom: 0.8rem;
            width: 7.42rem;
            height: 10.72rem;
            background-image: url('../assets/images/mb/sec1-bg-m.png');
        }

        .activity-title {
            right: -0.4rem;
            top: -0.8rem;
        }

        .left-role {
            top: 1.98rem;
            left: -1.8rem;
            width: 6.88rem;
            height: 8.65rem;
            background-image: url('../assets/images/mb/girl-m.png');
        }
        .activity-info {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        .activity-desc {
            width: 4rem;
            top: 1.5rem;
            left: 38%;
            p {
                margin: 0.2rem 0;
                line-height: 0.25rem;
            }
        }

        .reward-list {
            top: unset;
            bottom: 1.2rem;
            width: 5rem;
            height: 2rem;

            .reward-1 {
                width: 1.87rem;
                bottom: 0.2rem;
                top: none;
            }

            .reward-2 {
                top: 0.5rem;
                left: 1.6rem;
                width: 1.68rem;
            }

            .reward-3 {
                top: -0.7rem;
                left: 1.5rem;
                width: 1.37rem;
            }

            .reward-4 {
                top: -0.5rem;
                left: unset;
                right: 0;
                width: 2.06rem;
            }
        }
        .info-link {
            position: absolute;
            width: 6.69rem;
            height: 0.6rem;
            left: 50%;
            transform: translateX(-50%);
            top: unset;
            bottom: 0.3rem;
            font-size: 0.24rem;
            line-height: 0.6rem;
            background-image: url('../assets/images/mb/foot-p-m.png');
        }
    }
}
</style>
