
let historySaveId = [] // История Просмотра
let MovieData = []     // Избранные Видео

setTimeout(() => {
    get_And_Save()
}, 2000);

function get_And_Save() {
    let movie_estimate = document.querySelectorAll('.movie_estimate')

    movie_estimate.forEach(M => {
        M.addEventListener('click', () => { M.classList.toggle('movie_estimate-active'); setAllSaveMuvies(movie_estimate); })
    })
}

function setAllSaveMuvies(movie_estimate) {
    MovieData = []
    movie_estimate.forEach((e, i) => {
        if (movie_estimate[i].classList.toString().match('movie_estimate-active')) {
            let id = document.querySelectorAll('.allMovie')[i].getAttribute('id')
            MovieData.push(id)
        }
    })
    console.log('MovieData -> ', MovieData);
}

WatchHistorySave()
function WatchHistorySave() {
    console.log(window.location.href.split('/').indexOf('watchMovie'));
    if (localStorage.getItem('move_id') && (window.location.href.split('/').indexOf('watchMovie') > 0)) {
        historySaveId.push(localStorage.getItem('move_id'))
        console.log(historySaveId);
    }
}