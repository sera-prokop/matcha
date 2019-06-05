import ready from '../../static/js/documentReady.js';

import $ from 'jquery';

ready(function () {
    const acc = $('.personal-order__control');

    acc.each(function (i, el) {

        if (el.classList.contains('personal-order__control--active')) {
            $(this).next('div').slideToggle(200);
        }

    });

    $('.personal-order__control').on('click', function () {
        console.log('====================================');
        console.log('sldfjsdlfj');
        console.log('====================================');
        $(this).toggleClass('personal-order__control--active');
        $(this).next('div').slideToggle(200);
    });
});
