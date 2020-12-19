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

// let scrollPool = 500;

// function resetScrollPool() {
//   scrollPool = 500;
// }

// function scrollThrottle(event) {
//   window.requestAnimationFrame(resetScrollPool);
//   if (scrollPool < 0) {
//     return false;
//   }
//   const scrollDistance = event.deltaY * 50;
//   scrollPool = scrollPool - Math.abs(scrollDistance);
//   document.querySelector('html').scrollTop += scrollDistance;
// }

// window.addEventListener('wheel', scrollThrottle);


// Intersection Observer API
let observer = new IntersectionObserver(function (entries) {
    // isIntersecting is true when element and viewport are overlapping
    // isIntersecting is false when element and viewport don't overlapc

    if (entries[0].isIntersecting) {
        changeMenuItemColor(entries[0].target.className);
        addHoverMenu(entries[0].target.id);
    }

}, {
    rootMargin: '0px 0px -95% 0px',
});

function connect() {
    menuSection.forEach((item) => {
        observer.observe(item);
    })
}


function scrollTo() {

    menuText.forEach((item, index) => {
        item.addEventListener('click', () => {
            menuSection.forEach((menuItem) => {
                if (!item.id.includes(menuItem.id)) {
                    console.log(menuItem.id)
                    observer.unobserve(menuItem);
                }
            });

            menuSection[index].scrollIntoView({
                behavior: 'smooth',
            });

            menuSection.forEach((menuItem) => {
                if (!item.id.includes(menuItem.id)) {
                    setTimeout(function(){
                        observer.observe(menuItem);
                    }, 500);
                }
            });
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

