<template>
    <div class="text-2xl text-raisin-black absolute inset-0 m-auto flex justify-center items-center">
        {{ error.statusCode === 404 ? '找不到頁面' : '網站發生錯誤，請稍後再試！' }}
    </div>
</template>

<script>
export default {
    name: 'Error',
    props: {
        error: {
            type: Object,
            default: () => {}
        }
    }
};
</script>