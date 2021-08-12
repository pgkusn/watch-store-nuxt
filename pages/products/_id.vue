<template>
    <div>
        <ProductNav :products="productData" :brand="$route.params.id" />

        <div class="container py-10 md:py-15">
            <ProductList :products="showProducts" />
            <Pagination :pages="products.length" :page="$route.query.page" :url="`/products/${$route.params.id || 'agnes'}`" />
        </div>

        <Subscribe />
    </div>
</template>

<script>
import { computed, onMounted, watch, useStore, useContext, useRoute, useAsync } from '@nuxtjs/composition-api';
import ProductNav from '@/components/ProductNav.vue';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/Pagination.vue';
import Subscribe from '@/components/Subscribe.vue';
import useShowList from '@/composition/showList.js';

export default {
    name: 'ProductsId',
    components: {
        ProductNav,
        ProductList,
        Pagination,
        Subscribe
    },
    setup () {
        const store = useStore();
        const route = useRoute();
        const { error } = useContext();

        useAsync(async () => {
            if (!store.state.product.products.length) {
                await store.dispatch('product/getProducts');
            }
        });

        const productData = computed(() => store.state.product.products);
        const singleBrandProduct = computed(() => productData.value.filter(item => item.brand === (route.value.params.id || 'agnes')));
        const products = useShowList(singleBrandProduct);
        const showProducts = computed(() => route.value.query.page ? products.value[route.value.query.page - 1] : products.value[0]);

        watch(showProducts, value => {
            if (!value) {
                error({ statusCode: 404 });
            }
        });

        return {
            products,
            showProducts,
            productData
        };
    }
};
</script>