const blogPosts = document.querySelector('.blog-posts');
const numOfPosts = blogPosts.children.length;

// Moves contact.html and icon down according to number of posts
// when the drop down folder is clicked
function changeContactRows(operation) {
    let resumeRowStartNum = (numOfPosts + 3).toString();
    let resumeRowEndNum = resumeRowStartNum.toString(resumeRowStartNum++);
    let contactRowStartNum = (numOfPosts + 4).toString();
    let contactRowEndNum = contactRowStartNum.toString(contactRowStartNum++);

    const resumeIcon = document.querySelector('.html-icon-2');
    const resume = document.querySelector('.resume-side');
    const contactIcon = document.querySelector('.html-icon-3');
    const contact = document.querySelector('.contact-side');

    if (operation == 'change'){
        resumeIcon.style.gridRowStart = resumeRowStartNum;
        resumeIcon.style.gridRowEnd = resumeRowEndNum;
        resume.style.gridRowStart = resumeRowStartNum;
        resume.style.gridRowEnd = resumeRowEndNum;
        contactIcon.style.gridRowStart = contactRowStartNum;
        contactIcon.style.gridRowEnd = contactRowEndNum;
        contact.style.gridRowStart = contactRowStartNum;
        contact.style.gridRowEnd = contactRowEndNum;
    } else {
        resumeIcon.style.gridRowStart = 3;
        resumeIcon.style.gridRowEnd = 4;
        resume.style.gridRowStart = 3;
        resume.style.gridRowEnd = 4;
        contactIcon.style.gridRowStart = 4;
        contactIcon.style.gridRowEnd = 5;
        contact.style.gridRowStart = 4;
        contact.style.gridRowEnd = 5;

    }

}

// Change right arrow to a down arrow on click and vice versa
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
            changeContactRows('change');
        } else {
            downArrow.style.display = 'none';
            rightArrow.style.display = 'inline-block';
            posts.style.display = 'none';
            changeContactRows();
            // contactIcon.style.gridRowStart = '3';
            // contactIcon.style.gridRowEnd = '4';
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
    // getCountOfP();
}