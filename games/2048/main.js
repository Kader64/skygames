const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

function tile(number,color){
    this.number = number;
    this.color = color;
    
}

canvas.width = 640;
canvas.height = 640;

const cw = canvas.width;
const ch = canvas.height;

var empty = new tile(0,"gray");
var starter = new tile(1,"white");

var allTiles = [[starter,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty],[empty,empty,empty,empty]]

function merge(xt,yt,x2,y2,list){

    console.log(`Merging ${x2}:${y2} with ${xt}:${yt}`)
    let number = list[yt][xt].number+list[y2][x2].number;
    let color = "fajny kolorek"
    switch(number){
        case 1:
            color = "white";
            break;
        case 2:
            color = "green";
            break;
        case 4:
            color  = "cyan";
            break;
        case 8:
            color = "pink";
            break;
        case 16:
            color = "purple";
            break;
        case 32:
            color = "orange";
            break;
        case 64:
            color = "red";
            break;
        case 128:
            color = "yellow";
            break;
        case 256:
            color = "rgb(189,183,107)";
            break;
        case 512:
            color = "rgb(229,43,80)";
            break;
        case 1024:
            color = "rgb(0,77,0)";
            break;
        case 2048:
            color = "rgb(102,0,17)";
            break;
        
    }
    list[y2][x2] = empty;
    list[yt][xt] = new tile(number,color)
}

function moveMeDown(x,y,list){
    let xa = x;
    let ya = y;
    for(is=0;is<3-y;is++){
        if(list[ya+1][xa] == empty){
            list[ya+1][xa] = list[ya][xa];
            list[ya][xa] = empty;
        }
        else if(list[ya+1][xa] == undefined){
            break;
        }
        else
        {   
            if(list[ya][xa].number == list[ya+1][xa].number){
                console.log(`${xa}:${ya} and ${xa}:${ya+1} are touching`)
                merge(xa,ya+1,xa,ya,list)
            }
            break;
        }
        ya++;
    }
    
}

function moveMeUp(x,y,list){
    let xa = x;
    let ya = y;
    for(i=y;i>0;i--){
        if(list[ya-1][xa] == empty){
            list[ya-1][xa] = list[ya][xa];
            list[ya][xa] = empty;
        }
        else if(list[ya-1][xa] == undefined){
            break;
        }
        else
        {   
            if(list[ya][xa].number == list[ya-1][xa].number){
                merge(xa,ya-1,xa,ya,allTiles);
            }
            break;
        }
        ya--;
    }
        
}

function moveMeRight(x,y,list){
    let xa = x;
    let ya = y;
    for(i=0;i<=3-(i==0?i:1);i++){
        if(list[ya][xa+1] == empty){
            list[ya][xa+1] = list[ya][xa];
            list[ya][xa] = empty;
        }
        else if(list[ya][xa+1] == undefined){
            break;
        }
        else
        {   
            if(list[ya][xa].number == list[ya][xa+1].number){
                merge(xa+1,ya,xa,ya,allTiles);
            }
            break;
        }
        xa++;
    }
        
}

function moveMeLeft(x,y,list){
    let xa = x;
    let ya = y;
    for(i=x;i>0;i--){
        if(list[ya][xa-1] == empty){
            list[ya][xa-1] = list[ya][xa];
            list[ya][xa] = empty;
        }
        else if(list[ya][xa-1] == undefined){
            break;
        }
        else
        {   
            if(list[ya][xa].number == list[ya][xa-1].number){
                merge(xa-1,ya,xa,ya,allTiles);
            }
            break;
        }
        xa--;
    }
        
}

function drawPlane(){
    planeX = 0;
    planeY = 0;
    for(ipp=0;ipp<4;ipp++){
    
        for(app=0;app<4;app++){
            let currTile = allTiles[ipp][app];
            ctx.fillStyle=currTile.color;
            ctx.fillRect(planeX,planeY,160,160);
            ctx.lineWidth = 5
            ctx.strokeRect(planeX,planeY,160,160);
            ctx.textAlign = "center";
            ctx.fillStyle="black";
            ctx.font = "40px Comic Sans MS";
            ctx.fillText((currTile.number!=0?currTile.number:""), planeX+80, planeY+90);
            planeX += 160;
        }
        planeX = 0;
        planeY += 160;
    }
}

function moveAllDown(){
    for(ia=2;ia>=0;ia--){
        for(aa=0;aa<4;aa++){
            moveMeDown(aa,ia,allTiles);
            drawPlane()
        }
    }
}

function moveAllUp(){
    for(hy=1;hy<=3;hy++){
        for(hx=0;hx<=3;hx++){
            moveMeUp(hx,hy,allTiles)
            drawPlane();
        }
    }
}

function moveAllRight(){
    for(iy=0;iy<=3;iy++){
        for(ix=2;ix>=0;ix--){
            moveMeRight(ix,iy,allTiles);
            drawPlane();
        }
    }
}

function moveAllLeft(){
    for(py=0;py<=3;py++){
        for(px=1;px<=3;px++){
            moveMeLeft(px,py,allTiles);
            drawPlane();
        }
        
    }
}

function addOne(){
    for(l1=0;l1<allTiles.length;l1++){
        for(l2=0;l2<allTiles[l1].length;l2++){
            if(allTiles[l1][l2] == empty){
                allTiles[l1][l2] = new tile(1,"white")
                return;
            }
        }
    }
}

function checkEmpty (){
    for(l1=0;l1<=3;l1++){
        for(l2=0;l2<=3;l2++){
            if(allTiles[l1][l2] == empty){
                return true;
            }
        }
    }
    return false;
}

/*function checkWinCondition(){ // Outdated
    for(l1=0;l1<allTiles.length;l1++){
        for(l2=0;l2<allTiles[l1].length;l2++){
            if(allTiles[l1][l2].number == 2048){
                window.alert("Game won!")
                location.reload()
            }
        }
    }
    return;
}*/

function findTileOf(value){
    let numberOf = 0;
    for(l1=0;l1<allTiles.length;l1++){
        for(l2=0;l2<allTiles[l1].length;l2++){
            if(allTiles[l1][l2].number == value){
                numberOf++;
            }
        }
    }
    return numberOf;
}


function canMergeAny(list){
    let canMerge = false;
    for(sy=0;sy<3;sy++){
        for(sx=0;sx<=3;sx++){
            if(list[sy][sx].number == list[sy+1][sx].number && list[sy][sx].number != 0){
                canMerge = true;
            }
        }
    }
    for(hy=3;hy>0;hy--){
        for(hx=0;hx<=3;hx++){
            if(list[hy][hx].number == list[hy-1][hx].number && list[hy][hx].number != 0){
                canMerge = true;
            }
        }
    }
    // (To na dole to niepotrzebne jest) jednak jest
    for(iy=0;iy<=3;iy++){
        for(ix=0;ix<3;ix++){
            if(list[iy][ix].number == list[iy][ix+1].number && list[iy][ix].number !=0){
                canMerge = true;
            }
        }
    }
    for(py=0;py<=3;py++){
        for(px=3;px>0;px--){
            if(list[py][px].number == list[py][px-1].number && list[py][px].number!=0){
                canMerge = true;
            }
        }
    }
    return canMerge;
}

function keyHandler(event){
    if(findTileOf(2048) >= 1){
        window.alert("Game won!");
            location.reload();
    }
    switch(event.keyCode){
        case 40:
            moveAllDown();
            break;
        case 39:
            moveAllRight();
            break;
        case 37:
            moveAllLeft();
            break;
        case 38:
            moveAllUp();
            break;
    }
    
    if(checkEmpty()){
        if(findTileOf(1) < 4 || canMergeAny(allTiles) == false && checkEmpty()){
            addOne()
            drawPlane()
        }
    }
    else{
        if(!canMergeAny(allTiles)){
            window.alert("Game over");
            location.reload();
        }
    }
}

drawPlane();
window.addEventListener("keydown",keyHandler,false);

/*function restart(){
    location.reload();
}*/