<template>
    <form @submit.prevent="submitHandler">
        <table class="w-full">
            <caption class="text-left font-medium pb-2 border-b border-blue-gray">
                建立帳號
            </caption>
            <tbody class="text-blue-gray">
                <tr>
                    <td class="pt-5 w-[90px]">
                        <div>電子信箱</div>
                    </td>
                    <td class="pt-5">
                        <input
                            v-model="memberData.email"
                            v-focus
                            type="email"
                            class="text-input"
                            required
                        >
                    </td>
                </tr>
                <tr>
                    <td class="pt-5">
                        <div>密碼</div>
                    </td>
                    <td class="pt-5">
                        <input
                            v-model="memberData.password"
                            type="password"
                            class="text-input"
                            required
                        >
                    </td>
                </tr>
                <tr>
                    <td class="pt-5 align-top">
                        <div class="pt-2">
                            確認密碼
                        </div>
                    </td>
                    <td class="pt-5">
                        <input
                            v-model="memberData.confirmPassword"
                            type="password"
                            class="text-input"
                            required
                        >
                        <input type="submit" value="下一步" class="form-btn block">
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</template>

<script>
import { reactive, useStore, useRouter } from '@nuxtjs/composition-api';

export default {
    name: 'CreateAccount',
    setup () {
        const store = useStore();
        const router = useRouter();

        const memberData = reactive({
            email: '',
            password: '',
            confirmPassword: ''
        });

        const submitHandler = async () => {
            if (memberData.password !== memberData.confirmPassword) {
                await store.dispatch('setAlertMsgHandler', '密碼不一致');
                return;
            }

            const result = await store.dispatch('member/userSignUp', memberData);
            if (result.status !== 200) {
                store.dispatch('setAlertMsgHandler', result.message);
                return;
            }
            router.push('/signUp/createProfile');
        };

        return {
            memberData,
            submitHandler
        };
    }
};
</script>