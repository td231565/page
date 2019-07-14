// 移動視窗
;(function () {
  let isMapMoving = false
  let subX = 0
  let subY = 0
  let box = null
  let tempDiv = document.createElement('div')
  tempDiv.className = 'temp-cover'
  window.addEventListener('mousedown', (e) => {
    if (e.target.className === 'moving-bar'){
      box = e.target.parentNode
      isMapMoving = true
      subX = box.offsetLeft - e.clientX
      subY = box.offsetTop - e.clientY
      document.body.appendChild(tempDiv)
    }
  }, true)
  window.addEventListener('mousemove', (e) => {
    if (isMapMoving) {
      box.style.left = `${subX + e.clientX}px`
      box.style.top = `${subY + e.clientY}px`
    }
  }, true)
  window.addEventListener('mouseup', (e) => {
    if (isMapMoving) {
      isMapMoving = false
      document.body.removeChild(tempDiv)
    }
  }, true)
})()
// 最小化視窗
const hideMapBtn = document.querySelector('.hide-btn')
window.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'div' && e.target.className.match('hide-btn')){
    e.target.classList.toggle('active')
    let box = e.target.parentNode.parentNode
    box.classList.toggle('hide')
    box.querySelector('.resizer').classList.toggle('hide')
  }
})
// 縮放視窗大小
;(function () {
  let isResizing = false
  let prevWidth = 0
  let prevHeight = 0
  let prevMouseX = 0
  let prevMouseY = 0
  let box = null

  let tempDiv = document.createElement('div')
  tempDiv.className = 'temp-cover'
  window.addEventListener('mousedown', (e) => {
    if (e.target.className.match('resizer')){
      isResizing = true
      box = e.target.parentNode
      prevWidth = box.offsetWidth
      prevHeight = box.offsetHeight
      prevMouseX = e.pageX
      prevMouseY = e.pageY
      document.body.appendChild(tempDiv)
      window.addEventListener('mousemove', (e) => {
        if (isResizing) {
          movingBox(e)
        }
      }, true)
      window.addEventListener('mouseup', (e) => {
        if (isResizing) {
          isResizing = false
          document.body.removeChild(tempDiv)
          window.removeEventListener('mousemove', movingBox)
        }
      }, true)
      function movingBox(e){
        let newWidth = prevWidth + e.pageX - prevMouseX
        box.style.width = `${newWidth}px`
        let newHeight = prevHeight + e.pageY - prevMouseY
        box.style.maxHeight = `${newHeight}px`
        box.querySelector('.content').style.height = `${newHeight-30}px`
        // document.styleSheets[0].cssRules[3].style.maxHeight = `${newHeight}px`
      }
    }
  })
})()
// 關閉視窗
window.addEventListener('click', (e) => {
  if (e.target.className.match('close-btn')){
    let currDiv = e.target.parentNode.parentNode
    currDiv.parentNode.removeChild(currDiv)
  }
})
// 開新視窗
const fileIcon = document.querySelector('.icon-box.file')
;(function(){
  let counter = 1
  fileIcon.addEventListener('click', (e) => {
    let text = document.querySelector('textarea')
    let newDiv = document.createElement('div')
    newDiv.style.top = `${counter*5}px`
    newDiv.style.left = `${counter*5}px`
    newDiv.className = `box box-${counter}`
    newDiv.innerHTML = `
    <div class="moving-bar">
      <div class="btn close-btn"></div>
      <div class="btn hide-btn"></div>
    </div>
    <div class="content">${text.value}</div>
    <div class="resizer"></div>
    `
    document.body.appendChild(newDiv)
    counter++
  })
})()