const canvas = document.getElementById('canvasGame');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const cw = canvas.width;
const ch = canvas.height;

const p1Size = 25;
let p1X = 1; 
let p1Y = ch - p1Size;

let speed = 4;
document.addEventListener("keydown",keyDown)
document.addEventListener("keyup",keyUp)

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let meteorMinSpeed = 2;
let meteor = [{x: 0, y: 0,s: 0,sp: 0}]

let powerX = -50;
let powerY = -50;
let powerReady = false;

let sec = 30;
let min = 3;
let pause = true;
let runTimer = true;
let time;


function drawBoard()
{
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0,0,cw,ch);
    ctx.font = "25px Arial"
    ctx.fillStyle = "yellow"
    ctx.fillText("Wygrana za: "+min.toString()+":"+sec.toString(),10,30)
}

function drawPowerUp()
{
    if(powerReady == true)
    {
        ctx.fillStyle = "blue"
        ctx.fillRect(powerX,powerY,p1Size,p1Size)
    }
    if(((p1X >= powerX&& p1X <=powerX+p1Size) && (p1Y >= powerY && p1Y <= powerY + p1Size )) ||
            ((p1X + p1Size >= powerX && p1X + p1Size <=powerX+p1Size) && (p1Y >= powerY && p1Y <= powerY + p1Size )) ||
            ((p1X >= powerX && p1X <=powerX+p1Size) && (p1Y + p1Size >= powerY && p1Y + p1Size <= powerY + p1Size )) ||
            ((p1X + p1Size >= powerX&& p1X + p1Size <=powerX+p1Size) && (p1Y + p1Size >= powerY && p1Y + p1Size <= powerY + p1Size )) ||
            ((p1X + p1Size/2 >= powerX&& p1X + p1Size/2 <=powerX+p1Size) && (p1Y + p1Size/2 >= powerY && p1Y + p1Size/2 <= powerY + p1Size )))
    {
        powerReady = false
        powerX = -50
        powerY = -50
        speed += 0.3
    }
}

function drawP1()
{
    ctx.fillStyle = "yellow"
    ctx.strokeStyle="orange";
    ctx.strokeRect(p1X,p1Y,p1Size,p1Size)
    ctx.fillRect(p1X,p1Y,p1Size,p1Size)

    if(rightPressed == true && p1X + p1Size <= cw)
    {
        p1X += speed
    }
    if(leftPressed == true && p1X >= 0)
    {
        p1X += -speed
    }
    if(upPressed == true && p1Y >= 0)
    {
        p1Y += -speed
    }
    if(downPressed == true && p1Y + p1Size <= ch)
    {
        p1Y += speed
    }
}

function drawMeteors()
{
    for(var i = 0;i < meteor.length; i++)
    {
        if(meteor[i].x + meteor[i].s <= 0)
        {
            meteor[i].x = cw
            meteor[i].s = Math.random()*(50-15)+15
            meteor[i].y = Math.random()*(600-meteor[i].s)
            meteor[i].sp = Math.random()*(10-meteorMinSpeed)+meteorMinSpeed
        }

        ctx.fillStyle = "red"
        ctx.fillRect(meteor[i].x,meteor[i].y,meteor[i].s,meteor[i].s)
        meteor[i].x -= meteor[i].sp


        if(((p1X >= meteor[i].x && p1X <=meteor[i].x+meteor[i].s) && (p1Y >= meteor[i].y && p1Y <= meteor[i].y + meteor[i].s )) ||
            ((p1X + p1Size >= meteor[i].x && p1X + p1Size <=meteor[i].x+meteor[i].s) && (p1Y >= meteor[i].y && p1Y <= meteor[i].y + meteor[i].s )) ||
            ((p1X >= meteor[i].x && p1X <=meteor[i].x+meteor[i].s) && (p1Y + p1Size >= meteor[i].y && p1Y + p1Size <= meteor[i].y + meteor[i].s )) ||
            ((p1X + p1Size >= meteor[i].x && p1X + p1Size <=meteor[i].x+meteor[i].s) && (p1Y + p1Size >= meteor[i].y && p1Y + p1Size <= meteor[i].y + meteor[i].s )) ||
            ((p1X + p1Size/2 >= meteor[i].x && p1X + p1Size/2 <=meteor[i].x+meteor[i].s) && (p1Y + p1Size/2 >= meteor[i].y && p1Y + p1Size/2 <= meteor[i].y + meteor[i].s ))
        )
        {
            alert('Uderzyłeś w meteor. Przegrałeś!')
            Endgame();
        }

    }
}

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
 
function levelUp()
{
    if(meteor.length < 15)
    {
        meteor.push({x: 0, y: 0,s: 0,sp: 0})
    }
    else if(meteorMinSpeed < 9)
    {
        meteorMinSpeed += 1
    }
    powerX = Math.random()*(800-p1Size);
    powerY = Math.random()*(600-p1Size);
    powerReady = true;
}
function Endgame()
{
    sec = 30;
    min = 3;
    clearInterval(time)
    powerReady = false;
    p1X = 1; 
    p1Y = ch - p1Size;
    while(meteor.length>1)
    {
        meteor.pop()
    }
    meteor[0].x = cw;
    speed = 4;
    meteorMinSpeed = 2;
    upPressed = false;
    downPressed = false;
    leftPressed = false;
    rightPressed= false;
    pause = true;
    runTimer = true;
}
function timer()
{
    if(min==3 && sec ==30){}
    else if(sec%10==0)
    {
        levelUp();
    }
    if(min == 0 && sec == 0)
    {
        alert("Gratulacje wygrałeś!")
        Endgame()
    }
    else if(sec==0 && min!=0)
    {
        sec = 60;
        min--;
    }
    sec --
}
function checkPause()
{
     if(pause == true)
    {
        ctx.font = "30px Arial";
        ctx.strokeText("Naciśnij na plansze, aby rozpocząć", 270, 100); 
        ctx.strokeStyle = 'red'
        ctx.strokeText("Unikaj czerwonych meteorów", 310, 200); 
        ctx.strokeStyle = 'blue'
        ctx.strokeText("Niebieskie kwadraty zwiększają prędkość", 230, 300); 
        ctx.strokeStyle = 'green'
        ctx.strokeText("Poruszanie się: WSAD", 350, 400); 

        canvas.addEventListener("click",function(e){
        pause = false;
        if(runTimer)
        {
            time = setInterval(timer,1000)
            runTimer = false;
        }
        })
    }
}
function game()
{
    drawBoard();
    drawP1();
    if(pause == false)
    {
        drawMeteors();
        drawPowerUp();
    }
    else
    {
        checkPause();
    }
    window.requestAnimationFrame(game)
}

timer();
window.requestAnimationFrame(game)