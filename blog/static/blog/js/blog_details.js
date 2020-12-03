// after page loads activate function
window.onload = function () {
    const blogPosts = document.querySelector('.blog-posts');
    let numOfPosts = blogPosts.children.length;
    numOfPosts /= 2;
    blogClick(numOfPosts);
    resizeSidepane();
    addHoverClass();
}



const homeMenuText = document.querySelector('#home-menu');
const blogMenuText = document.querySelector("#blog-side-text");
const blogMenuBurger = document.querySelector("#blog-menu");
// const projectsMenuText = document.querySelector("#projects-side-text");
// const resumeMenuText = document.querySelector("#resume-side-text");
// const contactMenuText = document.querySelector("#contact-side-text");


function addHoverClass() {
    blogMenuText.style.color = "#252526";
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
function moveGridItems(operation) {
    // let projectsRowStartNum = (numOfPosts + 3).toString();
    // let projectsRowEndNum = projectsRowStartNum.toString(projectsRowStartNum++);
    // let resumeRowStartNum = (numOfPosts + 4).toString();
    // let resumeRowEndNum = resumeRowStartNum.toString(resumeRowStartNum++);
    // let contactRowStartNum = (numOfPosts + 5).toString();
    // let contactRowEndNum = contactRowStartNum.toString(contactRowStartNum++);

    // const projects = document.querySelector('.projects-side');
    // const resume = document.querySelector('.resume-side');
    // const contact = document.querySelector('.contact-side');

    if (operation == 'change') {
        // projects.style.visibility = 'hidden';
        // resume.style.visibility = 'hidden';
        // contact.style.visibility = 'hidden';
        // projects.style.gridRowStart = projectsRowStartNum;
        // projects.style.gridRowEnd = projectsRowEndNum;
        // resume.style.gridRowStart = resumeRowStartNum;
        // resume.style.gridRowEnd = resumeRowEndNum;
        // contact.style.gridRowStart = contactRowStartNum;
        // contact.style.gridRowEnd = contactRowEndNum;
    }
}

// Adds and removes grid items on click
function setBlogPostsGrid(operation) {
    let parent = document.querySelector('.blog-posts');
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
            if (i == 0) postBox.style.marginTop = '10px';
            postBox.setAttribute('class', 'posts')
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

            blogMenuColor = blogText.style.color;

            function runEffect() {
                // get effect type from
                var selectedEffect = 'fade';

                // Run the effect
                $(blogMenu).hide(selectedEffect, 500);
            };

            function callback() {
                setTimeout(function () {
                    $(blogClose, blogText).removeAttr("style").hide().fadeIn();
                }, 500);
            };
            callback();
            runEffect();

            blogText.classList.remove("menu-hover");
            document.querySelector('#home-menu').style.visibility = 'hidden';
            // document.querySelector('#projects-side-text').style.visibility = 'hidden';
            // document.querySelector('#resume-side-text').style.visibility = 'hidden';
            // document.querySelector('#contact-side-text').style.visibility = 'hidden';

            blogMenuText.style.color = "#BACBD9";

            sidePane.className += ' posts-scroll-bar';
            sidePane.style.zIndex = 2;

            posts.style.display = 'block';

            moveGridItems('change', numOfPosts);
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
                $(blogMenu).hide(selectedEffect, 500);
            };

            function callback() {
                setTimeout(function () {
                    if (!dropDown) {
                        document.querySelector('#blog-close').style.visibility = 'hidden';
                    } else {
                        $(blogClose, blogText).removeAttr("style").hide().fadeIn();
                    }
                }, 500);
            };
            callback();
            runEffect();

            blogText.classList.remove("menu-hover");
            // blogText.className = 'postbg-active';
            document.querySelector('#home-menu').style.visibility = 'hidden';
            // document.querySelector('#projects-side-text').style.visibility = 'hidden';
            // document.querySelector('#resume-side-text').style.visibility = 'hidden';
            // document.querySelector('#contact-side-text').style.visibility = 'hidden';

            blogMenuText.style.color = "#BACBD9";

            sidePane.className += ' posts-scroll-bar';
            sidePane.style.zIndex = 2;

            posts.style.display = 'block';


            moveGridItems('change', numOfPosts);
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
                moveGridItems('default', numOfPosts);
                //Used in the resizeSidepane function
                dropDown = true;
                setTimeout(function () {
                    if (blogMenuText.style.color != 'rgb(186, 203, 217)' && blogMenuBurger.style.color != "#e63946") {
                        blogMenuBurger.setAttribute('style', 'color: #e63946');
                    } else {
                        // blogText.classList.add("menu-hover");
                        blogText.style.color = "#252526"
                    }
                }, 500);
            }
        });

    })
}

// Implements ability to resize sidepane
function resizeSidepane() {
    $(function () {
        $("#blog-menu, #blog-side-text").on("click", function () {
            if (!dropDown) {
                $(".post-bg").animate({
                    width: "100vw",
                }, 500);
                $(".sidepane").animate({
                    width: "47vw",
                }, 500);
                dropDown = true;
            } else {
                $(".sidepane").animate({
                    width: 225,
                }, 500);
                $(".post-bg").animate({
                    width: 0,
                }, 500);
                dropDown = false;
            }
        });
        $("#blog-close").on("click", function () {
            if (dropDown) {
                $(".sidepane").animate({
                    width: 225,
                }, 500);
                $(".post-bg").animate({
                    width: 0,
                }, 500);
                dropDown = false;
            }
        });

    });
}