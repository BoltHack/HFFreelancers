document.addEventListener('DOMContentLoaded', () => {
    const downloadFile = document.getElementById('download-file');
    const token = localStorage.getItem('token');

    if(token){
        downloadFile.innerHTML = `
                    <form action="/downloadFile/${infoId}" method="POST">
                        <button class="Download-button">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" fill="white"></path>
                            </svg>
                            <span>Скачать</span>
                        </button>
                    </form>`
    }
    else{
        downloadFile.innerHTML = `
                        <button class="Download-button" onclick="displayInfo()">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" fill="white"></path>
                            </svg>
                            <span>Скачать</span>
                        </button>`
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const myDetails = document.getElementById('my-details');
    const token = localStorage.getItem('token');

    if(!token){
        myDetails.innerHTML = `
                    <a href="/auth/login" class="href">Войдите</a>
                    <p class="auth-info">или</p>
                    <a href="/auth/register" class="href">зарегистрируйтесь,</a>
                    <p class="auth-info">чтобы скачивать любимые сайты.</p>`

    }
    else{
        myDetails.innerHTML = `<a class="you-are-auth">Вы авторизованы и можете скачивать файлы. Удачи!</a>`
    }
})

function imageMenu(){
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
    border.innerHTML = `
        <div class="logout-border">
        <img src="data:image/jpeg;base64,${infoImage}" class="new-image">
        </div>
        </div>`

    document.body.appendChild(border);
    document.body.appendChild(barrier);
    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
    })
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
    })
}
const commentMenu = document.getElementById('commentMenu');
const checkComments = document.getElementById('checkComments');
const commentContainer = document.querySelector('.comment-container');

function offCommentMenu(){
    commentContainer.classList.add('slide-out');
    setTimeout(function (){
        commentContainer.classList.remove('slide-out');
        commentMenu.style.display = 'none';
        checkComments.style.display = 'block';
    }, 500);
    const menus = JSON.parse(localStorage.getItem('menus') || '{}');
    menus.commentsMenu = false;
    localStorage.setItem('menus', JSON.stringify(menus));
}
function onCommentMenu(){
    checkComments.style.display = 'none';
    commentMenu.style.display = 'block';
    const menus = JSON.parse(localStorage.getItem('menus') || '{}');
    menus.commentsMenu = true;
    localStorage.setItem('menus', JSON.stringify(menus));
}
function checkCommentsMenu(){
    const menus = JSON.parse(localStorage.getItem('menus') || '{}');
    if (menus.commentsMenu === true){
        commentMenu.style.display = 'block';
        checkComments.style.display = 'none';
    }
    else{
        commentMenu.style.display = 'none';
        checkComments.style.display = 'block';
    }
}
checkCommentsMenu();

function commentForm(){
    const token = localStorage.getItem('token');
    const commentForm = document.getElementById('commentForm');
    if (token){
        commentForm.innerHTML = `
<form action="/sendCommentsPost/${infoId}" method="POST" id="commentForm">
                <div style="display: flex; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
                    <input type="text" id="message" name="message" placeholder="Написать комментарий" class="input" maxlength="150" required>
                    <button type="submit" id="sendComment" style="background: none; border: none; mix-blend-mode: multiply;"><img src="/images/send.png" style="width: 25px; height: 25px; background: none; cursor:pointer;"></button>
                </div>
            </form>
`
    }
    else{
        commentForm.innerHTML = `
            <div style="display: block; gap: 5px;">
                <div style="display: flex; justify-content: center; gap: 5px">
                    <a href="/auth/login" class="href">Войдите</a>
                    <p style="margin-top: 0" class="auth-info">или</p>
                    <a href="/auth/register" class="href">зарегистрируйтесь,</a>
                </div>
                <p style="text-align: center; margin-top: -3px" class="auth-info">чтобы писать комментарии.</p>
            </div>
                 `
    }
}
commentForm();

function displayInfo() {
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
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
<span>Продолжая, вы принимаете наши <a class="termsOfUse" href="/rules" target="_blank">Условия использования</a> и <a href="/privacyPolicy" target="_blank" class="privacyPolicy">Политику конфиденциальности</a>.</span>
</div>
</div>
</div>
    `

    document.body.appendChild(border);
    document.body.appendChild(barrier);
    document.body.style.overflow = 'hidden';
    barrier.addEventListener('click', () => {
        document.body.removeChild(border);
        document.body.style.overflow = 'auto';
        document.body.removeChild(barrier);
    })
    document.getElementById('close').addEventListener('click', () => {
        document.body.removeChild(border);
        document.body.style.overflowY = 'auto';
        document.body.removeChild(barrier);
    })
}

function pathFileInfo(){
    const ref = localStorage.getItem('ref');
    if (ref !== 'refFileInfo'){
        localStorage.setItem('ref', 'refFileInfo')
    }
}
pathFileInfo();
