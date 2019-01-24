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
    // weapons
    const weapons = [
        {
            "name": "44_pistol",
            "damage": 48,
            "fire_rate": 6,
            "range": 119,
            "accuracy": 66,
            "weight": 4.2,
            "value": 99
        },
        {
            "name": "10mm_pistol",
            "damage": 18,
            "fire_rate": 46,
            "range": 119,
            "accuracy": 61,
            "weight": 4.2,
            "value": 53
        },
        {
            "name": "assault_rifle",
            "damage": 30,
            "fire_rate": 40,
            "range": 119,
            "accuracy": 72,
            "weight": 13.1,
            "value": 144
        }
    ]
    const weaponList = document.getElementById("weaponList")
    weaponList.addEventListener('click', function(e){
        // weapons list
        let a = weaponList.getElementsByTagName("a")
        if (e.target.tagName.toLowerCase() === "a"){
            for (let i=0; i<a.length; i++){
                a[i].classList.remove("active")
            }
            e.target.classList.add("active")
        }
        // weapons information
        for (item in weapons){
            if (weapons[item].name+" active" === e.target.className){
                let weaponsInfo = document.getElementById("weaponsInfo")
                weaponsInfo.getElementsByClassName("damage")[0].textContent = weapons[item].damage
                weaponsInfo.getElementsByClassName("fire_rate")[0].textContent = weapons[item].fire_rate
                weaponsInfo.getElementsByClassName("range")[0].textContent = weapons[item].range
                weaponsInfo.getElementsByClassName("accuracy")[0].textContent = weapons[item].accuracy
                weaponsInfo.getElementsByClassName("weight")[0].textContent = weapons[item].weight
                weaponsInfo.getElementsByClassName("value")[0].textContent = weapons[item].value
            }
        }
    }, false)


}, false)