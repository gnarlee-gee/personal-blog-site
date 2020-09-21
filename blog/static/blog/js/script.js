// Grab the info div and change it's z-index to allow scrolling above nav divs
function hideAndShow() {
    var checkedItem = document.getElementById('hamburger');
    var changeZindex = document.getElementById('info-box');
    var hideName = document.getElementById('home-link');
    var hideNavBar = document.getElementById('nav-bar');
    var checkLabel = document.getElementById('check-label')
    changeZindex.setAttribute('style', 'z-index: 1;');
    checkedItem.addEventListener('click', event => {
        if (checkedItem.checked) {
            changeZindex.setAttribute('style', 'z-index: 0;');
            changeZindex.setAttribute('style', 'opacity: 0;');
            hideName.setAttribute('style', 'opacity: 0;');
            hideNavBar.setAttribute('style', 'background: rgba(32, 32, 32, 1)');
            checkLabel.setAttribute('style', 'border: 4px solid transparent;');
        } else {
            changeZindex.setAttribute('style', 'z-index: 1;');
            changeZindex.setAttribute('style', 'opacity: 1;');
            hideName.setAttribute('style', 'opacity: 1;');
            hideNavBar.setAttribute('style', 'opacity: 1;');
            hideNavBar.removeAttribute('style', 'background: rgba(32, 32, 32, 1)');
            checkLabel.removeAttribute('style', 'border: 4px solid transparent;');
        }
    })
}

// after page loads activate function
window.onload = hideAndShow;