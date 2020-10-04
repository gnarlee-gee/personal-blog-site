// after page loads activate function
window.onload = function () {
    const blogPosts = document.querySelector('.blog-posts');
    const numOfPosts = blogPosts.children.length;
    blogClick(numOfPosts);
    initializeNavGrid(numOfPosts);
}


// Moves ".html" items and their icons down according to number of posts
// when the drop down folder is clicked
function changeContactRows(operation, numOfPosts) {
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
            changeContactRows('change', numOfPosts);
        } else {
            downArrow.style.display = 'none';
            rightArrow.style.display = 'inline-block';
            posts.style.display = 'none';
            changeContactRows('default', numOfPosts);
        }
    })
}

// Set # of grid items based on number of posts + 4 static items (home, projects, etc...)
function initializeNavGrid(numOfPosts) {
    let navBar = document.querySelector('.nav');
    const totalMenuItems = (numOfPosts + 4).toString();

    navBar.style.setProperty('grid-template-columns', `repeat(${totalMenuItems}, 1fr)`);
}