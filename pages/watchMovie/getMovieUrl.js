let movieUrl = decodeURI(window.location.search)
let get_move_data = movieUrl.slice(1, movieUrl.length).split('/')

// let move_id = get_move_data[0]

let move_data = ''
if (get_move_data[2]) {
    move_data = get_move_data[2] + ' ' + get_move_data[3]
}
else if (get_move_data[1]) {
    move_data = get_move_data[1] + ' ' + get_move_data[3]
}

console.log(move_data);
document.querySelectorAll('.kinoplayer').forEach(players => {
    players.setAttribute('data-title', move_data)
})

// select player
let slect_player_btn = document.querySelectorAll('.slect-player-btn')

slect_player_btn.forEach((el, i) => {
    el.addEventListener('click', () => {
        document.querySelectorAll('.video-players').forEach((off, off_i) => {
            slect_player_btn[off_i].classList.remove('slect-player-btn-active')
            off.classList.remove('video-player-active')
        })
        el.classList.add('slect-player-btn-active')
        document.querySelectorAll('.video-players')[i].classList.add('video-player-active')
        if (!document.querySelector('.video-player-active>div>div')) {
            setTimeout(() => {
                document.querySelector('.slect-player-btn-active').click()
            }, 300);
        }
    })
})

setTimeout(() => {
    if (document.querySelector('.slect-player-btn-active')) {
        document.querySelector('.slect-player-btn-active').click()
    }
    let kinoplayertop = document.getElementById('kinoplayertop')
    let get_width = parseInt(getComputedStyle(kinoplayertop).getPropertyValue('width'))
    let get_height = parseInt(getComputedStyle(kinoplayertop).getPropertyValue('height'))

    document.querySelector('.players-cont').style.cssText = `width:${get_width}px; height:${get_height}px`

}, 1500)