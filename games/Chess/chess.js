const canvas = document.getElementById('canvasGame');
const ctx = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 640;

const cw = canvas.width;
const ch = canvas.height;

const bB = new Image()
bB.src = "assets/bB.png"
const bK = new Image()
bK.src = "assets/bK.png"
const bN = new Image()
bN.src = "assets/bN.png"
const bP = new Image()
bP.src = "assets/bP.png"
const bQ = new Image()
bQ.src = "assets/bQ.png"
const bR = new Image()
bR.src = "assets/bR.png"
const wB = new Image()
wB.src = "assets/wB.png"
const wK = new Image()
wK.src = "assets/wK.png"
const wN = new Image()
wN.src = "assets/wN.png"
const wP = new Image()
wP.src = "assets/wP.png"
const wQ = new Image()
wQ.src = "assets/wQ.png"
const wR = new Image()
wR.src = "assets/wR.png"

const images = [bB,bK,bN,bP,bQ,bR,wB,wK,wN,wP,wQ,wR]

var imagesLoaded = 0;

for(var i=0; i<images.length; i++){
    images[i].onload = function(){
        imagesLoaded++;
        if(imagesLoaded == images.length){
            window.requestAnimationFrame(game)
        }
    }
}

function drawBoard()
{
    let boardX = 0
    let boardY = 0
    for(var i=0;i<8;i++)
    {
        for(var j=0;j<8;j++)
        {
            ctx.fillStyle="blue"
            if((j%2==0 && i%2==0) || (i%2!=0 && j%2!=0))
            {
                //ctx.fillStyle="white"
                ctx.fillStyle="rgb(246, 149, 58)" 
            }
            else
            {
                //ctx.fillStyle="gray"
                ctx.fillStyle="rgb(107, 52, 1)" 
            }
            ctx.fillRect(boardX,boardY,160,160);
            boardX+=80
        }
        boardX=0
        boardY+=80
    }
}

function checkWin()
{
    if(whitePieces.indexOf(wKing) == -1)
    {
        alert("Black wins!")
        document.location.reload()
    }
    if(blackPieces.indexOf(bKing) == -1)
    {
        alert("White wins!")
        document.location.reload()
    }
    if(whitePieces.length == 1 && blackPieces.length == 1)
    {
        alert("Draw!")
        document.location.reload()
    }
}
function game()
{
    drawBoard()
    controlPieces()
    checkWin()
    window.requestAnimationFrame(game)
}