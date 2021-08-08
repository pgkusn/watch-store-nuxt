<template>
    <div>
        <ProductNav :products="productData" :brand="brand" />

        <div v-if="product" class="container py-10 md:py-15 grid grid-rows-[repeat(5,auto)] md:grid-rows-[repeat(3,auto)] md:grid-cols-3 gap-[30px]">
            <div class="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-2">
                <div class="pt-[63%] bg-center bg-cover" :style="{ 'background-image': `url(${product.imageUrl[0]})` }" />
            </div>
            <div class="md:row-start-1 md:row-span-full md:col-start-3 md:col-span-1">
                <section class="max-w-[350px] mx-auto">
                    <h1 class="text-[32px]">
                        {{ product.name }}
                    </h1>
                    <p class="text-xl whitespace-pre-line mt-1">
                        {{ product.description }}
                    </p>
                    <p class="text-xl mt-8">
                        {{ formatPrice(product.price) }}
                    </p>
                    <form class="flex h-[50px] mt-3" @submit.prevent="updateLS('cart')">
                        <div class="w-[45%] relative">
                            <select v-model="amountComputed" class="w-full h-full border border-raisin-black rounded-l rounded-r-none pl-4 appearance-none focus:outline-none" :disabled="inCart">
                                <option v-for="n in 10" :key="n" :value="n">
                                    {{ n }}
                                </option>
                            </select>
                            <div class="triangle absolute top-1/2 right-3 transform -translate-y-1/2" />
                        </div>
                        <input type="submit" :value="inCart ? '已加入購物車' : '加入購物車'" class="w-[55%] bg-raisin-black text-white rounded-r rounded-l-none cursor-pointer">
                    </form>
                    <button class="mt-3 focus:outline-none" @click="updateLS('favorite')">
                        <span class="material-icons align-middle text-raisin-black" :class="{ 'opacity-50': !inFavorite }">favorite</span>
                        <span class="ml-0.5">{{ inFavorite ? '已收藏' : '加入我的收藏' }}</span>
                    </button>
                    <h2 class="mt-10 md:mt-20 font-bold">
                        商品購買須知
                    </h2>
                    <p class="mt-2">
                        產品因拍攝關係顏色可能略有差異，實際以廠商出貨為主。 商品情境照為示意用，僅商品主體不包含其他配件，請以規格內容物為主。 D’Perfume 盡可能確保所列商品備貨充足，但偶爾仍會有產品售罄的情況。如您所訂購的商品庫存不足，我們將盡快以電子郵件通知您。任何訂單變動均會在訂單總額與出貨訊息內更新。
                    </p>
                    <h2 class="mt-5 font-bold">
                        退換貨須知
                    </h2>
                    <p class="mt-2">
                        依《消費者保護法》的規定，於全站購物皆享有商品到貨【七日猶豫期】（含例假日）之權益。若收到的商品有任何問題，可於猶豫期內申請退貨。
                    </p>
                </section>
            </div>
            <div class="md:row-start-2 md:row-span-1 md:col-start-1 md:col-span-1">
                <div class="pt-[185%] bg-center bg-cover" :style="{ 'background-image': `url(${product.imageUrl[1]})` }" />
            </div>
            <div class="md:row-start-2 md:row-span-1 md:col-start-2 md:col-span-1">
                <div class="pt-[185%] bg-center bg-cover" :style="{ 'background-image': `url(${product.imageUrl[2]})` }" />
            </div>
            <div class="md:row-start-3 md:row-span-1 md:col-start-1 md:col-span-2">
                <div class="pt-[133%] md:pt-[63%] bg-center bg-cover" :style="{ 'background-image': `url(${product.imageUrl[3]})` }" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, useStore, useAsync, useRoute, useContext } from '@nuxtjs/composition-api';
import ProductNav from '@/components/ProductNav.vue';
import formatPrice from '@/composition/formatPrice.js';

export default {
    name: 'Product',
    components: {
        ProductNav
    },
    setup () {
        const store = useStore();
        const route = useRoute();
        const { error } = useContext();

        const productData = computed(() => store.state.product.products);
        const brand = computed(() => productData.value.find(item => item.id === Number(route.value.params.id))?.brand);
        const product = ref(null);
        const amount = ref(1);
        const amountComputed = computed({
            get () {
                return inCart.value?.amount || amount.value;
            },
            set (value) {
                amount.value = value;
            }
        });
        const inFavorite = computed(() => {
            const favorite = store.state.product.favorite;
            return favorite.find(item => item.id === product.value.id);
        });
        const inCart = computed(() => {
            const cart = store.state.product.cart;
            return cart.find(item => item.id === product.value.id);
        });
        const updateLS = name => {
            const value = productData.value.find(item => item.id === product.value.id);
            value.amount = amount.value;
            store.dispatch('product/updateLS', { name, value });
        };

        useAsync(async () => {
            if (!productData.value.length) {
                await store.dispatch('product/getProducts');
            }
            const result = await store.dispatch('product/getProduct', route.value.params.id - 1);
            if (result) {
                product.value = result;
            }
            else {
                error({ statusCode: 404 });
            }
        });

        return {
            productData,
            brand,
            product,
            formatPrice,
            updateLS,
            inFavorite,
            inCart,
            amountComputed
        };
    }
};
</script>

<style lang="scss" scoped>
.triangle {
    &::before,
    &::after {
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        content: '';
    }
    &::before {
        border-width: 0 3px 4px 3px;
        border-color: transparent transparent #373a3c transparent;
    }
    &::after {
        margin-top: 3px;
        border-width: 4px 3px 0 3px;
        border-color: #373a3c transparent transparent transparent;
    }
}
</style>