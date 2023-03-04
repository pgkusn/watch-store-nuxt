import Cookies from 'js-cookie';
import API from '@/assets/data/api.json';

export const state = () => ({
    loginInfo: null,
    signUpInfo: null,
    profile: null,
    orders: []
});

export const mutations = {
    setLoginInfo (state, info) {
        state.loginInfo = info;
    },
    setSignUpInfo (state, info) {
        state.signUpInfo = info;
    },
    setProfile (state, profile) {
        state.profile = profile;
    },
    setOrders (state, orders) {
        state.orders = orders;
    }
};

export const actions = {
    async userLogin ({ commit }, { email, password }) {
        try {
            const { data } = await this.$authAPI({
                method: API.userLogin.method,
                url: API.userLogin.url,
                data: {
                    email,
                    password,
                    returnSecureToken: true
                }
            });

            commit('setLoginInfo', data);
            Cookies.set('loginInfo', JSON.stringify(data));

            return {
                status: 200,
                ...data
            };
        }
        catch (error) {
            let message = error.response.data.error.message;
            switch (message) {
            case 'EMAIL_NOT_FOUND':
                message = 'Email 不存在';
                break;
            case 'INVALID_PASSWORD':
                message = '密碼錯誤';
                break;
            }

            return {
                status: error.response.status,
                message
            };
        }
    },
    userLogout ({ commit, dispatch }) {
        Cookies.remove('loginInfo');
        commit('setLoginInfo', null);
        commit('setSignUpInfo', null);
        commit('setProfile', null);
        commit('setOrders', []);
        dispatch('product/removeLS', 'cart', { root: true });
        dispatch('product/removeLS', 'favorite', { root: true });
    },
    async userSignUp ({ state, commit }, { email, password }) {
        try {
            const { data } = await this.$authAPI({
                method: API.userSignUp.method,
                url: API.userSignUp.url,
                data: {
                    email,
                    password,
                    returnSecureToken: true
                }
            });
            commit('setSignUpInfo', data);

            return {
                status: 200,
                ...data
            };
        }
        catch (error) {
            let message = error.response.data.error.message;
            switch (message) {
            case 'EMAIL_EXISTS':
                message = 'Email 重複';
                break;
            case 'INVALID_EMAIL':
                message = 'Email 格式錯誤';
                break;
            }

            return {
                status: error.response.status,
                message
            };
        }
    },
    async createProfile ({ state, commit }, memberData) {
        const { localId, idToken } = state.signUpInfo;
        try {
            await this.$dbAPI({
                method: API.updateProfile.method,
                url: API.updateProfile.url.replace(':uid', localId),
                params: { auth: idToken },
                data: memberData
            });

            commit('setLoginInfo', state.signUpInfo);
            Cookies.set('loginInfo', state.signUpInfo);

            return {
                status: 200
            };
        }
        catch (error) {
            return {
                status: error.response.status
            };
        }
    },
    async readProfile ({ state, commit }) {
        const { localId, idToken, email } = state.loginInfo;
        try {
            const { data } = await this.$dbAPI({
                method: API.readProfile.method,
                url: API.readProfile.url.replace(':uid', localId),
                params: { auth: idToken }
            });
            const profile = { email, ...data };
            commit('setProfile', profile);

            return {
                status: 200,
                profile
            };
        }
        catch (error) {
            return {
                status: error.response.status
            };
        }
    },
    async updateProfile ({ state, commit }, memberData) {
        const { localId, idToken, email } = state.loginInfo;
        try {
            const { data } = await this.$dbAPI({
                method: API.updateProfile.method,
                url: API.updateProfile.url.replace(':uid', localId),
                params: { auth: idToken },
                data: memberData
            });
            const profile = { email, ...data };
            commit('setProfile', profile);

            return {
                status: 200,
                profile
            };
        }
        catch (error) {
            return {
                status: error.response.status
            };
        }
    },
    async updatePassword ({ state }, password) {
        try {
            await this.$authAPI({
                method: API.changePassword.method,
                url: API.changePassword.url,
                data: {
                    idToken: state.loginInfo.idToken,
                    password,
                    returnSecureToken: true
                }
            });
            return { status: 200 };
        }
        catch (error) {
            return {
                status: error.response.status,
                message: error.response.data.error.message
            };
        }
    },
    async resetPassword (context, email) {
        try {
            await this.$authAPI({
                method: API.resetPassword.method,
                url: API.resetPassword.url,
                data: {
                    requestType: 'PASSWORD_RESET',
                    email
                }
            });
            return {
                status: 200
            };
        }
        catch (error) {
            let message = error.response.data.error.message;
            if (message === 'INVALID_EMAIL') {
                message = '查無此信箱';
            }
            return {
                status: error.response.status,
                message
            };
        }
    },
    async readPreferences ({ state }) {
        const { localId, idToken } = state.loginInfo;
        try {
            const { data } = await this.$dbAPI({
                method: API.readPreferences.method,
                url: API.readPreferences.url.replace(':uid', localId),
                params: { auth: idToken }
            });
            return {
                status: 200,
                data
            };
        }
        catch (error) {
            return {
                status: error.response.status,
                message: error.message
            };
        }
    },
    async updatePreferences ({ state, rootState }) {
        const { localId, idToken } = state.loginInfo;
        try {
            await this.$dbAPI({
                method: API.updatePreferences.method,
                url: API.updatePreferences.url.replace(':uid', localId),
                params: { auth: idToken },
                data: {
                    cart: rootState.product.cart,
                    favorite: rootState.product.favorite
                }
            });
            return {
                status: 200
            };
        }
        catch (error) {
            return {
                status: error.response.status
            };
        }
    },
    async createOrder ({ state }, order) {
        const { localId, idToken } = state.loginInfo;
        try {
            await this.$dbAPI({
                method: API.createOrder.method,
                url: API.createOrder.url.replace(':uid', localId),
                params: { auth: idToken },
                data: order
            });
            return {
                status: 200
            };
        }
        catch (error) {
            return {
                status: error.response.status
            };
        }
    },
    async readOrders ({ state, commit }) {
        const { localId, idToken } = state.loginInfo;
        try {
            const { data } = await this.$dbAPI({
                method: API.readOrders.method,
                url: API.readOrders.url.replace(':uid', localId),
                params: { auth: idToken }
            });
            if (data) {
                const orders = Object.keys(data).reduce((previousValue, currentValue) => {
                    previousValue.push({ orderID: currentValue, ...data[currentValue] });
                    return previousValue;
                }, []);
                commit('setOrders', orders);
            }
            return {
                status: 200
            };
        }
        catch (error) {
            return {
                status: error.response.status
            };
        }
    },
    async refreshToken (context, token) {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', token);
        try {
            const { data } = await this.$authAPI({
                method: API.refreshToken.method,
                url: API.refreshToken.url,
                data: params
            });
            return data;
        }
        catch (error) {
            console.error(error.message);
        }
    }
};