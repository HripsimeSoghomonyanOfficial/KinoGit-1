window.addEventListener('scroll',()=>{
    if (scrollY>200) {
        document.querySelector('.head-top-cont').style.cssText='height: 40px;'
        document.querySelector('.logo>h1').style.cssText='font-size:22px'
    }else{
        document.querySelector('.head-top-cont').style.cssText=''
        document.querySelector('.logo>h1').style.cssText=''
    }
})