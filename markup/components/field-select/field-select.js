import ready from '../../static/js/documentReady.js';

ready(function () {

    if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (let index = 1; index < arguments.length; index++) {
                let source = arguments[index];
                if (source != null) {
                    for (let key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }

    const Choices = require('choices.js');

    const fields = document.querySelectorAll('.field-select__select');

    if (fields.length) {

        new Choices('.field-select__select', {
            searchEnabled: false,
            placeholderValue: 'Выберите',
        });

    }


});
