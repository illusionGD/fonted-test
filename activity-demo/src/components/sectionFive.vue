<template>
    <div class="section-5 flex-col-start">
        <p>
            1. 活動時間 :
            1月21日00:00:00至3月21日00:00:00，活動期間通過iG商城直儲或遊戲儲值官網使用iGameBUY會員支付實付金額可獲得活動Point(
            固定每 1HKD / 1.04MOP / 0.18SGD / 0.59MYR / 3.86TWD= 1Point
            )，僅供是次活動使用
        </p>

        <p>
            2.
            禮品數量有限先換先得，全部實物禮品每個用戶僅限兌換其中一類且限一次，除有限兌換次數禮品外，其餘禮品可任意兌換直至換領完畢；滿額後本頁面對應禮品均有相關提示；遊戲虛寶禮包有效期截止到2025年4月30日；
        </p>

        <p>
            3. 實物禮品換領成功後,
            iGameBUY客服將通過用戶換領記錄，於線上或電話聯繫換領者，港澳用戶需約定時間蒞臨我司領取禮品、台灣用戶需提供運送資料予iGameBUY客服，新加坡及馬來西亞用戶請向我們咨詢詳細禮品換領手續。如禮品出現缺貨問題則作另行通知，所有活動贈品均不包含產品保養。(若活動結束一個月後仍無法與換領者取得聯繫，將視為自願放棄)
        </p>

        <p>
            4.
            活動期間累計獲得指定Point數可免費領取iG滿減現金券，訂單滿指定金額可減免部分實付金額，各面值每個iG用戶及角色ID僅能使用一次，限儲值繪夢江湖商品可用，現金券最後使用有效期截止至3月27日23:59:59
        </p>

        <p>
            5.
            活動結束後一個星期內仍可自由兌換禮品，如超過最後兌換時間(3月27日23:59:59),
            系統將自動以500Point為一單位, 全數兌換為香港iG幣500/台灣iG幣2000,
            若剩餘積分不足500Point則作廢；
            iG幣是iGameBUY商城的贈送積分，換領後自動增加至用戶iG幣餘額，可用作抵扣每筆餘額支付的訂單付款金額(暫不支持新加坡,馬來西亞,澳門付費用戶，如已換領iG幣需轉換香港地區使用(100iG幣=1HKD)，累積足夠iG幣方可抵扣全單)；點擊了解什麼是iG幣
            香港/台灣。
        </p>

        <p>
            6. 若對是次「繪夢江湖」合作活動有任何疑問，請聯繫我們iGameBUY
            24小時線上客服查詢。
        </p>

        <p>
            7. I-BUY GLOBAL
            LIMITED保有審核參加者及修改、暫停、取消或終止是次活動的權利，如若有其他未盡事宜，本活動的最終解釋權歸
            I-BUY GLOBAL LIMITED所有。
        </p>
    </div>
    <div class="bottom-logo bg-contain"></div>
</template>

<script setup lang="ts">
console.log('five')
</script>

<style lang="scss" scoped>
.section-5 {
    padding: 0 1.8rem;
}
.bottom-logo {
    margin: 0.8rem auto;
    width: 5.4rem;
    height: 1.29rem;
    background-image: url('../assets/images/common/joint-logo.png');
}

p {
    line-height: 0.3rem;
    color: #fff;
    font-size: 0.18rem;
    margin: 0.1rem 0;
}

@media (max-width: 750px) {
    .section-5 {
        padding: 0 0.4rem;
        padding-top: 0.5rem;
        p {
            font-size: 0.24rem;
        }
    }
    .bottom-logo {
        margin: 0.4rem auto;
    }
}
</style>
