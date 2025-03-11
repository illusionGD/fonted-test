<template>
    <div class="footer flex-col-center">
        <ul class="link-list flex-center">
            <li v-for="(item, index) in linkList" :key="index" class="btn-link">
                <a :href="item.link">{{ item.name }}</a>
            </li>
        </ul>
        <div class="c-info flex-center">
            <div class="email-link flex-center">
                <i class="icon-email"></i>
                <a href="mailto:cs@igamebuy.com">cs@igamebuy.com</a>
            </div>
            <div>
                ©Copyright 2017-2025 I-BUY GLOBAL LIMITED. All Rights Reserved.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const linkList = ref([
    {
        name: '服務條例',
        link: 'https://www.igamebuy.com/terms/service_policy.html',
    },
    {
        name: '私隱政策',
        link: 'https://www.igamebuy.com/terms/privacy_policy.html',
    },
    {
        name: '聯絡我們',
        link: 'https://www.igamebuy.com/terms/contact.html',
    },
])
</script>

<style lang="scss" scoped>
.footer {
    background-color: #000;
    width: 100%;
    padding: 0.4rem 0;
    color: #fff;
    font-size: 0.16rem;
}
.btn-link {
    margin-right: 0.2rem;
    &:last-child {
        margin-right: 0;
    }
}
a {
    color: #fff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
}
.c-info {
    margin-top: 0.2rem;
}
.email-link {
    margin-right: 0.2rem;
}
.icon-email {
    margin-right: 0.1rem;
    &::after {
        content: '\ea2b';
    }
}
@media (max-width: 750px) {
    .footer {
        font-size: 0.2rem;
    }
    .c-info {
        flex-direction: column;
    }
}
</style>
