const btnCloud = document.querySelector("#button-cloud")
var imgCloud = document.querySelector("#imgcloud")
var div = document.querySelector("#div-cloud")
var form = document.querySelector("#form")

btnCloud.addEventListener("click",function(){
    if(div.className == "cloudON")
    {
        div.className = "cloudOFF"
        imgCloud.src = 'https://i.ibb.co/6RNB7pg/cloudoff.png'
    }
    else
    {
        div.className = "cloudON"
        imgCloud.src = 'https://i.ibb.co/PQQh00P/cloud.png'
    }
})