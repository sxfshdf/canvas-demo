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

$('.width').on('click','li',(e)=>{
  let $btn = $(e.currentTarget)
  $btn.addClass('active')
    .siblings('.active').removeClass('active')
  if($btn.attr('id')==='thin'){
    lineWidth = 5
  }else if($btn.attr('id')==='middle'){
    lineWidth = 10
  }else if($btn.attr('id')==='thick'){
    lineWidth = 15
  }
})



/******/


function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    var imgData = context.getImageData(0,0,canvas.width,canvas.height);
    setCanvasSize()
    context.putImageData(imgData,0,0)
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

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
    console.log(1)
    $('canvas').on('touchstart',(aaa)=>{
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
    })
    $('canvas').on('touchmove',(aaa)=>{
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
    })
    $('canvas').on('touchend', (aaa)=>{
      using = false
    })
  }else{
    
    var using = false
    var lastPoint = {
      x: undefined,
      y: undefined
    }
    $('canvas').on('mousedown',(aaa)=>{
      console.log(3)
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
    })
    $('canvas').on('mousemove',(aaa)=>{
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
    })
    $('canvas').on('mouseup',(aaa)=>{
      using = false
    })
  }
}