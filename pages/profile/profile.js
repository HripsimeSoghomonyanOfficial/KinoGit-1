// get user info
fetch('../../backend/profile.php')
    .then(r => r.json())
    .then(data => {
        document.getElementById('_nameSurname').textContent = `${data.name} ${data.surname}`
        document.getElementById('_mail').textContent = `${data.email}`
        document.getElementById('_birthday').textContent = `${data.age.replaceAll('-', ' / ')}`
    });