let logo_click = 0
document.getElementById('FullYear').addEventListener('click', () => {
    logo_click++
    if (logo_click >= 10) {
        window.location.href = "../gameTicTacToe/game.html"
        logo_click = 0
    }
})