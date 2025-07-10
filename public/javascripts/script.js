const login = () => {
    window.location.href = `/auth/login`
}
const register = () => {
    window.location.href = `/auth/register`
}
document.getElementById('account').addEventListener('click', () => {
    displayInfo();
});
function displayInfo() {
        const barrier = document.createElement('barrier');
        const border = document.createElement('border');

        const local = localStorage.getItem('local');

            barrier.innerHTML = `<div class="new-barrier"></div>`;
            if (local === 'en'){
                border.innerHTML = `
<link rel="stylesheet" href="/stylesheets/style.css">
<div class="new-border">
<b id="close" style="position: absolute; right: 5px; top: 10px; cursor:pointer; color: black">X</b>
<div class="border-data">
    <h2 class="yourAccount">My account</h2>
<h3>You are not logged in</h3>
<p>Sign in or create an account.</p>
<button onclick="login()" class="login-btn">Login</button>
<button onclick="register()" class="register-btn">Create an account</button>
<br>
<br>
<span>By registering or logging in, you agree to our <a class="termsOfUse" href="/rules" target="_blank">Terms of Use</a> and <a href="/privacyPolicy" target="_blank" class="privacyPolicy">Privacy Policy</a>.</span>
</div>
</div>
</div>
    `
            }
            else{
                border.innerHTML = `
<link rel="stylesheet" href="/stylesheets/style.css">
<div class="new-border">
<b id="close" style="position: absolute; right: 5px; top: 10px; cursor:pointer; color: black">X</b>
<div class="border-data">
    <h2 class="yourAccount">Мой аккаунт</h2>
<h3>Вы не авторизованы</h3>
<p>Войдите в учётную запись или создайте аккаунт.</p>
<button onclick="login()" class="login-btn">Войти</button>
<button onclick="register()" class="register-btn">Создать аккаунт</button>
<br>
<br>
<span>Регистрируясь или авторизируясь, вы принимаете наши <a class="termsOfUse" href="/rules" target="_blank">Условия использования</a> и <a href="/privacyPolicy" target="_blank" class="privacyPolicy">Политику конфиденциальности</a>.</span>
</div>
</div>
</div>
    `
            }


            document.body.appendChild(border);
            document.body.appendChild(barrier);
            document.body.style.overflow = 'hidden';
            barrier.addEventListener('click', () => {
                document.body.removeChild(border);
                document.body.style.overflowY = 'auto';
                document.body.removeChild(barrier);
            })
            document.getElementById('close').addEventListener('click', () => {
                document.body.removeChild(border);
                document.body.style.overflowY = 'auto';
                document.body.removeChild(barrier);
            })
}



function logoutMenu() {
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');
    const local = localStorage.getItem('local');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
    if (local === 'en'){
        border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 40px 0">Are you sure you want to go out?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">No</button>
        <button class="yes-btn" onclick="logout()">Yes</button>  
        </div>
        </div>`
    }
    else{
        border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 40px 0">Вы уверены, что хотите выйти?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">Нет</button>
        <button class="yes-btn" onclick="logout()">Да</button>  
        </div>
        </div>`
    }

    document.body.appendChild(border);
    document.body.appendChild(barrier);
    document.body.style.overflow = 'hidden';
    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
        document.body.style.overflow = 'auto';
    })
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
        document.body.style.overflow = 'auto';
    })
}
function logout() {
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
            window.location.href = "/auth/login";
            return;
        }
    });
}

function checkTokenFunc() {
        const barrier = document.createElement('barrier');
        const border = document.createElement('border');
        const locale = localStorage.getItem('local');

        barrier.innerHTML = `<div class="new-barrier"></div>`;
        if (locale === 'en'){
            border.innerHTML = `
            <link rel="stylesheet" href="/stylesheets/style.css">
<div class="logout-border">
    <p style="text-align: center; color: white; margin: 30px 0; padding: 10px;">Go to the Telegram chat with the developer?</p>
    <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">No</button>
        <a href="https://web.telegram.org/a/" target="_blank"><button class="yes-btn">Yes</button></a>
    </div>
</div>
`
        }
        else{
            border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 30px 0; padding: 10px;">Перейти в телеграм-чат с разработчиком?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">Нет</button>
        <a href="https://web.telegram.org/a/" target="_blank"><button class="yes-btn" id="sendBtn">Да</button></a>
        </div>
        </div>`
        }

        document.body.appendChild(border);
        document.body.appendChild(barrier);
        document.body.style.overflow = 'hidden';
        barrier.addEventListener('click', () => {
            document.body.removeChild(barrier);
            document.body.removeChild(border);
            document.body.style.overflowY = 'auto';
        })
        document.getElementById('closeBtn').addEventListener('click', () => {
            document.body.removeChild(barrier);
            document.body.removeChild(border);
            document.body.style.overflowY = 'auto';
        })
        document.getElementById('sendBtn').addEventListener('click', () => {
            document.body.removeChild(barrier);
            document.body.removeChild(border);
            document.body.style.overflowY = 'auto';
        })

}

function weHaveAnAccount(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const account = document.getElementById('account');
    const accountImg = document.getElementById('account-img');
    if (userInfo.name) {
        account.style.display = 'none'
        account.hidden = true
        const img = userInfo.profileImage;
        accountImg.src = img;
        accountImg.hidden = false
    }
    else{
        accountImg.hidden = true;
    }
}
weHaveAnAccount();

function checkTokenSendPreview() {
    const token = localStorage.getItem('token');

    if(!token){
        displayInfo();
    }
    else{
        sendReviewsJoin();
    }
}

function deleteAccountMenu() {
    const barrier = document.querySelector('.new-barrier');
    const border = document.getElementById('deleteAccountMenu');
    const close = document.getElementById('close');

    barrier.hidden = false;
    border.hidden = false;

    barrier.addEventListener('click', () => {
        barrier.hidden = true;
        border.hidden = true;
    })
    close.addEventListener('click', () => {
        barrier.hidden = true;
        border.hidden = true;
    })
}

function leaveYourContacts() {
    const barrier = document.querySelector('.new-barrier');
    const border = document.getElementById('leaveYourContacts');
    const close = document.getElementById('close1');

    barrier.hidden = false;
    border.hidden = false;

    barrier.addEventListener('click', () => {
        barrier.hidden = true;
        border.hidden = true;
    })
    close.addEventListener('click', () => {
        barrier.hidden = true;
        border.hidden = true;
    })
}


function deleteReviewMenu() {
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');
    const local = localStorage.getItem('local');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
    if (local === 'en'){
        border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 30px 0; padding: 10px;">Are you sure you want to delete your review?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">No</button>
            <button class="yes-btn" onclick="deleteReview()">Yes</button>
        </div>
        </div>`
    }
    else {
        border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 30px 0; padding: 10px;">Вы уверены, что хотите удалить отзыв?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">Нет</button>
            <button class="yes-btn" onclick="deleteReview()">Да</button>
        </div>
        </div>`
    }

    document.body.appendChild(border);
    document.body.appendChild(barrier);
    document.body.style.overflow = 'hidden';
    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
        document.body.style.overflow = 'auto';
    })
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
        document.body.style.overflow = 'auto';
    })
}

function deleteContactsMenu() {
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');
    const local = localStorage.getItem('local');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
    if (local === 'en'){
        border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 30px 0; padding: 10px;">Are you sure you want to delete your contacts?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">No</button>
            <button class="yes-btn" onclick="deleteContacts()">Yes</button>
        </div>
        </div>`
    }
    else {
        border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 30px 0; padding: 10px;">Вы уверены, что хотите удалить свои контакты?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">Нет</button>
            <button class="yes-btn" onclick="deleteContacts()">Да</button>
        </div>
        </div>`
    }

    document.body.appendChild(border);
    document.body.appendChild(barrier);
    document.body.style.overflow = 'hidden';
    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
        document.body.style.overflow = 'auto';
    })
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
        document.body.style.overflow = 'auto';
    })
}