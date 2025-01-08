import IMask from 'imask';

export default {
    mounted(el, binding) {
        IMask(el, binding.value);
    },
};
