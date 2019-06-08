import ready from '../../static/js/documentReady.js';

ready(function () {

    const favorites = document.querySelectorAll('.favorites');

    if (favorites.length) {
        Array.prototype.forEach.call(favorites, function (favorite) {
            favorite.addEventListener('click', function (e) {
                e.preventDefault();

                e.target.classList.toggle('favorites--active');

                $('#modal-favorites-add').on('show.nth.modal', function () {
                    e.target.href = "#modal-favorites-del";
                });

                $('#modal-favorites-del').on('show.nth.modal', function () {
                    e.target.href = "#modal-favorites-add";
                });
            });
        });
    }

});

