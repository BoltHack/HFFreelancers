function profileMenu(){
    const profileMenu = document.getElementById('profileMenu');
    const contactsMenu = document.getElementById('contactsMenu');
    const favoritesMenu = document.getElementById('favoritesMenu');

    const profileReview = document.getElementById('profileReview');
    const profileContacts = document.getElementById('profileContacts');
    const profileFavorites = document.getElementById('profileFavorites');

    profileMenu.addEventListener('click', () => {
        profileMenu.style.backgroundColor = '#34495e';
        contactsMenu.style.background = 'none';
        favoritesMenu.style.background = 'none';
        profileContacts.hidden = true;
        profileFavorites.hidden = true;
        profileReview.hidden = false;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.userPersonalAreaMenu = 'profile';
        localStorage.setItem('menus', JSON.stringify(menus));
    })
    contactsMenu.addEventListener('click', () => {
        contactsMenu.style.backgroundColor = '#34495e';
        profileMenu.style.background = 'none';
        favoritesMenu.style.background = 'none';
        profileContacts.hidden = false;
        profileFavorites.hidden = true;
        profileReview.hidden = true;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.userPersonalAreaMenu = 'contacts';
        localStorage.setItem('menus', JSON.stringify(menus));
    })
    favoritesMenu.addEventListener('click', () => {
        favoritesMenu.style.backgroundColor = '#34495e';
        contactsMenu.style.background = 'none';
        profileMenu.style.background = 'none';
        profileReview.hidden = true;
        profileContacts.hidden = true;
        profileFavorites.hidden = false;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.userPersonalAreaMenu = 'favorites';
        localStorage.setItem('menus', JSON.stringify(menus));
    })
    const userPersonalAreaMenu = JSON.parse(localStorage.getItem('menus') || '{}');
    if (userPersonalAreaMenu.userPersonalAreaMenu === 'favorites'){
        favoritesMenu.style.backgroundColor = '#34495e';
        contactsMenu.style.background = 'none';
        profileMenu.style.background = 'none';
        profileReview.hidden = true;
        profileContacts.hidden = true;
        profileFavorites.hidden = false;
    }
    else if (userPersonalAreaMenu.userPersonalAreaMenu === 'contacts'){
        contactsMenu.style.backgroundColor = '#34495e';
        profileMenu.style.background = 'none';
        favoritesMenu.style.background = 'none';
        profileContacts.hidden = false;
        profileFavorites.hidden = true;
        profileReview.hidden = true;
    }
    else{
        profileMenu.style.backgroundColor = '#34495e'
        contactsMenu.style.background = 'none';
        favoritesMenu.style.background = 'none';
        profileContacts.hidden = true;
        profileFavorites.hidden = true;
        profileReview.hidden = false;
    }

    const userImage = document.getElementById('userImage');
    const zoomImageDiv = document.getElementById('zoomImageDiv');
    const barrier = document.querySelector('.new-barrier');
    userImage.addEventListener('click', () => {
        zoomImageDiv.hidden = false;
        barrier.hidden = false;
    });
    barrier.addEventListener('click', () => {
        barrier.hidden = true;
        zoomImageDiv.hidden = true;
    });
}
profileMenu()