export default ({ app }, inject) => {
    inject('LS', {
        get (item) {
            return JSON.parse(localStorage.getItem(item));
        },
        set (item, content) {
            localStorage.setItem(item, JSON.stringify(content));
        },
        remove (item) {
            localStorage.removeItem(item);
        }
    });
};