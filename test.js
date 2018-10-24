window.addEventListener("load", function(){
    var slide = document.getElementById("slide");
    slide.innerHTML = '<img src="https://i.imgur.com/Hg6vtUg.jpg">';
    slide.innerHTML += '<img src="https://i.imgur.com/WOXEQVi.jpg">';
    slide.innerHTML += '<img src="https://i.imgur.com/ijcvnkU.jpg">';
    var items = slide.querySelectorAll("img"),
        prevBtn = document.createElement("a"),
        nextBtn = document.createElement("a"),
        counter = 0,
        timer = 3000,
        interval = window.setInterval(showNext, timer),
        dots = document.createElement("div");
    dots.classList.add("dots");
    slide.appendChild(dots);
    for(var i = 0; i<items.length; i++){
        var dot = document.createElement("a");
        dot.classList.add("dot");
        dot.classList.add("dot" + i);
        dots.appendChild(dot);
    }
    dots.addEventListener("click", function(e){
        if(e.target.tagName.tolowerCase() === "a"){
            var dot = dots.querySelectorAll(".dot");
            [].forEach.call(dot, function(e){
                e.classList.remove("active");
            });            
            e.target.classList.add("active");
            e.target.addEventListener("click", showCurrent, false);
        }
    }, false);
    prevBtn.classList.add("prev");
    nextBtn.classList.add("next");
    slide.appendChild(prevBtn);
    slide.appendChild(nextBtn);
    var showCurrent = function(){
      var showItem = Math.abs(counter % items.length);
      [].forEach.call(items, function(e){
        e.classList.remove("show");
      });
      items[showItem].classList.add("show");
      var showing = querySelector(".show");    
    };
    function showNext(){
      counter++;
      showCurrent();
    }
    function showPrev(){
      counter--;
      showCurrent();
    }
    slide.addEventListener("mouseover", function(){
      interval = clearInterval(interval);
    });
    slide.addEventListener("mouseout", function(){
      interval = window.setInterval(showNext, timer);
    });
    slide.addEventListener("click", function(){
      showNext();
    });
    nextBtn.addEventListener("click", showNext, false);
    prevBtn.addEventListener("click", showPrev, false);
    items[0].classList.add("show");  
  }, false);