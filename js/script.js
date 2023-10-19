window.addEventListener('scroll',()=>{
    if (scrollY>200) {
        document.querySelector('.head-top-cont').style.cssText='box-shadow: 0 5px 15px -10px white; height: 40px;'
    }else{
        document.querySelector('.head-top-cont').style.cssText=''
    }
})