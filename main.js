var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5


autoSetCanvasSize(yyy)

listenToUser(yyy)

context.fillStyle = '#fff'
context.fillRect(0, 0, yyy.width, yyy.height)

var eraserEnabled = false

$('.eraser').on('click',()=>{
  eraserEnabled = true
  $('.eraser').addClass('active')
  if($('.colors').find('.active')){
    $('.colors').find('.active').removeClass('active')
  }
})


$('.save').on('click',()=>{
  var url = yyy.toDataURL('image/jpeg')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画'
  a.click()
})


$('.clear').on('click',()=>{
  context.clearRect(0, 0, yyy.width, yyy.height) 
})


$('.colors').on('click','li',(e)=>{
  eraserEnabled = false
  $(e.currentTarget).find('div').addClass('active')
    .parent().siblings().find('.active').removeClass('active')
  let color = $(e.currentTarget).attr('id')
  context.strokeStyle = `${color}`
  if($('.eraser').hasClass('active')){
    $('.eraser').removeClass('active')
  }
})



thin.onclick = function(){
  thin.classList.add('active')
  middle.classList.remove('active')
  thick.classList.remove('active')
  lineWidth = 5
}
middle.onclick = function(){
  middle.classList.add('active')
  thin.classList.remove('active')
  thick.classList.remove('active')
  lineWidth = 10
}
thick.onclick = function(){
  thick.classList.add('active')
  thin.classList.remove('active')
  middle.classList.remove('active')
  lineWidth = 15
}


/******/


function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

// function drawRect(x,y,width,height){
//   context.fillRect(x,y,width,height)
//   context.fillStyle = 'white'
// }
// function drawCircle(x, y, radius) {
//   context.beginPath()
//   context.fillStyle = 'black'
//   context.arc(x, y, radius, 0, Math.PI * 2);
//   context.fill()
// }

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {

  if(document.body.ontouchstart !== undefined){
    canvas.ontouchstart = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(aaa){
      using = false
    }
  }else{
    var using = false
    var lastPoint = {
      x: undefined,
      y: undefined
    }
    canvas.onmousedown = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.onmouseup = function(aaa) {
      using = false
    }
  }
  
}