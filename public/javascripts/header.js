function refs(){
    const refId = localStorage.getItem('id');
    const ref = localStorage.getItem('ref');
    if (window.location.pathname === '/PersonalArea'){
        if (ref !== 'refPersonalArea'){
            localStorage.setItem('ref', 'refPersonalArea');
            window.location.href = '/accessToken'
        }
    }
    if (window.location.pathname === `/sendReviews/${refId}`){
        if (ref !== 'refSendReviews'){
            localStorage.setItem('ref', 'refSendReviews');
            window.location.href = '/accessToken'
        }
    }
    if (window.location.pathname === `/readyMadeSites/favorites`){
        if (ref !== 'refFavorites'){
            localStorage.setItem('ref', 'refFavorites');
            window.location.href = '/accessToken'
        }
    }
}
refs()
function ha() {
    const sectionLinks = document.querySelectorAll('.ha');
    sectionLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({behavior: 'smooth'});
            }
        });
    });
}
ha();

function header(){
    const section = document.getElementById('headerSection');
    const back = document.getElementById('back');
    const types = document.getElementById('types');
    if (window.location.pathname === '/'){
        section.hidden = false;
        types.hidden = true;
    }
    else if (window.location.pathname === '/readyMadeSites' || window.location.pathname === '/readyMadeSites/html-css-js' || window.location.pathname === '/readyMadeSites/javascript' || window.location.pathname === '/readyMadeSites/fullstack' || window.location.pathname === '/readyMadeSites/nodeJs' || window.location.pathname === '/readyMadeSites/reactJs' || window.location.pathname === '/readyMadeSites/favorites'){
        section.hidden = true;
        types.hidden = false;
    }
    else{
        section.hidden = true;
        types.hidden = true;
        back.hidden = true;
    }
}
header();

function headerColor(){
    const allSites = document.getElementById('allSitesColor');
    const htmlCssJs = document.getElementById('htmlCssJsColor');
    const javascript = document.getElementById('javascriptColor');
    const fullstack = document.getElementById('fullstackColor');
    const nodeJs = document.getElementById('nodeJsColor');
    const reactJs = document.getElementById('reactJsColor');
    const favorites = document.getElementById('favoritesColor');
    const favoritesHeader = document.getElementById('favoritesHeader');

    if (window.location.pathname === '/readyMadeSites'){
        allSites.style.color = 'white';
        allSites.style.backgroundColor = 'black';
    }
    if (window.location.pathname === '/readyMadeSites/html-css-js'){
        htmlCssJs.style.color = 'white';
        htmlCssJs.style.backgroundColor = 'black';
    }
    if (window.location.pathname === '/readyMadeSites/javascript'){
        javascript.style.color = 'white';
        javascript.style.backgroundColor = 'black';
    }
    if (window.location.pathname === '/readyMadeSites/fullstack'){
        fullstack.style.color = 'white';
        fullstack.style.backgroundColor = 'black';
    }
    if (window.location.pathname === '/readyMadeSites/nodeJs'){
        nodeJs.style.color = 'white';
        nodeJs.style.backgroundColor = 'black';
    }
    if (window.location.pathname === '/readyMadeSites/reactJs'){
        reactJs.style.color = 'white';
        reactJs.style.backgroundColor = 'black';
    }
    if (window.location.pathname === '/readyMadeSites/favorites'){
        favoritesHeader.style.color = '#a2a8d3';
        favorites.style.backgroundColor = 'black';
        favorites.style.color = 'white';
    }
    const details = document.getElementById('details');
    const token = localStorage.getItem('token');
    const local = localStorage.getItem('local');
    if (token){
        local === 'en' ? details.style.right = '3.5%' : details.style.right = '3%';
    }
}
headerColor();

function favoritesJoin() {
    const token = localStorage.getItem('token');
    if (token){
        localStorage.setItem('ref', 'refFavorites');
        localStorage.setItem('reload', 'on');
        window.location.href = '/accessToken';
    }
    else{
        displayInfo();
    }
}

function local(){
    const local = localStorage.getItem('local');
    if (!local){
        localStorage.setItem('local', 'en');
    }
}
local()

function pages() {
    const pageName = document.getElementById('pageName');
    const page = window.location.pathname;
    const local = localStorage.getItem('local');
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    switch (page) {
        case '/moreDetails':
            pageName.innerHTML = `
<a class="between"> > </a>
<a class="other-color">${local === 'ru' ? 'Подробнее' : 'More details'}</a>`
            break;

        case '/allReviews':
            pageName.innerHTML = `
<a class="between"> > </a>
<a class="other-color">${local === 'ru' ? 'Все отзывы' : 'All reviews'}</a>`
            break;

        case '/sendReviews':
            pageName.innerHTML = `
<a class="between"> > </a>
<a href="/allReviews" class="color-btn">${local === 'ru' ? 'Все отзывы' : 'All reviews'}</a>
<a class="between"> > </a>
<a class="other-color">${local === 'ru' ? 'Оставить отзыв' : 'Send review'}</a>`
            break;

        case '/aboutUs':
            pageName.innerHTML = `
<a class="between"> > </a>
<a class="other-color">${local === 'ru' ? 'О нас' : 'About us'}</a>`
            break;

        case '/rules':
            pageName.innerHTML = `
<a class="between"> > </a>
<a class="other-color">${local === 'ru' ? 'Правила использования' : 'Terms of Use'}</a>`
            break;

        case '/privacyPolicy':
            pageName.innerHTML = `
<a class="between"> > </a>
<a class="other-color">${local === 'ru' ? 'Политика конфиденциальности' : 'Privacy policy'}</a>`
            break;

        case '/PersonalArea':
            pageName.innerHTML = `
<a class="between"> > </a>
<a class="other-color">${local === 'ru' ? 'Личный кабинет' : 'Personal area'}</a>`
            break;

        case '/readyMadeSites':
            pageName.innerHTML = `
<a class="between"> > </a>
<a class="other-color">${local === 'ru' ? 'Все типы' : 'All types'}</a>`
            break;

        case '/readyMadeSites/html-css-js':
            pageName.innerHTML = `
<a class="between"> > </a>
<a onclick="allSites()" class="color-btn">${local === 'ru' ? 'Все типы' : 'All types'}</a>
<a class="between"> > </a>
<a class="other-color">html css js</a>`
            break;

        case '/readyMadeSites/javascript':
            pageName.innerHTML = `
<a class="between"> > </a>
<a onclick="allSites()" class="color-btn">${local === 'ru' ? 'Все типы' : 'All types'}</a>
<a class="between"> > </a>
<a class="other-color">Javascript</a>`
            break;

        case '/readyMadeSites/reactJs':
            pageName.innerHTML = `
<a class="between"> > </a>
<a onclick="allSites()" class="color-btn">${local === 'ru' ? 'Все типы' : 'All types'}</a>
<a class="between"> > </a>
<a class="other-color">React js</a>`
            break;

        case '/readyMadeSites/nodeJs':
            pageName.innerHTML = `
<a class="between"> > </a>
<a onclick="allSites()" class="color-btn">${local === 'ru' ? 'Все типы' : 'All types'}</a>
<a class="between"> > </a>
<a class="other-color">Node js</a>`
            break;

        case '/readyMadeSites/fullstack':
            pageName.innerHTML = `
<a class="between"> > </a>
<a onclick="allSites()" class="color-btn">${local === 'ru' ? 'Все типы' : 'All types'}</a>
<a class="between"> > </a>
<a class="other-color">Fullstack</a>`
            break;

        case '/readyMadeSites/favorites':
            pageName.innerHTML = `
<a class="between"> > </a>
<a onclick="allSites()" class="color-btn">${local === 'ru' ? 'Все типы' : 'All types'}</a>
<a class="between"> > </a>
<a class="other-color">${local === 'ru' ? 'Избранное' : 'Favorites'}</a>`
            break;

        case `/fileInfo/${userInfo.fileInfo}`:
            pageName.innerHTML = `
<a class="between"> > </a>
<a class="other-color">${infoTitle}</a>
<a class="between"> > </a>
<a href="#" class="back-button color-btn" onclick="window.history.back();">${local === 'ru' ? 'Назад' : 'Back'}</a>`
            break;

        default:
            pageName.innerHTML = null;
            break;
    }
}
pages();