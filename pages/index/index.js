const D = new Date();
const thisMonth = D.toLocaleString('en', { month: 'long' }); // june
const thisYear = D.getFullYear() // 2023

document.getElementById('FullYear').innerText = thisYear

const main__section__films = document.getElementById('main__section__films'),
    search_inp = document.getElementById('search_inp'),
    search_btn = document.getElementById('search_btn'),
    categories_cont = document.getElementById('categories'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    current = document.getElementById('current');

let currentPage = 1,
    nextPage = 2,
    prevPage = 3,
    lastUrl = '',
    totalPages = 100,
    selectedGenre = [];

//TMDB themoviedb

let language = 'ru-RU'

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8',
    BASE_URL = 'https://api.themoviedb.org/3',
    API_URL = `${BASE_URL}/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}`,
    IMG_URL = 'https://image.tmdb.org/t/p/w500',
    searchURL = `${BASE_URL}/search/movie?${API_KEY}`,
    genres = [
        {
            "id": 12,
            "name": "Приключение"
        },
        {
            "id": 14,
            "name": "Фантастика"
        },
        {
            "id": 16,
            "name": "Мультфильмы"
        },
        {
            "id": 18,
            "name": "Драмы"
        },
        {
            "id": 27,
            "name": "Ужасы"
        },
        {
            "id": 28,
            "name": "Популярные боевики"
        },
        {
            "id": 35,
            "name": "комедии"
        },
        {
            "id": 36,
            "name": "Исторические"
        },
        {
            "id": 37,
            "name": "вестерны"
        },
        {
            "id": 53,
            "name": "Триллеры"
        },
        {
            "id": 80,
            "name": "Криминал"
        },
        {
            "id": 99,
            "name": "Документальные"
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
            "name": "Музыкальные"
        },
        {
            "id": 10751,
            "name": "Семейные"
        },
        {
            "id": 10752,
            "name": "Военные"
        },
        {
            "id": 10749,
            "name": "романтические"
        },
        {
            "id": 10770,
            "name": "Телефильм"
        },
    ];

// top slider movies
get_top_movies()
function get_top_movies() {
    fetch(`${BASE_URL}/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}`)
        // slider top 20
        .then(r => r.json())
        .then(r => {
            let films = r.results
            const swiper_wrapper = document.getElementById('head-swiper-wrapper')

            films.forEach(el => {
                const div = document.createElement('div')
                div.className = 'swiper-slide head-swiper-slide'
                div.style = `background-image:url(https://image.tmdb.org/t/p/w500/${el.poster_path})`
                div.innerHTML = `
                    <div class='movie_estimate'>
                        <img class='movie_favorite' src='../../assets/svg/favorite.svg' />
                    </div>

					<div class="allMovie movie head-swiper-wrapper-play-img-cont" id='${el.id}' move_data='${el.title} , ${el.original_title} , ${String(el.release_date).slice(0, 4)}'}>
						<img src="./assets/svg/play-icon.svg" alt="play-button">
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
            get_move_andPlay()
        })
}

// установить Жанр
setGenre();

function setGenre() {
    let year = 0
    categories_cont.innerHTML = '';
    let div = document.createElement('div')
    div.className = 'categories__tag__cont'

    genres.forEach(genre => {

        const t = document.createElement('div');
        t.classList.add('categories__tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    })
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?&primary_release_year=${year ? year : thisYear}&page=1&year=${year ? year : thisYear}&&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        div.append(t);
        categories_cont.appendChild(div)
    })

    let h3 = document.createElement('h3')
    h3.textContent = 'выберите год'
    h3.className = 'categories-title categories-title2'
    categories_cont.appendChild(h3)


    const select_year = () => {
        let years = [thisYear - 9, thisYear - 8, thisYear - 7, thisYear - 6, thisYear - 5, thisYear - 4, thisYear - 3, thisYear - 2, thisYear - 1, thisYear]

        let div = document.createElement('div')
        div.className = 'categories__tag__year__cont'

        years.forEach((y, index) => {

            let div2 = document.createElement('div')

            div2.className = 'categories__tag categories__tag__year'
            div2.id = y
            div2.textContent = y
            div.appendChild(div2)
            categories_cont.appendChild(div)

            let categories__tag__year = document.querySelectorAll('.categories__tag__year')
            categories__tag__year[index].addEventListener('click', () => {
                year = 0

                document.querySelectorAll('.categories__tag__year').forEach(el => {
                    el.classList.remove('categories__tag--active')
                })
                categories__tag__year[index].classList.add('categories__tag--active')
                year = categories__tag__year[index].id

                getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?&primary_release_year=${year ? year : thisYear}&page=1&year=${year ? year : thisYear}&&sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))
                highlightSelection()
            })
        })
    }
    select_year()
}

// множественный выбор жанор 
function highlightSelection() {
    const tags = document.querySelectorAll('.categories__tag');
    tags.forEach(categories__tag => {
        categories__tag.classList.remove('categories__tag--active')
    })
    // очистить кнопкой
    let clearBtn = document.getElementById('clear');
    if (clearBtn) {
        clearBtn.classList.add('categories__tag--active')
    } else {

        let clear = document.createElement('div');
        clear.classList.add('categories__tag', 'categories__tag--active');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();
            getMovies(API_URL);
        })
        categories_cont.append(clear);
    }

    if (selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('categories__tag--active');
        })
    }
}

// получить фильмы
getMovies(API_URL)
function getMovies(url) {
    lastUrl = url;

    fetch(url).then(res => res.json()).then(data => {

        if (data.results.length !== 0) {
            showMovies(data.results);
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
            get_move_andPlay()
            document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })

        } else {
            main__section__films.innerHTML = `<h3 class="no-results">No Results Found</h3>`
        }
    })
}

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
            <div class='movie_estimate'>
                <img class='movie_favorite' src='./assets/svg/favorite.svg' />
            </div>

            <img src="${IMG_URL + el.poster_path}" alt="${el.title}">
            <div class="watch__now allMovie" id='${el.id}' move_data='${el.title} ${el.original_title} ${String(el.release_date).slice(0, 4)}/'>
                <img src="./assets/svg/play-icon.svg" alt="play-button">
            </div>
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

// search_btn
search_btn.addEventListener('click', (e) => {
    serchLogic(e)
})

// search_inp
search_inp.addEventListener('keyup', (e) => {
    serchLogic(e)
})

// serch click logic
function serchLogic(e) {
    if (e.code == 'Enter' || e.code == 'NumpadEnter') {
        const searchTerm = search_inp.value;
        selectedGenre = [];
        setGenre();
        if (searchTerm) {
            getMovies(searchURL + '&query=' + searchTerm + `&language=${language}`)
        } else {
            getMovies(API_URL);
        }
        setTimeout(() => {
            document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
        }, 1500);
    }
}
// нумерация страниц назад 
prev.addEventListener('click', () => {
    if (prevPage > 0) {
        pageCall(prevPage);
    }
})
// нумерация страниц вперед 
next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }
})

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

// нумерация страниц
function pagination_click() {
    document.querySelectorAll('#pages').forEach(p => {
        p.addEventListener('click', () => {
            pageCall(Number(p.textContent))
        })
    })
}

// страница созвать
function pageCall(page) {
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
}

function move_info_cont_play() {
    document.querySelector('.move_info_cont_play').addEventListener('click', () => {
        let el = document.querySelector('.move_info_cont_play')
        console.log(el);
        // get data
        let move_data = el.getAttribute('move_data')
        let move_id = el.getAttribute('id')

        // save in localStorage
        localStorage.setItem("move_data", `${move_data}`);
        localStorage.setItem("move_id", `${move_id}`);

        // location
        window.location.href = './pages/watchMovie/watchMovie.html';
    })
}

get_move_andPlay()
function get_move_andPlay() {
    document.querySelectorAll('.allMovie').forEach(el => {
        el.addEventListener('click', () => {

            // get data
            let move_data = el.getAttribute('move_data')
            let move_id = el.getAttribute('id')

            // save in localStorage
            localStorage.setItem("move_data", `${move_data}`);
            localStorage.setItem("move_id", `${move_id}`);

            // location
            window.location.href = './pages/watchMovie/watchMovie.html';
        })
    })
}

// scroll efect
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
    })
})

// loader off
setTimeout(() => {
    document.querySelector('.loader').style.opacity = '0'
    window.scrollTo(0, 0)
}, 1500)

setTimeout(() => {
    document.querySelector('.loader').style.display = 'none'
}, 1500)