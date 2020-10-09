// after page loads activate function
window.onload = function () {
    const blogPosts = document.querySelector('.blog-posts');
    let numOfPosts = blogPosts.children.length;
    numOfPosts /= 2;
    setIdBlogPosts(blogPosts, numOfPosts);
    initializeSidePane();
    blogClick(numOfPosts);
    initializeNavGrid(numOfPosts);
    resizeSidepane();
    addToNavBar();
    isInNav();
    removeFromNavBar();


    const blogBody = document.querySelector('#post-body-1');
    console.log(blogBody)

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
function changeIconTextRows(operation, numOfPosts) {
    let projectsRowStartNum = (numOfPosts + 3).toString();
    let projectsRowEndNum = projectsRowStartNum.toString(projectsRowStartNum++);
    let resumeRowStartNum = (numOfPosts + 4).toString();
    let resumeRowEndNum = resumeRowStartNum.toString(resumeRowStartNum++);
    let contactRowStartNum = (numOfPosts + 5).toString();
    let contactRowEndNum = contactRowStartNum.toString(contactRowStartNum++);

    const projectsIcon = document.querySelector('.html-icon-2');
    const projects = document.querySelector('.projects-side');
    const resumeIcon = document.querySelector('.html-icon-3');
    const resume = document.querySelector('.resume-side');
    const contactIcon = document.querySelector('.html-icon-4');
    const contact = document.querySelector('.contact-side');

    if (operation == 'change') {
        projectsIcon.style.gridRowStart = projectsRowStartNum;
        projectsIcon.style.gridRowEnd = projectsRowEndNum;
        projects.style.gridRowStart = projectsRowStartNum;
        projects.style.gridRowEnd = projectsRowEndNum;
        resumeIcon.style.gridRowStart = resumeRowStartNum;
        resumeIcon.style.gridRowEnd = resumeRowEndNum;
        resume.style.gridRowStart = resumeRowStartNum;
        resume.style.gridRowEnd = resumeRowEndNum;
        contactIcon.style.gridRowStart = contactRowStartNum;
        contactIcon.style.gridRowEnd = contactRowEndNum;
        contact.style.gridRowStart = contactRowStartNum;
        contact.style.gridRowEnd = contactRowEndNum;
    } else {
        projectsIcon.style.gridRowStart = 3;
        projectsIcon.style.gridRowEnd = 4;
        projects.style.gridRowStart = 3;
        projects.style.gridRowEnd = 4;
        resumeIcon.style.gridRowStart = 4;
        resumeIcon.style.gridRowEnd = 5;
        resume.style.gridRowStart = 4;
        resume.style.gridRowEnd = 5;
        contactIcon.style.gridRowStart = 5;
        contactIcon.style.gridRowEnd = 6;
        contact.style.gridRowStart = 5;
        contact.style.gridRowEnd = 6;
    }
}

// Adds and removes grid items on click
function setBlogPostsGrid(operation, numOfPosts) {
    let parent = document.querySelector('.blog-posts');
    let children = parent.children;

    children = Math.floor(children.length / 2);

    if (operation == 'change') {
        let i = 0;
        for (; i < children; i++) {
            let postBox = document.createElement('div');
            postBox.setAttribute('class', `post-box-${i+1}`);
            document.getElementById("sidepane-div").appendChild(postBox);
            postBox = document.querySelector(`.post-box-${i+1}`);
            postBox.style.zIndex = 2;
            postBox.style.gridRowStart = i + 3;
            postBox.style.gridRowEnd = i + 4;
        }
        document.querySelector('.projects-box').style.gridRowStart = i + 3;
        document.querySelector('.projects-box').style.gridRowEnd = i + 4;
        document.querySelector('.resume-box').style.gridRowStart = i + 4;
        document.querySelector('.resume-box').style.gridRowEnd = i + 5;
        document.querySelector('.contact-box').style.gridRowStart = i + 5;
        document.querySelector('.contact-box').style.gridRowEnd = i + 6;
    } else if (operation == 'default') {
        for (let i = 0; i < children; i++) {
            let post = document.querySelector(`.post-box-${i+1}`);
            post.remove();
        }
        document.querySelector('.projects-box').style.gridRowStart = 3;
        document.querySelector('.projects-box').style.gridRowEnd = 4;
        document.querySelector('.resume-box').style.gridRowStart = 4;
        document.querySelector('.resume-box').style.gridRowEnd = 5;
        document.querySelector('.contact-box').style.gridRowStart = 5;
        document.querySelector('.contact-box').style.gridRowEnd = 6;
    }
}


// Change right arrow to a down arrow on click and vice versa
// Modifies behavior when clicking blog
function blogClick(numOfPosts) {
    const blogBox = document.querySelector('.blog-box');
    const rightArrow = document.querySelector("#right-arrow");
    const downArrow = document.querySelector("#down-arrow");
    const posts = document.querySelector('.blog-posts')

    if (rightArrow.style.display == 'inline-block') {
        posts.style.display = 'none';
    }
    blogBox.addEventListener('click', event => {
        if (rightArrow.style.display == 'inline-block') {
            rightArrow.style.display = 'none';
            downArrow.style.display = 'inline-block';
            posts.style.display = 'block';
            changeIconTextRows('change', numOfPosts);
            setBlogPostsGrid('change', numOfPosts)
        } else {
            downArrow.style.display = 'none';
            rightArrow.style.display = 'inline-block';
            posts.style.display = 'none';
            changeIconTextRows('default', numOfPosts);
            setBlogPostsGrid('default', numOfPosts);
        }
    })
}

// Set # of grid items based on number of posts + 4 static items (home, projects, etc...)
function initializeNavGrid(numOfPosts) {
    let navBar = document.querySelector('.nav');
    const totalMenuItems = (numOfPosts + 4).toString();

    navBar.style.setProperty('grid-template-columns', `repeat(${totalMenuItems}, 1fr)`);
}

// Implements ability to resize sidepane
function resizeSidepane() {
    $(function () {
        $(".sidepane").resizable({
            handles: "e",
            minWidth: 200,
            alsoResize: ".blog-posts"
        })
    });
    $(function () {
        $(".blog-posts").resizable({
            handles: "e",
            minWidth: 132,
        })
    });
}

function initializeSidePane() {

    let homeBox = document.createElement('div');
    let blogBox = document.createElement('div');
    let projectsBox = document.createElement('div');
    let resumeBox = document.createElement('div');
    let contactBox = document.createElement('div');



    homeBox.setAttribute('class', 'home-box');
    blogBox.setAttribute('class', 'blog-box');
    projectsBox.setAttribute('class', 'projects-box');
    resumeBox.setAttribute('class', 'resume-box');
    contactBox.setAttribute('class', 'contact-box');

    document.getElementById("sidepane-div").appendChild(homeBox);
    document.getElementById("sidepane-div").appendChild(blogBox);
    document.getElementById("sidepane-div").appendChild(projectsBox);
    document.getElementById("sidepane-div").appendChild(resumeBox);
    document.getElementById("sidepane-div").appendChild(contactBox);

    homeBox = document.querySelector('.home-box');
    homeBox.style.zIndex = 2;
    homeBox.style.gridRowStart = 1;
    homeBox.style.gridRowEnd = 2;

    blogBox = document.querySelector('.blog-box');
    blogBox.style.zIndex = 2;
    blogBox.style.gridRowStart = 2;
    blogBox.style.gridRowEnd = 3;

    projectsBox = document.querySelector('.projects-box');
    projectsBox.style.zIndex = 2;
    projectsBox.style.gridRowStart = 3;
    projectsBox.style.gridRowEnd = 4;

    resumeBox = document.querySelector('.resume-box');
    resumeBox.style.zIndex = 2;
    resumeBox.style.gridRowStart = 4;
    resumeBox.style.gridRowEnd = 5;

    contactBox = document.querySelector('.contact-box');
    contactBox.style.zIndex = 2;
    contactBox.style.gridRowStart = 5;
    contactBox.style.gridRowEnd = 6;
}


function addToNavBar() {

}

function setNavClassStyle(navItem, className) {
    navItem.style.display = 'flex';
    navItem.style.alignItems = 'center';
    navItem.style.justifyContent = 'center';
    navItem.style.gridArea = className;
    navItem.style.padding = "0 10px 0 10px";

}


function isInNav() {

}

function removeFromNavBar() {

}