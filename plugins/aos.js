import AOS from 'aos';
import 'aos/dist/aos.css';

export default ({ app }, inject) => {
    inject('AOS', AOS);
};