import { computed } from '@nuxtjs/composition-api';

export default list => {
    const perPage = 8;
    const showList = computed(() => {
        const newList = [];
        list.value.forEach((item, i) => {
            if (i % perPage === 0) {
                newList.push([]);
            }
            const page = parseInt(i / perPage);
            newList[page].push(item);
        });
        return newList;
    });
    return showList;
};