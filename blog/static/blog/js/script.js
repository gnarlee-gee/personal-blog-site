// Grab the info div and change it's z-index to allow scrolling above nav divs




function setAtts() {
    var checkedItem = document.getElementById('hamburger');
    var changeZindex = document.getElementById('info-box');
    checkedItem.addEventListener('click', event => {
        if (checkedItem.checked) {
            changeZindex.setAttribute('style', 'z-index: 0;');
        } else {
            changeZindex.setAttribute('style', 'z-index: 1;');
        }
    })
}

window.onload = setAtts;