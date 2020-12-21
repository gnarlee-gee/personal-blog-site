// after page loads activate function
window.onload = function () {
    connect();
    scrollTo();
}

const homeMenuText = document.querySelector('#home-side-text');
const homeSection = document.querySelector(".about-me");

const blogMenuText = document.querySelector("#blog-side-text");
const blogSection = document.querySelector(".blog-section");

const projectsMenuText = document.querySelector("#projects-side-text");
const projectSection = document.querySelector(".projects-section");

const resumeMenuText = document.querySelector("#resume-side-text");
const resumeSection = document.querySelector(".resume-section");

const ioDivs = document.querySelectorAll(".observer-box");


const menuText = [homeMenuText, blogMenuText, projectsMenuText, resumeMenuText];
const menuSection = [homeSection, blogSection, projectSection, resumeSection];

function changeMenuItemColor(menuItem) {
    switch (menuItem) {
        case 'home':
            homeMenuText.style.color = "#090B0D";
            homeMenuText.classList.remove("menu-hover");
            blogMenuText.style.color = "#D7D9D9";
            projectsMenuText.style.color = "#D7D9D9";
            resumeMenuText.style.color = "#D7D9D9";
            break;
        case 'blog':
            homeMenuText.style.color = "#D7D9D9";
            blogMenuText.style.color = "#090B0D";
            blogMenuText.classList.remove("menu-hover");
            projectsMenuText.style.color = "#D7D9D9";
            resumeMenuText.style.color = "#D7D9D9";
            break;
        case 'project':
            if (projectsMenuText.style.color != "#090B0D") {
                projectsMenuText.style.color = "#090B0D";
            }
            projectsMenuText.classList.remove("menu-hover");
            resumeMenuText.style.color = "#D7D9D9";
            blogMenuText.style.color = "#D7D9D9";
            homeMenuText.style.color = "#D7D9D9";
            break;
        case 'resume':
            resumeMenuText.style.color = "#090B0D";
            resumeMenuText.classList.remove("menu-hover");
            projectsMenuText.style.color = "#D7D9D9";
            blogMenuText.style.color = "#D7D9D9";
            homeMenuText.style.color = "#D7D9D9";
            break;
    }
}
let previousY = 0
let previousRatio = 0
// Intersection Observer API
let observer = new IntersectionObserver(function (entries) {
    // isIntersecting is true when element and viewport are overlapping
    // isIntersecting is false when element and viewport don't overlapc
    if (entries[0].isIntersecting) {
        let firstClass = entries[0].target.className;
        // console.log(str.substr(0,str.indexOf(' ')));
        changeMenuItemColor(firstClass.substr(0, firstClass.indexOf(' ')));
        addHoverMenu(firstClass.substr(0, firstClass.indexOf(' ')));
    }


}, {
    // root: document.querySelector('.html'),
    rootMargin: '-42% 0px -52% 0px',
});

function connect() {
    ioDivs.forEach((item) => {
        observer.observe(item);
    })
}

function scrollTo() {

    menuText.forEach((item, index) => {
        item.addEventListener('click', () => {
            // ioDivs.forEach((menuItem) => {
            //     let menuItemText = menuItem.className;
            //     menuItemText = menuItemText.substr(0, menuItemText.indexOf(' '));
            //     if (!item.id.includes(menuItemText)) {
            //         observer.unobserve(menuItem);
            //     }
            // });

            menuSection[index].scrollIntoView({
                behavior: 'smooth',
            });

            // ioDivs.forEach((menuItem) => {
            //     let menuItemText = menuItem.className;
            //     menuItemText = menuItemText.substr(0, menuItemText.indexOf(' '));
            //     if (!item.id.includes(menuItemText)) {
            //         setTimeout(function () {
            //             observer.observe(menuItem);
            //         }, 500);
            //     }
            // });
        });
    })
}

function addHoverMenu(element) {
    menuText.forEach((item) => {
        if (!item.id.includes(element)) {
            item.classList.add('menu-hover');
        }
    });
}