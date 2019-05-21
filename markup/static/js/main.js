'use strict';

// LazyLoad init
import LazyLoad from 'vanilla-lazyload';

const lazyLoadOptions = {
    elements_selector: '.lazy'
};

const createLazyLoadInstance = () => {
    return new LazyLoad(lazyLoadOptions);
};

document.addEventListener('DOMContentLoaded', createLazyLoadInstance);
// end LazyLoad init


import objectFitImages from 'object-fit-images';

const ready = function (fn) {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

ready(
    function () {
        // Polyfill for object-fit init
        objectFitImages();
    }
);
