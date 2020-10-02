// Change right arrow to a down arrow on click and vice versa

function getCountOfP() {
    const blogPosts = document.querySelector('.blog-posts');
    const numOfP = blogPosts.children.length;
    console.log('Num of P');
    console.log(numOfP);
}

function dropDownBlog() {
    const blogBox = document.querySelector('.blog-box');
    const rightArrow = document.querySelector("#right-arrow");
    const downArrow = document.querySelector("#down-arrow");
    const posts = document.querySelector('.blog-posts')

    if (rightArrow.style.display == 'inline-block'){
        posts.style.display = 'none';
    }

    blogBox.addEventListener('click', event => {
        if (rightArrow.style.display == 'inline-block'){
            rightArrow.style.display = 'none';
            downArrow.style.display = 'inline-block';
            posts.style.display = 'block';
        } else {
            downArrow.style.display = 'none';
            rightArrow.style.display = 'inline-block';
            posts.style.display = 'none';
        }

    })
    // var checkedItem = document.getElementById('hamburger');
    // var changeZindex = document.getElementById('info-box');
    // var hideName = document.getElementById('home-link');
    // var hideNavBar = document.getElementById('nav-bar');
    // var checkLabel = document.getElementById('check-label')
    // changeZindex.setAttribute('style', 'z-index: 1;');
    // checkedItem.addEventListener('click', event => {
    //     if (checkedItem.checked) {
    //         changeZindex.setAttribute('style', 'z-index: 0;');
    //         changeZindex.setAttribute('style', 'opacity: 0;');
    //         hideName.setAttribute('style', 'opacity: 0;');
    //         hideNavBar.setAttribute('style', 'background: rgba(32, 32, 32, 1)');
    //         checkLabel.setAttribute('style', 'border: 4px solid transparent;');
    //     } else {
    //         changeZindex.setAttribute('style', 'z-index: 1;');
    //         changeZindex.setAttribute('style', 'opacity: 1;');
    //         hideName.setAttribute('style', 'opacity: 1;');
    //         hideNavBar.setAttribute('style', 'opacity: 1;');
    //         hideNavBar.removeAttribute('style', 'background: rgba(32, 32, 32, 1)');
    //         checkLabel.removeAttribute('style', 'border: 4px solid transparent;');
    //     }
    // })
}



// after page loads activate function
window.onload = function () {
    dropDownBlog();
    getCountOfP();
}