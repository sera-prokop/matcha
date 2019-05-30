'use strict';



// LazyLoad init
import LazyLoad from 'vanilla-lazyload';
import 'components/header-sticky/header-sticky';
import 'components/burger/burger';
import 'components/sliders/sliders';
import 'components/field-num/field-num';
import 'components/faq/faq';
import 'components/footer/footer';
import 'components/tabs/tabs';


import ready from './documentReady.js';

const lazyLoadOptions = {
    elements_selector: '.lazy'
};

const createLazyLoadInstance = () => {
    return new LazyLoad(lazyLoadOptions);
};

document.addEventListener('DOMContentLoaded', createLazyLoadInstance);
// end LazyLoad init


import objectFitImages from 'object-fit-images';

// const ready = function (fn) {
//     if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
//         fn();
//     } else {
//         document.addEventListener('DOMContentLoaded', fn);
//     }
// };

ready(
    function () {
        // Polyfill for object-fit init
        objectFitImages();
    }
);
