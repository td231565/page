// topnav
const topnav = document.getElementById('topnav')
window.addEventListener('load', function(){
  topnav.innerHTML = '<a class="active" href="#slide">home</a>'
  topnav.innerHTML += '<a href="#profile">profile</a>'
  topnav.innerHTML += '<a href="#about">about</a>'
  topnav.innerHTML += '<a href="#contact">contact</a>'
}, false)
topnav.addEventListener('click', function(e){
    if(e.target.tagName.toLowerCase() === 'a'){
      let a = topnav.getElementsByTagName('a');
      /* ------- 巡遍 <a> 兩種方法-------- */
      // method 1: for
      // for(let i=0; i<a.length; i++){
      //   a[i].className = ''
      // }
      // method 2: forEach
      [].forEach.call(a, function(e){
        e.classList.remove('active')
      })
      /* -------------------------------- */
      e.target.className += 'active'
    }
}, false)
window.addEventListener('scroll', function(){
  const slide = document.getElementById('slide')
  if(window.scrollY >= slide.offsetHeight){
    topnav.classList.add('sticky')
    document.body.style.paddingTop = topnav.offsetHeight+'px'
  } else {
    topnav.classList.remove('sticky')
    document.body.style.paddingTop = 0
  }
}, false)
// about
window.addEventListener('scroll', fadeIn, false)
function fadeIn(){
  let sectionS1 = document.getElementsByClassName('s1')
  if (sectionS1[0].classList != 'section s1 fadeIn'){
    if (document.body.scrollTop > 435 || document.documentElement.scrollTop > 435){
      sectionS1[0].classList.add('fadeIn')
    }
  }
  let sectionS2 = document.getElementsByClassName('s2')
  if (sectionS2[0].classList != 'section s1 fadeIn'){
    if (document.body.scrollTop > 640 || document.documentElement.scrollTop > 640){
      sectionS2[0].classList.add('fadeIn')
    }
  }
  // let card = document.getElementsByClassName('card')
  // if (card[0].classList != 'card fadeIn'){
  //   if (document.body.scrollTop > 430 || document.documentElement.scrollTop > 430){
  //     for (let i=0, l=card.length; i<l; i++){
  //       card[i].classList.add('fadeIn')
  //     }
  //   }
  // }
}
// contact
window.addEventListener('load', function(){
  const contact = document.getElementById('contact')
  let list = document.createElement('ul')
  contact.appendChild(list)
  list.innerHTML = '<li>Email：td231565@gmail.com</li>'
  list.innerHTML += '<li>電話：0910110816</li>'
  list.innerHTML += '<li>時間：9:00am~6:00pm</li>'
  // contact.innerHTML += '<iframe width="400" height="320" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCduUd6dD1y-JHVCBa3wJudKbSbLaCyG0E&q=台北市政府" allowfullscreen></iframe>'
}, false)