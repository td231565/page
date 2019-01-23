window.addEventListener('load', function(){
    // declare variables
    const topNav = document.getElementById("topNav")
    // const subNav = document.getElementById("subNav")
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
    // sub nav tab

}, false)