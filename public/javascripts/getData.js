function getData(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (!userInfo || !userInfo.id || !userInfo.name || !userInfo.image){
        fetch('/getData', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                let {user, image} = data;
                localStorage.setItem('userInfo', JSON.stringify({ 'id': user.id, 'name': user.name, 'profileImage': 'data:image/png;base64,' + image }));
            })
    }
}
getData();