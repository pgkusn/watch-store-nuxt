<template>
    <div>
        <HeaderBlock />

        <main class="flex-grow relative overflow-hidden">
            <nuxt />
        </main>

        <FooterBlock />

        <transition name="fade">
            <Alert v-if="alertMsg" :msg="alertMsg" />
        </transition>
    </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api';
import HeaderBlock from '@/components/HeaderBlock.vue';
import FooterBlock from '@/components/FooterBlock.vue';
import Alert from '@/components/Alert.vue';

export default {
    components: {
        HeaderBlock,
        FooterBlock,
        Alert
    },
    setup () {
        const store = useStore();
        const alertMsg = computed(() => store.state.alertMsg);
        return {
            alertMsg
        };
    }
};
</script>