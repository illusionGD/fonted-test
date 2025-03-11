import Mock from 'mockjs';
import img1 from '@/assets/images/pc/shop-1.png'
import img2 from '@/assets/images/pc/shop-2.png'
import img3 from '@/assets/images/pc/shop-3.png'
import img4 from '@/assets/images/pc/shop-4.png'
import img5 from '@/assets/images/pc/shop-5.png'
import img6 from '@/assets/images/pc/shop-6.png'

Mock.setup({
    timeout: '200-600', // 模拟网络延迟，200ms - 600ms 之间
});

// 模拟接口返回的数据
Mock.mock('/api/getProductList', 'get', () => {
    console.log('✅ Mock 接口: /api/getProductList被调用');
    return {
        code: '200',
        message: 'success',
        data: [
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 1,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img1,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 1,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img2,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 0,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img3,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 0,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img4,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 0,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img5,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 0,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img6,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 0,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img6,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 0,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img2,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 0,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img5,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 0,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img1,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 0,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img1,
            },
            {
                name: 'iPad mini 7 128GB',
                count: 1,
                exchangeNum: 0,
                point: 5000,
                desc: '僅限換領其中一項實物禮品',
                imgUrl: img1,
            },
        ]
    }
});

Mock.mock('/api/getCouponList', 'get', () => {
    console.log('✅ Mock 接口: /api/getCouponList被调用');
    return {
        code: '200',
        message: 'success',
        data: [
            {
                name: '俠客新手券',
                limit: '滿70使用',
                desc: '使用说明',
                time: '2025-03-27',
                getDesc: '累積35Point可領',
                money: 45,
                hadGet: false,
            },
            {
                name: '俠客新手券',
                limit: '滿70使用',
                desc: '使用说明',
                time: '2025-03-27',
                getDesc: '累積35Point可領',
                money: 5,
                hadGet: true,
            },
            {
                name: '俠客新手券',
                limit: '滿70使用',
                desc: '使用说明',
                time: '2025-03-27',
                getDesc: '累積35Point可領',
                money:125,
                hadGet: true,
            },
            {
                name: '俠客新手券',
                limit: '滿70使用',
                desc: '使用说明',
                time: '2025-03-27',
                getDesc: '累積35Point可領',
                money: 5,
                hadGet: false,
            },
        ]
    }
});