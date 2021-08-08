import API from '@/assets/data/api.json';

export const state = () => ({
    products: [],
    favorite: [],
    cart: []
});

export const mutations = {
    setState (state, { name, value }) {
        state[name] = value;
    }
};

export const actions = {
    createLS ({ commit }, { name, value }) {
        this.$LS.set(name, value);
        commit('setState', { name, value });
        return value;
    },
    readLS ({ commit }, name) {
        const products = this.$LS.get(name) || [];
        commit('setState', { name, value: products });
        return products;
    },
    removeLS ({ commit, dispatch, rootState }, name) {
        this.$LS.remove(name);
        commit('setState', { name, value: [] });
        if (rootState.member.loginInfo) {
            dispatch('member/updatePreferences', null, { root: true });
        }
        return [];
    },
    updateLS ({ commit, dispatch, rootState }, { name, value }) {
        const products = this.$LS.get(name) || [];
        const index = products.findIndex(item => item.id === value.id);
        if (index === -1) {
            products.push(value);
        }
        else {
            products.splice(index, 1);
        }
        this.$LS.set(name, products);
        commit('setState', { name, value: products });

        if (rootState.member.loginInfo) {
            dispatch('member/updatePreferences', null, { root: true });
        }

        return products;
    },
    async getProducts ({ commit }) {
        try {
            const { data } = await this.$dbAPI({
                method: API.products.method,
                url: API.products.url
            });
            commit('setState', { name: 'products', value: data });
            return data;
        }
        catch (error) {
            console.error(error.message);
        }
    },
    async getProduct (context, id) {
        try {
            const { data } = await this.$dbAPI({
                method: API.product.method,
                url: API.product.url.replace(':id', id)
            });
            return data;
        }
        catch (error) {
            console.error(error.message);
        }
    }
};