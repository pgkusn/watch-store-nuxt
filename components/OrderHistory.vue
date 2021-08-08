<template>
    <div class="sm:px-8 md:flex-grow md:pl-[8.6%] mt-11 md:mt-0">
        <div class="max-w-[250px]">
            <input
                v-model="searchOrderIDComputed"
                type="text"
                class="rounded-lg border-transparent flex-1 appearance-none border border-default-gray-300 w-full py-2 px-4 bg-white text-default-gray-700 placeholder-default-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-raisin-black focus:border-transparent"
                placeholder="訂單編號"
            >
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th scope="col" class="px-5 py-3 bg-white  border-b border-default-gray-200 text-default-gray-800  text-left text-sm uppercase font-normal min-w-[140px]">
                                訂單編號
                            </th>
                            <th scope="col" class="px-5 py-3 bg-white  border-b border-default-gray-200 text-default-gray-800  text-left text-sm uppercase font-normal min-w-[140px]">
                                訂單內容
                            </th>
                            <th scope="col" class="px-5 py-3 bg-white  border-b border-default-gray-200 text-default-gray-800  text-left text-sm uppercase font-normal min-w-[140px]">
                                訂單金額
                            </th>
                            <th scope="col" class="px-5 py-3 bg-white  border-b border-default-gray-200 text-default-gray-800  text-left text-sm uppercase font-normal min-w-[140px]">
                                建立時間
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-default-gray-900">
                        <tr v-for="order in showOrders[currentPage - 1]" :key="order.orderID">
                            <td class="px-5 py-5 border-b border-default-gray-200 bg-white text-sm whitespace-nowrap">
                                {{ order.orderID }}
                            </td>
                            <td class="px-5 py-5 border-b border-default-gray-200 bg-white text-sm whitespace-nowrap">
                                <ul>
                                    <li v-for="(item, index) in order.content" :key="index">
                                        {{ item.name }} x{{ item.amount }}
                                    </li>
                                </ul>
                            </td>
                            <td class="px-5 py-5 border-b border-default-gray-200 bg-white text-sm">
                                {{ order.total }}
                            </td>
                            <td class="px-5 py-5 border-b border-default-gray-200 bg-white text-sm">
                                {{ order.createTime }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="showOrders.length > 1" class="px-5 bg-white py-4 flex flex-col xs:flex-row items-center xs:justify-between">
            <div class="pagination flex items-center">
                <button
                    type="button"
                    class="w-full p-4 border-t border-b border-[#e5e7eb] text-base rounded-l-xl text-default-gray-600 disabled:text-opacity-50 bg-white hover:bg-default-gray-100 disabled:hover:bg-transparent focus:outline-none disabled:cursor-default"
                    :disabled="currentPage === 1"
                    @click="currentPage -= 1"
                >
                    <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        class=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
                    </svg>
                </button>
                <button
                    v-for="n in showOrders.length"
                    :key="n"
                    type="button"
                    class="w-full px-4 py-2 border-t border-b border-[#e5e7eb] text-base text-raisin-black bg-white hover:bg-default-gray-100 focus:outline-none"
                    :class="n === currentPage ? 'text-raisin-black' : 'text-default-gray-600'"
                    @click="currentPage = n"
                >
                    {{ n }}
                </button>
                <button
                    type="button"
                    class="w-full p-4 border-t border-b border-[#e5e7eb] text-base rounded-r-xl text-default-gray-600 disabled:text-opacity-50 bg-white hover:bg-default-gray-100 disabled:hover:bg-transparent focus:outline-none disabled:cursor-default"
                    :disabled="currentPage === showOrders.length"
                    @click="currentPage += 1"
                >
                    <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        class=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, useContext, useStore } from '@nuxtjs/composition-api';
import formatPrice from '@/composition/formatPrice.js';
import showList from '@/composition/showList.js';

export default {
    name: 'OrderHistory',
    setup () {
        const store = useStore();
        const { $dayjs } = useContext();

        const currentPage = ref(1);
        const searchOrderID = ref('');
        const searchOrderIDComputed = computed({
            get () {
                return searchOrderID.value;
            },
            set (value) {
                searchOrderID.value = value;
                currentPage.value = 1;
            }
        });
        const orders = computed(() => {
            return store.state.member.orders.map(item => ({
                orderID: item.orderID,
                content: item.content,
                total: formatPrice(item.total),
                createTime: $dayjs(item.createTime).format('YYYY-MM-DD hh:mm:ss')
            })).filter(item => searchOrderID.value ? item.orderID.includes(searchOrderID.value.trim()) : true);
        });
        const showOrders = showList(orders);

        return {
            orders,
            formatPrice,
            searchOrderIDComputed,
            showOrders,
            currentPage
        };
    }
};
</script>

<style lang="scss" scoped>
.pagination > button {
    &:first-child {
        border-left-width: 1px;
    }
    &:last-child {
        border-right-width: 1px;
    }
    + button {
        border-left-width: 1px;
    }
}
</style>