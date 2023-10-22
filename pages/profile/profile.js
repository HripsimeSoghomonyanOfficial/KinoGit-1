// get user info
function get_user_info() {
    fetch('../../backend/profile.php')
        .then(r => r.json())
        .then(data => {
            document.getElementById('_nameSurname').textContent = `${data.name} ${data.surname}`
            document.getElementById('_mail').textContent = `${data.email}`
            document.getElementById('_birthday').textContent = `${data.age.replaceAll('-', ' / ')}`
        })
        .catch(err => console.log(err))
}

function get_user_history(arr) {
    fetch(`${arr}`)
        .then(r => r.json())
        .then(r => {
            let newArr = r.results
            newArr.forEach(res => {
                let swiperSlide = document.createElement('div')
                swiperSlide.className = 'swiper-slide'
                swiperSlide.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w500${res.poster_path}">
                        <p>${res.title.slice(0, res.title.indexOf(':'))}</p>
                        `
                document.getElementById('swiperWrapperHistory').appendChild(swiperSlide)
            });
            swipperInti()
        });
}

function get_user_favorite(arr) {
    fetch(`${arr}`)
        .then(r => r.json())
        .then(r => {
            let newArr = r.results
            newArr.forEach(res => {
                let swiperSlide = document.createElement('div')
                swiperSlide.className = 'swiper-slide'
                swiperSlide.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w500${res.poster_path}">
                        <p>${res.title.slice(0, res.title.indexOf(':'))}</p>
                        `
                document.getElementById('swiperFavorite').appendChild(swiperSlide)
            });
            swipperInti()
        });
}

function swipperInti() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        // autoplay:true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            340: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            700: {
                slidesPerView: 4,
            },
            800: {
                slidesPerView: 5,
            },
            900: {
                slidesPerView: 6,
            },
            1050: {
                slidesPerView: 7,
            },
            1450: {
                slidesPerView: 9,
            },
            1900: {
                slidesPerView: 10,
            },
            2100: {
                slidesPerView: 11,
            },
            2400: {
                slidesPerView: 13,
            },
        }
    });
}
// get_user_info()
get_user_history('https://api.themoviedb.org/3/discover/movie?language=ru-RU?language=en-EN?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8')
get_user_favorite('https://api.themoviedb.org/3/discover/movie?language=ru-RU?language=en-EN?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8')