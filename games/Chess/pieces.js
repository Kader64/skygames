
function Pieces(type,x,y,img)
{
    this.type = type;
    this.x = x;
    this.y = y;
    this.size = 80;
    this.clicked = false;
    this.img = img;
    if(this.type == "wpawn" || this.type == "bpawn" || this.type == "king")
    {
        this.firstmove = true
    }
}

var wPawn1 = new Pieces("wpawn",0,480,wP)
var wPawn2 = new Pieces("wpawn",80,480,wP)
var wPawn3 = new Pieces("wpawn",160,480,wP)
var wPawn4 = new Pieces("wpawn",240,480,wP)
var wPawn5 = new Pieces("wpawn",320,480,wP)
var wPawn6 = new Pieces("wpawn",400,480,wP)
var wPawn7 = new Pieces("wpawn",480,480,wP)
var wPawn8 = new Pieces("wpawn",560,480,wP)
var wRoot1 = new Pieces("root",0,560,wR)
var wRoot2 = new Pieces("root",560,560,wR)
var wKnight1 = new Pieces("knight",80,560,wN)
var wKnight2 = new Pieces("knight",480,560,wN)
var wBishop1 = new Pieces("bishop",160,560,wB)
var wBishop2 = new Pieces("bishop",400,560,wB)
var wQueen = new Pieces("queen",240,560,wQ)
var wKing = new Pieces("king",320,560,wK)

var bPawn1 = new Pieces("bpawn",0,80,bP)
var bPawn2 = new Pieces("bpawn",80,80,bP)
var bPawn3 = new Pieces("bpawn",160,80,bP)
var bPawn4 = new Pieces("bpawn",240,80,bP)
var bPawn5 = new Pieces("bpawn",320,80,bP)
var bPawn6 = new Pieces("bpawn",400,80,bP)
var bPawn7 = new Pieces("bpawn",480,80,bP)
var bPawn8 = new Pieces("bpawn",560,80,bP)
var bRoot1 = new Pieces("root",0,0,bR)
var bRoot2 = new Pieces("root",560,0,bR)
var bKnight1 = new Pieces("knight",80,0,bN)
var bKnight2 = new Pieces("knight",480,0,bN)
var bBishop1 = new Pieces("bishop",160,0,bB)
var bBishop2 = new Pieces("bishop",400,0,bB)
var bQueen = new Pieces("queen",240,0,bQ)
var bKing = new Pieces("king",320,0,bK)

var whitePieces = [wPawn1,wPawn2,wPawn3,wPawn4,wPawn5,wPawn6,wPawn7,wPawn8,wRoot1,wRoot2,wKnight1,wKnight2,wBishop1,wBishop2,wQueen,wKing]
var blackPieces = [bPawn1,bPawn2,bPawn3,bPawn4,bPawn5,bPawn6,bPawn7,bPawn8,bRoot1,bRoot2,bKnight1,bKnight2,bBishop1,bBishop2,bQueen,bKing]

var round = -1;
var mousePos = {};
var mouseOnPiece = 0
var selectedPiece = {}
var click = false
var place = false
var castle = ""
ctx.lineWidth = 3

canvas.addEventListener("mousemove",function(e){
    mousePos = getMousePos(canvas, e)
})
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}
canvas.addEventListener("click",function(){
    click = true
    if((mouseOnPiece >= whitePieces.length && round == -1) || (mouseOnPiece >= blackPieces.length && round == 1))
    {
        place = true
    }
    else
    {
        place = false
    }
})

function controlPieces()
{
    whitePieces.forEach(drawPieces)
    blackPieces.forEach(drawPieces)
    mouseOnPiece = 0
    if(round==-1)
    {
        whitePieces.forEach(movePieces)
        whitePieces.forEach(selectPiece)
    }
    else
    {
        blackPieces.forEach(movePieces)
        blackPieces.forEach(selectPiece)
    }
}

function drawPieces(piece)
{
    ctx.drawImage(piece.img,piece.x,piece.y)
}

function selectPiece(piece)
{
    if(selectedPiece != piece)
        {
            piece.clicked = false
        }
    if((mousePos.x >= piece.x && mousePos.x <= (piece.x + piece.size)) && (mousePos.y >= piece.y && mousePos.y <= (piece.y + piece.size)))
    {
        ctx.strokeStyle = "black";
        ctx.strokeRect(piece.x,piece.y,79,79);
    
        if(click)
        {
            piece.clicked = true
            selectedPiece = piece
            click = false
        }
    }
    else
    {
        mouseOnPiece++
        if(round == -1)
        {
            if(click && mouseOnPiece >= whitePieces.length)
            {
                selectedPiece = {}
                click = false
            }
        }
        else
        {
            if(click && mouseOnPiece >= blackPieces.length)
            {
                selectedPiece = {}
                click = false
            }
        }
    }
} 

function deletePiece(piece)
{
    if(round == 1)
    {
        for(var i=0;i<whitePieces.length;i++)
        {
            if(piece.x == whitePieces[i].x && piece.y == whitePieces[i].y)
            {
                whitePieces = arrayRemove(whitePieces,whitePieces[i])
            }
        }
    }   
    else if(round == -1)
    {
        for(var i=0;i<blackPieces.length;i++)
        {
            if(piece.x == blackPieces[i].x && piece.y == blackPieces[i].y)
            {
                blackPieces = arrayRemove(blackPieces,blackPieces[i])
            }
        }
    } 
}
function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}
function checkField(x,y)
{
    teamOnField = false
    enemyOnField = false
    if(round == -1)
    {
        team = whitePieces
        enemy = blackPieces
    }
    else
    {
        enemy = whitePieces
        team = blackPieces
    }
    for(var i=0;i<team.length;i++)
    {
        if(team[i].x == selectedPiece.x + x && team[i].y == selectedPiece.y + y)
        {
            teamOnField = true
            break;
        }
    }
    for(var i=0;i<enemy.length;i++)
    {
        if(enemy[i].x == selectedPiece.x + x && enemy[i].y == selectedPiece.y + y)
        {
            enemyOnField = true
            break;
        }
    }
    if(teamOnField)
    {
        return 2
    }
    else if(enemyOnField)
    {
        ctx.strokeStyle = "red"
        return 1
    }
    else
    {
        ctx.strokeStyle = "rgb(70, 231, 6)"
        return 0
    }
}
function placePiece(x,y,piece)
{
    if(selectedPiece.x+x < 640 && selectedPiece.x+x >= 0 && selectedPiece.y+y < 640 && selectedPiece.y+y >= 0)
    {
        ctx.strokeRect(selectedPiece.x+x,selectedPiece.y+y,79,79);
        if(((mousePos.x >= (selectedPiece.x+x)) && (mousePos.x <= selectedPiece.x+x + 80)) && ((mousePos.y >= (selectedPiece.y+y)) && (mousePos.y <= (selectedPiece.y+y) + 80)))
        {
            if(place == true)
            { 
                if(piece.type == "wpawn" || piece.type == "bpawn" || piece.type == "king")
                {
                    piece.firstmove = false
                }
                piece.x = selectedPiece.x+x
                piece.y = selectedPiece.y+y
                if(piece.type == "king")
                {
                    if(round == -1)
                    {
                        if(castle == "right" && wKing.x == 480 && wKing.y == 560)
                        {
                            wRoot2.x = 400
                        }
                        else if(castle == "left" && wKing.x == 160 && wKing.y == 560)
                        {
                            wRoot1.x = 240
                        }
                    }
                    else
                    {
                        if(castle == "right" && wKing.x == 480 && wKing.y == 0)
                        {
                            bRoot2.x = 400
                        }
                        else if(castle == "left" && wKing.x == 160 && wKing.y == 0)
                        {
                            bRoot1.x = 240
                        }
                    }
                }
                deletePiece(piece)
                pawnLevelUp(piece)
                place = false
                round = -round
                controlPieces()
            }
        }
    }
}
function makeCastle(piece)
{
    castle = ""
    if(round == -1 && wKing.x == 320 && wKing.y == 560 && wKing.firstmove == true)
    {
        if(wRoot2.y == 560 && wRoot2.x == 560 && checkField(80,0) == 0 && checkField(160,0) == 0)
        {
            castle = "right"
            ctx.strokeStyle = "blue"
            placePiece(160,0,piece)
        }
        if(wRoot1.y == 560 && wRoot1.x == 0 && checkField(-80,0) == 0 && checkField(-160,0) == 0 && checkField(-240,0) == 0)
        {
            castle = "left"
            ctx.strokeStyle = "blue"
            placePiece(-160,0,piece)
        }
    }
    if(round == 1 && bKing.x == 320 && bKing.y == 0 && bKing.firstmove == true)
    {
        if(bRoot2.y == 0 && bRoot2.x == 560 && checkField(80,0) == 0 && checkField(160,0) == 0)
        {
            castle = "right"
            ctx.strokeStyle = "blue"
            placePiece(160,0,piece)
        }
        if(bRoot1.y == 0 && bRoot1.x == 0 && checkField(-80,0) == 0 && checkField(-160,0) == 0 && checkField(-240,0) == 0)
        {
            castle = "left"
            ctx.strokeStyle = "blue"
            placePiece(-160,0,piece)
        }
    }
}
function pawnLevelUp(piece)
{
    if(piece.type == "wpawn" && piece.y == 0)
    {
        piece.type = "queen"
        piece.img = wQ
    }
    else if(piece.type == "bpawn" && piece.y == 560)
    {
        piece.type = "queen"
        piece.img = bQ
 
   }
}
function movePieces(piece)
{
    if(piece.clicked)
    {
        switch(piece.type)
        {
            case "wpawn":
                if(piece.firstmove)
                {
                    for(var i=1;i<=2;i++)
                    {
                        if(checkField(0,-80*i) > 0)
                        {
                            break;
                        }
                        else if(checkField(0,-80*i) == 0)
                        {
                            placePiece(0,-80*i,piece)
                        }
                    }
                }
                if(checkField(0,-80) == 0)
                {
                    placePiece(0,-80,piece)
                }
                if(checkField(80,-80) == 1)
                {
                    placePiece(80,-80,piece)
                }
                if(checkField(-80,-80) == 1)
                {
                    placePiece(-80,-80,piece)
                }
            break;

            case "bpawn":
                if(piece.firstmove)
                {
                    for(var i=1;i<=2;i++)
                    {
                        if(checkField(0,80*i) > 0)
                        {
                            break;
                        }
                        else if(checkField(0,80*i) == 0)
                        {
                            placePiece(0,80*i,piece)
                        }
                    }
                }
                if(checkField(0,80) == 0)
                {
                    placePiece(0,80,piece)
                }
                if(checkField(80,80) == 1)
                {
                    placePiece(80,80,piece)
                }
                if(checkField(-80,80) == 1)
                {
                    placePiece(-80,80,piece)
                }
            break;

            case "knight":
                if(checkField(80,-160) < 2)
                {
                    placePiece(80,-160,piece)
                }
                if(checkField(-80,-160) < 2)
                {
                    placePiece(-80,-160,piece)
                }
                if(checkField(80,160) < 2)
                {
                    placePiece(80,160,piece)
                }
                if(checkField(-80,160) < 2)
                {
                    placePiece(-80,160,piece)
                }
                if(checkField(-160,80) < 2)
                {
                    placePiece(-160,80,piece)
                }
                if(checkField(-160,-80) < 2)
                {
                    placePiece(-160,-80,piece)
                }
                if(checkField(160,80) < 2)
                {
                    placePiece(160,80,piece)
                }
                if(checkField(160,-80) < 2)
                {
                    placePiece(160,-80,piece)
                }
            break;

            case "root":
                for(var i=1;i<=8;i++)
                {
                    if(checkField(0,-80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(0,-80*i) == 1)
                    {
                        placePiece(0,-80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(0,-80*i,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(0,80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(0,80*i) == 1)
                    {
                        placePiece(0,80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(0,80*i,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(80*i,0) == 2)
                    {
                        break;
                    }
                    else if(checkField(80*i,0) == 1)
                    {
                        placePiece(80*i,0,piece)
                        break;
                    }
                    else
                    {
                        placePiece(80*i,0,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(-80*i,0) == 2)
                    {
                        break;
                    }
                    else if(checkField(-80*i,0) == 1)
                    {
                        placePiece(-80*i,0,piece)
                        break;
                    }
                    else
                    {
                        placePiece(-80*i,0,piece)
                    }
                }
            break;

            case "bishop":
                for(var i=1;i<=8;i++)
                {
                    if(checkField(-80*i,-80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(-80*i,-80*i) == 1)
                    {
                        placePiece(-80*i,-80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(-80*i,-80*i,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(80*i,80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(80*i,80*i) == 1)
                    {
                        placePiece(80*i,80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(80*i,80*i,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(80*i,-80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(80*i,-80*i) == 1)
                    {
                        placePiece(80*i,-80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(80*i,-80*i,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(-80*i,80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(-80*i,80*i) == 1)
                    {
                        placePiece(-80*i,80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(-80*i,80*i,piece)
                    }
                }
            break;

            case "queen":
                for(var i=1;i<=8;i++)
                {
                    if(checkField(0,-80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(0,-80*i) == 1)
                    {
                        placePiece(0,-80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(0,-80*i,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(0,80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(0,80*i) == 1)
                    {
                        placePiece(0,80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(0,80*i,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(80*i,0) == 2)
                    {
                        break;
                    }
                    else if(checkField(80*i,0) == 1)
                    {
                        placePiece(80*i,0,piece)
                        break;
                    }
                    else
                    {
                        placePiece(80*i,0,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(-80*i,0) == 2)
                    {
                        break;
                    }
                    else if(checkField(-80*i,0) == 1)
                    {
                        placePiece(-80*i,0,piece)
                        break;
                    }
                    else
                    {
                        placePiece(-80*i,0,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(-80*i,-80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(-80*i,-80*i) == 1)
                    {
                        placePiece(-80*i,-80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(-80*i,-80*i,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(80*i,80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(80*i,80*i) == 1)
                    {
                        placePiece(80*i,80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(80*i,80*i,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(80*i,-80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(80*i,-80*i) == 1)
                    {
                        placePiece(80*i,-80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(80*i,-80*i,piece)
                    }
                }
                for(var i=1;i<=8;i++)
                {
                    if(checkField(-80*i,80*i) == 2)
                    {
                        break;
                    }
                    else if(checkField(-80*i,80*i) == 1)
                    {
                        placePiece(-80*i,80*i,piece)
                        break;
                    }
                    else
                    {
                        placePiece(-80*i,80*i,piece)
                    }
                }
            break;

            case "king":
                makeCastle(piece)
                if(checkField(0,-80) < 2)
                {
                    placePiece(0,-80,piece)
                }
                if(checkField(-80,-80) < 2)
                {
                    placePiece(-80,-80,piece)
                }
                if(checkField(80,-80) < 2)
                {
                    placePiece(80,-80,piece)
                }
                if(checkField(80,0) < 2)
                {
                    placePiece(80,0,piece)
                }
                if(checkField(-80,0) < 2)
                {
                    placePiece(-80,0,piece)
                }
                if(checkField(0,80) < 2)
                {
                    placePiece(0,80,piece)
                }
                if(checkField(80,80) < 2)
                {
                    placePiece(80,80,piece)
                }
                if(checkField(-80,80) < 2)
                {
                    placePiece(-80,80,piece)
                }
            break;
        }
    }
}
