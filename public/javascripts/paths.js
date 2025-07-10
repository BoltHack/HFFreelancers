// const tokenL = localStorage.getItem('token');
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
async function allPaths() {
    const paths = {
        '/': 'refMain',
        '/moreDetails': 'refMoreDetails',
        '/allReviews': 'refAllReviews',
        '/sendReviews': 'refSendReviews',
        '/aboutUs': 'refAboutUs',
        '/rules': 'refRules',
        '/privacyPolicy': 'refPrivacyPolicy',
        '/PersonalArea': 'refPersonalArea',
        '/readyMadeSites': 'refReadyMadeSites',
        '/readyMadeSites/html-css-js': 'refHtmlCssJs',
        '/readyMadeSites/javascript': 'refJavascript',
        '/readyMadeSites/nodeJs': 'refNodeJs',
        '/readyMadeSites/reactJs': 'refReactJs',
        '/readyMadeSites/fullstack': 'refFullstack',
        '/readyMadeSites/favorites': 'refFavorites',
    };

    const pathname = window.location.pathname;
    if (pathname in paths) {
        localStorage.setItem('ref', paths[pathname]);
        userInfo.previousPage = paths[pathname];
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        // if (tokenL){
        //     await getNewToken()
        // }
    }
}

allPaths();

// async function getNewToken() {
//     try {
//         const response = await fetch('/accessToken', {
//             method: 'POST',
//             credentials: 'include'
//         });
//
//         if (response.ok) {
//             const data = await response.json();
//             const {token} = data;
//
//             if (!token) {
//                 console.log('Токен не найден')
//                 return;
//             }
//
//             localStorage.setItem('token', token);
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }

function htmlCssJs(){
    localStorage.setItem('ref', 'refHtmlCssJs');
    window.location.href = '/accessToken';
}
function javascript(){
    localStorage.setItem('ref', 'refJavascript');
    window.location.href = '/accessToken';
}
function nodeJs(){
    localStorage.setItem('ref', 'refNodeJs');
    window.location.href = '/accessToken';
}
function reactJs(){
    localStorage.setItem('ref', 'refReactJs');
    window.location.href = '/accessToken';
}
function fullstack(){
    localStorage.setItem('ref', 'refFullstack');
    window.location.href = '/accessToken';
}
function allSites(){
    localStorage.setItem('ref', 'refReadyMadeSites');
    window.location.href = '/accessToken';
}
