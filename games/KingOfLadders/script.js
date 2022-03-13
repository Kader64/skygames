const canvas = document.getElementById('canvasGame');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const cw = canvas.width;
const ch = canvas.height;

const mapElements = [
    {x: -20, y: 500, w:920, h:15},
    {x: 100, y: 400, w:920, h:15},
    {x: -20, y: 300, w:920, h:15},
    {x: 100, y: 200, w:920, h:15},
    {x: -20, y: 100, w:920, h:15}
]
const ladders = [
    {x: 60, y: 180, w:5, h:120},
    {x: 100, y: 180, w:5, h:120},
    {x: 60, y: 200, w:40, h:5},
    {x: 60, y: 220, w:40, h:5},
    {x: 60, y: 240, w:40, h:5},
    {x: 60, y: 260, w:40, h:5},
    {x: 60, y: 280, w:40, h:5},

    {x: 60, y: 380, w:5, h:120},
    {x: 100, y: 380, w:5, h:120},
    {x: 60, y: 400, w:40, h:5},
    {x: 60, y: 420, w:40, h:5},
    {x: 60, y: 440, w:40, h:5},
    {x: 60, y: 460, w:40, h:5},
    {x: 60, y: 480, w:40, h:5},

    {x: 900, y: 480, w:5, h:120},
    {x: 940, y: 480, w:5, h:120},
    {x: 900, y: 500, w:40, h:5},
    {x: 900, y: 520, w:40, h:5},
    {x: 900, y: 540, w:40, h:5},
    {x: 900, y: 560, w:40, h:5},
    {x: 900, y: 580, w:40, h:5},

    {x: 900, y: 80, w:5, h:120},
    {x: 940, y: 80, w:5, h:120},
    {x: 900, y: 100, w:40, h:5},
    {x: 900, y: 120, w:40, h:5},
    {x: 900, y: 140, w:40, h:5},
    {x: 900, y: 160, w:40, h:5},
    {x: 900, y: 180, w:40, h:5},

    {x: 900, y: 280, w:5, h:120},
    {x: 940, y: 280, w:5, h:120},
    {x: 900, y: 300, w:40, h:5},
    {x: 900, y: 320, w:40, h:5},
    {x: 900, y: 340, w:40, h:5},
    {x: 900, y: 360, w:40, h:5},
    {x: 900, y: 380, w:40, h:5},

    {x: 200, y: -20, w:5, h:120},
    {x: 240, y: -20, w:5, h:120},
    {x: 200, y: 0, w:40, h:5},
    {x: 200, y: 20, w:40, h:5},
    {x: 200, y: 40, w:40, h:5},
    {x: 200, y: 60, w:40, h:5},
    {x: 200, y: 80, w:40, h:5}
]
let thisLadder = {x:0,y:0,w:0,h:0}
let enemies = [{x:100,y:80,s:2,onG: false}]

const p1Size = 20;
let p1X = 1; 
let p1Y = ch - p1Size;

let speed = 3.5;
let onLadder = false;
let onGround = true;
let ready = true;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let pause = true;
let clicked = false

document.addEventListener("keydown",keyDown)
document.addEventListener("keyup",keyUp)
canvas.addEventListener("click",function(){
    pause = false
    if(clicked == false){
        clicked = true
        time = setInterval(newSquare,3500)
    }
    })

function keyDown(e)
{
    if(e.keyCode == 87)
    {
        upPressed = true;
    }
    if(e.keyCode == 83)
    {
        downPressed = true;
    }
    if(e.keyCode == 68)
    {
        rightPressed = true;
    }
    if(e.keyCode == 65)
    {
        leftPressed = true;
    }
}
        
function keyUp(e)
{
    if(e.keyCode == 87)
    {
        upPressed = false;
        onGround = false;
    }
    if(e.keyCode == 83)
    {
        downPressed = false;
    }
    if(e.keyCode == 68)
    {
        rightPressed = false;
    }
    if(e.keyCode == 65)
    {
        leftPressed = false;
    }
}

function drawP1()
{
    ctx.fillStyle = "yellow";
    ctx.fillRect(p1X,p1Y,p1Size,p1Size);
    if(pause == false)
    {
        if(rightPressed == true && p1X + p1Size <= cw)
        {
            p1X += speed
        }
        if(leftPressed == true && p1X >= 0)
        {
            p1X += -speed
        }
        if(upPressed == true)
        {
            if(onLadder == true)
            {
                p1Y -= 3
            }
            else if(onGround == true)
            {
                p1Y -=3
                if(ready == true)
                {
                    ready = false
                    setTimeout(()=>{onGround = false; ready = true},300)
                }
            }
        }
        if(downPressed == true && onLadder == true)
        {
            p1Y += 3
        }
        if(p1Y + p1Size >= ch)
        {
            p1Y = ch - p1Size
            onGround = true;
        }
        for(let i=0;i<ladders.length;i+=7)
        {
            if(p1X + p1Size >= ladders[i].x && p1X <= ladders[i].x+(ladders[i+1].x - ladders[i].x) && p1Y <= ladders[i].y + ladders[i].h && p1Y + p1Size >= ladders[i].y)
            {
                thisLadder.x = ladders[i].x
                thisLadder.y = ladders[i].y
                thisLadder.w = (ladders[i+1].x - ladders[i].x)
                thisLadder.h = ladders[i].h
                onLadder = true;
                onGround = false;
            }
        }
        if(!(p1X + p1Size >= thisLadder.x && p1X <= thisLadder.x + thisLadder.w && p1Y <= thisLadder.y + thisLadder.h && p1Y + p1Size >= thisLadder.y))
        {
            onLadder = false;
        }
        if(onGround == false && onLadder == false)
        {
            p1Y += 3
        }
        if(p1Y + p1Size <= 0)
        {
            alert("Gratulacje wygrałeś! ")
            reset()
        }
    } 
}
function drawTable()
{
    ctx.fillStyle = "lightblue"
    ctx.fillRect(0,0,cw,ch)
    mapElements.forEach(drawMapElement)
    ladders.forEach(drawLadders)
}
function drawMapElement(element)
{   
    ctx.fillStyle = "brown"
    ctx.fillRect(element.x,element.y,element.w,element.h)
    if(p1X >= element.x && p1X + p1Size <= element.x + element.w && p1Y + p1Size >= element.y && p1Y + p1Size <= element.y + element.h)
    {
        p1Y = element.y - p1Size
        onGround = true;
    }
}
function drawLadders(element)
{
    ctx.fillStyle = "brown"
    ctx.fillRect(element.x,element.y,element.w,element.h)
}
function drawEnemy()
{
    drawBoss()
    if(pause == false)
    {
        enemies.forEach(drawRedSquare)
    }
}
function drawBoss()
{
    ctx.fillStyle = "orange"
    ctx.fillRect(20,20,80,80)
    ctx.fillStyle = "black"
    ctx.fillRect(70,30,20,20)
    ctx.fillStyle = "white"
    ctx.fillRect(78,35,10,10)

    ctx.beginPath();
    ctx.moveTo(90, 90)
    ctx.lineTo(100, 90)
    ctx.lineTo(95, 80)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath();
    ctx.moveTo(80, 90)
    ctx.lineTo(90, 90)
    ctx.lineTo(85, 80)
    ctx.closePath()
    ctx.fill()
}
function drawRedSquare(square)
{
    ctx.fillStyle = "red"
    ctx.fillRect(square.x,square.y,p1Size,p1Size)
    if(square.x <= 0 && square.y <= 500)
    {
        square.s = -square.s
    }
    if(square.x + p1Size >= cw)
    {
        square.s = -square.s
    }
    if(square.x <= 0 && square.y >= 500)
    {
        enemies.shift()
    }
    square.x += square.s;
    if(square.y >= ch)
    {
        square.y = ch - p1Size;
        square.onG = true
    }
    for(let i=0;i<mapElements.length;i++)
    {
        if(square.x >= mapElements[i].x && square.x + p1Size <= mapElements[i].x + mapElements[i].w && square.y + p1Size >= mapElements[i].y && square.y + p1Size <= mapElements[i].y+ mapElements[i].h)
        {
            square.onG = true
        }
    }
    if((square.x >= 950 && square.y + p1Size >= 0 && square.y + p1Size <= 100) ||
    (square.x <= 40 && square.y + p1Size >= 115 && square.y + p1Size <= 200) ||
    (square.x >= 950 && square.y + p1Size >= 215 && square.y + p1Size <= 300) ||
    (square.x <= 40 && square.y + p1Size >= 315 && square.y + p1Size <= 400)||
    (square.x >= 950 && square.y + p1Size >= 415 && square.y + p1Size <= 500))
    {
        square.onG = false
    }
    if(square.onG == false)
    {
        square.y += 5
    }
    if(((p1X >= square.x&& p1X <=square.x+p1Size) && (p1Y >= square.y && p1Y <= square.y + p1Size )) ||
            ((p1X + p1Size >= square.x && p1X + p1Size <=square.x+p1Size) && (p1Y >= square.y && p1Y <= square.y + p1Size )) ||
            ((p1X >= square.x && p1X <=square.x+p1Size) && (p1Y + p1Size >= square.y && p1Y + p1Size <= square.y + p1Size )) ||
            ((p1X + p1Size >= square.x&& p1X + p1Size <=square.x+p1Size) && (p1Y + p1Size >= square.y && p1Y + p1Size <= square.y + p1Size )) ||
            ((p1X + p1Size/2 >= square.x&& p1X + p1Size/2 <=square.x+p1Size) && (p1Y + p1Size/2 >= square.y && p1Y + p1Size/2 <= square.y + p1Size )))
    {
        reset();
    }
}
function drawText()
{
    ctx.font = "30px Arial";
    ctx.strokeStyle = 'green'
    ctx.strokeText("Naciśnij na plansze, aby rozpocząć", 270, 80); 
    ctx.strokeStyle = 'red'
    ctx.strokeText("Unikaj czerwonych kwadratów", 310, 180); 
    ctx.strokeStyle = 'blue'
    ctx.strokeText("Ucieknij najwyższą drabiną", 330, 280); 
    ctx.strokeStyle = 'orange'
    ctx.strokeText("Poruszanie się: WSAD", 360, 380); 
}
function reset()
{
    enemies = [{x:100,y:80,s:2,onG: false}]
    pause = true;
    clearInterval(time)
    clicked = false;
    p1X = 1; 
    p1Y = ch - p1Size;
}
function newSquare()
{
    enemies.push({x:100,y:80,s:2,onG: false})
}   
function game()
{
    drawTable();
    drawP1();
    drawEnemy();
    if(pause == true)
    {
        drawText();
    }
    window.requestAnimationFrame(game)
}

window.requestAnimationFrame(game)
//setInterval(gane,1000/60)