// after page loads activate function
window.onload = function () {
    const blogPosts = document.querySelector('.blog-posts');
    let numOfPosts = blogPosts.children.length;
    numOfPosts /= 2;
    setIdBlogPosts(blogPosts);
    // initializeSidePane();
    blogClick(numOfPosts);
    // initializeNavGrid(numOfPosts);
    // addSidepaneItemsListener();
    resizeSidepane();
    // isInNav();
    // removeFromNavBar();



    // const blogBody = document.querySelector('#post-body-1');
    // console.log(blogBody)

}

// Sets ID for each post and then post body
function setIdBlogPosts(blogPosts, numOfPosts) {
    for (let i = 0; i < numOfPosts; i++) {
        blogPosts.children[i * 2].setAttribute('id', `post-${i+1}`);
        blogPosts.children[(i * 2) + 1].setAttribute('id', `post-body-${i+1}`);
    }
}


// Moves ".html" items and their icons down according to number of posts
// when the drop down folder is clicked
function moveGridItems(operation, numOfPosts) {
    let projectsRowStartNum = (numOfPosts + 3).toString();
    let projectsRowEndNum = projectsRowStartNum.toString(projectsRowStartNum++);
    let resumeRowStartNum = (numOfPosts + 4).toString();
    let resumeRowEndNum = resumeRowStartNum.toString(resumeRowStartNum++);
    let contactRowStartNum = (numOfPosts + 5).toString();
    let contactRowEndNum = contactRowStartNum.toString(contactRowStartNum++);

    const projects = document.querySelector('.projects-side');
    const resume = document.querySelector('.resume-side');
    const contact = document.querySelector('.contact-side');

    if (operation == 'change') {
        projects.style.gridRowStart = projectsRowStartNum;
        projects.style.gridRowEnd = projectsRowEndNum;
        resume.style.gridRowStart = resumeRowStartNum;
        resume.style.gridRowEnd = resumeRowEndNum;
        contact.style.gridRowStart = contactRowStartNum;
        contact.style.gridRowEnd = contactRowEndNum;
    }
    // } else {
    //     projects.style.gridRowStart = 3;
    //     projects.style.gridRowEnd = 4;
    //     resume.style.gridRowStart = 4;
    //     resume.style.gridRowEnd = 5;
    //     contact.style.gridRowStart = 5;
    //     contact.style.gridRowEnd = 6;
    // }
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
            let postUrl = posts[i].firstElementChild.outerHTML.match(/\<(.*?)\>/g)
            postBox.setAttribute('id', `post-box-${i+1}`);
            // postBox.setAttribute('class', 'posts')
            document.getElementById("sidepane-div").appendChild(postBox);
            postBox = document.querySelector(`#post-box-${i+1}`);
            // console.log(posts[i].firstElementChild.outerHTML.match(/\<(.*?)\>/g)[0])
            postBox.innerHTML = postUrl[0] + posts[i].textContent.trim() + "</a>"

            postBox.setAttribute('class', 'posts')
            // Send the id of these to put click event on
            postBox.style.zIndex = 2;
            postBox.style.gridRowStart = i + 3;
            postBox.style.gridRowEnd = i + 4;
        }
        document.querySelector('.projects-side').style.gridRowStart = i + 3;
        document.querySelector('.projects-side').style.gridRowEnd = i + 4;
        document.querySelector('.resume-side').style.gridRowStart = i + 4;
        document.querySelector('.resume-side').style.gridRowEnd = i + 5;
        document.querySelector('.contact-side').style.gridRowStart = i + 5;
        document.querySelector('.contact-side').style.gridRowEnd = i + 6;
    } else if (operation == 'default') {
        for (let i = 0; i < children; i++) {
            let post = document.querySelector(`#post-box-${i+1}`);

            function runEffect() {
                // get effect type from
                var selectedEffect = 'fade';

                // Most effect types need no options passed by default
                var options = {};
                // Run the effect
                $(post).hide(selectedEffect, options, 500);
            };

            // Callback function to bring a hidden box back
            function callback() {
                setTimeout(function () {
                    $(post).remove().hide().fadeIn();
                }, 500);
            };
            runEffect();

        }



        function doNext() {
            document.querySelector('.projects-side').style.gridRowStart = 3;
            document.querySelector('.projects-side').style.gridRowEnd = 4;
            document.querySelector('.resume-side').style.gridRowStart = 4;
            document.querySelector('.resume-side').style.gridRowEnd = 5;
            document.querySelector('.contact-side').style.gridRowStart = 5;
            document.querySelector('.contact-side').style.gridRowEnd = 6;
            for (let i = 0; i < children; i++) {
                let post = document.querySelector(`#post-box-${i+1}`);
                post.remove();
            }
        }

        setTimeout(doNext, 500);
    }
}

let dropDown = false;
// Change right arrow to a down arrow on click and vice versa
// Modifies behavior when clicking blog
function blogClick(numOfPosts) {
    const blogBox = document.querySelector('.blog-side');
    const blogDiv = document.querySelector('.blog-section');
    const sidePane = document.querySelector('.sidepane')

    const posts = document.querySelector('.blog-posts');

    // blogBox.addEventListener('click', event => {
    //     blogDiv.scrollIntoView({behavior: "smooth"});
    // });

    blogBox.addEventListener('mouseenter', event => {
        // if (dropDown) {
        // console.log('works')
        // downArrow.style.display = 'none';
        // upArrow.style.display = 'inline-block';
        sidePane.className += ' posts-scroll-bar';
        // sidePane.style.gridTemplateColumns = '400px';
        sidePane.style.zIndex = 123;
        // sidePane.style.overflow = 'visible';
        // sidePane.style.overflowX = 'hidden';
        posts.style.display = 'block';
        moveGridItems('change', numOfPosts);
        setBlogPostsGrid('change', numOfPosts)
        dropDown = true;
        // console.log(document.querySelector("#sidepane-div").children)
        // } else {
        //     // upArrow.style.display = 'none';
        //     // downArrow.style.display = 'inline-block';
        //     posts.style.display = 'none';

        //     sidePane.className = 'sidepane';
        //     // sidePane.style.gridTemplateColumns = '225px';
        //     // sidePane.classList.remove('posts-scroll-bar');
        //     setBlogPostsGrid('default', numOfPosts);
        //     // moveGridItems('default', numOfPosts);
        //     dropDown = true;
        // }
    })
    document.querySelector('.projects-side').addEventListener('mouseenter', event => {
        if (dropDown) {
            // upArrow.style.display = 'none';
            // downArrow.style.display = 'inline-block';
            posts.style.display = 'none';

            sidePane.className = 'sidepane';
            // sidePane.style.gridTemplateColumns = '225px';
            // sidePane.classList.remove('posts-scroll-bar');
            setBlogPostsGrid('default', numOfPosts);
            // moveGridItems('default', numOfPosts);
            dropDown = false;
        }
    });


    // adding same event to multiple items
    // https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/


}

// Set # of grid items based on number of posts + 4 static items (home, projects, etc...)
// function initializeNavGrid(numOfPosts) {
//     let navBar = document.querySelector('.nav');
//     const totalMenuItems = (numOfPosts + 4).toString();

//     navBar.style.setProperty('grid-template-columns', `repeat(${totalMenuItems}, 1fr)`);
// }

// Implements ability to resize sidepane
function resizeSidepane() {
    $(function () {
        $(".blog-side").on("mouseenter", function () {
            $(".post-bg").animate({
                width: "100vw",
            }, 500);
            $(".sidepane").animate({
                width: "47vw",
            }, 500);
        });
        $(".projects-side").on("mouseenter", function () {
            if (dropDown) {
                $(".sidepane").animate({
                    width: 225,
                }, 500);
                $(".post-bg").animate({
                    width: 0,
                }, 500);
            }
        });

    });
}
// $(function () {
//     $(".sidepane").resizable({
//         handles: "e",
//         minWidth: 225,
//         maxWidth: 1000,
//         animate: true,
//         alsoResize: ".posts",
//         // animate: true,
//         // helper: "ui-resizable-helper",
//     })
// });
// $(function () {
//     $(".posts").resizable({
//         handles: "e",
//         minWidth: 225,
//         maxWidth: 1000,
//         animate: true,
//         // helper: "ui-resizable-helper",
//         // helper: "ui-resizable-helper",
//     })
// });


// function initializeSidePane() {

//     let homeBox = document.createElement('div');
//     let blogBox = document.createElement('div');
//     let projectsBox = document.createElement('div');
//     let resumeBox = document.createElement('div');
//     let contactBox = document.createElement('div');


//     homeBox.setAttribute('id', 'home-box');
//     blogBox.setAttribute('id', 'blog-box');
//     projectsBox.setAttribute('id', 'projects-box');
//     resumeBox.setAttribute('id', 'resume-box');
//     contactBox.setAttribute('id', 'contact-box');

//     document.getElementById("sidepane-div").appendChild(homeBox);
//     document.getElementById("sidepane-div").appendChild(blogBox);
//     document.getElementById("sidepane-div").appendChild(projectsBox);
//     document.getElementById("sidepane-div").appendChild(resumeBox);
//     document.getElementById("sidepane-div").appendChild(contactBox);


//     // console.log(document.querySelector("#sidepane-div").children)
//     homeBox = document.querySelector('#home-box');
//     homeBox.style.zIndex = 2;
//     homeBox.style.gridRowStart = 1;
//     homeBox.style.gridRowEnd = 2;

//     blogBox = document.querySelector('#blog-box');
//     blogBox.style.zIndex = 2;
//     blogBox.style.gridRowStart = 2;
//     blogBox.style.gridRowEnd = 3;

//     projectsBox = document.querySelector('#projects-box');
//     projectsBox.style.zIndex = 2;
//     projectsBox.style.gridRowStart = 3;
//     projectsBox.style.gridRowEnd = 4;

//     resumeBox = document.querySelector('#resume-box');
//     resumeBox.style.zIndex = 2;
//     resumeBox.style.gridRowStart = 4;
//     resumeBox.style.gridRowEnd = 5;

//     contactBox = document.querySelector('#contact-box');
//     contactBox.style.zIndex = 2;
//     contactBox.style.gridRowStart = 5;
//     contactBox.style.gridRowEnd = 6;
// }


// function addSidepaneItemsListener() {
//     let sidepaneChildren = document.querySelector("#sidepane-div").children;
//     console.log(sidepaneChildren[1])
//     for (let i = 0; i < sidepaneChildren.length; i++) {
//         // let child = document.querySelector('#' + sidepaneChildren[i].id);
//         sidepaneChildren[i].addEventListener('click', event => {
//             // console.log(child);
//             addToNavBar(sidepaneChildren[i]);
//         })

//     }
// }


// function addToNavBar(child) {
//     let navBar = document.querySelector('.nav');
//     let navStyle = getComputedStyle(navBar).gridTemplateAreas;
//     navStyle = navStyle.replace(/"/g, '')
//     const childIdNavName = child.id.split('-')

//     if (childIdNavName[0] != 'post') {
//         if (!navStyle.includes(childIdNavName[0])) {
//             navBar.style.gridTemplateAreas = `"${navStyle + ' ' + childIdNavName[0]}"`;
//             console.log('navStyle', getComputedStyle(navBar).gridTemplateAreas)
//         }
//     } else {
//         if (!navStyle.includes(childIdNavName.join('-'))) {
//             navBar.style.gridTemplateAreas = `"${navStyle + ' ' + childIdNavName.join('-')}"`
//             console.log('navStyle', getComputedStyle(navBar).gridTemplateAreas)
//         }
//     }
// }

// function setNavClassStyle(navItem, className) {

//     navItem.setAttribute('style', 
//     `display: center;
//     align-items: center;
//     justify-content: center;
//     grid-area: ${className};
//     padding: 0 10px 0 10px;`);
//     // navItem.style.display = 'flex';
//     // navItem.style.alignItems = 'center';
//     // navItem.style.justifyContent = 'center';
//     // navItem.style.gridArea = className;
//     // navItem.style.padding = "0 10px 0 10px";

// }



// function removeFromNavBar() {

// }