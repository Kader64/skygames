document.querySelector('#addFavourite').addEventListener('click',function(){
    type='fav';
    send();
})
document.querySelector('#like').addEventListener('click',function(){
    type="like"
    send();
})
document.querySelector('#dislike').addEventListener('click',function(){
    type="dislike"
    send();
})
var type;

function send()
{
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.querySelector('#slide-down').classList.remove("hide")
            setTimeout(function(){
                document.querySelector('#slide-down').className="hide"
            },2000)

            document.querySelector("#slide-down").innerHTML = this.responseText;
        }
    }
    xmlhttp.open("GET","../games.php?l="+type,true);
    xmlhttp.send();
}
