<template>
    <div class="container flex flex-col md:flex-row items-center py-10 md:py-15">
        <div class="w-full md:w-0 md:flex-grow-[6.5]">
            <div class="pt-[63%] bg-center bg-cover" style="background-image: url(https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)" />
        </div>
        <form class="flex flex-col md:flex-grow-[3.5] w-[350px] md:w-0 mx-auto mt-7 md:mt-0 md:ml-[30px]" @submit.prevent="submitHandler">
            <h2 class="text-[32px]">
                Log in
            </h2>
            <label for="email" class="mt-3">帳號</label>
            <input
                id="email"
                v-model="loginData.email"
                v-focus
                type="email"
                placeholder="email@example.com"
                class="mt-1 text-input"
                required
            >
            <label for="password" class="mt-5">密碼</label>
            <input
                id="password"
                v-model="loginData.password"
                type="password"
                placeholder="Password"
                class="mt-1 text-input"
                required
            >
            <div class="flex items-center mt-9">
                <a href class="text-raisin-black mr-auto" @click.prevent="forgotPassword">
                    忘記密碼
                </a>
                <nuxt-link to="/signUp/createAccount" class="w-[65px] leading-[36px] text-center rounded border border-raisin-black text-raisin-black focus:outline-none">
                    註冊
                </nuxt-link>
                <button type="submit" class="w-[65px] h-[38px] rounded bg-raisin-black text-white focus:outline-none ml-2">
                    登入
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { reactive, useStore, useRouter, useContext } from '@nuxtjs/composition-api';

export default {
    name: 'Login',
    setup () {
        const store = useStore();
        const router = useRouter();
        const { $Swal } = useContext();

        const loginData = reactive({
            email: '',
            password: ''
        });

        const submitHandler = async () => {
            const loginResult = await store.dispatch('member/userLogin', loginData);
            if (loginResult.status === 401) return;
            if (loginResult.status !== 200) {
                store.dispatch('setAlertMsgHandler', loginResult.message);
                return;
            }

            const { status } = await checkPreferences();
            if (status !== 200) return;

            const beforeLogin = sessionStorage.getItem('beforeLogin');
            sessionStorage.removeItem('beforeLogin');
            if (!beforeLogin) {
                await store.dispatch('setAlertMsgHandler', '登入成功');
            }
            router.replace(beforeLogin || '/');
        };

        // 如 DB 有資料時寫入 client 端，否則 client 端寫入 DB
        const checkPreferences = async () => {
            const result = await store.dispatch('member/readPreferences');
            if (result.status !== 200) return result;

            const { cart = [], favorite = [] } = result.data || {};
            if (cart.length || favorite.length) {
                store.dispatch('product/createLS', { name: 'cart', value: cart }, { root: true });
                store.dispatch('product/createLS', { name: 'favorite', value: favorite }, { root: true });
                return { status: 200 };
            }
            else {
                const result = await store.dispatch('member/updatePreferences');
                return result;
            }
        };

        const forgotPassword = () => {
            $Swal.fire({
                title: '請輸入註冊的電子信箱',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCloseButton: true,
                confirmButtonText: '確定',
                showLoaderOnConfirm: true,
                preConfirm: email => {
                    return store.dispatch('member/resetPassword', email)
                        .then(response => {
                            if (response.status !== 200 && response.status !== 401) {
                                throw response.message;
                            }
                        })
                        .catch(error => {
                            $Swal.showValidationMessage(error);
                        });
                },
                allowOutsideClick: () => !$Swal.isLoading()
            }).then(result => {
                if (result.isConfirmed) {
                    $Swal.fire({
                        icon: 'success',
                        title: '已將重設密碼連結寄至您的信箱'
                    });
                }
            });
        };

        return {
            loginData,
            submitHandler,
            forgotPassword
        };
    }
};
</script>