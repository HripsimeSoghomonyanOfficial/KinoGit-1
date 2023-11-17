// window.addEventListener('scroll',()=>{
//     if (scrollY>200) {
//         document.querySelector('.head-top-cont').style.cssText=' height: 40px;'
//     }else{
//         document.querySelector('.head-top-cont').style.cssText=''
//     }
// })

// scroll effect 
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

