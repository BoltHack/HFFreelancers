document.getElementById('togglePassword1').addEventListener('click', function () {
    const togglePassword1 = document.getElementById('togglePassword1');
    const togglePassword2 = document.getElementById('togglePassword2');
    let oldPasswordField = document.getElementById('oldPwd');
    let passwordField = document.getElementById('pwd');
    let confirmPasswordField = document.getElementById('cpwd');
    let passwordFieldType = passwordField.getAttribute('type');
    togglePassword1.addEventListener('click', function () {
        if (passwordFieldType === 'password') {
            oldPasswordField.setAttribute('type', 'text');
            passwordField.setAttribute('type', 'text');
            confirmPasswordField.setAttribute('type', 'text');
            togglePassword2.hidden = false;
            togglePassword1.hidden = true;
        }
    })
    togglePassword2.addEventListener('click', function () {
        if (passwordFieldType === 'password') {
            oldPasswordField.setAttribute('type', 'password');
            passwordField.setAttribute('type', 'password');
            confirmPasswordField.setAttribute('type', 'password');
            togglePassword2.hidden = true;
            togglePassword1.hidden = false;
        }
    });
});

function profilePerms(){
    let profileImg = document.getElementById('userImage');
    let userImageEdit = document.getElementById('userImageEdit');
    let homeId = idUser;

    let editImageBtn = document.getElementById('editImageBtn');
    let attachFile = document.getElementById('attachFile');
    let editImagePart = document.getElementById('editImagePart');
    let changeBtn = document.getElementById('changeBtn');
    let cancelChangeBtn = document.getElementById('cancelChangeBtn');
    let deleteImageBtn = document.getElementById('deleteImageBtn');

    let changePasswordBtn = document.getElementById('changePasswordBtn');
    let changePassword = document.getElementById('changePassword');
    let close = document.getElementById('close');
    let zoomImageDiv = document.getElementById('zoomImageDiv');
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    const barrier = document.createElement('barrier');

    profileImg.addEventListener('click', () => {
        barrier.innerHTML = `<div class="new-barrier"></div>`;
        document.body.appendChild(barrier);
        zoomImageDiv.hidden = false;
    })

    changePasswordBtn.addEventListener('click', () => {
        barrier.innerHTML = `<div class="new-barrier"></div>`;
        document.body.appendChild(barrier);
        changePassword.hidden = false;
    })

    editImageBtn.addEventListener('click', () => {
        barrier.innerHTML = `<div class="new-barrier"></div>`;
        document.body.appendChild(barrier);
        editImagePart.hidden = false
    })

    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        editImageBtn.hidden = false;
        editImagePart.hidden = true;
        changePassword.hidden = true;
        zoomImageDiv.hidden = true;
        userInfo.profileImage = `data:image/png;base64,${imageUser}`
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    })

    close.addEventListener('click', () => {
        document.body.removeChild(barrier);
        changePassword.hidden = true;
    })

    cancelChangeBtn.addEventListener('click', () => {
        editImageBtn.hidden = false;
        editImagePart.hidden = true;
        document.body.removeChild(barrier);
        userInfo.profileImage = `data:image/png;base64,${imageUser}`
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    })

    attachFile.addEventListener('change', () => {
        let href = URL.createObjectURL(attachFile.files[0])
        userImageEdit.src = href

        const reader = new FileReader();
        reader.readAsDataURL(attachFile.files[0]);
        reader.onload = function () {
            const imageDataUrl = reader.result;
            // localStorage.setItem('profileImage', imageDataUrl);
            userInfo.profileImage = imageDataUrl
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        };
    })

    changeBtn.addEventListener('click', () => {
        let formData = new FormData();
        const selectedFile = attachFile.files[0];

        if (!selectedFile) {
            return;
        }

        formData.append('image', selectedFile);

        fetch(`/upload/${homeId}`,{
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: formData
        })
            .then(response => {
                if(response.ok){
                    localStorage.setItem('ref', 'refPersonalArea');
                    window.location.href = '/accessToken';
                    console.log('Изображение успешно сохранено!')
                    return response.json();
                } else {
                    console.log('Ошибка при загрузке изображения');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    })

    deleteImageBtn.addEventListener('click', () => {
        fetch(`/deleteImage/${homeId}`,{
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
            .then(response => {
                if(response.ok){
                    localStorage.setItem('ref', 'refPersonalArea');
                    window.location.href = '/accessToken';
                    userInfo.profileImage = "data:image/png;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QCXRXhpZgAASUkqAAgAAAADAA4BAgBNAAAAMgAAABoBBQABAAAAfwAAABsBBQABAAAAhwAAAAAAAABVc2VyIEljb24gRmxhdCBJc29sYXRlZCBvbiBXaGl0ZSBCYWNrZ3JvdW5kLiBVc2VyIFN5bWJvbC4gVmVjdG9yIElsbHVzdHJhdGlvbiwBAAABAAAALAEAAAEAAAD/4QVkaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj4KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iICAgeG1sbnM6R2V0dHlJbWFnZXNHSUZUPSJodHRwOi8veG1wLmdldHR5aW1hZ2VzLmNvbS9naWZ0LzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHBob3Rvc2hvcDpDcmVkaXQ9IkdldHR5IEltYWdlcyIgR2V0dHlJbWFnZXNHSUZUOkFzc2V0SUQ9IjEzMDA4NDU2MjAiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9sZWdhbC9saWNlbnNlLWFncmVlbWVudD91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybCIgPgo8ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOmxpPlBldGVyUGVuY2lsPC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5Vc2VyIEljb24gRmxhdCBJc29sYXRlZCBvbiBXaGl0ZSBCYWNrZ3JvdW5kLiBVc2VyIFN5bWJvbC4gVmVjdG9yIElsbHVzdHJhdGlvbjwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgo8cGx1czpMaWNlbnNvcj48cmRmOlNlcT48cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz48cGx1czpMaWNlbnNvclVSTD5odHRwczovL3d3dy5pc3RvY2twaG90by5jb20vcGhvdG8vbGljZW5zZS1nbTEzMDA4NDU2MjAtP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+Cv/tAJBQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAcxwCUAALUGV0ZXJQZW5jaWwcAngATVVzZXIgSWNvbiBGbGF0IElzb2xhdGVkIG9uIFdoaXRlIEJhY2tncm91bmQuIFVzZXIgU3ltYm9sLiBWZWN0b3IgSWxsdXN0cmF0aW9uHAJuAAxHZXR0eSBJbWFnZXMA/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7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AAAAAMAAAAAABjgAAAAAAAAAAACDgAAAAAAcAAAAAAAAQAAAAAACMAAAAAAAAAAAAMQAAAAAACAAAAAAAABgAAAAAAOAAAAAAAAAAAAD+AAAAAAAAAAAAAAAAcAAAAAABjgAAAAAAAAAAADgAAAAAAcAAAAAAAABgAAAAAAQMAAAAAAAAAAAMQAAAAAADgAAAAAAAAAAAAAAAAcAAAAAAAAAAABiAAAAAAAcAAAAAAAADgAAAAAABiAAAAAAAAAAAPwAAAAAAAAAAAAAAAAcAAAAAAAcQAAAAAAAAAABcAAAAAAARAAAAAAAADgAAAAAAABgAAAAAAAAAABgAAAAAAAMAAAAAAAAQAAAAAAAQMAAAAAAAAAAQMAAAAAAAAQAAAAAAAMAAAAAAACDgAAAAAAAAAADgAAAAAAADwAAAAAAOAAAAAAAAAcAAAAAAAAAAAcAAAAAAAADgAAAAAMAAAAAAAACBgAAAAAAAAACRgAAAAAAAAAcAAACcAAAAAAAAAAMAAAAAAAAAADsAAAAAAAAACdgAPwAAAAAAAAADhgAAAAAAAAAAMAAAAAAAAAAAAACAAAAAAAAAAAcQAAAAAAAAAABiAAAAAAAAAAST8SAAAAAAAAAABwAAAAAAAAAAAMMAAAAAAAADvAAAB+AAAAAAAACfgAAAAAAAAAAATgAAAAAACfgAAAAABwAAAAAAAAMAAAAAAAAAAABgAAAAAACcAAAAAAAAMAAAAAABiAAAAAAAAAAAAccAAAAADgAAAAAAAAAOAAAAACcAAAAAAAAAAAACBgAAAATgAAAAAAAAAACAAAAAQcAAAAAAAAAAAABgAAAATgAAAAAAAAAAACAAAADyAAAAAAAAAAAAACeAAADgAAAAAAAAAAAAMAAAADgAAAAAAAAAAAAAccAACQAAAAAAAAAAAAAMAACOQAAAAAAAAAAAAACRgAAcAAAAAAAAAAAAAAAAAcMAAAAAAAAAAAAAABjwAQAAAAAAAAAAAAAADgAQeAAAAAAAAAAAAAAAThgDgAAAAAAAAAAAAAACABwAAAAAAAAAAAAAAAATxgMAAAAAAAAAAAAAACQBjgAAAAAAAAAAAAAAAABxgcAAAAAAAAAAAAABwBhgAAAAAAAAAAAAAAAAARhgMAAAAAAAAAAAABgBhwAAAAAAAAAAAAAAAAAABhgBgAAAAAAAAAA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"
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    console.log('Изображение успешно удалено!');
                    return response.json();
                } else {
                    console.log('Ошибка при загрузке изображения');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    })
}
profilePerms();

function perms(){
    let profileMenu = document.getElementById('profileMenu');
    let newsMenu = document.getElementById('newsMenu');
    let contactsMenu = document.getElementById('contactsMenu');
    let settingsMenu = document.getElementById('settingsMenu');

    let profile = document.getElementById('profile');
    let news = document.getElementById('news');
    let myReview = document.getElementById('myReview');
    let contacts = document.getElementById('contacts');
    let settings = document.getElementById('settings');

    profileMenu.addEventListener('click', () => {
        profileMenu.style.backgroundColor = '#34495e'
        newsMenu.style.background = 'none';
        settingsMenu.style.background = 'none';
        contactsMenu.style.background = 'none';
        profile.hidden = false;
        myReview.hidden = false;
        contacts.hidden = true;
        news.hidden = true;
        settings.hidden = true;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.personalAreaMenu = 'profile';
        localStorage.setItem('menus', JSON.stringify(menus));
    })

    newsMenu.addEventListener('click', () => {
        newsMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none';
        contactsMenu.style.background = 'none';
        settingsMenu.style.background = 'none';
        news.hidden = false;
        profile.hidden = true;
        myReview.hidden = true;
        contacts.hidden = true;
        settings.hidden = true;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.personalAreaMenu = 'news';
        localStorage.setItem('menus', JSON.stringify(menus));
    })
    contactsMenu.addEventListener('click', () => {
        contactsMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        newsMenu.style.background = 'none'
        settingsMenu.style.background = 'none'
        contacts.hidden = false;
        news.hidden = true;
        profile.hidden = false;
        myReview.hidden = true;
        settings.hidden = true;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.personalAreaMenu = 'contacts';
        localStorage.setItem('menus', JSON.stringify(menus));
    })

    settingsMenu.addEventListener('click', () => {
        settingsMenu.style.backgroundColor = '#34495e';
        profileMenu.style.background = 'none';
        newsMenu.style.background = 'none';
        contactsMenu.style.background = 'none';
        settings.hidden = false;
        news.hidden = true;
        profile.hidden = true;
        contacts.hidden = true;
        myReview.hidden = true;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.personalAreaMenu = 'settings';
        localStorage.setItem('menus', JSON.stringify(menus));
    })
    const personalAreaMenu = JSON.parse(localStorage.getItem('menus') || '{}');
    if (personalAreaMenu.personalAreaMenu === 'news'){
        newsMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        news.hidden = false;
        profile.hidden = true;
        myReview.hidden = true;
    }
    else if (personalAreaMenu.personalAreaMenu === 'settings'){
        settingsMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        newsMenu.style.background = 'none'
        settings.hidden = false;
        news.hidden = true;
        profile.hidden = true;
        myReview.hidden = true;
    }
    else if (personalAreaMenu.personalAreaMenu === 'contacts'){
        contactsMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        newsMenu.style.background = 'none'
        settingsMenu.style.background = 'none'
        contacts.hidden = false;
        news.hidden = true;
        profile.hidden = false;
        myReview.hidden = true;
        settings.hidden = true;
    }
    else{
        profileMenu.style.backgroundColor = '#34495e'
        newsMenu.style.background = 'none';
        settingsMenu.style.background = 'none';
        contactsMenu.style.background = 'none';
        profile.hidden = false;
        myReview.hidden = false;
        contacts.hidden = true;
        news.hidden = true;
        settings.hidden = true;
    }
}
perms()

document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
});


function deleteReview() {
    const homeId = idUser;
    fetch(`/deleteReview/${homeId}`, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('ref', 'refPersonalArea');
                window.location.href = '/accessToken';
            } else {
                response.text().then(errorMessage => {
                    console.log("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            errorMenu('Произошла ошибка при отправке запроса:', error);
            errorMenu("Произошла ошибка при отправке запроса: " + error.message);
        });
}

function deleteContacts() {
    const homeId = idUser;
    fetch(`/deleteContacts/${homeId}`, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('ref', 'refPersonalArea');
                window.location.href = '/accessToken';
            } else {
                response.text().then(errorMessage => {
                    console.log("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            errorMenu('Произошла ошибка при отправке запроса:', error);
            errorMenu("Произошла ошибка при отправке запроса: " + error.message);
        });
}

// document.getElementById('changePasswordBtn').addEventListener(function () {
// function changePassword(){
//     const homeId = idUser;
//     fetch(`/changePassword/${homeId}`,{
//         method: "POST",
//         headers: {
//             'Authorization': 'Bearer ' + localStorage.getItem("token")
//         },
//     })
//         .then(response => {
//             if(response.ok){
//                 localStorage.setItem('ref', 'refPersonalArea');
//                 window.location.href = '/accessToken';
//             } else {
//                 throw new Error('Ошибка при смене пароля');
//             }
//         })
//         .catch(error => {
//             console.error('Ошибка:', error);
//         });
// }