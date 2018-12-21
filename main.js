const Width = 1200;
const Height = 700;
const rectX = 200;
var mgr;
balls = [];
var ballRadius = 30;
var leftScore = 0;
var rightScore = 0;
var initialBallXvelocity = 12;
const paddleEdgeBounceDampener = .002;
var playerSpeed = 15;
let rightPlayerY = Height/2;
let leftPlayerY = Height/2;

function setup() {
  createCanvas (Width, Height);
  mgr = new SceneManager();
    mgr.addScene (Title);
    mgr.addScene (Normal);
    mgr.addScene (Timed);
    mgr.addScene (FreePlay);
    mgr.showNextScene();
  //balls.push(new Ball);
  };

function draw() {
    mgr.draw();
  }

function mousePressed()
  {
      mgr.handleEvent("mousePressed");
  }

function Title() {
  //balls = [];
  this.draw = function() {
    background(0);
    stroke(255);
    strokeWeight(0);
    
    //rect(300, rectX, 600, 100);
    //rect(300, rectX + 175, 600, 100);
    //rect(300, rectX + 2 * 175, 600, 100);
    fill(255);
    textSize(200);
    textAlign(CENTER);
    text('EPIC PONG', Width/2, Height/4);
    textSize(100);
    text('Normal', Width/2, Height/2 - 65);
    text('Timed', Width/2, 3*Height/4 - 85);
    text('Free Play', Width/2 + 5, Height - 110);
    fill(198, 68, 3);
    textSize(30);
    text('by Cosimos Cendo', Width/1.15, 225);
    noFill();
    strokeWeight(1.5);
    if (mouseX > 300 && mouseX < 900 && mouseY > rectX && mouseY < rectX + 100) {
        rect(300, rectX, 600, 100);
      } else if (mouseX > 300 && mouseX < 900 && mouseY > rectX + 175 && mouseY < rectX + 175 + 100) {
        rect(300, rectX + 153, 600, 100);
      } else if (mouseX > 300 && mouseX < 900 && mouseY > rectX + 2*175 && mouseY < rectX + 2*175 + 100) {
        rect(300, rectX + 2 * 153, 600, 100);
      }
    }

    this.mousePressed = function() {
      if (mouseX > 300 && mouseX < 900 && mouseY > rectX && mouseY < rectX + 100) {
        mgr.showScene(Normal);
        setTimeout(ballSpawn, 1200);
        } else if (mouseX > 300 && mouseX < 900 && mouseY > rectX + 175 && mouseY < rectX + 175 + 100) {
        mgr.showScene(Timed);
        } else if (mouseX > 300 && mouseX < 900 && mouseY > rectX + 2*175 && mouseY < rectX + 2*175 + 100) {
        mgr.showScene(FreePlay);
        }
    }
  }


function Normal() {
  //this.setup = function() {
    //setTimeout(this.ballSpawn, 1200);
  //}
  this.draw = function() {
    background(0);
    strokeWeight(0);
    fill(255);
    rect((Height * 1.7) - 75, rightPlayerY, Height/60, Height/7); //right player
    rect(50, leftPlayerY, Height/60, Height/7); //left player
    move();
    textSize(100);
    textAlign(CENTER);
    text(leftScore, Width/4, Height/4);
    text(rightScore, 3*Width/4, Height/4);
    textSize(20);
    //text('Press Space to Serve New Balls', Width/2, Height*99/100);
    
    
    for (i = 0; i <= balls.length - 1; i++) {
    balls[i].show();
    balls[i].move();
    }
   
    for (let i = balls.length - 1; i >= 0; i--) { //score
      if (balls[i].offScreenRight()){
        balls.splice(i, 1);
        leftScore+=1;
        setTimeout(ballSpawn, 1200);
      } else if (balls[i].offScreenLeft()){
        balls.splice(i, 1);
        rightScore+=1;
        setTimeout(ballSpawn, 1200);
      } 
    }
    textSize(30);
    text('Main Menu', 1120, 25);
  }
    
    this.mousePressed = function() {
      if (mouseX > 1025 && mouseY < 50) {
      mgr.showScene(Title);
      leftScore = 0;
      rightScore = 0;
      rightPlayerY = Height/2;
      leftPlayerY = Height/2;
      balls = [];
    }
  }

  this.ballSpawn = function() {
    balls.unshift(new Ball);
  }
 }
  


function Timed() {
  this.setup = function() {
    createCanvas(Width, Height);
  }
  this.draw = function() {
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
  textSize(30);
  text('Main Menu', 1120, 25);
}
this.mousePressed = function() {
  if (mouseX > 1025 && mouseY < 50) {
    mgr.showScene(Title);
  }
}
}

function FreePlay() {

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

//function keyPressed() {
  //if (keyCode == 32) {
    //balls.unshift(new Ball);
   //}
  //}

class Ball {
  constructor() {
    this.ballXvelocity = initialBallXvelocity;
    this.ballAcceleration = 0.000001;
    this.x = Width/2;
    this.y = Height/2;
    this.random = random(2);
    this.random2 = random(-6, 6);
    if (this.random < 1) {
      this.Xvelocity = this.ballXvelocity;
    } else {
      this.Xvelocity = -this.ballXvelocity;
      this.ballAcceleration*=-1;
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
    if (this.x <= 50 + ballRadius/2 && this.x > 50 && this.y >= leftPlayerY - ballRadius/2 && this.y <= leftPlayerY + Height/14) { //bounce left paddle top half
      this.x = 50 + ballRadius/2;
      this.Xvelocity*=-1;
      this.ballAcceleration*=-1;
      //this.Yvelocity-=3;
      this.Yvelocity-= dist(this.x, this.y, 50, leftPlayerY + Height/14) * dist(this.x, this.y, 50, leftPlayerY + Height/14) * paddleEdgeBounceDampener;
    } 

     if (this.x <= 50 + ballRadius/2 && this.x > 50 && this.y > leftPlayerY + Height/14 && this.y <= leftPlayerY + Height/7 + ballRadius/2) { //bounce left paddle bottom half
      this.x = 50 + ballRadius/2;
      this.Xvelocity*=-1;
      this.ballAcceleration*=-1;
      //this.Yvelocity+=3;
      this.Yvelocity+= dist(this.x, this.y, 50, leftPlayerY + Height/14) * dist(this.x, this.y, 50, leftPlayerY + Height/14) * paddleEdgeBounceDampener;
    } 

    if (this.x >= (Height * 1.7) - 75 - ballRadius/2 && this.x < (Height * 1.7) - 75 + Height/60 
    && this.y >= rightPlayerY -ballRadius/2 && this.y <= rightPlayerY + Height/14) { //bounce right paddle top half
      this.x = (Height * 1.7) - 75 - ballRadius/2;
      this.Xvelocity*=-1;
      this.ballAcceleration*=-1;
      //this.Yvelocity-=3;
      this.Yvelocity-= dist(this.x, this.y, (Height * 1.7) - 75, rightPlayerY + Height/14) * dist(this.x, this.y, (Height * 1.7) - 75, rightPlayerY + Height/14) * paddleEdgeBounceDampener;
    } 

    if (this.x >= (Height * 1.7) - 75 - ballRadius/2 && this.x < (Height * 1.7) - 75 + Height/60 
    && this.y >= rightPlayerY + Height/14 && this.y <= rightPlayerY + Height/7 + ballRadius/2) { //bounce right paddle bottom half
      this.x = (Height * 1.7) - 75 - ballRadius/2;
      this.Xvelocity*=-1;
      this.ballAcceleration*=-1;
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
    this.Xvelocity+=this.ballAcceleration;
  }

  offScreenRight() {
    return (this.x > Width + ballRadius);
  }

  offScreenLeft() {
    return (this.x < 0 - ballRadius);
  }
}

ballSpawn = function() {
  balls.unshift(new Ball);
}