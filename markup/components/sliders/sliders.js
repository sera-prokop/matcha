import Swiper from 'swiper';

/* eslint-disable no-unused-vars */
let mySwiper = new Swiper('.main-slider__container', {
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

let SliderCard = new Swiper('.slider-card__container', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    lazy: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});
/* eslint-enable no-unused-vars */
