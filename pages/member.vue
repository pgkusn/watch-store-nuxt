<template>
    <div class="container flex flex-col md:flex-row py-10 md:py-15">
        <div class="text-dark-gray flex-shrink-0">
            <p class="hidden md:block mb-7 text-black">
                會員中心
            </p>
            <ul class="flex items-start md:flex-col">
                <li class="cursor-pointer" :class="componentId === 'MemberUpdate' ? 'border-b-2 border-raisin-black' : ''" @click="componentId = 'MemberUpdate'">
                    會員資料修改
                </li>
                <li class="ml-10 md:ml-0 md:mt-6 cursor-pointer" :class="componentId === 'OrderHistory' ? 'border-b-2 border-raisin-black' : ''" @click="componentId = 'OrderHistory'">
                    訂單查詢
                </li>
                <li class="ml-10 md:ml-0 md:mt-6 cursor-pointer" @click="logout">
                    登出
                </li>
            </ul>
        </div>

        <keep-alive>
            <component :is="componentId" />
        </keep-alive>
    </div>
</template>

<script>
import { onMounted, ref, useStore, useRouter } from '@nuxtjs/composition-api';
import MemberUpdate from '@/components/MemberUpdate.vue';
import OrderHistory from '@/components/OrderHistory.vue';

export default {
    name: 'Member',
    components: {
        MemberUpdate,
        OrderHistory
    },
    setup () {
        const store = useStore();
        const router = useRouter();

        const componentId = ref('');
        const logout = async () => {
            if (confirm('確定登出？')) {
                await store.dispatch('member/userLogout');
                router.push('/');
            }
        };
        onMounted(async () => {
            // 因要先等 default.vue 將 localStorage 的資料寫到 store，故無法使用 middleware 直接判斷 store 有無登入資料
            if (process.client && !store.state.member.loginInfo) {
                router.replace('/');
                return;
            }
            await store.dispatch('member/readOrders');
            componentId.value = 'MemberUpdate';
        });

        return {
            componentId,
            logout
        };
    }
};
</script>