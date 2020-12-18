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

const menuText = [homeMenuText, blogMenuText, projectsMenuText, resumeMenuText];
const menuSection = [homeSection, blogSection, projectSection, resumeSection];

function changeMenuItemColor(menuItem) {
    switch (menuItem) {
        case 'about-me':
            homeMenuText.style.color = "#090B0D";
            homeMenuText.classList.remove("menu-hover");
            blogMenuText.style.color = "#D7D9D9";
            projectsMenuText.style.color = "#D7D9D9";
            resumeMenuText.style.color = "#D7D9D9";
            break;
        case 'blog-section':
            homeMenuText.style.color = "#D7D9D9";
            blogMenuText.style.color = "#090B0D";
            blogMenuText.classList.remove("menu-hover");
            projectsMenuText.style.color = "#D7D9D9";
            resumeMenuText.style.color = "#D7D9D9";
            break;
        case 'projects-section':
            projectsMenuText.style.color = "#090B0D";
            projectsMenuText.classList.remove("menu-hover");
            resumeMenuText.style.color = "#D7D9D9";
            blogMenuText.style.color = "#D7D9D9";
            homeMenuText.style.color = "#D7D9D9";
            break;
        case 'resume-section':
            resumeMenuText.style.color = "#090B0D";
            resumeMenuText.classList.remove("menu-hover");
            projectsMenuText.style.color = "#D7D9D9";
            blogMenuText.style.color = "#D7D9D9";
            homeMenuText.style.color = "#D7D9D9";
            break;
    }
}

function addObs(element) {
    // function addObs(element, value) {
    let observer = new IntersectionObserver(function (entries) {
        // isIntersecting is true when element and viewport are overlapping
        // isIntersecting is false when element and viewport don't overlap
        [homeMenuText, blogMenuText, projectsMenuText, resumeMenuText].forEach((item) => {
            if (entries[0]['intersectionRatio'] > (value + .5)) {
                item.classList.add("menu-hover");
            }
        })
        if (entries[0].isIntersecting) {
            changeMenuItemColor(entries[0]['target'].className)
            // we can then remove menu hover here
            // then also we can add menu hover to all other items that arent intrscting
        }
    }, {
        threshold: [value]
    });
    observer.observe(element);
}

let value = 0;

function connect() {

    menuSection.forEach((item) => {
        if (item.id == 'home') {
            value = 0.9;
        } else if (item.id == 'blog') {
            value = 0.9;
        } else if (item.id == 'projects') {
            value = 0.7;
        } else if (item.id == 'resume') {
            value = 0.4;
        }

        addObs(item);
    })
}

function scrollTo() {

    menuText.forEach((item, index) => {
        item.addEventListener('click', () => {
            menuSection[index].scrollIntoView({
                behavior: 'smooth',
            })
        })
    });
}