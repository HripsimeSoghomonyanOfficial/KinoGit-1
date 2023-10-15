let search = document.getElementById('search')
let search_input = document.getElementById('search_inp')
let search_close = document.getElementById('search-close')
let search_buttone = document.getElementById('search_btn')

search_close.addEventListener('click', () => {
    search.classList.toggle('search-anime-inp')
    search_close.classList.toggle('search-anime-close')
    search_buttone.classList.toggle('search-btn-active')
    search_input.value = ''
    search.offsetWidth < 50 ? search_input.focus() : false;

    if (document.getElementById('search__films__cont')) {
        search__films__cont.innerHTML = ''
    }
})

window.addEventListener('scroll', () => {
    if (scrollY > 150) {
        search.classList.remove('search-anime-inp')
        search_close.classList.remove('search-anime-close')
        search_buttone.classList.remove('search-btn-active')
        search_input.value = ''
        search.offsetWidth < 50 ? false : search_input.blur();

        if (document.getElementById('search__films__cont')) {
            search__films__cont.innerHTML = ''
        }
    }
})