function localsFRu() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const homeId = userInfo.id;
    const token = localStorage.getItem('token');
    const url = token ? `/changeLocalAuth/${homeId}/ru` : '/changeLocal/ru';
    fetch(url, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('local', 'ru');
                localStorage.setItem('changeLocale', true);
                window.location.href = '/';
                }
            else {
                response.json().then(errorMessage => {
                    console.log("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            console.log('Произошла ошибка при отправке запроса:', error);
            console.log("Произошла ошибка при отправке запроса: " + error.message);
        });
}

function localsFEn() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const homeId = userInfo.id;
    const token = localStorage.getItem('token');
    const url = token ? `/changeLocalAuth/${homeId}/en` : '/changeLocal/en';
    fetch(url, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('local', 'en');
                localStorage.setItem('changeLocale', true);
                window.location.href = '/';
            }
            else {
                response.json().then(errorMessage => {
                    console.log("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            console.log('Произошла ошибка при отправке запроса:', error);
            console.log("Произошла ошибка при отправке запроса: " + error.message);
        });
}

function checkCookie() {
    if (!acceptCookies || (acceptCookies !== 'true' && acceptCookies !== 'false')){
        cookiesMenus();
    }
    else{
        checkIp();
    }
}
checkCookie();
function checkIp() {
    const local = localStorage.getItem('local');
    const changeLocale = localStorage.getItem('changeLocale');
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            if (acceptCookies === 'true'){
                const ip = data.ip
                if (!document.cookie.match(/(?:^|;\s*)ip=/)) {
                    document.cookie = `ip=${encodeURIComponent(ip)}; max-age=${24 * 60 * 60}`;
                }
                const checkIp2 = ip.substr(0, 2);
                const checkIp3 = ip.substr(0, 3);
                if (changeLocale !== 'true'){
                    if (checkIp2 === '90' || checkIp3 === '100') {
                        if (local !== 'en') {
                            localsFEn();
                        }
                    } else {
                        if (local !== 'ru') {
                            localsFRu();
                        }
                    }
                }
            }
        });
}

function cookiesMenus() {
    const border = document.createElement('border');
    const local = localStorage.getItem('local');

    if (local === 'en'){
        border.innerHTML = `
<link rel="stylesheet" href="/stylesheets/style.css">
<div class="cookie-card">
    <span class="cookies-title">🍪 We collect cookies</span>
    <p class="description">We use cookies to ensure you get the best experience on our website.<a href="/privacyPolicy"> Privacy Policy</a>. </p>
    <div class="actions">
        <button class="cookies-pref" onclick="rejectCookiesFunc()" id="reject">
            Reject
        </button>
        <button class="cookies-accept" onclick="acceptCookiesFunc()" id="accept">
            Accept
        </button>
    </div>
</div>
    `
    }
    else{
        border.innerHTML = `
<link rel="stylesheet" href="/stylesheets/style.css">
<div class="cookie-card">
    <span class="cookies-title">🍪 Мы собираем файлы cookie</span>
    <p class="description">Мы используем файлы cookie, чтобы обеспечить вам максимальное удобство использования нашего веб-сайта.<a href="/privacyPolicy"> Правила конфиденциальности</a>. </p>
    <div class="actions">
        <button class="cookies-pref" onclick="rejectCookiesFunc()" id="reject">
            отклонить
        </button>
        <button class="cookies-accept" onclick="acceptCookiesFunc()" id="accept">
            Принять
        </button>
    </div>
</div>
    `
    }


    document.body.appendChild(border);
    document.getElementById('accept').addEventListener('click', () => {
        document.body.removeChild(border);
    })
    document.getElementById('reject').addEventListener('click', () => {
        document.body.removeChild(border);
    })
}

function acceptCookiesFunc(){
    fetch('/acceptCookies/true', {
        method: 'POST'
    })
    setTimeout(function (){
        window.location.reload();
    }, 500)
}

function rejectCookiesFunc(){
    fetch('/acceptCookies/false', {
        method: 'POST'
    })
}