import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default ({ app }, inject) => {
    inject('NProgress', NProgress);
};