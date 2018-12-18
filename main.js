var Width = window.innerHeight * 1.7;
var Height = window.innerHeight;
var ballRadius = 30;
var leftScore = 0;
var rightScore = 0;
balls = [];
var ballXvelocity = 10;

function setup() {
  createCanvas (Width, Height);
  balls.push(new Ball);
  };
let rightPlayerY = window.innerHeight/2;
let leftPlayerY = window.innerHeight/2;
var playerSpeed = 13;
  function draw() {
    background(0);
    fill(255);
    rect((window.innerHeight * 1.7) - 75, rightPlayerY, Height/60, Height/7); //right player
    rect(50, leftPlayerY, Height/60, Height/7); //left player
    move();
    textSize(100);
    textAlign(CENTER);
    text(leftScore, Width/4, Height/4);
    text(rightScore, 3*Width/4, Height/4);
    textSize(20);
    text('Press Space to Serve New Balls', Width/2, Height*99/100);

    for (i = 0; i <= balls.length - 1; i++) {
    balls[i].show();
    balls[i].move();
    }
   
    for (let i = balls.length - 1; i >= 0; i--) { //score
      if (balls[i].offScreenRight()){
        balls.splice(i, 1);
        leftScore+=1;
      } else if (balls[i].offScreenLeft()){
        balls.splice(i, 1);
        rightScore+=1;
      } 
    }
  }

  function keyPressed() {
    if (keyCode == 32) {
      balls.unshift(new Ball);
    }
  }

class Ball {
  constructor() {
    this.x = Width/2;
    this.y = Height/2;
    this.random = random(2);
    this.random2 = random(-10, 10);
    if (this.random < 1) {
      this.Xvelocity = ballXvelocity;
    } else {
      this.Xvelocity = -ballXvelocity;
    }
    this.Yvelocity = this.random2;
  }
  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, ballRadius);

  }

  move() {
    this.y+=this.Yvelocity;
    this.x+=this.Xvelocity;
    if (this.x <= 50 + ballRadius && this.x > 50 && this.y >= leftPlayerY && this.y <= leftPlayerY + Height/14) { //bounce left paddle top half
      this.x = 50 + ballRadius;
      this.Xvelocity*=-1;
      this.Yvelocity-=5;
    } 

    if (this.x >= (window.innerHeight * 1.7) - 75 - ballRadius && this.x < (window.innerHeight * 1.7) - 75 + Height/60 
    && this.y >= rightPlayerY && this.y <= rightPlayerY + Height/14) { //bounce right paddle top half
      this.x = (window.innerHeight * 1.7) - 75 - ballRadius;
      this.Xvelocity*=-1;
      this.Yvelocity-=5;
    } 

    if (this.x <= 50 + ballRadius && this.x > 50 && this.y > leftPlayerY + Height/14 && this.y <= leftPlayerY + Height/7) { //bounce left paddle bottom half
      this.x = 50 + ballRadius;
      this.Xvelocity*=-1;
      this.Yvelocity+=5;
    } 

    if (this.x >= (window.innerHeight * 1.7) - 75 - ballRadius && this.x < (window.innerHeight * 1.7) - 75 + Height/60 
    && this.y >= rightPlayerY + Height/14 && this.y <= rightPlayerY + Height/7) { //bounce right paddle bottom half
      this.x = (window.innerHeight * 1.7) - 75 - ballRadius;
      this.Xvelocity*=-1;
      this.Yvelocity+=5;
    } 

    if (this.y >= window.innerHeight) { //bounce bottom wall
      this.y = window.innerHeight;
      this.Yvelocity*=-1;
    } 

    if (this.y <= 0) { //bounce top wall
      this.y = 0;
      this.Yvelocity*=-1;
    } 

  }

  offScreenRight() {
    return (this.x > Width);
  }

  offScreenLeft() {
    return (this.x < 0);
  }
}

function move() {
  if (keyIsDown(UP_ARROW) && rightPlayerY>0) {
    rightPlayerY-=playerSpeed;
  } else if (keyIsDown(DOWN_ARROW) && rightPlayerY < Height - Height/7) {
    rightPlayerY+=playerSpeed;
  } if (keyIsDown(87) && leftPlayerY>0) {
    leftPlayerY-=playerSpeed;
  } else if (keyIsDown(83) && leftPlayerY<Height - Height/7) {
    leftPlayerY+=playerSpeed;
  }
}