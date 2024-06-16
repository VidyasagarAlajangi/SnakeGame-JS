var canvas=document.querySelector("#block");
const ctx=document.querySelector("#block").getContext('2d');
const apple=document.getElementById("#apple");
let speed=7;

let tileCount=20;
let tileSize=canvas.width/tileCount-2;
let headX=10;
let headY=10;
let tail=1; 
var xVelocity=0;
var yVelocity=0;
var snakeBody=[];
xFood=Math.floor(Math.random()*tileCount);
yFood=Math.floor(Math.random()*tileCount);
let score=0;

class SnakePart {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

function drawGame()
{   
    changePos();
    let result = isGameOver();
    if (result) {
      return;
    }
    
    
    clearScreen();
   
    collision();
    drawFood();
    drawSnake();
    drawScore();
    if(score==5)
    {
      speed=10;
    }
    if(score==7)
    {
      speed=13;
    }
    setTimeout(drawGame,1000/speed);
}
function isGameOver() {
    let gameOver = false;
    
    if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

    
    if (headX <0) {
      gameOver = true;
      
    } else if (headX === tileCount) {
      gameOver = true;
    } else if (headY < 0) {
      gameOver = true;
    } else if (headY === tileCount) {
      gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

      if(gameOver)
      {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
      }
    return gameOver;
}
function drawScore()
{
    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Score:" + score, canvas.width - 80, 30);
}
function clearScreen()
{
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
function drawSnake()
{
    

    ctx.fillStyle="orange";
    for (let i = 0; i < snakeBody.length; i++) 
    {
        let part = snakeBody[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    
    //snakeBody.push(headX, headY); 
    snakeBody.push(new SnakePart(headX, headY)); 
  while (snakeBody.length > tail) {
    snakeBody.shift();
    }
    ctx.fillStyle="green";
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);
    
}
document.body.addEventListener("keydown",keyDown);
function keyDown(event)
{   //up
    if(event.keyCode==38)
    {   
        if(yVelocity==1)
        return;
        xVelocity=0;
        yVelocity=-1;

    }
    //down
    if(event.keyCode==40)
    {   
        if(yVelocity==-1)
        return;
        xVelocity=0;
        yVelocity=1;

    }
    //left
    if(event.keyCode==39)
    {   
        if(xVelocity==-1)
        return;
        yVelocity=0;
        xVelocity=1;

    }
    //right
    if(event.keyCode==37)
    {   
        if(xVelocity==1)
        return;
        yVelocity=0;
        xVelocity=-1;

    }
    
    
}
function drawFood()
{   
    ctx.fillStyle="red";
    ctx.fillRect(xFood*tileCount,yFood*tileCount,tileSize,tileSize);
}
function changePos()
{   
    headX=headX+xVelocity;
    headY=headY+yVelocity;


}
function collision()
{
    if(xFood==headX && yFood==headY)
    {
        xFood=Math.floor(Math.random()*tileCount);
        yFood=Math.floor(Math.random()*tileCount);
        
        tail++;
        score++;

    }
}
drawGame();