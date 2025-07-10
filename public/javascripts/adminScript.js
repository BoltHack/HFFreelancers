document.addEventListener('DOMContentLoaded', () => {
    const deleteBtn = document.querySelectorAll('.deleteAccountBtn');
    const barrier = document.querySelector('.new-barrier');

    deleteBtn.forEach(button => {
        button.addEventListener('click', function () {
            const dataId = this.getAttribute('data-id');
            const deleteMenu = document.getElementById('deleteMenu-'+dataId);
            const closeBtn = document.getElementById('closeBtn-'+dataId);
            barrier.hidden = false;
            deleteMenu.hidden = false;

            closeBtn.addEventListener('click', () => {
                barrier.hidden = true;
                deleteMenu.hidden = true;
            })
            barrier.addEventListener('click', () => {
                barrier.hidden = true;
                deleteMenu.hidden = true;
            })
        })
    })
})

function adminWindow(){
    const allUsers = document.getElementById('allUsers');
    const sendLinks = document.getElementById('sendLinks');
    const news = document.getElementById('news');
    const allNews = document.getElementById('allNews');
    const requestUnban = document.getElementById('requestUnban');
    const allWebsites = document.getElementById('allWebsites');
    const allAdvertising = document.getElementById('allAdvertising');
    if(window.location.pathname === '/admin/sendNews'){
        news.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'sendNews')
    }
    if(window.location.pathname === '/admin/allNews'){
        allNews.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'allNews')
    }
    if(window.location.pathname === '/admin/allUsers'){
        allUsers.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'allUsers')
    }
    if(window.location.pathname === '/admin/sendLinks'){
        sendLinks.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'sendLinks')
    }
    if(window.location.pathname === '/admin/requestUnban'){
        requestUnban.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'sendRequestUnban')
    }
    if(window.location.pathname === '/admin/allWebsites'){
        allWebsites.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'sendAllWebsites')
    }
    if(window.location.pathname === '/admin/allAdvertising'){
        allAdvertising.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'sendAllAdvertising')
    }
}
adminWindow();
