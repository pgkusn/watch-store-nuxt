// api reference：https://firebase.google.com/docs/reference/rest/auth
export default function ({ $axios, redirect, store }, inject) {
    const authAPI = $axios.create({
        baseURL: process.env.AUTH_API_URL,
        params: {
            key: process.env.FIREBASE_API_KEY
        }
    });

    authAPI.onError(error => {
        if (error.response.status === 401) {
            if (process.client) {
                // 此處 context 的 route 參數非當下頁面
                sessionStorage.setItem('beforeLogin', location.pathname);
            }
            // 此處使用 async/await 會有錯誤
            store.dispatch('setAlertMsgHandler', '登入逾時，請重新登入！').then(() => {
                store.dispatch('member/userLogout');
                redirect('/login');
            });
        }
    });

    inject('authAPI', authAPI);
}