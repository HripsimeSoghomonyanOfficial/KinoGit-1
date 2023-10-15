document.querySelector('.login__openPopup').addEventListener('click', () => {
    document.querySelector('.reg_popup').style.display='flex'

    document.getElementById('sign_up_btn').addEventListener('click', () => {
        document.getElementById('sign_up_btn').classList.add('reg_popup_wrap_menu-active');
        document.getElementById('registration_btn').classList.remove('reg_popup_wrap_menu-active');
        
        document.getElementById('_login_').classList.add('active-block');
        document.getElementById('_registr_').classList.remove('active-block');
    });
    
    document.getElementById('registration_btn').addEventListener('click', () => {
        document.getElementById('sign_up_btn').classList.remove('reg_popup_wrap_menu-active');
        document.getElementById('registration_btn').classList.add('reg_popup_wrap_menu-active');

        document.getElementById('_registr_').classList.add('active-block');
        document.getElementById('_login_').classList.remove('active-block');
    });
})

document.querySelector('.reg_popup_close').addEventListener('click', () => {
    document.querySelector('.reg_popup').style.display='none';
})