document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registr__");
    // Добавляем слушатель события отправки формы
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (validateForm() && validateDateOfBirth()) {
            // Если форма валидна, отправляем её
            form.submit();
        }
    });

    document.querySelector('.reg_popup').addEventListener('keyup', () => {
        validateForm()
        validateDateOfBirth()
    })
    document.querySelector('.reg_popup').addEventListener('keydown', () => {
        formatInputDate(document.getElementById('regAge'))
    })
    // Функция для валидации формы
    function validateForm() {
        // Получаем значения полей формы
        let regName = document.getElementById("regName").value.trim(),
            regLname = document.getElementById("regLname").value.trim(),
            regEmail = document.getElementById("regEmail").value.trim(),
            gender = document.querySelector('input[name="gender"]:checked'),
            regPassword = document.getElementById("regPassword").value,
            regConfirm = document.getElementById("regConfirm").value,
            regAge = document.getElementById('regAge');

        let regName_chack = document.getElementById("regName_chack"),
            regLname_chack = document.getElementById("regLname_chack"),
            regEmail_chack = document.getElementById("regEmail_chack"),
            regAge_chack = document.getElementById("date_chack"),
            gender_chack = document.getElementById("gender_chack"),
            regPassword_chack = document.getElementById("regPassword_chack"),
            regConfirm_chack = document.getElementById("regConfirm_chack");

        // Простой пример валидации (можете настроить под свои требования)

        // ----------------------------------------------
        if (String(regName).length < 2) {
            regName_chack.style.cssText = 'color:red'
            regName_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'напишите ваше имя'
            return false;
        } else {
            regName_chack.style.cssText = 'color:#59ff00'
            regName_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (String(regLname).length < 2) {
            regLname_chack.style.cssText = 'color:red'
            regLname_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'напишите вашу фамилию'
            return false;
        } else {
            regLname_chack.style.cssText = 'color:#59ff00'
            regLname_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (String(regAge.value).length < 10) {
            regAge_chack.style.cssText = 'color:red'
            regAge_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'когда вы родились ?'
            return false;
        }
        else {
            regAge_chack.style.cssText = 'color:#59ff00'
            regAge_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (String(regEmail).length < 5) {
            regEmail_chack.style.cssText = 'color:red'
            regEmail_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'напишите вашу электронную почту'
            return false;
        } else {
            regEmail_chack.style.cssText = 'color:#59ff00'
            regEmail_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(regPassword)) {
            regPassword_chack.style.cssText = 'color:red'
            regPassword_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'Пароль должен содержать хотя бы одну <br> (маленькую букву) - (большую букву) - (одну цифру)'
            return false;
        } else {
            regPassword_chack.style.cssText = 'color:#59ff00'
            regPassword_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (regPassword !== regConfirm) {
            regConfirm_chack.style.cssText = 'color:red'
            regConfirm_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'подтвердите порол'
            return false;
        } else {
            regConfirm_chack.style.cssText = 'color:#59ff00'
            regConfirm_chack.innerHTML = '&#10004;'
        }
        // ----------------------------------------------
        if (!gender) {
            gender_chack.style.cssText = 'color:red'
            gender_chack.innerHTML = '&#10040;'
            document.querySelector('.helper_text').innerHTML = 'ваш пол'
            return false;
        }
        // ----------------------------------------------
        // Если все проверки пройдены, возвращаем true
        return true;
    }
});

function formatInputDate(input) {
    // Очищаем от любых символов, кроме цифр
    var cleanedValue = input.value.replace(/[^\d]/g, '');

    // Добавляем символ / после первых двух символов и после следующих двух символов
    if (cleanedValue.length > 2) {
        cleanedValue = cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2);
    }
    if (cleanedValue.length > 5) {
        cleanedValue = cleanedValue.slice(0, 5) + '/' + cleanedValue.slice(5);
    }
    input.value = cleanedValue;
}

function validateDateOfBirth() {
    let regAge_chack = document.getElementById("date_chack")

    var userInput = regAge.value;
    var dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dateRegex.test(userInput)) {
        return false;
    }
    var matches = userInput.match(dateRegex);
    var day = parseInt(matches[1], 10);
    var month = parseInt(matches[2], 10) - 1;
    var year = parseInt(matches[3], 10);
    var userDate = new Date(year, month, day);

    if (isNaN(userDate.getTime())) {
        document.querySelector('.helper_text').innerHTML = 'введите корректную дату'
        regAge_chack.innerHTML = '&#10040;'
        regAge_chack.style.color = 'red'
        return false;
    }

    var currentDate = new Date();
    if (userDate.getTime() > currentDate.getTime()) {
        document.querySelector('.helper_text').innerHTML = 'Дата рождения не может быть в будущем'
        regAge_chack.innerHTML = '&#10040;'
        regAge_chack.style.color = 'red'
        return false;
    }

    return true;
}

// radio togle
let all_gender_radio = document.querySelectorAll('.gender_radio')
all_gender_radio.forEach(el => {
    el.addEventListener('click', () => {
        all_gender_radio.forEach(el2 => {
            el2.classList.remove('gender_radio--active')
        })
        el.classList.add('gender_radio--active')
        
        gender_chack.style.cssText = 'color:#59ff00'
        gender_chack.innerHTML = '&#10004;'
    })
})