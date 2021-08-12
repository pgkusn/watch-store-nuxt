<template>
    <div v-if="pages > 1" class="flex justify-center mt-10 md:mt-15 text-xl leading-6 text-coral-black">
        <nuxt-link
            v-for="n in pages"
            :key="n"
            :to="`${url}?page=${n}`"
            :class="pageClass(n)"
        >
            {{ n }}
        </nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        pages: {
            type: Number,
            default: 0
        },
        page: {
            type: String,
            default: '1'
        },
        url: {
            type: String,
            default: ''
        }
    },
    setup (props) {
        const pageClass = page => {
            const currentPage = Number(props.page);
            const classes = ['block', 'w-5', 'text-center'];
            if (currentPage === page) {
                classes.push('text-raisin-black', 'border-raisin-black', 'border-b-2');
            }
            if (page > 1) {
                classes.push('ml-5');
            }
            return classes;
        };

        return {
            pageClass
        };
    }
};
</script>