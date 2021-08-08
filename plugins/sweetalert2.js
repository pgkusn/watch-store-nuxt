import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default ({ app }, inject) => {
    inject('Swal', Swal);
};