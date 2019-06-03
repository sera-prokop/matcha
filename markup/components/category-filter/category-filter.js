import ready from '../../static/js/documentReady.js';

import $ from 'jquery';

// import '../../static/js/plugins/accordion';

import 'ion-rangeslider';


ready(function () {
    let burgers = document.querySelectorAll('.category-filter__btn');

    function showBurgerTarget() {
        let targetId = this.getAttribute('data-target-id');
        let targetClassToggle = this.getAttribute('data-target-class-toggle');
        if (targetId && targetClassToggle) {
            this.classList.toggle('category-filter__btn--close');
            document.getElementById(targetId).classList.toggle(targetClassToggle);
        }
    }

    for (let i = 0; i < burgers.length; i++) {
        let burger = burgers[i];
        burger.addEventListener('click', showBurgerTarget);
    }


    $('.js-range-slider').ionRangeSlider({
        type: 'double',
        grid_margin: false,
        hide_min_max: true,
        hide_from_to: true,
        skin: 'round',
        onStart: function (data) {
            data.input.closest('.filter-block__content').find('.filter-block__value--from').val(data.from);
            data.input.closest('.filter-block__content').find('.filter-block__value--to').val(data.to);
        },
        onChange: function (data) {
            data.input.closest('.filter-block__content').find('.filter-block__value--from').val(data.from);
            data.input.closest('.filter-block__content').find('.filter-block__value--to').val(data.to);
        }
    });


    $('.filter-block__value').on('input', function () {

        let $this = $(this),
            slider = $this.closest('.filter-block__content').find('.js-range-slider').data('ionRangeSlider'),
            valueData = $this.closest('.filter-block__content').find('.js-range-slider'),
            maxValue = valueData.data('max'),
            minValue = valueData.data('min'),
            value = $this.val(), thisValue, thisValue2;


        if ((value !== '') && (value.indexOf('.') === -1)) {

            $(this).val(Math.max(Math.min(value, maxValue), -minValue));
        }

        if ($this.hasClass('filter-block__value--to')) {
            thisValue = $this.val();
        } else {
            thisValue2 = $this.val();
        }

        slider.update({
            to: thisValue,
            from: thisValue2
        });
    });



    // const acc = document.getElementsByClassName('filter-block__control');
    //
    // for (let i = 0; i < acc.length; i++) {
    //
    //     if (acc[i].classList.contains('active')) {
    //         let panel = acc[i].nextElementSibling;
    //         panel.style.maxHeight = panel.scrollHeight + 'px';
    //     }
    //
    //     acc[i].addEventListener('click', function () {
    //         this.classList.toggle('active');
    //         let panel = this.nextElementSibling;
    //         if (panel.style.minHeight) {
    //             panel.style.minHeight = null;
    //         } else {
    //             panel.style.minHeight = panel.scrollHeight + 'px';
    //         }
    //     });
    // }

    //     if (acc[i].classList.contains('active')) {
    //         let panel = acc[i].nextElementSibling;
    //         panel.style.maxHeight = panel.scrollHeight + 'px';
    //     }




    // const acc = document.getElementsByClassName('filter-block__control');

    const acc = $('.filter-block__control');

    acc.each(function (i, el) {

        if (el.classList.contains('filter-block__control--active')) {
            $(this).next('div').slideToggle(200);
        }

    });

    $('.filter-block__control').on('click', function () {
        $(this).toggleClass('filter-block__control--active');
        $(this).next('div').slideToggle(200);
    });

    // for (let i = 0; i < acc.length; i++) {
    //
    //     if (acc[i].classList.contains('active')) {
    //         let panel = acc[i].nextElementSibling;
    //         panel.slideToggle(200);
    //         panel.style.maxHeight = panel.scrollHeight + 'px';
    //     }
    //
    //     // $('.filter-block__control').on('click', function () {
    //     //     $(this).toggleClass('active');
    //     //     $(this).next('div').slideToggle(200);
    //     // });
    //
    //     // acc[i].addEventListener('click', function () {
    //     //     this.classList.toggle('active');
    //     //     let panel = this.nextElementSibling;
    //     //     if (panel.style.minHeight) {
    //     //         panel.style.minHeight = null;
    //     //     } else {
    //     //         panel.style.minHeight = panel.scrollHeight + 'px';
    //     //     }
    //     // });
    // }


});
