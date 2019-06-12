import ready from '../../static/js/documentReady.js';

import $ from 'jquery';

ready(function () {
    const acc = $('.personal-order__control');

    acc.each(function (i, el) {

        if (el.classList.contains('personal-order__control--active')) {
            $(this).next('div').slideToggle(200);
            // $(this).siblings('.personal-order__content').slideToggle(200);
        }

    });

    acc.on('click', function () {
        let $this = $(this);

        if ($(event.target).data('toggle')) {
            $('#modal-tracking').modal();
            return false;
        }


        $this.toggleClass('personal-order__control--active');
        $this.next('div').slideToggle(200);
        // $this.siblings('.personal-order__content').slideToggle(200);
        if ($('.personal-order__control-btn span').length) {
            $this.find('.personal-order__control-btn span').text(function (i, text) {
                return text === 'Показать' ? 'Скрыть' : 'Показать';
            });
        }

    });

    // $('.personal-order__control-bottom .btn').on('click', function (e) {
    //     e.stopPropagation();
    // })
});
