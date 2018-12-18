var Width = 1200;
var Height = 700;
var ballRadius = 30;
var leftScore = 0;
var rightScore = 0;
balls = [];
var ballXvelocity = 12;
const paddleEdgeBounceDampener = .002;

function setup() {
  createCanvas (Width, Height);
  balls.push(new Ball);
  };
let rightPlayerY = Height/2;
let leftPlayerY = Height/2;
var playerSpeed = 13;
  function draw() {
    background(0);
    fill(255);
    rect((Height * 1.7) - 75, rightPlayerY, Height/60, Height/7); //right player
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
    this.random2 = random(-6, 6);
    if (this.random < 1) {
      this.Xvelocity = ballXvelocity;
    } else {
      this.Xvelocity = -ballXvelocity;
    }
    this.Yvelocity = this.random2;
    this.terminalYvelocity = 15;
  }
  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, ballRadius);

  }

  move() {
    this.y+=this.Yvelocity;
    this.x+=this.Xvelocity;
    if (this.x <= 50 + ballRadius && this.x > 50 && this.y >= leftPlayerY - ballRadius && this.y <= leftPlayerY + Height/14) { //bounce left paddle top half
      this.x = 50 + ballRadius;
      this.Xvelocity*=-1;
      //this.Yvelocity-=3;
      this.Yvelocity-= dist(this.x, this.y, 50, leftPlayerY + Height/14) * dist(this.x, this.y, 50, leftPlayerY + Height/14) * paddleEdgeBounceDampener;
    } 

     if (this.x <= 50 + ballRadius && this.x > 50 && this.y > leftPlayerY + Height/14 && this.y <= leftPlayerY + Height/7 + ballRadius) { //bounce left paddle bottom half
      this.x = 50 + ballRadius;
      this.Xvelocity*=-1;
      //this.Yvelocity+=3;
      this.Yvelocity+= dist(this.x, this.y, 50, leftPlayerY + Height/14) * dist(this.x, this.y, 50, leftPlayerY + Height/14) * paddleEdgeBounceDampener;
    } 

    if (this.x >= (Height * 1.7) - 75 - ballRadius && this.x < (Height * 1.7) - 75 + Height/60 
    && this.y >= rightPlayerY -ballRadius && this.y <= rightPlayerY + Height/14) { //bounce right paddle top half
      this.x = (Height * 1.7) - 75 - ballRadius;
      this.Xvelocity*=-1;
      //this.Yvelocity-=3;
      this.Yvelocity-= dist(this.x, this.y, (Height * 1.7) - 75, rightPlayerY + Height/14) * dist(this.x, this.y, (Height * 1.7) - 75, rightPlayerY + Height/14) * paddleEdgeBounceDampener;
    } 

    if (this.x >= (Height * 1.7) - 75 - ballRadius && this.x < (Height * 1.7) - 75 + Height/60 
    && this.y >= rightPlayerY + Height/14 && this.y <= rightPlayerY + Height/7 + ballRadius) { //bounce right paddle bottom half
      this.x = (Height * 1.7) - 75 - ballRadius;
      this.Xvelocity*=-1;
      //this.Yvelocity+=3;
      this.Yvelocity+= dist(this.x, this.y, (Height * 1.7) - 75, rightPlayerY + Height/14) * dist(this.x, this.y, (Height * 1.7) - 75, rightPlayerY + Height/14) * paddleEdgeBounceDampener;
    } 

    if (this.y >= Height) { //bounce bottom wall
      this.y = Height;
      this.Yvelocity*=-1;
    } 

    if (this.y <= 0) { //bounce top wall
      this.y = 0;
      this.Yvelocity*=-1;
    } 

    if (abs(this.Yvelocity) > this.terminalYvelocity && this.Yvelocity < 0){
      this.Yvelocity = -this.terminalYvelocity;
    }
    if (abs(this.Yvelocity) > this.terminalYvelocity && this.Yvelocity > 0){
      this.Yvelocity = this.terminalYvelocity;
    }
  }

  offScreenRight() {
    return (this.x > Width + ballRadius);
  }

  offScreenLeft() {
    return (this.x < 0 - ballRadius);
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