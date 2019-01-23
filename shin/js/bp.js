window.addEventListener('load', function(){
    // declare variables
    const topNav = document.getElementById("topNav")
    const subNav = document.getElementById("subNavContainer")
    const subNavStat = document.getElementById("subNav-stat")
    const subNavInv = document.getElementById("subNav-inv")
    const tabContent = document.getElementById("tabContent")
    const tabStat = document.getElementById("tabStat")
    const tabInv = document.getElementById("tabInv")
    // initial setup
    function clean(){
        let subNavUl = subNav.getElementsByTagName("ul")
        for (let i=0; i<subNavUl.length; i++){
            subNavUl[i].style.display = "none"
        }
        let tabSection = tabContent.getElementsByTagName("section")
        for (let i=0; i<tabSection.length; i++){
            tabSection[i].style.display = "none"
        }
    }
    clean()

    function init(){
        subNavStat.style.display = "flex"
        tabStat.style.display = "block"
    }
    init()
    // each tabs content
    function stat(){
        subNavStat.style.display = "flex"
        tabStat.style.display = "block"
    }
    function inv(){
        subNavInv.style.display = "flex"
        tabInv.style.display = "block"
    }
    // change
    topNav.addEventListener('click', function(e){
        clean()
        switch (e.target.childNodes[0].nodeValue){
            case "STAT":
                stat()
                break
            case "INV":
                inv()
                break
        }
    }, false)
    // top nav
    topNav.addEventListener('click', function(e){
        if (e.target.tagName.toLowerCase() === "a"){
            let a = topNav.getElementsByTagName("a")
            for (let i=0; i<a.length; i++){
                a[i].className = "nav-link"
            }
            e.target.className += " active"
        }
        if (e.target.parentElement.tagName.toLowerCase() === "li"){
            let li = topNav.getElementsByTagName("li")
            for (let i=0; i<li.length; i++){
                li[i].className = "nav-item"
            }
            e.target.parentElement.className += " active"
        }
    }, false)
})