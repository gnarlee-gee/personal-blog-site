// after page loads activate function
window.onload = function () {
    blogClick();
    resizeSidepane();
}

const homeMenuText = document.querySelector('#home-menu');
const blogMenuText = document.querySelector("#blog-side-text");
const blogMenuBurger = document.querySelector("#blog-menu");

let dropDown = false;


function addHoverClass() {
    blogMenuText.style.color = "#090B0D";
    blogMenuBurger.style.color = "#e63946"
    homeMenuText.style.color = "#D7D9D9";
    homeMenuText.classList.add("menu-hover");
}

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

            function runEffect() {
                // get effect type from
                var selectedEffect = 'fade';
                // Run the effect
                $(post).hide(selectedEffect, 500);
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
}

// Change right arrow to a down arrow on click and vice versa
// Modifies behavior when clicking blog
function blogClick() {
    const blogText = document.querySelector('#blog-side-text');
    const sidePane = document.querySelector('.sidepane')

    const blogMenu = document.querySelector('#blog-menu');
    const blogClose = document.querySelector('#blog-close');
    const posts = document.querySelector('.blog-posts');

    blogMenu.addEventListener('click', () => {
        if (!dropDown) {
            document.querySelector('#home-menu').style.visibility = 'hidden';
            blogMenuColor = blogText.style.color;

            function runEffect() {
                // Run the effect
                $(blogMenu).hide();
            };

            function callback() {
                $(blogClose, blogText).removeAttr("style").hide().fadeIn();
            };
        };
        callback();
        runEffect();

        blogText.classList.remove("menu-hover");
        blogMenuText.style.color = "#F2F2F2";

        sidePane.className += ' posts-scroll-bar';

        posts.style.display = 'block';
        getBlogPosts('change');

    });

    blogText.addEventListener('click', () => {
        if (!dropDown) {
            blogMenuColor = blogText.style.color;

            function runEffect() {
                // Run the effect
                $(blogMenu).hide();
            };

            function callback() {
                setTimeout(function () {
                    if (!dropDown) {
                        document.querySelector('#blog-close').style.visibility = 'hidden';
                    } else {
                        $(blogClose, blogText).removeAttr("style").hide().fadeIn();
                    }
                }, 0);
            };
            callback();
            runEffect();

            blogText.classList.remove("menu-hover");
            document.querySelector('#home-menu').style.visibility = 'hidden';
            blogMenuText.style.color = "#F2F2F2";
            sidePane.className += ' posts-scroll-bar';
            sidePane.style.zIndex = 2;
            posts.style.display = 'block';
            getBlogPosts('change')
        }
    });

    [blogClose, blogText].forEach((item) => {
        item.addEventListener('click', () => {
            if (dropDown) {
                blogMenuText.style.color = "#090B0D";

                function runEffect() {
                    // get effect type from

                    // Run the effect
                    $(blogClose).hide();
                };

                function callback() {
                    setTimeout(function () {
                        $(blogMenu).removeAttr("style").hide().fadeIn();
                        document.querySelector('#home-menu').style.visibility = 'visible';
                    }, 350);
                };
                runEffect();
                callback();

                posts.style.display = 'none';

                sidePane.className = 'sidepane';

                getBlogPosts('default');

                //Used in the resizeSidepane function
                dropDown = true;
            }
        });
    })
}

// Implements ability to resize sidepane
function resizeSidepane() {
    $(function () {
        $("#blog-menu, #blog-side-text, #blog-close").on("click", function () {
            if (!dropDown) {
                $("body, html").css("overflow", "hidden");
                $('.blog-side').css("margin-bottom", "10px");
                $('#sidepane-div').toggleClass("sidepane", false);
                $('#sidepane-div').toggleClass("sidepane-click", true);
                $('.blog-side').toggleClass("blog-side-clicked", true);
                $('.post-bg').toggleClass("post-bg-border", true);
                $(".post-bg").animate({
                    height: "100vh",
                }, 500);
                dropDown = true;
                $('.post-bg').animate({
                    scrollTop: $(".current-post").offset().top - 95
                }, 1000);
            } else {
                $("body, html").css("overflow", "auto");
                $('.post-bg').toggleClass("post-bg-border", false);
                $('#sidepane-div').toggleClass("sidepane-click", false);
                $('#sidepane-div').toggleClass("sidepane", true);
                $('.blog-side').toggleClass("blog-side-clicked", false);
                $(".post-bg").animate({
                    height: 0,
                }, 500);
                dropDown = false;
            }
        });
    });
}