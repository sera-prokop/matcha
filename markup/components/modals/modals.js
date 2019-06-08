import ready from '../../static/js/documentReady.js';

ready(function () {
    const btns = document.querySelectorAll('.modal--present .cart-item__btn');

    if (btns.length) {
        Array.prototype.forEach.call(btns, function (btn) {
            btn.addEventListener('click', function (event) {


                if (!event.target.classList.contains('modal__btn--active')) {

                    event.target.classList.add('modal__btn--active');

                } else {

                    event.target.classList.remove('modal__btn--active');

                }


            });
        });
    }
});
