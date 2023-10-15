// get data and set player name and id

move_data = localStorage.getItem("move_data")
move_id = localStorage.getItem("move_id")

if (move_data)
    window.history.replaceState(null, null, `?id=${move_id}&data=${move_data}`)

let movieUrl = decodeURI(window.location.search)
let get_move_data = movieUrl.slice(movieUrl.indexOf('&') + 6, movieUrl.length)

document.getElementById('kinoplayertop').setAttribute('data-title', get_move_data)
document.getElementById('yohoho').setAttribute('data-title', get_move_data)
console.log(get_move_data);

// select player
let slect_player_btn = document.querySelectorAll('.slect-player-btn')

slect_player_btn.forEach((el, i) => {
    el.addEventListener('click', () => {

        document.querySelectorAll('.video-players').forEach((off, off_i) => {
            slect_player_btn[off_i].classList.remove('slect-player-btn-active')
            off.classList.remove('video-player-active')
        });

        el.classList.add('slect-player-btn-active')
        document.querySelectorAll('.video-players')[i].classList.add('video-player-active')
    });
});

setTimeout(() => {
    let styles = document.getElementById('kinoplayertop')
    let get_width = parseInt(getComputedStyle(styles).getPropertyValue('width'))
    let get_height = parseInt(getComputedStyle(styles).getPropertyValue('height'))

    document.querySelectorAll('.video-players').forEach(el => {
        el.style.cssText = `width:${get_width}px; height:${get_height}px`
    })
}, 1000);

// window.onhashchange = () => {
//     if (window.innerDocClick) {
//         //Your own in-page mechanism triggered the hash change
//         console.log('go');
//     } else {
//         //Browser back button was clicked
//         console.log('back');
//     }
// }