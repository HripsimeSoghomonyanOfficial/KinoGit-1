let checking = {
    chack: true
}
// get and set user info

let get_user_info = () => {
    fetch('../../backend/profile.php', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', },
    })
        .then(r => r.json())
        .then(data => {
            document.querySelector('.user_first_letter').textContent = data.name[0]
            document.getElementById('_nameSurname').textContent = `${data.name} ${data.surname}`
            document.getElementById('_mail').textContent = `${data.email}`
            document.getElementById('_birthday').textContent = `${data.age.replaceAll('-', ' / ')}`
        })
        .catch(err => {
            console.error(err)
            window.location.href = '../../index.html'
        })
};
get_user_info()

// history
let history = async () => {
    // get
    fetch('../../backend/get_historywatch.php', {
        method: 'post', headers: { 'Content-Type': 'application/json', },
    })
        .then(r => r.json()).then(res => {
            // off 
            if (res.length) {
                let ID = [res.map(el => el[1])]
                history_drow(ID)

                document.querySelector('.history_text').classList.add('off')
            }
            //on
            else {
                let nuttons = document.querySelectorAll('.history-buttons')
                nuttons[0].classList.add('off')
                nuttons[1].classList.add('off')
                allLoaded()
            }
        })
        .catch(err => console.error('error -> ', err))

    // set
    function history_drow(move_id) {
        move_id[0].forEach((M_id, i) => {
            fetch(`https://api.themoviedb.org/3/movie/${M_id}?language=ru-RU&api_key=1cf50e6248dc270629e802686245c2c8`)
                .then(r => r.json())
                .then(res => {
                    // console.log(res);
                    let swiperSlide = document.createElement('div')
                    swiperSlide.className = 'swiper-slide'
                    swiperSlide.id = M_id
                    swiperSlide.innerHTML = `
                        <span class='deleteMovie deleteMovie_History'>X</span>
                        <a href ='../watchMovie/watchMovie.html?${M_id}&${res.original_title}&${res.title}&${String(res.release_date).slice(0, 4)}'>
                            <img src="https://image.tmdb.org/t/p/w500${res.poster_path}">
                            <p>${res.title.slice(0, res.title.indexOf(':'))}</p>
                        </a>`
                    document.getElementById('swiper_wrapper_history').appendChild(swiperSlide)

                    if (i >= move_id[0].length - 1) {
                        setTimeout(() => {
                            delete_history()
                        }, 500);
                        allLoaded()
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        });
    }
}
history()

// favorite
let favorite = async () => {
    // get
    fetch('../../backend/get_bookmark.php', {
        method: 'post', headers: { 'Content-Type': 'application/json', },
    })
        .then(r => r.json()).then(res => {
            // off 
            if (res.length) {
                let ID = [res.map(el => el[1])]
                favorite_drow(ID)

                document.querySelector('.favorite_text').classList.add('off')
            }
            //on
            else {
                let nuttons = document.querySelectorAll('.favorite-buttons')
                nuttons[0].classList.add('off')
                nuttons[1].classList.add('off')
                allLoaded()
            }
        })
        .catch(err => console.error('error -> ', err))

    // set
    function favorite_drow(move_id) {
        move_id[0].forEach((M_id, i) => {
            fetch(`https://api.themoviedb.org/3/movie/${M_id}?language=ru-RU&api_key=1cf50e6248dc270629e802686245c2c8`)
                .then(r => r.json())
                .then(res => {
                    let swiperSlide = document.createElement('div')
                    swiperSlide.className = 'swiper-slide'
                    swiperSlide.id = M_id
                    swiperSlide.innerHTML = `
                        <span class='deleteMovie deleteMovie_favorite'>X</span>
                        <a href ='../watchMovie/watchMovie.html?${M_id}&${res.original_title}&${res.title}&${String(res.release_date).slice(0, 4)}'>
                            <img src="https://image.tmdb.org/t/p/w500${res.poster_path}">
                            <p>${res.title.slice(0, res.title.indexOf(':'))}</p>
                        </a>`
                    document.getElementById('swiper_wrapper_favorite').appendChild(swiperSlide)
                    if (i >= move_id[0].length - 1) {
                        allLoaded()
                        setTimeout(() => {
                            delete_favorite()
                        }, 500);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        });
    };
}
favorite()

// swipper config
const swipperInti = () => {
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

// click delete history
function delete_history() {
    // click delete move
    document.querySelectorAll('.deleteMovie_History').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.parentNode.id
            const delete_M = el.parentNode

            fetch('../../backend/remove_history.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(id),
            })
                .then(r => r.json()).then(response => {
                    // console.log('ok -> History', response);
                    delete_M.remove()
                })
                .catch(err => {
                    console.error('error -> ', err);
                });
        })
    })
}

let delete_all_history = () => {
    document.querySelector('.clearAll_history').addEventListener('click', () => {
        fetch('../../backend/remove_history.php', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify('clearAll'),
        })
            .then(r => r.json()).then(response => {
                document.querySelectorAll('.deleteMovie_History').forEach(el => {
                    el.parentNode.remove()
                })
                // console.log('ok -> History', response);
            })
            .catch(err => {
                console.error('error -> ', err);
            });
    })
}
delete_all_history()

// click delete favorite
function delete_favorite() {
    document.querySelectorAll('.deleteMovie_favorite').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.parentNode.id
            const delete_M = el.parentNode

            fetch('../../backend/bookmark.php', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(id),
            })
                .then(r => r.json()).then(response => {
                    // console.log('ok -> favorite', response);
                    delete_M.remove()
                })
                .catch(err => {
                    console.error('error -> ', err);
                });
        })
    })

}
let delete_all_favorite = () => {
    document.querySelector('.clearAll_boockmark').addEventListener('click', () => {
        fetch('../../backend/bookmark.php', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify('clearAll'),
        })
            .then(r => r.json()).then(response => {
                document.querySelectorAll('.deleteMovie_favorite').forEach(el => {
                    el.parentNode.remove()
                })
                // console.log('ok -> boockmark', response);
            })
            .catch(err => {
                console.error('error -> ', err);
            });
    })
}
delete_all_favorite()

// all loaded
function allLoaded() {
    setTimeout(() => {
        if (checking.chack) {
            document.querySelector('.loader').style.display = 'none'
            swipperInti()

            checking.chack = false
        }
    }, 500);
}