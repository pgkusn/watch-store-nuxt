<template>
    <div>
        <div class="container py-10 md:py-15">
            <ProductList
                :products="showProducts"
                :tool="false"
                :trash="true"
                @removeProduct="removeProduct"
            />
            <Pagination :pages="products.length" :page="$route.query.page" url="/wishlist" />
        </div>
        <div v-if="!products.length" class="text-2xl text-raisin-black absolute inset-0 m-auto flex justify-center items-center">
            無收藏的商品
        </div>
    </div>
</template>

<script>
import { computed, onMounted, useStore, useRouter, useRoute } from '@nuxtjs/composition-api';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/Pagination.vue';
import useShowList from '@/composition/showList.js';

export default {
    name: 'Wishlist',
    components: {
        ProductList,
        Pagination
    },
    setup () {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const allProducts = computed(() => store.state.product.favorite);
        const products = useShowList(allProducts);
        const showProducts = computed(() => route.value.query.page ? products.value[route.value.query.page - 1] : products.value[0]);

        const removeProduct = product => {
            store.dispatch('product/updateLS', { name: 'favorite', value: product });
            if (!showProducts.value && route.value.query.page > 1) {
                router.replace('/wishlist');
            }
        };

        onMounted(() => {
            store.dispatch('product/readLS', 'favorite');
        });

        return {
            products,
            removeProduct,
            showProducts
        };
    }
};
</script>