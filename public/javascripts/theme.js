const divTheme = document.getElementById('theme');
const htmlTheme = document.getElementById('htmlTheme');
document.addEventListener('change', () => {
    if (divTheme.checked) {
        localStorage.setItem('theme', 'light');
        document.body.classList.add('lightTheme');
        htmlTheme.classList.add('lightTheme');
        fetch('/changeTheme/light', {
            method: "POST",
        })
    } else {
        localStorage.setItem('theme', 'dark');
        document.body.classList.remove('lightTheme');
        htmlTheme.classList.remove('lightTheme');
        fetch('/changeTheme/dark', {
            method: "POST",
        })
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.remove('lightTheme');
        htmlTheme.classList.remove('lightTheme');
        divTheme.checked = false;
    } else if (!theme) {
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('lightTheme');
        htmlTheme.classList.add('lightTheme');
        divTheme.checked = true;
    }
})
