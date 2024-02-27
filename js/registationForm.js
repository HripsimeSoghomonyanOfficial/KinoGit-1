document.querySelector('.login__openPopup').addEventListener('click', () => {
    document.querySelector('.reg_popup').style.display = 'flex'
})

document.getElementById('sign_up_btn').addEventListener('click', () => {
    document.getElementById('sign_up_btn').classList.add('reg_popup_wrap_menu-active');
    document.getElementById('registration_btn').classList.remove('reg_popup_wrap_menu-active');

    document.getElementById('login__').classList.add('active-block');
    document.getElementById('registr__').classList.remove('active-block');
});

document.getElementById('registration_btn').addEventListener('click', () => {
    document.getElementById('sign_up_btn').classList.remove('reg_popup_wrap_menu-active');
    document.getElementById('registration_btn').classList.add('reg_popup_wrap_menu-active');

    document.getElementById('registr__').classList.add('active-block');
    document.getElementById('login__').classList.remove('active-block');
});

document.querySelector('.reg_popup_close').addEventListener('click', () => {
    document.querySelector('.reg_popup').style.display = 'none';
})


// const showMassag = document.querySelector('.showMassag')
// const showMassag_wrap = document.querySelector('.showMassag_wrap')

// // -------------------------------?not_correct----------------------------------------
// if (window.location.href.indexOf('?not_correct') !== -1) showMassages('неверный логин или пароль')

// // -------------------------------?match_email----------------------------------------
// if (window.location.href.indexOf('?match_email') !== -1) showMassages('этот емейл уже зарегистрирован')

// function showMassages(text) {
//     showMassag.style = "display: flex"
//     showMassag_wrap.innerHTML = text

//     setTimeout(() => {
//         // window.location.href = 'https://kinogit.ru/index.html'
//         window.location.href = 'https://edgar-karapetyan.github.io/KinoGit/index.html'
//     }, 5000)
// }

// showMassag.addEventListener('click', () => {
//     // window.location.href = 'https://kinogit.ru/index.html'
//     window.location.href = 'https://edgar-karapetyan.github.io/KinoGit/index.html'
// })