import Swiper from 'swiper';

/* eslint-disable no-unused-vars */
let mySwiper = new Swiper('.main-slider__container', {
    loop: true,
    lazy: true,

    pagination: {
        el: '.main-slider__pagination',
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
        el: '.slider-card__pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        768: {
            slidesPerView: 1
        }
    }
});


// Product slider

let galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 25,
    slidesPerView: 4,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    centerInsufficientSlides: true,
    slideToClickedSlide: true
});

let galleryTop = new Swiper('.gallery-top', {
    // spaceBetween: 10,
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },
    thumbs: {
        swiper: galleryThumbs
    },
    on: {
        slideChange: function () {
            let activeIndex = this.activeIndex + 1;

            let activeSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex})`);
            let nextSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex + 1})`);
            let prevSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex - 1})`);

            if (nextSlide && !nextSlide.classList.contains('swiper-slide-visible')) {
                this.thumbs.swiper.slideNext();
            } else if (prevSlide && !prevSlide.classList.contains('swiper-slide-visible')) {
                this.thumbs.swiper.slidePrev();
            }

        }
    }
});


//Checkout delivery slider

let checkoutDeliverySlider = new Swiper('.checkout-delivery-list__container', {
    loop: true,
    lazy: true,

    pagination: {
        el: '.checkout-delivery-list-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },

    navigation: {
        nextEl: '.checkout-delivery-list-next',
        prevEl: '.checkout-delivery-list-prev',
    },

    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
});


/* eslint-enable no-unused-vars */
