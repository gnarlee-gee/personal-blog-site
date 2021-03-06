// after page loads activate function
onload = function () {

    connect();
    scrollTo();
}


const homeMenuText = document.querySelector('#home-side-text');
const homeSection = document.querySelector("html"); // use html to get to tippy top

const blogMenuText = document.querySelector("#blog-side-text");
const blogSection = document.querySelector(".blog-section");

const projectsMenuText = document.querySelector("#projects-side-text");
const projectSection = document.querySelector(".project-section");

const resumeMenuText = document.querySelector("#resume-side-text");
const resumeSection = document.querySelector(".resume-section");

const ioDivs = document.querySelectorAll(".observer-box");


const menuText = [homeMenuText, blogMenuText, projectsMenuText, resumeMenuText];
const menuSection = [homeSection, blogSection, projectSection, resumeSection];

function changeMenuItemColor(menuItem) {
    switch (menuItem) {
        case 'home':
            if (homeMenuText.style.color != "#090B0D") {
                homeMenuText.style.color = "#090B0D";
            }
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

// Intersection Observer API
let observer = new IntersectionObserver(function (entries) {
    // isIntersecting is true when element and viewport are overlapping
    // isIntersecting is false when element and viewport don't overlapc
    let firstClass = entries[0].target.className;
    if (entries[0].isIntersecting) {
        changeMenuItemColor(firstClass.substr(0, firstClass.indexOf(' ')));
        addHoverMenu(firstClass.substr(0, firstClass.indexOf(' ')));
    }
}, {
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
            let itemClicked = menuSection[index].className;
            itemClicked = itemClicked.substr(0, itemClicked.indexOf('-'));
            ioDivs.forEach((menuItem) => {
                observer.unobserve(menuItem);
            });
            menuSection[index].scrollIntoView({
                behavior: 'smooth',
                inline: 'end'
            });
            ioDivs.forEach((menuItem) => {
                setTimeout(function () {
                    observer.observe(menuItem);
                }, 500);
            });
            addHoverMenu(itemClicked);
            changeMenuItemColor(itemClicked);
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