// after page loads activate function
window.onload = function () {
    blogClick();
    dropDownStatus();
};

const homeMenuText = document.querySelector('#home-menu');
const blogMenuText = document.querySelector("#blog-side-text");
const blogMenuBurger = document.querySelector("#blog-menu");
const blogMenuClose = document.querySelector('#blog-close');

let dropDown = false;


function addHoverClass() {
    blogMenuText.style.color = "#090B0D";
    blogMenuBurger.style.color = "#e63946"
    homeMenuText.style.color = "#D7D9D9";
    homeMenuText.classList.add("menu-hover");
};



function getBlogPosts(operation) {
    let parent = document.querySelector('.blog-posts');
    const post_title = document.querySelector('#current-post').textContent;
    let children = parent.children;
    let posts = document.querySelectorAll('.posts')
    children = Math.floor(children.length / 2);

    if (operation == 'change') {
        let postContainer = document.createElement('div');
        postContainer.setAttribute("id", "post-container");
        document.querySelector(".post-bg").prepend(postContainer);
        document.querySelector(".post-bg").prepend(document.querySelector('#sidepane-div'));
        let i = 0;
        for (; i < children; i++) {
            let postBox = document.createElement('div');
            // Matches url for each post (/post/5)
            let postUrl = posts[i].firstElementChild.outerHTML.match(/\<(.*?)\>/g)
            postBox.setAttribute('id', `post-box-${i+1}`);
            document.getElementById("post-container").appendChild(postBox);
            postBox = document.querySelector(`#post-box-${i+1}`);
            postBox.innerHTML = postUrl[0] + posts[i].textContent.trim() + "</a>"
            postBox.innerHTML
            if (i == 0) postBox.style.marginTop = '10px';
            postBox.setAttribute('class', 'posts')
            if (post_title == posts[i].textContent.split('-')[1].trim()) {
                postBox.innerHTML = '<div class="post-title">' +
                    '<p>' + posts[i].textContent.trim() + "</p></div>";
                document.querySelector('.post-title').style.width = document.querySelector('.post-title').offsetWidth + 15 + 'px';
                postBox.classList.add('current-post');
            } else {
                postBox.classList.add('other-posts');
            }
        }
    } else if (operation == 'default') {
        for (let i = 0; i < children; i++) {
            let post = document.querySelector(`#post-box-${i+1}`);
            document.querySelector(".container").prepend(document.querySelector('#sidepane-div'));


            //https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
            function runEffect() {
                // get effect type from
                // var selectedEffect = 'fade';
                // Run the effect
                fadeOutElement(post);
                // $(post).hide(selectedEffect, 500);
            };
            runEffect();
        }
        for (let i = 0; i < children; i++) {
            let post = document.querySelector(`#post-box-${i+1}`);
            if (post != null) {
                post.remove();
            }
        }
        document.getElementById('post-container').remove();
    }
};

function enlargeBackground() {
    const postbg = document.querySelector('.post-bg');
    let height = 0;
    let id = setInterval(frame, 20);

    function frame() {
        if (height == 100) {
            clearInterval(id);
        } else {
            height += 5;
            postbg.style.height = height + "vh";
        }
    }
};

function recedeBackground() {
    const postbg = document.querySelector('.post-bg');
    let height = 100;
    let id = setInterval(frame, 20);

    function frame() {
        if (height == 0) {
            clearInterval(id);
        } else {
            height -= 5;
            postbg.style.height = height + "vh";
        }
    }
};

function fadeInElement(element) {
    element.classList.add('show');
    element.classList.remove('hide');
}

function fadeOutElement(element) {
    element.classList.add('hide');
    element.classList.remove('show');
}

function toggleOverflow(element, value) {
    element.style.overflow = value;
}


// Change right arrow to a down arrow on click and vice versa
// Modifies behavior when clicking blog
function blogClick() {
    const blogText = document.querySelector('#blog-side-text');
    const sidePane = document.querySelector('.sidepane')

    const blogMenu = document.querySelector('#blog-menu');
    const blogClose = document.querySelector('#blog-close');
    const posts = document.querySelector('.blog-posts');

    const bodyTag = document.querySelector('body');
    const htmlTag = document.querySelector('html');
    const sidepaneDiv = document.querySelector('#sidepane-div');
    const blogSide = document.querySelector('.blog-side');
    const postBg = document.querySelector('.post-bg');

    //first click
    [blogMenu, blogText].forEach((item) => {
        item.addEventListener('click', () => {
            if (!dropDown) {
                enlargeBackground();
                toggleOverflow(bodyTag, 'hidden');
                toggleOverflow(htmlTag, 'hidden');
                sidepaneDiv.classList.remove('sidepane');
                sidepaneDiv.classList.add('sidepane-click');
                blogSide.classList.add('blog-side-click');

                setTimeout(function () {
                    postBg.classList.add('post-bg-border');
                }, 250);

                document.querySelector('#home-menu').style.visibility = 'hidden';
                blogMenuColor = blogText.style.color;
                fadeOutElement(blogMenu);
                blogMenu.style.visibility = 'hidden';
                fadeOutElement(blogClose);

                setTimeout(function () {
                    if (dropDown) {
                        blogClose.removeAttribute("style");
                        fadeInElement(blogClose);
                    }
                }, 0);

                blogText.classList.remove("menu-hover");
                blogMenuText.style.color = "#F2F2F2";
                document.querySelector('#home-menu').style.visibility = 'hidden';

                sidePane.className += ' posts-scroll-bar';
                setTimeout(function () {
                    getBlogPosts('change');
                }, 275)

                setTimeout(function () {
                    document.querySelector('.current-post').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 500);
            };
        });
    });
    //2nd click
    [blogClose, blogText].forEach((item) => {
        item.addEventListener('click', () => {
            if (dropDown) {
                recedeBackground()
                blogMenuText.style.color = "#090B0D";
                toggleOverflow(bodyTag, 'auto');
                toggleOverflow(htmlTag, 'auto');
                sidepaneDiv.classList.add('sidepane');
                sidepaneDiv.classList.remove('sidepane-click');
                blogSide.classList.remove('blog-side-click');

                setTimeout(function () {
                    postBg.classList.remove('post-bg-border');
                }, 250);

                fadeOutElement(blogClose)

                setTimeout(function () {
                    blogMenu.removeAttribute("style");
                    fadeInElement(blogMenu)
                    document.querySelector('#home-menu').style.visibility = 'visible';
                }, 350);

                posts.style.display = 'none';

                sidePane.className = 'sidepane';

                getBlogPosts('default');

                //Used in the dropDownStatus function
                dropDown = true;
            }
        });
    });
}

// Switches dropDown state on click
function dropDownStatus() {
    [blogMenuBurger, blogMenuText, blogMenuClose].forEach((item) => {
        item.addEventListener('click', () => {
            if (!dropDown) { //first click
                dropDown = true;
            } else { //2nd click
                dropDown = false;
            }
        });
    });
}