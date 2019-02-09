window.addEventListener('load', function(){
    // declare
    const navBar = document.getElementsByClassName("navbar-nav")[0]
    const navBtnText = navBar.getElementsByTagName("a")

    // initial setup
    function createDropMenu(menuArray, targetMenu){
        let ul = document.createElement("ul")
        let div = document.createElement("div")
        ul.className = "dropdown-menu"
        div.className = "dropdown-item-container"
        for (let m=0; m<menuArray.length; m++){
            let li = document.createElement("li")
            li.classList.add("dropdown-item")
            li.innerHTML = `<a href="#">${menuArray[m]}</a>`
            div.appendChild(li)
        }
        ul.appendChild(div)
        targetMenu.appendChild(ul)
    }
    function addDropMenu(){
        for (let i=0; i<navBtnText.length; i++){
            switch (navBtnText[i].childNodes[0].nodeValue){
                case "關於亞尼克":
                    createDropMenu(about, navBtnText[i].parentElement)
                    break;
                case "夢想村":
                    createDropMenu(dreamVillage, navBtnText[i].parentElement)
                    break;
                case "隨享卡專區":
                    createDropMenu(memberCard, navBtnText[i].parentElement)
                    break;
                case "熱銷主打":
                    createDropMenu(hotSell, navBtnText[i].parentElement)
                    break;
                case "YTM":
                    createDropMenu(ytm, navBtnText[i].parentElement)
                    break;
                case "商品全覽":
                    createDropMenu(product, navBtnText[i].parentElement)
                    break;
                case "手做DIY":
                    createDropMenu(diyHandmade, navBtnText[i].parentElement)
                    break;
                case "彌月專區":
                    createDropMenu(babyMoon, navBtnText[i].parentElement)
                    break;
            }
        }
    }
    addDropMenu()

}, false)