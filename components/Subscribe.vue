<template>
    <div class="bg-cover -bg-top-140px lg:bg-top-60%" style="background-image: url(images/subscribe.jpg)">
        <div class="container h-[600px] pt-[312px]">
            <form class="max-w-[350px] mx-auto lg:ml-0" @submit.prevent="subscribe">
                <p class="text-dark-gray text-[32px]">
                    記得<br>訂閱以獲取更多資訊！
                </p>
                <div class="flex mt-5">
                    <input
                        v-model="email"
                        type="email"
                        placeholder="Your email address"
                        class="flex-grow w-0 h-15 pl-[14.5px] rounded-l rounded-r-none border-2 border-raisin-black placeholder-dark-gray outline-none appearance-none"
                        required
                    >
                    <input type="submit" value="Subscribe" class="w-[129px] h-15 text-white rounded-r rounded-l-none bg-raisin-black cursor-pointer">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, useStore } from '@nuxtjs/composition-api';

export default {
    name: 'Subscribe',
    setup () {
        const store = useStore();

        const email = ref('');
        const subscribe = async () => {
            await store.dispatch('setAlertMsgHandler', '訂閱成功');
            email.value = '';
        };

        return {
            email,
            subscribe
        };
    }
};
</script>