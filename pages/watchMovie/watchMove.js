// loader off
function loaderOFF() {
    document.querySelector('.loader').style.opacity = '0'
    document.getElementById('about_film').scrollIntoView()

    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none'
        // get_favorite()
    }, 700)
}

const D = new Date();
const thisMonth = D.toLocaleString('en', { month: 'long' }); // june
const thisYear = D.getFullYear() // 2023

// meta attributes add
document.getElementById('meta_keywords').setAttribute('content', 'смотреть фильмы, фильмы онлайн, смотреть ТВ, ТВ онлайн, сериалы онлайн, смотреть сериалы, транслировать фильмы, транслировать сериалы, стриминг онлайн, смотреть онлайн, фильмы, смотреть фильмы Армения, смотреть ТВ онлайн, без загрузки, полнометражные фильмы,' + thisYear)
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

// TMDB themoviedb

let language = 'language=ru-RU?language=en-EN',
    movie = 'movie'
if (decodeURI(window.location.href).split('/')[4].split(' ').join('') == 'tv')
    movie = 'tv'

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8',
    BASE_URL = 'https://api.themoviedb.org/3',
    API_URL = `${BASE_URL}/discover/multi?${language}?sort_by=popularity.desc&${API_KEY}`,
    IMG_URL = 'https://image.tmdb.org/t/p/w500',
    searchURL = `${BASE_URL}/search/${movie}?${API_KEY}`;


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
setTimeout(() => {
    get_top_movies()
}, 1000);
function get_top_movies() {
    fetch(BASE_URL + `/discover/${movie}?${language}?sort_by=popularity.desc&` + API_KEY)
        // slider top 20
        .then(r => r.json())
        .then(r => {
            const swiper_wrapper = document.getElementById('head-swiper-wrapper')
            r.results.forEach(el => {
                let
                    title = el.title,
                    original_title = el.original_title,
                    release_date = el.release_date
                if (movie == 'tv') {
                    title = el.name
                    original_title = el.original_name
                    release_date = el.first_air_date
                }

                let AllData = String(el.id + '/' + title + '/' + original_title + '/' + release_date.split('-')[0]).replaceAll("'", '') + `/${movie}`

                const div = document.createElement('div')
                div.className = 'movie swiper-slide head-swiper-slide'
                div.style = `background-image:url(https://image.tmdb.org/t/p/w500/${el.poster_path})`
                div.innerHTML = `
                    <div class='movie_estimate top_movie_estimate'>
                        <img class='movie_favorite' src='../../assets/svg/favorite.svg'>
                    </div>
            
                    <a href="watchMovie.html?${AllData}" class="head-swiper-wrapper-play-img-cont allMovie" id="${el.id + '_' + movie}" move_data="${title} , ${original_title} , ${parseInt(release_date.split('-')[0])}">
						<img src="../../assets/svg/play-icon.svg" alt="play-button">
					</a>

					<div class="head_swiper_info" style="display:none">
                    <span class="head_swiper_info_imgSrc">${((window.innerWidth > 650) ? 'https://image.tmdb.org/t/p/original' : 'http://image.tmdb.org/t/p/w500')}${el.backdrop_path}</span>
                        <h2 class="head_swiper_info_original_title">${original_title}</h2>
						<h2 class="head_swiper_info_title">${title}</h2>
                        <span class="head_swiper_info_reyting">${String(el.vote_average).slice(0, 3)}</span>
                        <span class="head_swiper_info_data">${release_date}</span>
                        <span class="head_swiper_info_id">${el.id}</span>
					</div>`
                swiper_wrapper.appendChild(div)
            })

            showPoster_andData()
            headSwiper()
            // getTop_move_andPlay()

            setTimeout(() => {
                // get_top_Bookmark_InServer()
                loaderOFF()
            }, 700);
        })
        .catch(err => console.error(err));
}

// serch logic
let serchLogic = () => {
    const filterText = ['sexs', 'porn', 'porno', 'порно', 'порн', 'секс'];

    for (const t of filterText) {
        if (t === search_inp.value) {
            alert('так нельзя!!');
            search_inp.value = ''
            search__films__cont.innerHTML = ''
            return; // Этот return прерывает выполнение кода после alert
        }
    }

    selectedGenre = [];
    getMovies(searchURL + '&query=' + search_inp.value + `&${language}`);
}

search_btn.addEventListener('click', () => {
    serchLogic()
})

search_inp.addEventListener('keyup', () => {
    serchLogic()
})


function getMovies(url) {
    lastUrl = url;

    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        if (data.results.length !== 0) {
            showMovies(data.results);
        } else {
            search__films__cont.innerHTML = `<h3 class="no-results">No Results Found</h3>`
        }
    })
}

function showMovies(data) {
    search__films__cont.innerHTML = '';

    data.forEach(el => {
        let
            title = el.title,
            original_title = el.original_title,
            release_date = el.release_date

        if (movie == 'tv') {
            title = el.name
            original_title = el.original_name
            release_date = el.first_air_date
        }

        let AllData = String(el.id + '/' + title + '/' + original_title + '/' + release_date.split('-')[0]).replaceAll("'", '') + `/${movie}`

        const a = document.createElement('a');
        a.href = `watchMovie.html?${AllData}`
        a.className = 'movie'
        a.id = el.id
        a.setAttribute('move_data', `${String(title + ' ' + original_title + ' ' + release_date.split('-')[0]).replaceAll("'", '')}`)
        // есле у фильма отсутствует название не показывать фильм ???
        if (Boolean(title) && el.poster_path) {
            a.innerHTML = `
            <div class="watch__now">
                <img src="${IMG_URL + el.poster_path}" alt="${title}">
            </div>

            <div class="movie-info">
                <h3 class="movie-info-title movie-title">${title}</h3>
                <p class="movie-info-paragraph">${parseInt(release_date.split('-')[0])}</p>
            </div>
            `
            search__films__cont.appendChild(a);
        }
    })
}

function showPoster_andData() {
    let movieUrl = decodeURI(window.location.search)
    let get_move_data = movieUrl.slice(1, movieUrl.length).split('/')
    let move_id = get_move_data[0]
    // let move_data = get_move_data[1].concat(' ,', get_move_data[2], ' ,', get_move_data[3])
    fetch(`${BASE_URL}/${movie}/${move_id}?${API_KEY}&${language}`)
        .then(response => response.json())
        .then(R => {
            if (R.status_message) {
                // document.querySelector('.showMassag').classList.add('showMassag-active')
                // document.querySelector('.showMassag_wrap').textContent = 'изевените за неудобство, мы работаем над этим попробуйте позже'
                console.log('status -> ', 'undefined movie');

                document.querySelector('.recomendet-films-cont').style.display = 'none'
            } else {
                console.log('status -> ', 'ok');
            }
            let
                title = '',
                original_title = '',
                release_date = '';

            if (movie == 'tv') {
                title = R.name
                original_title = R.original_name
                release_date = R.first_air_date
            } else {
                title = R.title
                original_title = R.original_title
                release_date = R.release_date
            }

            function reytingStars() {
                for (let i = 0; i < 10; i++) {
                    let span = document.createElement('span')
                    span.className = 'reyting_stars'
                    document.querySelector('.about_film_reyting_stars_cont').appendChild(span)

                    if (i <= Math.round(R.vote_average)) {
                        document.querySelectorAll('.reyting_stars')[i].style.cssText = 'background-color: yellow'
                    }
                }
            }
            let about_film = document.getElementById('about_film')
            about_film.style.cssText = `background-image: url(${'https://image.tmdb.org/t/p/original/' + R.backdrop_path})`

            about_film.innerHTML = `
                <h2 class="about_film_info_title">${title.replace(':', '<br>')}</h2>
                <div class="about_film_cont">
                    <div class="about_film_poster">
                        <img id="about_film_poster_img" src="${IMG_URL + R.poster_path}" alt="${title}">
                    </div>

                    <div class="about_film_info">
                        <p class="about_film_info_release_date">
                            <span>год выпуска - </span>
                            <span>${release_date.replace(/-/g, " / ")}</span>
                        </p>

                        <p class="about_film_info_genres">
                            <span>Жанр - </span>
                            <span>${R.genres.map(el => (' ' + el.name))}</span>
                        </p>

                        <p class="about_film_info_genres_vote_average" id='about_film_info_genres_vote_average'>
                            <span>рейтинг TMDB - </span>
                            <span class='reyting_stars_cont about_film_reyting_stars_cont'></span>
                        </p>

                        <p class="about_film_info_runtime">
                            <span>длительность фильма - </span>
                            <span>${R.runtime} мин.</span>
                        </p>

                        <p class="about_film_info_overview">${R.overview}</p>
                    </div>
                </div>`
            setTimeout(() => {
                if (!R.runtime) document.querySelector('.about_film_info_runtime').style.display = 'none'
            }, 0);

            reytingStars()
            show_recomendet_films(R)
            watch_thriller(move_id, R)
        })
        .catch(err => console.error(err));
}

// triller
function watch_thriller(id, R) {
    let arr = ['no resalt']

    fetch(`${BASE_URL}/${movie}/${id}/videos?${API_KEY}`)
        .then(res => res.json())
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

// function getTop_move_andPlay() {
//     document.querySelectorAll('.head-swiper-slide>.allMovie').forEach(el => {
//         el.addEventListener('click', () => {
//             fetch('../../backend/historyWatch.php', {
//                 method: 'post',
//                 headers: { 'Content-Type': 'application/json', },
//                 body: JSON.stringify(el.id)
//             })
//                 .then(r => r.json())
//                 .then(arr => {
//                     // console.log('ok -> ', arr);
//                 })
//                 .catch(err => {
//                     console.error('error -> ', err);
//                 });
//         })
//     })
// }

// function getTMain_move_andPlay() {
//     document.querySelectorAll('.recomendet-films-items>.allMovie').forEach(el => {
//         el.addEventListener('click', () => {
//             fetch('../../backend/historyWatch.php', {
//                 method: 'post',
//                 headers: { 'Content-Type': 'application/json', },
//                 body: JSON.stringify(el.id)
//             })
//                 .then(r => r.json())
//                 .then(arr => {
//                     // console.log('ok -> ', arr);
//                 })
//                 .catch(err => {
//                     console.error('error -> ', err);
//                 });
//         })
//     })
// }

document.getElementById('top_movies').addEventListener('click', (e) => {
    getMovies(`https://api.themoviedb.org/3/discover/${movie}?${API_KEY}&${language}&page=1&sort_by=popularity.desc&primary_release_date.gte=${thisYear}-01-01` + '&without_genres=16')
    click_js()
})

document.getElementById('animation').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/${movie}?${language}?sort_by=popularity.desc&${API_KEY}&with_genres=16`)
    click_js()
})

document.getElementById('action').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/${movie}?${language}?sort_by=popularity.desc&${API_KEY}&with_genres=28` + '&without_genres=16')
    click_js()
})

document.getElementById('comedy').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/${movie}?${language}?sort_by=popularity.desc&${API_KEY}&with_genres=35` + '&without_genres=16')
    click_js()
})

document.getElementById('Family').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/${movie}?${language}?sort_by=popularity.desc&${API_KEY}&with_genres=10751` + '&without_genres=16')
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

function show_recomendet_films(R) {
    let selectedGenre = []
    genres.forEach(el => {
        R.genres.forEach(el2 => {
            if (el.name === el2.name)
                selectedGenre.push(el2.id)
        })
    })
    // selectedGenre
    recomendet_movies(BASE_URL + `/discover/${movie}?${language}?sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))
}

function recomendet_movies(url) {
    fetch(url).then(res => res.json()).then(data => {

        if (data.results.length != 0) {
            data.results.forEach(el => {

                let
                    title = el.title,
                    original_title = el.original_title,
                    release_date = el.release_date

                if (movie == 'tv') {
                    title = el.name
                    original_title = el.original_name
                    release_date = el.first_air_date
                }

                let AllData = String(el.id + '/' + title + '/' + original_title + '/' + release_date.split('-')[0]).replaceAll("'", '') + `/${movie}`

                let div = document.createElement('div');
                div.className = 'movie swiper-slide recomendet-films-items'
                // есле у фильма отсутствует название не показывать фильм ???
                if (Boolean(title) && el.poster_path) {
                    div.innerHTML = `
                        <div class='movie_estimate recomendet_films_movie_estimate'>
                            <img class='movie_favorite' src='../../assets/svg/favorite.svg'>
                        </div>

                        <a href="watchMovie.html?${AllData}" class="watch__now allMovie" id="${el.id + '_' + movie}" move_data="${String(title + ' ' + original_title + ' ' + release_date.split('-')[0]).replaceAll("'", '')}">
                            <img src="${IMG_URL + el.poster_path}" alt="${title}">
                        </a>

                        <div class="movie-info">
                            <h3 class="movie-info-title movie-title">${title.replace(':', '<br>')}</h3>
                            <p class="movie-info-paragraph">${parseInt(release_date.split('-')[0])}</p>
                        </div>`
                    document.getElementById('recomendet_films').appendChild(div);
                }

            })
        }

        setTimeout(() => {
            recomendet_films_Swiper()
        }, 1000);

        // get_recomendet_films_Bookmark_InServer()
        // getTMain_move_andPlay()
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

// --------- send one id 015131 ------------
// function get_top_Bookmark_InServer() {
//     // ------------ get all favorite -----------
//     fetch('../../backend/get_bookmark.php', {
//         method: 'get',
//         headers: { 'Content-Type': 'application/json', }
//     })
//         .then(r => r.json())
//         .then(res => {
//             if (res.registered) {
//                 res.forEach(el => {
//                     document.querySelectorAll('.allMovie').forEach(movID => {
//                         if (movID.id == el[1]) {
//                             movID.parentElement.querySelector('.movie_estimate').classList.add('movie_estimate--active')
//                         }
//                     });
//                 });
//             }
//         })
//         .catch(err => console.error('error -> ', err))
//     // -----------------------------------------

//     document.querySelectorAll('.top_movie_estimate').forEach(el => {
//         el.addEventListener('click', () => {
//             fetch('../../backend/bookmark.php', {
//                 method: 'post',
//                 headers: { 'Content-Type': 'application/json', },
//                 body: JSON.stringify(el.parentElement.querySelector('.allMovie').id)
//             })
//                 .then(r => r.json())
//                 .then(res => {
//                     // console.log('ok -> ', res);
//                     if (res.registered) {
//                         el.classList.toggle('movie_estimate--active')

//                         document.querySelectorAll('.recomendet-films>.movie>.allMovie').forEach(el2 => {
//                             if (el2.id == el.parentElement.querySelector('.allMovie').id) {
//                                 el2.parentElement.querySelector('.movie_estimate').classList.toggle('movie_estimate--active')
//                             }
//                         })
//                     } else {
//                         document.querySelector('.reg_popup').style.display = 'flex'
//                     }
//                 })
//                 .catch(err => {
//                     console.error('error -> ', err);
//                 })
//         })
//     })
// }

// function get_recomendet_films_Bookmark_InServer() {

//     document.querySelectorAll('.recomendet_films_movie_estimate').forEach(el => {
//         el.addEventListener('click', () => {
//             let movieUrl = decodeURI(window.location.search.split('/')[4])

//             fetch('../../backend/bookmark.php', {
//                 method: 'post',
//                 headers: { 'Content-Type': 'application/json', },
//                 body: JSON.stringify(el.parentElement.querySelector('.allMovie').id)
//             })
//                 .then(r => r.json())
//                 .then(res => {
//                     // console.log('ok -> ', res);
//                     if (res.registered) {
//                         el.classList.toggle('movie_estimate--active')

//                         document.querySelectorAll('.head-swiper-wrapper>.movie>.allMovie').forEach(el2 => {
//                             if (el2.id == el.parentElement.querySelector('.allMovie').id) {
//                                 el2.parentElement.querySelector('.movie_estimate').classList.toggle('movie_estimate--active')
//                             }
//                         })
//                     } else {
//                         document.querySelector('.reg_popup').style.display = 'flex'
//                     }
//                 })
//                 .catch(err => {
//                     console.error('error -> ', err);
//                 });
//         })
//     });
// }

// const get_favorite = () => {
//     fetch('../../backend/get_bookmark.php', {
//         method: 'get',
//         headers: { 'Content-Type': 'application/json', }
//     })
//         .then(r => r.json())
//         .then(res => {
//             if (res.length) {
//                 res.forEach(el => {
//                     document.querySelectorAll('.allMovie').forEach(movID => {
//                         if (movID.id == el[1]) {
//                             movID.parentElement.querySelector('.movie_estimate').classList.add('movie_estimate--active')
//                         }
//                     });
//                 });
//             }
//         })
//         .catch(err => console.error('error -> ', err))
// }

// reg_popup_account


document.getElementById('reg_popup_account_close').addEventListener('click', () => {
    document.getElementById('reg_popup_account').style.cssText = 'display:none'
})

document.getElementById('reg_popup_account_registration').addEventListener('click', () => {
    document.querySelector('.reg_popup').style.cssText = 'display:flex'
})