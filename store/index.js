export const state = () => ({
    alertMsg: ''
});

export const mutations = {
    setAlertMsg (state, msg) {
        state.alertMsg = msg;
    }
};

export const actions = {
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