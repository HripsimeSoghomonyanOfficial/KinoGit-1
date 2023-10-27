const D = new Date();
const thisMonth = D.toLocaleString('en', { month: 'long' }); // june
const thisYear = D.getFullYear() // 2023

document.getElementById('FullYear').innerText = thisYear

const search__films__cont = document.getElementById('search__films__cont');
const search_inp = document.getElementById('search_inp');
const search_btn = document.getElementById('search_btn');
const categories_cont = document.getElementById('categories');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = '';
let totalPages = 100;

//TMDB themoviedb
// ------------------

let language = 'ru-RU'

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&` + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + `/search/movie?` + API_KEY;
const genres = [
    {
        "id": 12,
        "name": "приключения"
    },
    {
        "id": 14,
        "name": "фантастика"
    },
    {
        "id": 16,
        "name": "анимация"
    },
    {
        "id": 18,
        "name": "драма"
    },
    {
        "id": 27,
        "name": "ужасы"
    },
    {
        "id": 28,
        "name": "боевик"
    },
    {
        "id": 35,
        "name": "комедия"
    },
    {
        "id": 36,
        "name": "история"
    },
    {
        "id": 37,
        "name": "вестерн"
    },
    {
        "id": 53,
        "name": "триллер"
    },
    {
        "id": 80,
        "name": "криминал"
    },
    {
        "id": 99,
        "name": "документальный фильм"
    },
    {
        "id": 878,
        "name": "научная фантастика"
    },
    {
        "id": 9648,
        "name": "детектив"
    },
    {
        "id": 10402,
        "name": "музыка"
    },
    {
        "id": 10751,
        "name": "семейный"
    },
    {
        "id": 10752,
        "name": "война"
    },
    {
        "id": 10749,
        "name": "романтика"
    },
    {
        "id": 10770,
        "name": "телефильм"
    },
]
// -----------------
function get_top_movies() {
    fetch(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&` + API_KEY)
        // slider top 20
        .then(r => r.json())
        .then(r => {
            let films = r.results
            const swiper_wrapper = document.getElementById('head-swiper-wrapper')

            films.forEach(el => {
                const div = document.createElement('div')
                div.className = 'movie swiper-slide head-swiper-slide'
                div.style = `background-image:url(https://image.tmdb.org/t/p/w500/${el.poster_path})`
                div.innerHTML = `
                    <div class='movie_estimate'>
                        <img class='movie_favorite' src='../../assets/svg/favorite.svg'>
                    </div>
            
					<div class="head-swiper-wrapper-play-img-cont allMovie" id='${el.id}' move_data='${el.title} , ${el.original_title} , ${String(el.release_date).slice(0, 4)}'>
						<img src="../../assets/svg/play-icon.svg" alt="play-button">
					</div>

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
            headSwiper()
            get_Watch_Move_andPlay()
        })
        .catch(err => console.error(err));
}

search_btn.addEventListener('click', () => {

    const searchTerm = search_inp.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm + `&language=${language}`)
    } else {
        getMovies(API_URL);
    }
})

search_inp.addEventListener('keydown', () => {
    const searchTerm = search_inp.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm + `&language=${language}?language=en-EN`)
    } else {
        getMovies(API_URL);
    }
})

function getMovies(url) {
    lastUrl = url;

    fetch(url).then(res => res.json()).then(data => {

        if (data.results.length !== 0) {
            showMovies(data.results);
            get_Watch_Move_andPlay()
        } else {
            search__films__cont.innerHTML = `<h3 class="no-results">No Results Found</h3>`
        }
    })
}

function showMovies(data) {
    search__films__cont.innerHTML = '';

    data.forEach(el => {
        const movieEl = document.createElement('div');
        movieEl.className = 'movie'
        movieEl.id = el.id
        movieEl.setAttribute('move_data', `${el.title} ${el.original_title} ${String(el.release_date).slice(0, 4)}/`)
        // есле у фильма отсутствует название не показывать фильм ???
        if (Boolean(el.title) && el.poster_path) {
            movieEl.innerHTML = `
            <div class="watch__now">
                <img src="${IMG_URL + el.poster_path}" alt="${el.title}">
            </div>

            <div class="movie-info">
                <h3 class="movie-info-title movie-title">${el.title}</h3>
                <p class="movie-info-paragraph">${String(el.release_date).slice(0, 4)}</p>
            </div>
            `
            search__films__cont.appendChild(movieEl);
        }
    })
}

function showPoster_andData() {
    let movieUrl = decodeURI(window.location.search)
    let get_id = movieUrl.slice(4, movieUrl.indexOf('&'))

    fetch(`${BASE_URL}/movie/${get_id}?language=${language}&` + API_KEY)
        .then(response => response.json())
        .then(R => {
            function reytingStars() {
                for (let i = 0; i < 10; i++) {
                    let span = document.createElement('span')
                    span.className = 'reyting_stars'
                    document.querySelector('.reyting_stars_cont').appendChild(span)

                    if (i <= Math.round(R.vote_average)) {
                        document.querySelectorAll('.reyting_stars')[i].style.cssText = 'background-color: yellow'
                    }
                }
            }
            let about_film = document.getElementById('about_film')
            about_film.style.cssText = `background-image: url(${'https://image.tmdb.org/t/p/original/' + R.backdrop_path})`
            about_film.innerHTML = `
            <h2 class="about_film_info_title">${R.title.replace(':', '<br>')}</h2>
            <div class="about_film_cont">
                    <div class="about_film_poster">
                        <img id="about_film_poster_img" src="${IMG_URL + R.poster_path}" alt="${R.title}">
                    </div>

                    <div class="about_film_info">
                        <p class="about_film_info_release_date">
                            <span>год выпуска - </span>
                            <span>${R.release_date.replace(/-/g, " / ")}</span>
                        </p>

                        <p class="about_film_info_genres">
                            <span>Жанр - </span>
                            <span>${R.genres.map(el => (' ' + el.name))}</span>
                        </p>

                        <p class="about_film_info_genres_vote_average" id='about_film_info_genres_vote_average'>
                            <span>рейтинг TMDB - </span>
                            <span class='reyting_stars_cont'></span>
                        </p>

                        <p class="about_film_info_runtime">
                            <span>длительность фильма - </span>
                            <span>${R.runtime} мин.</span>
                        </p>

                        <p class="about_film_info_overview">${R.overview}</p>
                    </div>
            </div>`
            reytingStars()
            show_recomendet_films(R)
            watch_thriller(get_id, R)
        })
        .catch(err => console.error(err));
}

// triller
function watch_thriller(id, R) {
    let arr = ['no resalt']

    fetch(`${BASE_URL}/movie/${id}/videos?${API_KEY}`).then(res => res.json())
        .then(videoData => {
            const el = videoData.results

            for (let i = 0; i < el.length; i++) {
                arr.unshift(`<iframe allow="fullscreen;" src="https://www.youtube.com/embed/${el[i].key}?controls=1&autoplay='0'&loop='0'&playlist=${el[i].key}&showinfo='0'&mute='0'&frameborder='0'" title="${R.original_title}"></iframe>`)
                document.getElementById('triller').innerHTML = arr[0]
                if (R.original_title && (String(R.original_title).toLocaleLowerCase()).match('final trailer') || (String(R.original_title).toLocaleLowerCase()).match('official trailer'))
                    break
            }
        })
        .catch(e => console.log(e))
}

document.getElementById('top_movies').addEventListener('click', (e) => {
    getMovies(`https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=${language}?language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${thisYear}-01-01`)
    click_js()
})

document.getElementById('animation').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=16`)
    click_js()
})

document.getElementById('action').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=28`)
    click_js()
})

document.getElementById('comedy').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=35`)
    click_js()
})

document.getElementById('Family').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=10751`)
    click_js()
})

function click_js() {
    let search_input = document.getElementById('search_inp')
    let search = document.getElementById('search')
    let search_buttone = document.getElementById('search_btn')

    search.classList.add('search-anime-inp')
    search_close.classList.add('search-anime-close')
    search_buttone.classList.add('search-btn-active')
    search.offsetWidth < 50 ? search_input.focus() : false;
    search_input.value = ''

    if (document.getElementById('search__films__cont')) {
        search__films__cont.innerHTML = ''
    }
}

function get_Watch_move_info_cont() {
    document.querySelector('.move_info_cont_play').addEventListener('click', () => {
        let el = document.querySelector('.move_info_cont_play')
        // get data
        let move_data = el.getAttribute('move_data')
        let move_id = el.getAttribute('id')
        console.log(move_data);
        console.log(move_id);

        // save in localStorage
        localStorage.setItem("move_data", `${move_data}`)
        localStorage.setItem("move_id", `${move_id}`)

        // location
        window.location.href = '../../pages/watchMovie/watchMovie.html'
    })
}

function show_recomendet_films(R) {
    let selectedGenre = []
    genres.forEach(el => {
        R.genres.forEach(el2 => {
            if (el.name === el2.name)
                selectedGenre.push(el2.id)
        })
    })
    // selectedGenre
    recomendet_movies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))
}

function get_Watch_Move_andPlay() {
    document.querySelectorAll('.allMovie').forEach(el => {
        el.addEventListener('click', () => {
            // get data
            let move_data = el.getAttribute('move_data')
            let move_id = el.getAttribute('id')

            // save in localStorage
            localStorage.setItem("move_data", `${move_data}`);
            localStorage.setItem("move_id", `${move_id}`);

            // location
            window.location.href = '../../pages/watchMovie/watchMovie.html';
        })
    })
}


function recomendet_movies(url) {
    fetch(url).then(res => res.json()).then(data => {

        if (data.results.length !== 0) {
            data.results.forEach(el => {
                let movieEl = document.createElement('div');
                movieEl.className = 'movie swiper-slide recomendet-films-items'
                // есле у фильма отсутствует название не показывать фильм ???
                if (Boolean(el.title) && el.poster_path) {
                    movieEl.innerHTML = `
                        <div class='movie_estimate'>
                            <img class='movie_favorite' src='../../assets/svg/favorite.svg'>
                        </div>

                        <div class="watch__now allMovie" id='${el.id}' move_data='${el.title} , ${el.original_title} , ${String(el.release_date).slice(0, 4)}'>
                            <img src="${IMG_URL + el.poster_path}" alt="${el.title}">
                        </div>

                        <div class="movie-info">
                            <h3 class="movie-info-title movie-title">${el.title.replace(':', '<br>')}</h3>
                            <p class="movie-info-paragraph">${String(el.release_date).slice(0, 4)}</p>
                        </div>`
                    document.getElementById('recomendet_films').appendChild(movieEl);
                }
            })
        }
        recomendet_films_Swiper()
        get_Watch_Move_andPlay()
    })
}

window.addEventListener('scroll', () => {
    if (scrollY > 500) {
        document.getElementById('arrow_to_top').style.cssText = 'right:20px'
    } else {
        document.getElementById('arrow_to_top').style.cssText = 'right:-60px'
    }
})

document.getElementById('arrow_to_top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})

// loader off
setTimeout(() => {
    get_top_movies()
    showPoster_andData()
    get_Watch_Move_andPlay()
}, 1000);