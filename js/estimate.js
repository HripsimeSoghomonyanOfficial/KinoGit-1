
// let historySaveId = [] // История Просмотра
// let MovieData = []     // Избранные Видео

// setTimeout(() => {
//     get_And_Save()
// }, 2000);

// function get_And_Save() {
//     let movie_estimate = document.querySelectorAll('.movie_estimate')

//     movie_estimate.forEach(M => {
//         M.addEventListener('click', () => {
//             M.classList.toggle('movie_estimate-active');
//             setAllSaveMuvies(movie_estimate);
//         })
//     })
// }
// function setAllSaveMuvies(movie_estimate) {
//     MovieData = []
//     movie_estimate.forEach((e, i) => {
//         if (movie_estimate[i].classList.toString().match('movie_estimate-active')) {
//             let id = document.querySelectorAll('.allMovie')[i].getAttribute('id')
//             MovieData.push(id)
//         }
//     })

//     fetch(`../../backend/bookmark.php?id=${Number(MovieData.reverse()[0])}`, { method: "GET", })
//         .then(r => console.log('ok'))
//         .catch(err => console.log(err))
// }

// // get bockmark in server and show

// fetch('../../backend/get_bookmark.php')
//     .then(r => r.json())
//     .then(r => {
//         r.forEach(el => {
//             document.querySelectorAll('.allMovie').forEach((movie, i) => {
//                 if (el[1] == movie.getAttribute('id')) {
//                     document.querySelectorAll('.movie_estimate')[i].classList.add('movie_estimate-active')
//                 }
//             })
//         })
//     })
//     .catch(err => console.log(err))



// // ---- check url name ----

// // WatchHistorySave()
// // function WatchHistorySave() {
// //     if (localStorage.getItem('move_id') && (window.location.href.split('/').indexOf('watchMovie') > 0)) {
// //         historySaveId.push(localStorage.getItem('move_id'))
// //         console.log(historySaveId);
// //     }
// // }


// // not worcking

// // getUser()
// // function getUser() {
// //     fetch('../../backend/check_login.php')
// //         // .then(r => r)
// //         .then(r => {
// //             console.log('user',r);
// //         })
// //         .catch(err => console.log(err))
// // }