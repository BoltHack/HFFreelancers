function getCookie(name) {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(row => row.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
}

const ACCESS_TIMER_DURATION = 900000;
const token = localStorage.getItem('token');

const ref = localStorage.getItem('ref');
function accessStartTimer(duration) {
    const startTime = Date.now();
    const endTime = startTime + duration;

    if (token){
        // localStorage.setItem('accessTokenEndTime', endTime);
        document.cookie = `accessTokenEndTime=${endTime}; path=/;`;
    }

    accessUpdateTimer();
}

function accessUpdateTimer() {
    // const endTime = parseInt(localStorage.getItem('accessTokenEndTime'), 10);
    const endTime = parseInt(getCookie('accessTokenEndTime'), 10);

    const interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            getAccessTokens()
            // localStorage.removeItem('accessTokenEndTime');
            document.cookie = `accessTokenEndTime=; max-age=0; path=/;`;
        }
    }, 1000);
}

// const accessStoredEndTime = localStorage.getItem('accessTokenEndTime');
const accessStoredEndTime = getCookie('accessTokenEndTime');

if (accessStoredEndTime) {
    accessUpdateTimer();
}
if (accessStoredEndTime === typeof String){
    accessStartTimer(ACCESS_TIMER_DURATION);
}
else {
    accessStartTimer(ACCESS_TIMER_DURATION);
}


async function getAccessTokens() {
    try {
        const response = await fetch('/accessToken', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            const { token } = data;

            if(!token) {
                console.log('Токен не найден')
                return;
            }

            if (token){
                localStorage.setItem('token', token);
            }

            window.location.reload();

        } else {
            console.error('Ошибка', response.status);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}






const REFRESH_TIMER_DURATION = 864000000;
function refreshStartTimer(duration) {
    const startTime = Date.now();
    const endTime = startTime + duration;

    if (token) {
        // localStorage.setItem('refreshTokenEndTime', endTime);
        document.cookie = `refreshTokenEndTime=${endTime}; max-age=${10 * 24 * 60 * 60}; path=/;`;
    }

    refreshUpdateTimer();
}

function refreshUpdateTimer() {
    // const endTime = parseInt(localStorage.getItem('refreshTokenEndTime'), 10);
    const endTime = parseInt(getCookie('refreshTokenEndTime'), 10);

    const interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            getRefreshTokens()
            // localStorage.removeItem('refreshTokenEndTime');
            document.cookie = `refreshTokenEndTime=; max-age=0; path=/;`;
        }
    }, 1000);
}

// const refreshStoredEndTime = localStorage.getItem('refreshTokenEndTime');
const refreshStoredEndTime = getCookie('refreshTokenEndTime');

if (refreshStoredEndTime) {
    refreshUpdateTimer();
}
if (refreshStoredEndTime === typeof String){
    refreshStartTimer(REFRESH_TIMER_DURATION);
}
else {
    refreshStartTimer(REFRESH_TIMER_DURATION);
}


async function getRefreshTokens() {
    try {
        const response = await fetch('/refreshToken', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            const { token } = data;

            if(!token) {
                console.log('Токен не найден')
                return;
            }

            if (token){
                localStorage.setItem('token', token);
            }

            window.location.reload();

        } else {
            console.error('Ошибка', response.status);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}










const SESSION_TIMER_DURATION = 86400000;
const session = localStorage.getItem('session');
function sessionTimerStart(duration) {
    const startTime = Date.now();
    const endTime = startTime + duration;

    if (session === 'false' && token) {
        localStorage.setItem('sessionEndTime', endTime);
    }

    sessionUpdateTimer();
}

function sessionUpdateTimer() {
    const endTime = parseInt(localStorage.getItem('sessionEndTime'), 10);

    const interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            sessionLogout();
            localStorage.removeItem('sessionEndTime');
        }
    }, 1000);
}

const sessionEndTime = localStorage.getItem('sessionEndTime');

if (sessionEndTime) {
    sessionUpdateTimer();
}
if (sessionEndTime === typeof String){
    sessionTimerStart(SESSION_TIMER_DURATION);
}
else {
    sessionTimerStart(SESSION_TIMER_DURATION);
}


function sessionLogout() {
    fetch('/auth/logout', {
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(res => res.json()).then((res) => {
        const {status, error} = res;
        if (error) {
            return;
        }

        if (status) {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            localStorage.removeItem('ref');
            localStorage.removeItem('favorites');
            localStorage.removeItem('session');
            localStorage.removeItem('sessionEndTime');
            localStorage.removeItem('menus');
            window.location.href = "/auth/sessionExpired";
            return;
        }
    });
}