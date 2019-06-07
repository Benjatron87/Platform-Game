var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var height = 80;
var width = 120;
var x = 10;
var y = 500;
var dx = 0;
var dy = 0;
let randy = Math.floor(Math.random() * 300) + 75
let score = 0;
let sec = 0;
let render;
let towerW = 80;
let towerX = 480;
let highScore = 0;
let num = 0;
let bool = false;
let dog1 = document.createElement('img');
dog1.src = 'images/dog1.png';
let dog2 = document.createElement('img');
dog2.src = 'images/dog.png';
let dog3 = document.createElement('img');
dog3.src = 'images/dog3.png';
let dog4 = document.createElement('img');
dog4.src = 'images/dog4.png';
let inAir = false;
let direction = true;

let picArr1 = [dog1, dog2];
let picArr2 = [dog3, dog4];

$("#play-again").unbind().on('click', function(){
    setUp();
})

function drawDog(img) {
    ctx.beginPath();
    ctx.drawImage(img, x, y, width, height);
    ctx.fill();
    ctx.closePath();
}

document.addEventListener("touchstart", function(e) {
    document.onkeydown({ keyCode: 87 });
  });
  document.addEventListener("touchend", function(e) {
    document.onkeyup({ keyCode: 87 });
  });

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 87:
            if(!inAir){
                y -= 30;
                dy -= 10;
                inAir = true;
                sec = 0;
            }
        break;
        case 68:
            if(x <= 550){
                dx = 20;
                direction = true;
            }
        break;

        case 65:
            if(x >= 10){
                dx = -20;
                direction = false;
            }
        break;
    }
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(y < 321 && y > -30){
        y += dy + (.32 * (sec * sec))/2;
    }
    if(x >= 10 || x <= 570){
        x += dx;
    }
    if(x < 10){
        x = 10;
    }
    if(x > 570){
        x = 570;
    }

    if(y >= 320){
        inAir = false;
        dy = 0;
        y = 322;
    }

    if(direction){
        num = (num + 1) % picArr1.length;
        drawDog(picArr1[num]);
    }
    else{
        num = (num + 1) % picArr2.length;
        drawDog(picArr2[num]);
    }

    sec += 1;
}

let lose = () => {
    clearInterval(render)
    $("#play-again").show();
    $("#howto").show();
    $("#code-link").show();

    $("#play-again").unbind().on('click', function(){
        bool = true;
        setUp();
    })
}

let setUp = () => {
    x = 10;
    y = 322;
    dy = 0;
    
    $("#score").text("Score: " + score)
    $("#play-again").hide();
    $("#howto").hide();
    $("#code-link").hide();

    render = setInterval(draw, 50);
}