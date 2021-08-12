export default ({ store, redirect }) => {
    if (!store.state.member.loginInfo) {
        return redirect('/login');
    }
};