<template>
    <div class="flex flex-col md:flex-row md:flex-grow">
        <div class="order-1 md:order-none md:flex-grow md:pl-[8.6%] md:pr-[30px] mt-10 md:mt-0">
            <form @submit.prevent="updateProfile">
                <table class="w-full">
                    <caption class="text-left font-medium pb-2 border-b border-blue-gray">
                        修改個人資料
                    </caption>
                    <tbody class="text-blue-gray">
                        <tr>
                            <td class="pt-5 w-[90px]">
                                <div>電子信箱</div>
                            </td>
                            <td class="pt-5">
                                {{ memberData.email }}
                            </td>
                        </tr>
                        <tr>
                            <td class="pt-5">
                                <div>會員姓名</div>
                            </td>
                            <td class="pt-5">
                                <input
                                    v-model="memberData.name"
                                    type="text"
                                    class="text-input"
                                    required
                                >
                            </td>
                        </tr>
                        <tr>
                            <td class="pt-5">
                                <div>會員性別</div>
                            </td>
                            <td class="pt-5">
                                <div class="select">
                                    <select v-model="memberData.gender">
                                        <option value="male">
                                            男
                                        </option>
                                        <option value="female">
                                            女
                                        </option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="pt-5">
                                <div>手機號碼</div>
                            </td>
                            <td class="pt-5">
                                <input
                                    v-model="memberData.cellPhone"
                                    type="text"
                                    class="text-input"
                                    required
                                >
                            </td>
                        </tr>
                        <tr>
                            <td class="pt-5 align-top">
                                <div class="pt-2">
                                    聯絡地址
                                </div>
                            </td>
                            <td class="pt-5">
                                <div class="select w-[174px]">
                                    <select v-model="memberData.address.contact.country" required>
                                        <option value="台灣及離島">
                                            台灣及離島
                                        </option>
                                    </select>
                                </div>
                                <br>
                                <CitySelect :address="memberData.address.contact" @changeCity="value => changeCity('contact', value)" />
                                <input
                                    v-model="memberData.address.contact.other"
                                    type="text"
                                    class="text-input mt-2"
                                    placeholder="請輸入地址"
                                >
                                <label class="flex items-center mt-3">
                                    <input v-model="memberData.edm" type="checkbox" class="checkbox appearance-none w-[15px] h-[15px] rounded-[3px] mr-1 border border-border-color checked:border-none checked:bg-raisin-black">
                                    我願意收到最新優惠情報
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td class="pt-5 align-top">
                                <div class="pt-2">
                                    配送地址
                                </div>
                            </td>
                            <td class="pt-5">
                                <div class="select w-[174px]">
                                    <select v-model="memberData.address.delivery.country" required>
                                        <option value="台灣及離島">
                                            台灣及離島
                                        </option>
                                    </select>
                                </div>
                                <br>
                                <CitySelect :address="memberData.address.delivery" :required="true" @changeCity="value => changeCity('delivery', value)" />
                                <input
                                    v-model="memberData.address.delivery.other"
                                    type="text"
                                    class="text-input mt-2"
                                    placeholder="請輸入地址"
                                    required
                                >
                                <input type="submit" value="確定修改" class="form-btn block">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <form class="mt-12" @submit.prevent="updatePassword">
                <table class="w-full">
                    <caption class="text-left font-medium pb-2 border-b border-blue-gray">
                        修改密碼
                    </caption>
                    <tbody class="text-blue-gray">
                        <tr>
                            <td class="pt-5 w-[90px]">
                                <div>舊密碼</div>
                            </td>
                            <td class="pt-5">
                                <input
                                    ref="focusEl"
                                    v-model="password.oldPassword"
                                    type="password"
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
                                    v-model="password.newPassword"
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
                                    v-model="password.confirmPassword"
                                    type="password"
                                    class="text-input"
                                    required
                                >
                                <input type="submit" value="變更密碼" class="form-btn block">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div class="text-blue-gray mt-10 md:mt-0">
            <ul class="flex items-center">
                <li class="material-icons text-black">
                    person
                </li>
                <li class="ml-[5px]">
                    會員編號
                </li>
                <li class="text-xl ml-[5px]">
                    {{ memberID }}
                </li>
            </ul>
            <table>
                <tr>
                    <td class="w-[95px] pt-4">
                        購物車
                    </td>
                    <td class="pt-4">
                        {{ cart.length }}
                    </td>
                </tr>
                <tr>
                    <td class="pt-4">
                        我的收藏
                    </td>
                    <td class="pt-4">
                        {{ favorite.length }}
                    </td>
                </tr>
                <tr>
                    <td class="pt-4">
                        完成訂單
                    </td>
                    <td class="pt-4">
                        {{ orders.length }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref, computed, useStore, useRouter } from '@nuxtjs/composition-api';
import CitySelect from '@/components/CitySelect.vue';

export default {
    name: 'MemberUpdate',
    components: {
        CitySelect
    },
    setup () {
        const store = useStore();
        const router = useRouter();

        // 修改個人資料
        const memberData = reactive({
            email: '',
            name: '',
            gender: 'male',
            cellPhone: '',
            edm: false,
            address: {
                contact: {
                    country: '台灣及離島',
                    city: '',
                    area: '',
                    other: ''
                },
                delivery: {
                    country: '台灣及離島',
                    city: '',
                    area: '',
                    other: ''
                }
            }
        });
        const changeCity = (type, { city, area }) => {
            memberData.address[type].city = city;
            memberData.address[type].area = area;
        };
        const readProfile = async () => {
            let result = {};
            if (store.state.member.profile) {
                result = {
                    status: 200,
                    profile: store.state.member.profile
                };
            }
            else {
                result = await store.dispatch('member/readProfile');
            }

            if (result.status === 200) {
                for (const value of Object.keys(memberData)) {
                    memberData[value] = result.profile[value];
                }
            }
        };
        const updateProfile = async () => {
            const result = await store.dispatch('member/updateProfile', memberData);
            if (result.status === 200) {
                store.dispatch('setAlertMsgHandler', '個人資料修改成功');
            }
        };

        // 修改密碼
        const password = reactive({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        const updatePassword = async () => {
            // confirm password
            if (password.newPassword !== password.confirmPassword) {
                await store.dispatch('setAlertMsgHandler', '密碼不一致');
                resetPasswordInput();
                return;
            }

            // check old password
            const loginResult = await store.dispatch('member/userLogin', {
                email: store.state.member.loginInfo.email,
                password: password.oldPassword
            });
            if (loginResult.status === 401) return;
            if (loginResult.status !== 200) {
                await store.dispatch('setAlertMsgHandler', loginResult.message);
                resetPasswordInput();
                return;
            };

            // update password
            const result = await store.dispatch('member/updatePassword', password.newPassword);
            switch (result.status) {
            case 200:
                await store.dispatch('setAlertMsgHandler', '密碼修改成功，請重新登入。');
                store.dispatch('member/userLogout');
                router.push('/login');
                break;
            case 401:
                break;
            default:
                await store.dispatch('setAlertMsgHandler', result.message);
                resetPasswordInput();
                break;
            }
        };
        const focusEl = ref(null);
        const resetPasswordInput = () => {
            for (const value of Object.keys(password)) {
                password[value] = '';
            }
            focusEl.value.focus();
        };

        const memberID = computed(() => store.state.member.loginInfo?.localId.slice(0, 13));
        const cart = computed(() => store.state.product.cart);
        const favorite = computed(() => store.state.product.favorite);
        const orders = computed(() => store.state.member.orders);

        onMounted(() => {
            readProfile();
        });

        return {
            memberData,
            changeCity,
            updateProfile,
            password,
            updatePassword,
            focusEl,
            memberID,
            cart,
            favorite,
            orders
        };
    }
};
</script>

<style lang="scss" scoped>
.checkbox:checked {
    background-image: url('@/assets/images/tick.svg');
    background-position: 50%;
    background-size: cover;
}
</style>