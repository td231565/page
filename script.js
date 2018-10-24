// topnav
var topnav = document.getElementById("topnav");
window.addEventListener("load", function(){
  topnav.innerHTML = '<a class="active" href="#slide">home</a>';
  topnav.innerHTML += '<a href="#profile">profile</a>';
  topnav.innerHTML += '<a href="#about">about</a>';
  topnav.innerHTML += '<a href="#contact">contact</a>';
}, false);
topnav.addEventListener("click", function(e){
    if(e.target.tagName.toLowerCase() === "a"){
      var a = topnav.getElementsByTagName("a");
      /* ------- 巡遍 <a> 兩種方法-------- */
      // 方法1: for 迴圈
      // for(var i=0; i<a.length; i++){
      //   a[i].className = "";
      // }
      // 方法2: forEach
      [].forEach.call(a, function(e){
        e.classList.remove("active");
      });
      /* -------------------------------- */
      e.target.className += "active";
    }
}, false);
window.addEventListener("scroll", function(){
  if(window.pageYOffset > topnav.offsetTop){
    topnav.classList.add("sticky");
  } else {
    topnav.classList.remove("sticky");
  }
}, false);
// carousel
// window.addEventListener("load", function(){
//   var slide = document.getElementById("slide");
//   slide.innerHTML = '<img src="https://i.imgur.com/Hg6vtUg.jpg">';
//   slide.innerHTML += '<img src="https://i.imgur.com/WOXEQVi.jpg">';
//   slide.innerHTML += '<img src="https://i.imgur.com/ijcvnkU.jpg">';
//   var items = slide.querySelectorAll("img"),
//       prevBtn = document.createElement("a"),
//       nextBtn = document.createElement("a"),
//       counter = 0,
//       timer = 3000,
//       interval = window.setInterval(showNext, timer);
//   prevBtn.classList.add("prev");
//   nextBtn.classList.add("next");
//   slide.appendChild(prevBtn);
//   slide.appendChild(nextBtn);
//   var showCurrent = function(){
//     var showItem = Math.abs(counter % items.length);
//     [].forEach.call(items, function(e){
//       e.classList.remove("show");
//     });
//     items[showItem].classList.add("show");
//     var showing = querySelector(".show");    
//   };
//   function showNext(){
//     counter++;
//     showCurrent();
//   }
//   function showPrev(){
//     counter--;
//     showCurrent();
//   }
//   slide.addEventListener("mouseover", function(){
//     interval = clearInterval(interval);
//   });
//   slide.addEventListener("mouseout", function(){
//     interval = window.setInterval(showNext, timer);
//   });
//   slide.addEventListener("click", function(){
//     showNext();
//   });
//   nextBtn.addEventListener("click", showNext, false);
//   prevBtn.addEventListener("click", showPrev, false);
//   items[0].classList.add("show");  
// }, false);
// about
window.addEventListener("scroll", slideUp, false);
function slideUp(){
  if(document.body.scrollTop > 550 || document.documentElement.scrollTop > 550) {
    var about = document.getElementById("about");
    about.querySelector("div").classList.add("slideUp");
  }
}
// contact
window.addEventListener("load", function(){
  var contact = document.getElementById("contact"),
      list = document.createElement("ul");
  contact.appendChild(list);
  contact.querySelector("ul").innerHTML = "<li>Email：td231565@gmail.com</li>";
  contact.querySelector("ul").innerHTML += "<li>電話：0910110816</li>";
  contact.querySelector("ul").innerHTML += "<li>時間：9:00am~6:00pm</li>";
  contact.innerHTML += '<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCduUd6dD1y-JHVCBa3wJudKbSbLaCyG0E&q=台北市政府" allowfullscreen></iframe>';
}, false);