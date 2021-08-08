<template>
    <div class="grid auto-rows-auto grid-cols-2 md:grid-cols-4 gap-y-7 md:gap-y-14 gap-x-[15px] md:gap-x-[30px]">
        <div v-for="product in products" :key="product.id" class="relative group flex flex-col">
            <nuxt-link :to="`/product/${product.id}`" class="product-link block relative pt-[100%] bg-50% bg-center bg-white bg-no-repeat">
                <div class="absolute inset-0 bg-cover bg-center" :style="{ 'background-image': `url(${product.url})` }" />
                <div v-if="amount && product.amount > 1" class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 text-white text-3xl">
                    x {{ product.amount }}
                </div>
            </nuxt-link>
            <h2 class="text-xl lg:text-2xl mt-1 flex-grow">
                {{ product.name }}
            </h2>
            <p>{{ product.fullBrand }}</p>
            <ul class="flex">
                <li>
                    {{ product.discount ? formatPrice(Math.floor(product.price * product.discount)) : formatPrice(product.price) }}
                </li>
                <li v-if="product.discount" class="ml-[6px] text-dark-gray line-through">
                    {{ formatPrice(product.price) }}
                </li>
            </ul>
            <div v-if="tool">
                <button class="material-icons align-middle text-raisin-black focus:outline-none" :class="{ 'opacity-50': !inFavorite(product.id) }" @click="updateLS('favorite', product)">
                    favorite
                </button>
                <button class="material-icons align-middle text-raisin-black ml-[10px] focus:outline-none" :class="{ 'opacity-50': !inCart(product.id) }" @click="updateLS('cart', product)">
                    shopping_cart
                </button>
            </div>
            <button v-if="trash" class="material-icons absolute top-2 right-2 md:hidden md:group-hover:block focus:outline-none text-black bg-white opacity-50 rounded-full" @click="$emit('removeProduct', product)">
                close
            </button>
        </div>
    </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api';
import formatPrice from '@/composition/formatPrice.js';

export default {
    name: 'ProductList',
    props: {
        products: {
            type: Array,
            default: () => []
        },
        tool: {
            type: Boolean,
            default: true
        },
        trash: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Boolean,
            default: false
        }
    },
    emits: ['removeProduct'],
    setup () {
        const store = useStore();

        // 最愛商品
        const favorite = computed(() => store.state.product.favorite);
        const inFavorite = id => favorite.value.find(item => item.id === id);

        // 購物車
        const cart = computed(() => store.state.product.cart);
        const inCart = id => cart.value.find(item => item.id === id);

        const updateLS = (name, value) => {
            if (name === 'cart') {
                value.amount = 1;
            }
            store.dispatch('product/updateLS', { name, value });
        };

        return {
            formatPrice,
            inFavorite,
            inCart,
            updateLS
        };
    }
};
</script>

<style lang="scss" scoped>
.product-link {
    background-image: url('@/assets/images/logo-light.svg');
}
</style>