function advertising(){
    document.addEventListener('DOMContentLoaded', function() {
        const ads = document.querySelectorAll('.center-advertising');

        if (ads.length > 1) {
            for (let i = 1; i < ads.length; i++) {
                ads[i].style.display = 'none';
            }
        }
    });
}
advertising();