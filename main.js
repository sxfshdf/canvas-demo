var yyy = document.getElementById('xxx')
autoSetCanvasSize(yyy)
var context = yyy.getContext('2d')

listenToMouse(yyy)

var eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = true
  actions.className = 'actions x'
}
brush.onclick = function(){
  eraserEnabled = false
  actions.className = 'actions'
}

/*工具函数*/
function autoSetCanvasSize(canvas){
  setCanvasSize()
  window.onresize = function(){
    setCanvasSize()
  }
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.lineWidth = 4
  context.moveTo(x1,y1)
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath()
}

function listenToMouse(canvas){
  var lastPoint = {x: undefined, y: undefined}
  var using = false

  canvas.onmousedown = function(aaa){
    var x = aaa.clientX
    var y = aaa.clientY
    using = true
    if(eraserEnabled){
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint = {x: x, y: y}
    } 
  }

  canvas.onmousemove = function(bbb){
    var x = bbb.clientX
    var y = bbb.clientY
    if(!using){ return }
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10)

      }else{
        var newPoint = {x: x, y:y}
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
      }
  }

  canvas.onmouseup = function(){
    using = false
  }
}