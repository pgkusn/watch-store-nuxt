<template>
    <div>
        <div class="container py-10 md:py-15">
            <ProductList
                :products="showProducts"
                :tool="false"
                :trash="true"
                :amount="true"
                @removeProduct="removeProduct"
            />
            <Pagination :pages="products.length" :page="$route.query.page" url="/cart" />
            <button v-if="products.length" class="block mt-10 md:mt-15 mx-auto w-[160px] h-[38px] rounded bg-raisin-black text-white focus:outline-none" @click="postOrder">
                送出訂單
            </button>
        </div>
        <div v-if="!products.length" class="text-2xl text-raisin-black absolute inset-0 m-auto flex justify-center items-center">
            {{ orderSuccess ? '訂單已送出' : '購物車內無商品' }}
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, useStore, useRouter, useRoute } from '@nuxtjs/composition-api';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/Pagination.vue';
import useShowList from '@/composition/showList.js';

export default {
    name: 'Cart',
    components: {
        ProductList,
        Pagination
    },
    setup () {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const allProducts = computed(() => store.state.product.cart);
        const products = useShowList(allProducts);
        const showProducts = computed(() => route.value.query.page ? products.value[route.value.query.page - 1] : products.value[0]);
        const removeProduct = product => {
            store.dispatch('product/updateLS', { name: 'cart', value: product });
            if (!showProducts.value && route.value.query.page > 1) {
                router.replace('/cart');
            }
        };

        const loginInfo = computed(() => store.state.member.loginInfo);
        const orderSuccess = ref(false);
        const postOrder = async () => {
            if (!loginInfo.value) {
                sessionStorage.setItem('beforeLogin', '/cart');
                router.push('/login');
                return;
            }
            const order = allProducts.value.reduce((previousValue, currentValue) => {
                previousValue.content.push({ name: currentValue.fullBrand, amount: currentValue.amount });
                previousValue.total += currentValue.price;
                previousValue.createTime = new Date().getTime();
                return previousValue;
            }, { content: [], total: 0 });

            const result = await store.dispatch('member/createOrder', order);
            switch (result.status) {
            case 200:
                await store.dispatch('setAlertMsgHandler', '訂購成功');
                store.dispatch('product/removeLS', 'cart');
                orderSuccess.value = true;
                break;
            case 401:
                break;
            default:
                store.dispatch('setAlertMsgHandler', '訂購失敗，請稍後再試！');
                break;
            }
        };

        onMounted(() => {
            if (loginInfo.value && sessionStorage.getItem('beforeLogin')) {
                sessionStorage.removeItem('beforeLogin');
                postOrder();
            }
        });

        return {
            products,
            removeProduct,
            showProducts,
            postOrder,
            orderSuccess
        };
    }
};
</script>