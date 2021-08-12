export const state = () => ({
    alertMsg: ''
});

export const mutations = {
    setAlertMsg (state, msg) {
        state.alertMsg = msg;
    }
};

export const actions = {
    nuxtServerInit ({ commit }, context) {
        const loginInfo = context.app.$cookies.get('loginInfo'); // 預設已做 JSON.parse()
        if (loginInfo) {
            commit('member/setLoginInfo', loginInfo);
        }
    },
    setAlertMsgHandler ({ commit }, msg) {
        return new Promise(resolve => {
            commit('setAlertMsg', msg);
            setTimeout(() => {
                commit('setAlertMsg', '');
                resolve();
            }, 1300);
        });
    }
};