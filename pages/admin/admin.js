if (!sessionStorage.getItem('token')) {
    window.location.href = '../../index.html'
}

chack_user_registred()
function chack_user_registred() {
    fetch('../../backend/chack_user_registred.php', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(res => {
            document.getElementById('registered__users').innerText = res.length
        })
        .catch(err => console.error(err));
}

all__users__today()
function all__users__today() {
    fetch('../../backend/get_day_year.php', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "how_much_days": 'day'
        })
    })
        .then(response => response.json())
        .then(res => {
            document.getElementById('all__users__today').innerText = Object.values(res.dates)
        })
        .catch(err => console.error(err));
}

online__now()
function online__now() {
    fetch('../../backend/select_online.php', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(res => {
            document.getElementById('online__now').innerText = res.online
        })
        .catch(err => console.error(err));
}

grafic_width_year()
function grafic_width_year() {
    fetch('../../backend/get_day_year.php', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "how_much_days": 'year'
        })
    })
        .then(response => response.json())
        .then(res => {
            let resalt = res.dates
            const maxNum = Math.max(...Object.values(resalt))

            Object.values(resalt).forEach(num => {
                let realNumber = num
                let persent = (100 * num) / (maxNum + 50);

                let div = document.createElement('div')
                div.className = 'range_cont'
                div.innerHTML = `<div class="range" style="background-color:${(maxNum == realNumber) ? '#ffb700' : '#c28c02'}; height:${persent}%;">
                                    <div class='range_num'>${realNumber}</div>
                                </div>`
                document.querySelector('.grafic_width_year__row').appendChild(div)
            })
        })
        .catch(err => console.error(err));
}

activ_users_graphic()
function activ_users_graphic() {

    let getInBack = () => {
        fetch('../../backend/select_online.php', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(res => {
                document.getElementById('online__now').innerText = res.online
                drow_active_users(res.online)
            })
            .catch(err => console.error(err));
    }
    getInBack()

    let tick = 10
    setInterval(() => {
        if (tick < 0) {
            tick = 10
            getInBack()
        }
        document.querySelector('.activ_users_graphic_opdateNumber').innerText = tick

        tick--
    }, 310);

    var users = 0

    function drow_active_users(online) {
        let clumnsCount = 30
        if (window.innerWidth < 500)
            clumnsCount = 10

        if (users >= clumnsCount) {
            let parent = document.querySelectorAll('.activ_users_graphic>.range_cont')
            parent[0].remove();
        }

        document.querySelector('.activ_users_count').textContent = online

        let div = document.createElement('div')
        div.className = 'range_cont'
        div.innerHTML = `<div class="range" style=" height:${online}%;"></div>
        <div class='range_num'>${online}</div>`
        document.querySelector('.activ_users_graphic').appendChild(div)

        users++
    }
}

get_all_users()
function get_all_users() {
    fetch('../../backend/get_all_users.php', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(res => {
            drow_all_users_data(res)
        })
        .catch(err => console.error(err));


    function drow_all_users_data(data) {
        data.forEach((user, i) => {
            // name
            let name = document.createElement('div')
            name.className = 'names_cont'
            name.innerHTML = `
            <span class='users_count'>${i}</span>
            <span class="name" style='color:${user[6] != 'man' ? '#ff39ec' : '#ffb700'}'>${user[1]}</span>
            `
            document.getElementById('names_parent_cont').appendChild(name)
            // lastName
            let lastName_cont = document.createElement('div')
            lastName_cont.className = 'lastName_cont'
            lastName_cont.innerHTML = `<span class="name" style='color:${user[6] != 'man' ? '#ff39ec' : '#ffb700'}'>${user[2]}</span>`
            document.getElementById('lastName_parent_cont').appendChild(lastName_cont)
            // email
            let email_cont = document.createElement('div')
            email_cont.className = 'email_cont'
            email_cont.innerHTML = `<span class="name" style='color:${user[6] != 'man' ? '#ff39ec' : '#ffb700'}'>${user[3]}</span>`
            document.getElementById('email_parent_cont').appendChild(email_cont)
            // age
            let age_cont = document.createElement('div')
            age_cont.className = 'age_cont'
            age_cont.innerHTML = `<span class="name" style='color:${user[6] != 'man' ? '#ff39ec' : '#ffb700'}'>${user[5]}</span>`
            document.getElementById('age_parent_cont').appendChild(age_cont)
        })
    }
}