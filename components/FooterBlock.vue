<template>
    <footer class="bg-raisin-black text-white">
        <div class="container flex justify-between items-center h-[80px]">
            <nuxt-link to="/" class="w-12">
                <img src="@/assets/images/logo-white.svg" alt="Watch Store">
            </nuxt-link>
            <a href="https://www.freepik.com/vectors/logo" target="_blank" class="text-sm">
                <template v-if="screens.sm">
                    Logo vector created by eightonesix - www.freepik.com
                </template>
                <template v-else>
                    Logo vector created by eightonesix<br>www.freepik.com
                </template>
            </a>
        </div>
    </footer>
</template>

<script>
import { screens } from '@/composition/mediaSensor.js';

export default {
    name: 'FooterBlock',
    setup () {
        return {
            screens
        };
    }
};
</script>