const homeId = localStorage.getItem('id');
const ref = localStorage.getItem('ref');
async function getNewToken() {
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

            localStorage.setItem('token', token);

            if(ref === 'refPersonalArea') {
                window.location.href = '/PersonalArea';
            }
            else if(ref === 'refSendReviews'){
                window.location.href = `/sendReviews/${homeId}`;
            }
            else if(ref === 'refAdmin'){
                window.location.href = `/admin/allUsers`;
            }
            else if(ref === 'refReadyMadeSites'){
                window.location.href = `/readyMadeSites`;
            }
            else if(ref === 'refFavorites'){
                window.location.href = `/readyMadeSites/favorites`;
            }
            else if(ref === 'refMoreDetails'){
                window.location.href = `/moreDetails`;
            }
            else if(ref === 'refMain'){
                window.location.href = `/`;
            }
            else if(ref === 'refAboutUs'){
                window.location.href = `/aboutUs`;
            }
            else if(ref === 'refRules'){
                window.location.href = `/rules`;
            }
            else if(ref === 'refPrivacyPolicy'){
                window.location.href = `/privacyPolicy`;
            }
        } else {
            console.error('Ошибка', response.status);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

getNewToken();