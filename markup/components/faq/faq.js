import $ from 'jquery';

import '../../static/js/plugins/accordion';

$(document).ready(function () {

    $('#faq-accordion').akkordeon({
        controls: '.faq__control',
        panels: '.faq__content'
    });

});
