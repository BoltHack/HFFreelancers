function getData(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    fetch('/getData', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            let {user, image, aCode} = data;
            if (!userInfo.id || userInfo.id !== user.id || userInfo.name !== user.name || userInfo.profileImage !== `data:image/png;base64,${image}`){
                localStorage.setItem('userInfo', JSON.stringify({
                    'id': user.id,
                    'name': user.name,
                    'profileImage': 'data:image/png;base64,' + image,
                    'previousPage': 'Все типы'
                }));
                window.location.reload();
            }
        })
}
getData();