import ready from '../../static/js/documentReady.js';

ready(function () {

    const favorites = document.querySelectorAll('.favorites');

    if (favorites.length) {
        Array.prototype.forEach.call(favorites, function (favorite) {
            favorite.addEventListener('click', function (e) {
                e.preventDefault();

                console.log(e.target);

                e.target.classList.toggle('favorites--active');
            });
        });
    }

});

