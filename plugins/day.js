import dayjs from 'dayjs';

export default ({ app }, inject) => {
    inject('dayjs', dayjs);
};