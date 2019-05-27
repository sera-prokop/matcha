import $ from 'jquery';

import '../../static/js/plugins/accordion';

$(document).ready(function () {

    $('#footer-accordion').akkordeon({
        controls: '.footer__control',
        panels: '.footer__list',
        mediaQuery: {
            'screen and (min-width: 768px)': 'destroy'
        }
    });
});
