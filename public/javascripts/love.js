const checkToken = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', () => {
    const loveButton = document.querySelectorAll('.love');
    const alreadyLove = document.querySelectorAll('.alreadyLove');
    const deleteFavoritesButton = document.querySelectorAll('.delete-favorites');
    const fileInfo = document.querySelectorAll('.fileInfo');

    function checkLoveState() {
        loveButton.forEach(button => {
            const siteId = button.getAttribute('data-id');
            const love = document.getElementById('love-' + siteId);
            const alreadyLove = document.getElementById('alreadyLove-' + siteId);

            let favorites = localStorage.getItem('favorites');
            if (favorites) {
                favorites = JSON.parse(favorites);
                const favoritesIndex = favorites.findIndex(item => item.favId === siteId);
                if (favoritesIndex !== -1) {
                    love.hidden = true;
                    alreadyLove.hidden = false;
                } else {
                    love.hidden = false;
                    alreadyLove.hidden = true;
                }
            } else {
                love.style.display = '';
                alreadyLove.hidden = true;
            }
        });
    }

    loveButton.forEach(button => {
        button.addEventListener('click', function() {
            if (checkToken){
                const siteId = this.getAttribute('data-id');
                const siteTitle = this.getAttribute('data-title');
                const love = document.getElementById('love-' + siteId);
                const alreadyLove = document.getElementById('alreadyLove-' + siteId);
                const load = document.getElementById('load-' + siteId);
                const local = localStorage.getItem('local');

                load.hidden = false;
                love.hidden = true;

                fetch(`/likeSite/${siteId}`, {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            alreadyLove.hidden = false;
                            love.hidden = true;
                            load.hidden = true;

                            let favorites = localStorage.getItem('favorites');

                            if (favorites) {
                                try {
                                    favorites = JSON.parse(favorites);
                                } catch (e) {
                                    favorites = [];
                                }
                            } else {
                                favorites = [];
                            }

                            const favoritesIndex = favorites.findIndex(item => item.id === siteId);

                            if (favoritesIndex === -1) {
                                favorites.push({ favId: siteId });
                            }

                            localStorage.setItem('favorites', JSON.stringify(favorites));

                            const message = local === 'en' ? `${siteTitle} added to favorites!` : `${siteTitle} добавлен в избранное!`;
                            successMenu(message);
                        } else {
                            response.text().then(errorMessage => {
                                console.log("Ошибка: " + errorMessage);
                            });
                        }
                    })
                    .catch(error => {
                        errorMenu("Произошла ошибка при отправке запроса: " + error.message);
                    });
            }
            else{
                displayInfo();
            }


        });
    });
    checkLoveState();

    alreadyLove.forEach(button => {
        button.addEventListener('click', function (){
            const siteId = this.getAttribute('data-id');
            const siteTitle = this.getAttribute('data-title');
            const love = document.getElementById('love-'+siteId);
            const alreadyLove = document.getElementById('alreadyLove-'+siteId);
            const load = document.getElementById('load-' + siteId);
            const local = localStorage.getItem('local');

            load.hidden = false;
            alreadyLove.hidden = true;

            fetch(`/dislikeSite/${siteId}`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
            })
                .then(response => {
                    if (response.ok) {
                        love.hidden = false;
                        alreadyLove.hidden = true;
                        load.hidden = true;
                        const local = localStorage.getItem('local');

                        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                        const favoritesIndex = favorites.findIndex(item => item.favId === siteId)

                        if(favoritesIndex !== -1){
                            favorites.splice(favoritesIndex, 1);
                        }

                        localStorage.setItem('favorites', JSON.stringify(favorites))
                        const message = local === 'ru' ? `${siteTitle} удалён из избранного!` : `${siteTitle} removed from favorites!`
                        successMenu(message)
                    } else {
                        response.text().then(errorMessage => {
                            console.log("Ошибка: " + errorMessage);
                            const errorMsg = local === 'ru' ? 'Произашла ошибка. Перенаправление на главную страницу' : 'An error has occurred. Redirect to home page';
                            errorMenu(errorMsg);
                            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                            const favoritesIndex = favorites.findIndex(item => item.favId === siteId)

                            if(favoritesIndex !== -1){
                                favorites.splice(favoritesIndex, 1);
                            }

                            localStorage.setItem('favorites', JSON.stringify(favorites));
                            setTimeout(function (){
                                window.location.href = '/';
                            }, 5000)
                        });
                    }
                })
                .catch(error => {
                    errorMenu("Произошла ошибка при отправке запроса: " + error.message);
                });

        });
    });
    checkLoveState();

    deleteFavoritesButton.forEach(button => {
        button.addEventListener('click', function () {
            const deleteId = this.getAttribute('data-deleteFav');
            const deleteName = this.getAttribute('data-title');
            const deleteFav = document.getElementById('deleteFav-'+deleteId);
            const favContainer = document.getElementById('fav-container-'+deleteId);
            const load = document.getElementById('load-'+deleteId);
            const local = localStorage.getItem('local');

            deleteFav.hidden = true;
            load.hidden = false;

            fetch(`/dislikeSite/${deleteId}`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
            })
                .then(response => {
                    if (response.ok) {
                        fetch(`/accessToken`, {
                            method: "POST",
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem("token")
                            },
                        })
                            .then(response => {
                                if (response.ok) {
                                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                                    const favoritesIndex = favorites.findIndex(item => item.favId === deleteId);

                                    if(favoritesIndex !== -1){
                                        favorites.splice(favoritesIndex, 1);
                                    }

                                    localStorage.setItem('favorites', JSON.stringify(favorites));
                                    favContainer.style.display = 'none';
                                    const message = local === 'ru' ? `${deleteName} успешно удалён из избранного!`: `${deleteName} has been successfully removed from favorites!`;
                                    successMenu(message);

                                    const fav = localStorage.getItem('favorites');
                                    const ul = document.getElementById('ul');
                                    if (fav === '[]'){
                                        ul.innerHTML = `<li class="not-found">${local === 'ru' ? 'Нет избранных элементов.' : 'No favorite items.'}</li>`;
                                    }
                                }
                            })
                            .catch(error => {
                                console.log(error)
                                response.text().then(errorMessage => {
                                    console.log("Ошибка: " + errorMessage);
                                    const errorMsg = local === 'ru' ? 'Произашла ошибка. Перенаправление на главную страницу' : 'An error has occurred. Redirect to home page';
                                    errorMenu(errorMsg);
                                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                                    const favoritesIndex = favorites.findIndex(item => item.favId === deleteId)

                                    if(favoritesIndex !== -1){
                                        favorites.splice(favoritesIndex, 1);
                                    }

                                    localStorage.setItem('favorites', JSON.stringify(favorites))
                                    setTimeout(function (){
                                        window.location.href = '/';
                                    }, 5000)
                                });
                            })
                    }
                })
                .catch(error => {
                    errorMenu("Произошла ошибка при отправке запроса: " + error.message);
                });
        })
    })
    checkLoveState();+

    fileInfo.forEach(button => {
        button.addEventListener('click', function () {
            const dataInfo = this.getAttribute('data-info');
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

            userInfo.fileInfo = dataInfo;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('ref', 'refFileInfo');
            fetch(`/viewSite/${dataInfo}`, {
                method: "POST",
            })
            if (window.location.pathname.startsWith('/profile/')){
                window.open('/accessToken', '_blank');
            }
            else {
                window.location.href = '/accessToken';
            }
        })
    })
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