// window.addEventListener('scroll',()=>{
//     if (scrollY>200) {
//         document.querySelector('.head-top-cont').style.cssText=' height: 40px;'
//     }else{
//         document.querySelector('.head-top-cont').style.cssText=''
//     }
// })

// loader off
setTimeout(() => {
    document.querySelector('.loader').style.opacity = '0'
    window.scrollTo(0, 0)
}, 0)

setTimeout(() => {
    document.querySelector('.loader').style.display = 'none'
}, 0)

// scroll effect 
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

// ---- save in local storage ----

