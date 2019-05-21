const idOfHeader = 'header-sticky';
const classes = 'header-sticky--pin';
let eleHeader = null;

function onScroll() {
    const currentHeightHeader = eleHeader.offsetHeight;
    if ( document.body.scrollTop > currentHeightHeader || document.documentElement.scrollTop > currentHeightHeader ) {
        eleHeader.classList.add(classes);
    } else {
        eleHeader.classList.remove(classes);
    }
}

window.onload = function () {
    eleHeader = document.getElementById(idOfHeader);
    onScroll();
    document.addEventListener('scroll', onScroll, false);
};
