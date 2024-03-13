var img=document.getElementById('carousel');
var images=['img1','img2','img3','img4','img5'];
var delayInMilliseconds = 5000; //1 second

setInterval(function() {
    var a=Math.floor(Math.random()*5);
    img.src = "Images/Banner/"+images[a]+".jpg";
}, delayInMilliseconds);

