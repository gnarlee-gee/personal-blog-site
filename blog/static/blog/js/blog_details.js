// after page loads activate function
window.onload = function () {
    const blogPosts = document.querySelector('.blog-posts');
    let numOfPosts = blogPosts.children.length;
    numOfPosts /= 2;
    // addCurrentPostColor();
    blogClick(numOfPosts);
    resizeSidepane();
}



const homeMenuText = document.querySelector('#home-menu');
const blogMenuText = document.querySelector("#blog-side-text");
const blogMenuBurger = document.querySelector("#blog-menu");
// const projectsMenuText = document.querySelector("#projects-side-text");
// const resumeMenuText = document.querySelector("#resume-side-text");
// const contactMenuText = document.querySelector("#contact-side-text");




function addHoverClass() {
    blogMenuText.style.color = "#090B0D";
    blogMenuBurger.style.color = "#e63946"
    homeMenuText.style.color = "#BACBD9";
    homeMenuText.classList.add("menu-hover");
    // projectsMenuText.style.color = "#BACBD9";
    // projectsMenuText.classList.add("menu-hover");
    // resumeMenuText.style.color = "#BACBD9";
    // resumeMenuText.classList.add("menu-hover");
    // contactMenuText.style.color = "#BACBD9";
    // contactMenuText.classList.add("menu-hover");

}



// Moves ".html" items and their icons down according to number of posts
// when the drop down folder is clicked


// Adds and removes grid items on click
function setBlogPostsGrid(operation) {
    let parent = document.querySelector('.blog-posts');
    const post_title = document.querySelector('#current-post').textContent;
    let children = parent.children;
    let posts = document.querySelectorAll('.posts')
    children = Math.floor(children.length / 2);

    if (operation == 'change') {
        let i = 0;
        for (; i < children; i++) {
            let postBox = document.createElement('div');
            // Matches url for each post (/post/5)
            let postUrl = posts[i].firstElementChild.outerHTML.match(/\<(.*?)\>/g)
            postBox.setAttribute('id', `post-box-${i+1}`);
            document.getElementById("sidepane-div").appendChild(postBox);
            postBox = document.querySelector(`#post-box-${i+1}`);
            postBox.innerHTML = postUrl[0] + posts[i].textContent.trim() + "</a>"
            postBox.innerHTML
            // console.log(post_title);
            // console.log(postBox.innerHTML)
            if (i == 0) postBox.style.marginTop = '10px';
            postBox.setAttribute('class', 'posts')
            if (post_title == posts[i].textContent.split('-')[1].trim()) {
                // <i class="material-icons material-icons-round md-38-right">chevron_right</i>
                postBox.innerHTML = '<div class="post-title">' + 
                                    '<p>' + posts[i].textContent.trim() + "</p></div>";
                // console.log(document.querySelector('.post-title').offsetWidth);
                // console.log(postBox)
                // postBox.innerHTML += postUrl[0] + posts[i].textContent.trim() + "</a>"
                // postBox.style.marginLeft = '-2.5px';
                document.querySelector('.post-title').style.width = document.querySelector('.post-title').offsetWidth + 15 + 'px';
                postBox.classList.add('current-post');
            } else {
                postBox.classList.add('other-posts');
            }
        }
    } else if (operation == 'default') {
        for (let i = 0; i < children; i++) {
            let post = document.querySelector(`#post-box-${i+1}`);

            function runEffect() {
                // get effect type from
                var selectedEffect = 'fade';
                // Run the effect
                $(post).hide(selectedEffect, 500);
            };
            runEffect();
        }

        setTimeout(function () {
            for (let i = 0; i < children; i++) {
                let post = document.querySelector(`#post-box-${i+1}`);
                if (post != null) {
                    post.remove();
                }
            }
        }, 500);
    }
}

let dropDown = false;

// Change right arrow to a down arrow on click and vice versa
// Modifies behavior when clicking blog
function blogClick(numOfPosts) {
    const blogText = document.querySelector('#blog-side-text');
    const sidePane = document.querySelector('.sidepane')

    const blogMenu = document.querySelector('#blog-menu');
    const blogClose = document.querySelector('#blog-close');
    const posts = document.querySelector('.blog-posts');

    let blogMenuColor = '';

    blogMenu.addEventListener('click', () => {
        if (!dropDown) {
            document.querySelector('#home-menu').style.visibility = 'hidden';

            blogMenuColor = blogText.style.color;

            function runEffect() {
                // get effect type from
                var selectedEffect = 'fade';

                // Run the effect
                $(blogMenu).hide(selectedEffect, 0);
            };

            function callback() {
                setTimeout(function () {
                    $(blogClose, blogText).removeAttr("style").hide().fadeIn();
                }, 250);
            };
            callback();
            runEffect();

            blogText.classList.remove("menu-hover");
            // document.querySelector('#projects-side-text').style.visibility = 'hidden';
            // document.querySelector('#resume-side-text').style.visibility = 'hidden';
            // document.querySelector('#contact-side-text').style.visibility = 'hidden';

            blogMenuText.style.color = "#F2F2F2";

            sidePane.className += ' posts-scroll-bar';
            sidePane.style.zIndex = 2;

            posts.style.display = 'block';
            setBlogPostsGrid('change', numOfPosts)


        }
    });


    blogText.addEventListener('click', () => {
        if (!dropDown) {
            blogMenuColor = blogText.style.color;

            function runEffect() {
                // get effect type from
                var selectedEffect = 'fade';

                // Run the effect
                $(blogMenu).hide(selectedEffect, 0);
            };

            function callback() {
                setTimeout(function () {
                    if (!dropDown) {
                        document.querySelector('#blog-close').style.visibility = 'hidden';
                    } else {
                        $(blogClose, blogText).removeAttr("style").hide().fadeIn();
                    }
                }, 250);
            };
            callback();
            runEffect();

            blogText.classList.remove("menu-hover");
            // blogText.className = 'postbg-active';
            document.querySelector('#home-menu').style.visibility = 'hidden';
            // document.querySelector('#projects-side-text').style.visibility = 'hidden';
            // document.querySelector('#resume-side-text').style.visibility = 'hidden';
            // document.querySelector('#contact-side-text').style.visibility = 'hidden';

            blogMenuText.style.color = "#F2F2F2";

            sidePane.className += ' posts-scroll-bar';
            sidePane.style.zIndex = 2;


            posts.style.display = 'block';


            setBlogPostsGrid('change', numOfPosts)
        }
    });







    [blogClose, blogText].forEach((item) => {
        item.addEventListener('click', () => {
            if (dropDown) {
                function runEffect() {
                    // get effect type from
                    var selectedEffect = 'fade';

                    // Run the effect
                    $(blogClose).hide(selectedEffect, 500);
                };

                function callback() {
                    setTimeout(function () {
                        $(blogMenu).removeAttr("style").hide().fadeIn();
                        document.querySelector('#home-menu').style.visibility = 'visible';
                        // document.querySelector('#projects-side-text').style.visibility = 'visible';
                        // document.querySelector('#resume-side-text').style.visibility = 'visible';
                        // document.querySelector('#contact-side-text').style.visibility = 'visible';
                        blogMenuText.style.color = blogMenuColor;
                    }, 500);
                };
                runEffect();
                callback();

                posts.style.display = 'none';

                sidePane.className = 'sidepane';

                setBlogPostsGrid('default', numOfPosts);
                // moveGridItems('default', numOfPosts);
                //Used in the resizeSidepane function
                dropDown = true;
                setTimeout(function () {
                    if (blogMenuText.style.color != '#F2F2F2' && blogMenuBurger.style.color != "#e63946") {
                        blogMenuBurger.setAttribute('style', 'color: #e63946');
                    } else {
                        // blogText.classList.add("menu-hover");
                        blogText.style.color = "#090B0D"
                    }
                }, 500);
            }
        });

    })
}

// Implements ability to resize sidepane
function resizeSidepane() {
    $(function () {
        $("#blog-menu, #blog-side-text, #blog-close").on("click", function () {
            if (!dropDown) {
                $(".post-bg").animate({
                    height: "100vh",
                }, 500);
                $(".sidepane").animate({
                    width: "47vw",
                }, 500);
                dropDown = true;
            } else {
                $(".sidepane").animate({
                    width: 140,
                }, 500);
                $(".post-bg").animate({
                    height: 0,
                }, 500);
                dropDown = false;
            }
        });
        $("#blog-close").on("click", function () {
            if (dropDown) {
                $(".sidepane").animate({
                    width: 140,
                }, 500);
                $(".post-bg").animate({
                    width: 0,
                }, 500);
                dropDown = false;
            }
        });

    });
}