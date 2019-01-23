window.addEventListener('load', function(){
    const slide = document.getElementById('slide')
    slide.innerHTML = '<div class="slideContent"><img src="img/tree.jpg"><button><b>interested</b></button></div>'
    slide.innerHTML += '<div class="slideContent"><img src="img/lake.jpg"></div>'
    slide.innerHTML += '<div class="slideContent"><img src="img/temple.jpg"></div>'
    let items = slide.querySelectorAll('.slideContent')
    let prevBtn = document.createElement('a')
    let nextBtn = document.createElement('a')
    let counter = 0
    let timer = 3000
    let interval = window.setInterval(showNext, timer)
    let dots = document.createElement('div')
    dots.classList.add('dots')
    slide.appendChild(dots)
    for(let i = 0; i<items.length; i++){
        let dot = document.createElement('a')
        dot.classList.add('dot');
        dot.classList.add('dot' + i)
        dots.appendChild(dot)
    }
    dots.addEventListener('click', function(e){
        if(e.target.tagName.tolowerCase() === 'a'){
            let dot = dots.querySelectorAll('.dot');
            [].forEach.call(dot, function(e){
                e.classList.remove('active')
            });            
            e.target.classList.add('active')
            e.target.addEventListener('click', showCurrent, false)
        }
    }, false);
    prevBtn.classList.add('prev')
    nextBtn.classList.add('next')
    slide.appendChild(prevBtn)
    slide.appendChild(nextBtn)
    let showCurrent = function(){
      let showItem = Math.abs(counter % items.length);
      [].forEach.call(items, function(e){
        e.classList.remove('show')
      })
      items[showItem].classList.add('show')
    }
    function showNext(){
      counter++
      showCurrent()
    }
    function showPrev(){
      counter--
      showCurrent()
    }
    slide.addEventListener('mouseover', function(){
      interval = clearInterval(interval)
    })
    slide.addEventListener('mouseout', function(){
      interval = window.setInterval(showNext, timer)
    })
    slide.addEventListener('click', function(){
      showNext()
    })
    nextBtn.addEventListener('click', showNext, false)
    prevBtn.addEventListener('click', showPrev, false)
    items[0].classList.add('show')
  }, false)