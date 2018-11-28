// topnav
const topnav = document.getElementById("topnav")
window.addEventListener("load", function(){
  topnav.innerHTML = '<a class="active" href="#slide">home</a>';
  topnav.innerHTML += '<a href="#profile">profile</a>'
  topnav.innerHTML += '<a href="#about">about</a>'
  topnav.innerHTML += '<a href="#contact">contact</a>'
}, false);
topnav.addEventListener("click", function(e){
    if(e.target.tagName.toLowerCase() === "a"){
      let a = topnav.getElementsByTagName("a");
      /* ------- 巡遍 <a> 兩種方法-------- */
      // 方法1: for 迴圈
      // for(let i=0; i<a.length; i++){
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
  const slide = document.getElementById("slide");
  if(window.scrollY >= slide.offsetHeight){
    topnav.classList.add("sticky");
    document.body.style.paddingTop = topnav.offsetHeight+'px';
  } else {
    topnav.classList.remove("sticky");
    document.body.style.paddingTop = 0;
  }
}, false);
// about
window.addEventListener("scroll", slideUp, false);
function slideUp(){
  if(document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    const about = document.getElementById("about");
    about.querySelector("div").classList.add("slideUp");
  }
}
// contact
window.addEventListener("load", function(){
  const contact = document.getElementById("contact");
  let list = document.createElement("ul");
  contact.appendChild(list);
  contact.querySelector("ul").innerHTML = "<li>Email：td231565@gmail.com</li>";
  contact.querySelector("ul").innerHTML += "<li>電話：0910110816</li>";
  contact.querySelector("ul").innerHTML += "<li>時間：9:00am~6:00pm</li>";
  contact.innerHTML += '<iframe width="400" height="320" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCduUd6dD1y-JHVCBa3wJudKbSbLaCyG0E&q=台北市政府" allowfullscreen></iframe>';
}, false);