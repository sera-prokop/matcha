/* global document */

import ready from '../../static/js/documentReady.js';

ready(function () {
    let burgers = document.querySelectorAll('.burger');

    function showBurgerTarget() {
        let targetId = this.getAttribute('data-target-id');
        let targetClassToggle = this.getAttribute('data-target-class-toggle');
        if (targetId && targetClassToggle) {
            this.classList.toggle('burger--close');
            document.getElementById(targetId).classList.toggle(targetClassToggle);
        }
    }

    for (let i = 0; i < burgers.length; i++) {
        let burger = burgers[i];
        burger.addEventListener('click', showBurgerTarget);
    }

});
