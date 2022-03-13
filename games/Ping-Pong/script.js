const canvas = document.getElementById('canvasGame');
const ctx = canvas.getContext('2d')

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw/2 - ballSize/2
let ballY = ch/2 - ballSize/2
let ballSpeedX = 2;
let ballSpeedY = 2;

const paddelHeight = 100;
const paddelWidth = 20;

const paddelX = 70;
let paddelY = ch/2 - paddelHeight/2;
var rect = canvas.getBoundingClientRect()
const aiX = 910
let aiY = ch/2 - paddelHeight/2;

let score = 0;
let pause = true;

function table()
{
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,cw,ch);
    ctx.fillStyle = "white"
    for(let linePositon=20;linePositon<ch; linePositon += 30)
    {   
        ctx.fillStyle = "white"
        ctx.fillRect(cw/2-2,linePositon-8,4,16)
    }
    ctx.font = "25px Arial"
    ctx.fillStyle = "yellow";
    ctx.fillText("Punkty: "+score.toString(),10,30);
}

function drawBall()
{
    ctx.fillStyle = "white"
    ctx.fillRect(ballX,ballY,ballSize,ballSize);

    if(pause == false)
    {
        ballX += ballSpeedX
        ballY += ballSpeedY
    }
    if(ballY <=0 || ballY + ballSize >=ch)
    {
        ballSpeedY = -ballSpeedY;
        speedUp()
    }
    if((ballX >= paddelX && ballX <= paddelX+paddelWidth) && (ballY >= paddelY && ballY <= paddelY+paddelHeight))
    {
        ballSpeedX = -ballSpeedX;
        speedUp()
    }
    if((ballX+ballSize >= aiX && ballX+ballSize <= aiX + paddelWidth) && (ballY+ballSize >= aiY && ballY+ballSize <= aiY+paddelHeight))
    {
        ballSpeedX = -ballSpeedX;
        speedUp()
    }
    if(ballX <=0 || ballX + ballSize >= cw)
    {
        if(ballX + ballSize >=cw)
        {
            score++;
        
        }
        if(ballX <=0)
        {
            score--;
        }


        pause = true;
        ballX = cw/2 - ballSize/2
        ballY = ch/2 - ballSize/2
        paddelY = ch/2 - paddelHeight/2
        ballSpeedX = 2;
        ballSpeedY = 2;
       
        if(score == 5)
        {
            alert('Gratulacje wygrałeś!')
        }
    }
}

function drawPaddel()
{
    ctx.fillStyle = "yellow"
    ctx.fillRect(paddelX,paddelY,paddelWidth,paddelHeight);
}
function drawAI()
{
    ctx.fillStyle = "yellow"
    ctx.fillRect(aiX,aiY,paddelWidth,paddelHeight);
    aiMove();
}

canvas.addEventListener("mousemove",playerPosition)
topCanvas = canvas.offsetTop;

function playerPosition(e)
{
    if(pause == false)
    {
        paddelY = e.clientY - rect.top
        if(paddelY >= ch - paddelHeight)
        {
            paddelY = ch - paddelHeight
        }
        if(paddelY <= 0)
        {
            paddelY = 0;
        }
    }
}

function aiMove()
{

    aiY = ballY
    
    if(aiY >= ch - paddelHeight)
    {
        aiY = ch - paddelHeight
    }
    if(aiY<= 0)
    {
        aiY = 0;
    }
}

function speedUp()
{
    if(ballSpeedX<0)
    {
        if(ballSpeedX>=-15)
        {
            ballSpeedX += -0.25
        }       
    }
    else
    {   if(ballSpeedX<=15)
        {
            ballSpeedX += 0.25
        }        
    }
    if(ballSpeedY<0)
    {
        if(ballSpeedY>=-15)
        {
            ballSpeedY += -0.25
        }       
    }
    else
    {   if(ballSpeedY<=15)
        {
            ballSpeedY += 0.25
        }        
    }
}
function round()
{
   if(pause == true)
    {
        canvas.addEventListener("click",function(e){
            pause = false;
        })
    }
}

function game()
{
    round();
    table();
    drawBall();
    drawPaddel()
    drawAI()
    window.requestAnimationFrame(game)
}

window.requestAnimationFrame(game)
//setInterval(game,1000/60)
