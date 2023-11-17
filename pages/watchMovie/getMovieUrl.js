let movieUrl = decodeURI(window.location.search)
let get_move_data = movieUrl.slice(1, movieUrl.length).split('&')

let move_id = get_move_data[0]
let move_data = get_move_data[1].concat(' ,', get_move_data[2], ' ,', get_move_data[3])

document.getElementById('kinoplayertop').setAttribute('data-title', move_data)

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
    let get_width = parseInt(getComputedStyle(kinoplayertop).getPropertyValue('width'))
    let get_height = parseInt(getComputedStyle(kinoplayertop).getPropertyValue('height'))

    document.querySelectorAll('.video-players').forEach(el => {
        el.style.cssText = `width:${get_width}px; height:${get_height}px`
    })
}, 2000);