window.addEventListener('scroll',()=>{
    if (scrollY>200) {
        document.querySelector('.head-top-cont').style.cssText=' height: 40px;'
    }else{
        document.querySelector('.head-top-cont').style.cssText=''
    }
})