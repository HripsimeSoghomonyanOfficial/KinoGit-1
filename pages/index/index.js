const D = new Date();
const thisMonth = D.toLocaleString('en', { month: 'long' }); // june
const thisYear = D.getFullYear() // 2023

document.getElementById('FullYear').innerText = thisYear

const
    main__section__films = document.getElementById('main__section__films'),
    search_inp = document.getElementById('search_inp'),
    search_btn = document.getElementById('search_btn'),
    categories_cont = document.getElementById('genres__text'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    current = document.getElementById('current'),
    // ----------------------- select genre btn -----------------------
    select = document.querySelectorAll('.select'),
    all__select__arrow = document.querySelectorAll('.select__arrow'),
    genres__popup = document.querySelectorAll('.genres__popup');

let currentPage = 1,
    nextPage = 2,
    prevPage = 3,
    lastUrl = '',
    totalPages = 100,
    selectedGenre = [];

//TMDB themoviedb
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjQwYjY2MjVhZWEwNDcyZTU4ZGE2ZDdkZGMxMmZhZCIsInN1YiI6IjY0N2RlZWFjOTM4MjhlMDBhNzY1OGUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MBEPwwpXitFgjAFw1v_yLu3YhmG39HgHebNjYk1xVb4'
    }
};

let language = 'ru-RU'

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8',
    BASE_URL = 'https://api.themoviedb.org/3',
    API_URL = `${BASE_URL}/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}`,
    IMG_URL = 'https://image.tmdb.org/t/p/w500',
    searchURL = `${BASE_URL}/search/movie?${API_KEY}`;

const
    genres = [
        {
            "id": 28,
            "name": "Боевик"
        },
        {
            "id": 10752,
            "name": "Военный"
        },
        {
            "id": 18,
            "name": "Драма"
        },
        {
            "id": 99,
            "name": "Документальный"
        },
        {
            "id": 27,
            "name": "Ужасы"
        },
        {
            "id": 10402,
            "name": "Музыка"
        },
        {
            "id": 35,
            "name": "Комедия"
        },
        {
            "id": 53,
            "name": "Триллер"
        },
        {
            "id": 14,
            "name": "Фэнтези"
        },
        {
            "id": 9648,
            "name": "Мистика"
        },
        {
            "id": 37,
            "name": "Вестерн"
        },
        {
            "id": 10751,
            "name": "Семейный"
        },
        {
            "id": 16,
            "name": "Мультики"
        },
        {
            "id": 80,
            "name": "Криминал"
        },
        {
            "id": 10749,
            "name": "Романтика"
        },
        {
            "id": 12,
            "name": "Приключения"
        },
        {
            "id": 36,
            "name": "Исторический"
        },
        {
            "id": 878,
            "name": "Научная-фантастика"
        },
        {
            "id": 10770,
            "name": "Телевизионный-фильм"
        },
        {
            "id": "индийские",
            "name": "индийские"
        }
    ],
    countries = [
        {
            'сша': 'en'
        },
        {
            'аргентина': 'ar'
        },
        {
            'бельгия': 'be'
        },
        {
            'венгрия': 'hu'
        },
        {
            'германия': 'de'
        },
        {
            'испания': 'es'
        },
        {
            'италия': 'it'
        },
        {
            'канада': 'ca'
        },
        {
            'китай': 'cn'
        },
        {
            'нидерланды': 'nl'
        },
        {
            'норвегия': 'no'
        },
        {
            'польша': 'pl'
        },
        {
            'россия': 'ru'
        },
        {
            'таиланд': 'th'
        },
        {
            'турция': 'tr'
        },
        {
            'финляндия': 'fi'
        },
        {
            'франция': 'fr'
        },
        {
            'швеция': 'se'
        },
        // {
        //     'австралия': 'au'
        // },
        // {
        //     'армения': 'am'
        // },
        // {
        //     'беларусь': 'by'
        // },
        // {
        //     'бразилия': 'br'
        // },
        // {
        //     'великобритания': 'gb'
        // },
        // {
        //     'гонконг': 'hk'
        // },
        // {
        //     'дания': 'dk'
        // },
        // {
        //     'индия': 'in'
        // },
        // {
        //     'ирландия': 'ie'
        // },
        // {
        //     'казахстан': 'kz'
        // },
        // {
        //     'колумбия': 'co'
        // },
        // {
        //     'мексика': 'mx'
        // },
        // {
        //     'новая зеландия': 'nz'
        // },
        // {
        //     'швейцария': 'ch'
        // },
        // {
        //     'юар': 'za'
        // },
        // {
        //     'южная корея': 'kr'
        // },
        // {
        //     'япония': 'jp'
        // }
    ],
    rating = [
        {
            'Больше 9': 9
        },
        {
            'Больше 8': 8
        },
        {
            'Больше 7': 7
        },
        {
            'Больше 6': 6
        },
        {
            'Больше 5': 5
        },
        {
            'Больше 4': 4
        },
        {
            'Больше 3': 3
        },
        {
            'Больше 2': 2
        },
        {
            'Больше 1': 1
        },
    ];

// top slider movies
let get_top_movies = () => {
    fetch(`${BASE_URL}/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}`, options)
        // slider top 20
        .then(r => r.json())
        .then(r => {
            const swiper_wrapper = document.getElementById('head-swiper-wrapper')

            r.results.forEach(el => {
                const div = document.createElement('div')
                div.className = 'swiper-slide head-swiper-slide'
                div.style = `background-image:url(https://image.tmdb.org/t/p/w500/${el.poster_path})`
                div.href = `pages/watchMovie/watchMovie.html?${el.id}&${el.title}&${el.original_title}&${String(el.release_date).slice(0, 4)}`
                div.innerHTML = `
                    <div class='movie_estimate top_movie_estimate'>
                        <img class='movie_favorite' src="assets/svg/favorite.svg">
                    </div>

					<a href='pages/watchMovie/watchMovie.html?${el.id}&${el.title}&${el.original_title}&${String(el.release_date).slice(0, 4)}' class="allMovie movie head-swiper-wrapper-play-img-cont" id='${el.id}' move_data='${el.title} , ${el.original_title} , ${String(el.release_date).slice(0, 4)}'}>
						<img src="assets/svg/play-icon.svg" alt="play-button">
					</a>

					<div class="head_swiper_info" style="display:none">
                        <span class="head_swiper_info_imgSrc">${((window.innerWidth > 650) ? 'https://image.tmdb.org/t/p/original' : 'http://image.tmdb.org/t/p/w500')}${el.backdrop_path}</span>
                        <h2 class="head_swiper_info_original_title">${el.original_title}</h2>
						<h2 class="head_swiper_info_title">${el.title}</h2>
                        <span class="head_swiper_info_reyting">${String(el.vote_average).slice(0, 3)}</span>
                        <span class="head_swiper_info_data">${el.release_date}</span>
                        <span class="head_swiper_info_id">${el.id}</span>
					</div>`
                swiper_wrapper.appendChild(div)
            })
            setTimeout(() => {
                headSwiper()
                loaderOFF()
            }, 300);
            getTop_move_andPlay()
            get_top_Bookmark_InServer()

            if (localStorage.getItem('page'))
                pageCall()
        })
}
get_top_movies()

// установить Жанр
function setGenre() {
    categories_cont.innerHTML = '';
    let year = 0
    let getcountries = []

    genres.forEach((genre, i) => {
        const t = document.createElement('div');
        t.className = 'genres__text__items';

        if (i <= 18) {
            t.id = genre.id;
            t.innerText = genre.name;
            t.addEventListener('click', () => {
                if (selectedGenre.length == 0) {
                    selectedGenre.push(genre.id)
                } else {
                    if (selectedGenre.includes(genre.id)) {
                        selectedGenre.forEach((id, i) => {
                            if (id == genre.id) {
                                selectedGenre.splice(i, 1)
                            }
                        })
                    } else {
                        selectedGenre.push(genre.id)
                    }
                }
                getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?&primary_release_year=${year ? year : thisYear}&page=${localStorage.getItem('page')}&year=${year ? year : thisYear}&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            })
        } else {
            t.id = genre.id;
            t.innerText = genre.name;
            t.addEventListener('click', () => {
                getMovies(`${searchURL}&query=${genre.id}&language=${language}`)
            })
        }
        categories_cont.append(t);
    })

    const select_year = () => {
        let years = []
        for (let i = 0; i <= 10; i++) {
            years.push(`${thisYear - i - 1} - ${thisYear - i}`)
        }
        years.push('2000 - 2010', '1990 - 2000', '1980 - 1990', 'до - 1980')
        let select__years__popup = document.querySelector('.select__years__popup')
        select__years__popup.innerHTML = ''

        years.forEach((y, index) => {
            let div = document.createElement('div')
            div.className = 'select__years__items'
            div.id = y
            div.textContent = y
            select__years__popup.appendChild(div)

            let select__years__items = document.querySelectorAll(".select__years__items")
            select__years__items[index].addEventListener('click', () => {
                year = 0

                // get id 
                let getYears = select__years__items[index].id.replaceAll(' ', '').split('-')
                year = (String(getYears) !== 'до,1980') ? getYears : getYears[1]

                getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?&page=1&primary_release_date.gte=${year ? year[0] + '-01-01' : thisYear}&primary_release_date.lte=${year ? year[1] + '-12-31' : thisYear}&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            })
        })
    }
    select_year()

    const select_countries = () => {
        let select__countries__popup = document.querySelector('.select__countries__popup')
        select__countries__popup.innerHTML = ''

        countries.forEach((y, index) => {
            let div = document.createElement('div')
            div.className = 'select__countries__items'
            div.id = Object.values(y)
            div.textContent = Object.keys(y)
            select__countries__popup.appendChild(div)

            let select__countries__items = document.querySelectorAll(".select__countries__items")
            select__countries__items[index].addEventListener('click', () => {
                year = 0

                // get id 
                let setCountries = select__countries__items[index].id

                getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?&primary_release_year=${year ? year[0] : thisYear}&page=1&year=${year ? year : thisYear}&with_original_language=${setCountries}&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))

                getcountries.push(setCountries)
            })
        })
    }
    select_countries()

    const select_rating = () => {
        let select__rating__popup = document.querySelector('.select__rating__popup')
        select__rating__popup.innerHTML = ''

        rating.forEach((y, index) => {
            let div = document.createElement('div')
            div.className = 'select__rating__items'
            div.id = Object.values(y)
            div.textContent = Object.keys(y)
            select__rating__popup.appendChild(div)

            let select__rating__items = document.querySelectorAll(".select__rating__items")
            select__rating__items[index].addEventListener('click', () => {

                // get id
                let getrating = select__rating__items[index].id

                getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?&primary_release_year=${year ? year[0] : thisYear}&page=1&year=${year ? year : thisYear}&with_original_language=${getcountries}&vote_average.gte=${getrating}&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            })
        })

    }

    select_rating()
}

select.forEach((el, i) => {
    el.addEventListener('click', () => {
        if (el.classList[2]) {
            document.querySelectorAll('.select')[i].classList.remove('select--active')
            document.querySelectorAll('.select__arrow')[i].classList.remove('select__arrow--active')
            document.querySelectorAll('.genres__popup')[i].classList.remove('genres__popup--active')
        } else {
            select.forEach((e, ind) => {
                document.querySelectorAll('.select')[ind].classList.remove('select--active')
                document.querySelectorAll('.select__arrow')[ind].classList.remove('select__arrow--active')
                document.querySelectorAll('.genres__popup')[ind].classList.remove('genres__popup--active')
            })
            document.querySelectorAll('.select')[i].classList.add('select--active')
            document.querySelectorAll('.select__arrow')[i].classList.add('select__arrow--active')
            document.querySelectorAll('.genres__popup')[i].classList.add('genres__popup--active')
        }
    })
})

// множественный выбор жанор 

const highlightSelection = () => {
    const clear = document.querySelector('.reset__default')
    // очистить кнопкой
    clear.classList.add('reset__default--active');

    clear.addEventListener('click', () => {
        selectedGenre = [];
        getMovies(API_URL);
        localStorage.removeItem('page')
        // delete active
    })
}
highlightSelection()


// получить фильмы
function getMovies(url) {
    return new Promise(resolve => {
        lastUrl = url;
        fetch(url, options).then(res => res.json())
            .then(data => {
                if (data.results.length !== 0) {
                    showMovies(data.results);
                    get_main_Bookmark_InServer()
                    currentPage = data.page;
                    nextPage = currentPage + 1;
                    prevPage = currentPage - 1;
                    totalPages = data.total_pages;

                    pagination(currentPage, totalPages)

                    if (currentPage <= 1) {
                        prev.classList.add('disabled');
                        next.classList.remove('disabled')
                    }
                    else if (currentPage >= totalPages) {
                        prev.classList.remove('disabled');
                        next.classList.add('disabled')
                    }
                    else {
                        prev.classList.remove('disabled');
                        next.classList.remove('disabled')
                    }
                } else {
                    main__section__films.innerHTML = `<h3 class="no-results">No Results Found</h3>`
                }
            })
    })
}
getMovies(API_URL)
// нумерация страниц
function pagination(currentPage, totalPages) {
    current.innerHTML = `
    <span class="pages" id="pages">${currentPage - 4}</span>
    <span class="pages" id="pages">${currentPage - 3}</span>
    <span class="pages" id="pages">${currentPage - 2}</span>
    <span class="pages" id="pages">${currentPage - 1}</span>
    <span class="pages pages-active" id="pages">${currentPage}</span>
    <span class="pages" id="pages">${currentPage + 1}</span>
    <span class="pages" id="pages">${currentPage + 2}</span>
    <span class="pages" id="pages">${currentPage + 3}</span>
    <span class="pages" id="pages">${currentPage + 4}</span>
    `
    document.querySelectorAll('.pages').forEach((el) => {
        if (el.innerText < 1) {
            el.style.display = 'none'
        }
        if (el.innerText > totalPages) {
            el.style.display = 'none'
        }
    })

    pagination_click()
}

// показать фильмы
function showMovies(data) {
    main__section__films.innerHTML = '';

    data.forEach(el => {
        const movieEl = document.createElement('div');
        movieEl.className = 'movie'
        // есле у фильма отсутствует название не показывать фильм
        if (Boolean(el.title) && el.poster_path) {
            movieEl.innerHTML = `
            <div class='movie_estimate main_movie_estimate'>
                <img class='movie_favorite' src="assets/svg/favorite.svg">
            </div>

            <img class='poster-img' src="${IMG_URL + el.poster_path}" alt="${el.title}">
            <a href='pages/watchMovie/watchMovie.html?${el.id}&${el.title}&${el.original_title}&${String(el.release_date).slice(0, 4)}' class="watch__now allMovie" id='${el.id}' move_data='${el.title} ${el.original_title} ${String(el.release_date).slice(0, 4)}/'>
                <img src="assets/svg/play-icon.svg" alt="play-button">
            </a>
            <div class="movie-info">
                <h3 class="movie-info-title movie-title">${el.title}</h3>
                <div class='movie-info-subtitle-cont'>
                    <p class="movie-info-paragraph">${String(el.release_date).slice(0, 4)}</p>
                    <span>${(el.adult == true) ? "Для взрослых 18+" : ""}</span>
                    <span class="movie-info-reyting ${getColor(el.vote_average)}">${String(el.vote_average).slice(0, 3)}</span>
                </div>
            </div>`
            main__section__films.appendChild(movieEl)
        }
    })
    setGenre();
    getTMain_move_andPlay()
}

// получить цвет
function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
}

// serch logic
let serchLogic = () => {
    selectedGenre = [];
    getMovies(searchURL + '&query=' + search_inp.value + `&language=${language}`)
}


// search_btn (click)
search_btn.addEventListener('click', () => {
    if (search_inp.value) {
        serchLogic()
        document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
    }
})

// search_inp (key)
search_inp.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' && search_inp.value)
        serchLogic()
})

// нумерация страниц назад 
prev.addEventListener('click', () => {
    if (prevPage > 0) {
        localStorage.setItem('page', prevPage)
        pageCall();
    }
})

// нумерация страниц вперед 
next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        localStorage.setItem('page', nextPage)
        pageCall();
    }
})

// нумерация страниц
function pagination_click() {
    document.querySelectorAll('#pages').forEach(p => {
        p.addEventListener('click', () => {
            localStorage.setItem('page', p.textContent)
            pageCall()
        })
    })
}

// страница созвать
function pageCall() {
    let page = localStorage.getItem('page')

    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length - 1].split('=');
    if (key[0] != 'page') {
        let url = lastUrl + '&page=' + page
        getMovies(url);
    } else {
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length - 1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b
        getMovies(url);
    }
    document.getElementById('main').scrollIntoView({ behavior: 'smooth' })
}

// get movie and play 
function getTop_move_andPlay() {
    document.querySelectorAll('.head-swiper-wrapper>.swiper-slide>.allMovie').forEach(el => {
        el.addEventListener('click', () => {
            fetch('../../backend/historyWatch.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(el.id)
            })
                .then(r => r.json())
                .then(arr => {
                    // console.log('ok -> ', arr);
                })
                .catch(err => {
                    console.error('error -> ', err);
                });
        })
    })
}
function getTMain_move_andPlay() {
    document.querySelectorAll('.main__section__films>.movie>.allMovie').forEach(el => {
        el.addEventListener('click', () => {
            fetch('../../backend/historyWatch.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(el.id)
            })
                .then(r => r.json())
                .then(arr => {
                    // console.log('ok -> ', arr);
                })
                .catch(err => {
                    console.error('error -> ', err);
                });
        })
    })
}

// ------------------
document.getElementById('top_movies').addEventListener('click', () => {
    getMovies(`https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=${language}?language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${thisYear}-01-01`)
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
})

document.getElementById('animation').addEventListener('click', () => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=16`)
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
})

document.getElementById('action').addEventListener('click', () => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=28`)
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
})

document.getElementById('comedy').addEventListener('click', () => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=35`)
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
})

document.getElementById('family').addEventListener('click', () => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=10751`)
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
})

// --------- send one id 015131 ------------
function get_top_Bookmark_InServer() {
    document.querySelectorAll('.top_movie_estimate').forEach(el => {
        el.addEventListener('click', () => {
            fetch('../../backend/bookmark.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(el.parentElement.querySelector('.allMovie').id)
            })
                .then(r => r.json())
                .then(arr => {
                    // console.log('ok -> ', arr);
                    if (arr.registered) {
                        el.classList.toggle('movie_estimate--active')

                        document.querySelectorAll('.main__section__films>.movie>.allMovie').forEach(el2 => {
                            if (el2.id == el.parentElement.querySelector('.allMovie').id) {
                                el2.parentElement.querySelector('.movie_estimate').classList.toggle('movie_estimate--active')
                            }
                        })
                    } else {
                        document.querySelector('.reg_popup').style.display = 'flex'
                    }
                })
                .catch(err => {
                    console.error('error -> ', err);
                });
        })
    });
}

function get_main_Bookmark_InServer() {

    document.querySelectorAll('.main_movie_estimate').forEach(el => {
        el.addEventListener('click', () => {
            fetch('../../backend/bookmark.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(el.parentElement.querySelector('.allMovie').id)
            })
                .then(r => r.json())
                .then(arr => {
                    // console.log('ok -> ', arr);
                    if (arr.registered) {
                        el.classList.toggle('movie_estimate--active')

                        document.querySelectorAll('.head-swiper-slide>.allMovie').forEach(el2 => {
                            if (el2.id == el.parentElement.querySelector('.allMovie').id) {
                                el2.parentElement.querySelector('.movie_estimate').classList.toggle('movie_estimate--active')
                            }
                        })
                    } else {
                        document.querySelector('.reg_popup').style.display = 'flex'
                    }
                })
                .catch(err => {
                    console.error('error -> ', err);
                });
        })
    });
}

const get_favorite = () => {
    fetch('../../backend/get_bookmark.php', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', }
    })
        .then(r => r.json())
        .then(res => {
            if (res.length) {
                res.forEach(el => {
                    document.querySelectorAll('.allMovie').forEach(movID => {
                        if (movID.id == el[1]) {
                            movID.parentElement.querySelector('.movie_estimate').classList.add('movie_estimate--active')
                        }
                    });
                });
            }
        })
        .catch(err => console.error('error -> ', err))
}

// reg_popup_account
const reg_popup_account_close = () => {
    document.getElementById('reg_popup_account_close').addEventListener('click',()=>{
        document.getElementById('reg_popup_account').style.cssText='display:none'
    })

    document.getElementById('reg_popup_account_registration').addEventListener('click',()=>{
        document.querySelector('.reg_popup').style.cssText='display:flex'
    })
}

// ________________________________________________________________________________________________
// loader off
function loaderOFF() {
    document.querySelector('.loader').style.opacity = '0'
    window.scrollTo(0, 0)

    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none'
        get_favorite()
    }, 700)
}