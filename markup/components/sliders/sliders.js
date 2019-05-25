import Swiper from 'swiper';

/* eslint-disable no-unused-vars */
let mySwiper = new Swiper('.swiper-container', {
    loop: true,
    lazy: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
});
/* eslint-enable no-unused-vars */
