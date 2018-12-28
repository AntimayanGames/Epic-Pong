const Width = 1200;
const Height = 700;
const rectX = 200;
var mgr;
balls = [];
var ballRadius = 25;
var leftScore = 0;
var rightScore = 0;
var initialBallXvelocity = 12;
const paddleEdgeBounceDampener = .002;
var playerSpeed = 15;
var AIspeed = 12;
let rightPlayerY = Height / 2;
let leftPlayerY = Height / 2;
let rightPlayerWidth = 11;
let rightPlayerHeight = 100;
let leftPlayerWidth = 11;
let leftPlayerHeight = 100;
var backgroundColor = 0;
var AIerror = 4;
var leftPlayerColor = '#FFAAAA';
var rightPlayerColor = '#AAAAFF';
var AIdifficulty = 2;
var bool = true;

var supertest;

function setup() {
  createCanvas(Width, Height);
  mgr = new SceneManager();
  mgr.addScene(Title);
  mgr.addScene(Normal);
  mgr.addScene(Timed);
  mgr.addScene(FreePlay);
  mgr.addScene(SinglePlayer);
  mgr.addScene(rightWins);
  mgr.addScene(leftWins);
  mgr.showNextScene();
  smash.pause();
  smash.currentTime = 0;
};

function draw() {
  mgr.draw();
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
}

function Title() {
  this.draw = function () {
    background(backgroundColor);
    stroke(255);
    strokeWeight(0);
    fill(255);
    textAlign(CENTER);
    textSize(50);
    text('AI Difficulty:', 1050, 240);
    textSize(100);
    text('Single Player', Width / 2, Height / 4 - 40);
    text('Normal', Width / 2, Height / 2 - 65);
    text('Timed', Width / 2, 3 * Height / 4 - 85);
    text('Free Play', Width / 2 + 5, Height - 110);
    noFill();
    strokeWeight(1.5);
    if (mouseX > 300 && mouseX < 900 && mouseY > rectX && mouseY < rectX + 100) { //normal
      rect(300, rectX, 600, 100);
      textSize(30);
      noStroke();
      fill(0, 100, 200);
      text('Play against a friend (First to 7 points wins)', Width / 2, Height - 10);
    } else if (mouseX > 300 && mouseX < 900 && mouseY > rectX + 153 && mouseY < rectX + 153 + 100) { //timed
      rect(300, rectX + 153, 600, 100);
      textSize(30);
      noStroke();
      fill(0, 100, 200);
      text('2 Player: Every 7 seconds a new ball will spawn (First to 7 points wins)', Width / 2, Height - 10);
    } else if (mouseX > 300 && mouseX < 900 && mouseY > rectX + 2 * 153 && mouseY < rectX + 2 * 153 + 100) { //free play
      rect(300, rectX + 2 * 153, 600, 100);
      textSize(30);
      noStroke();
      fill(0, 100, 200);
      text('2 Player: Have fun by changing aspects of the game (IN DEVELOPMENT)', Width / 2, Height - 10);
    } else if (mouseX > 250 && mouseX < 950 && mouseY > 50 && mouseY < 150) { //single player
      rect(250, 50, 700, 100);
      textSize(30);
      noStroke();
      fill(0, 100, 200);
      text('Play by yourself against an AI (First to 7 points wins)', Width / 2, Height - 10);
    }

    if (AIdifficulty === 1) {
      AIerror = 7;
      AIspeed = 8;
      textSize(50);
      noStroke();
      fill(255);
      text('Easy', 1050, 350);
    } else if (AIdifficulty === 2) {
      AIerror = 5;
      AIspeed = 10;
      textSize(50);
      fill(255);
      noStroke();
      text('Medium', 1050, 350);
    } else if (AIdifficulty === 3) {
      AIerror = 4;
      AIspeed = 12;
      textSize(50);
      fill(255);
      noStroke();
      text('Hard', 1050, 350);
    } else if (AIdifficulty === 4) {
      AIerror = 2;
      AIspeed = playerSpeed;
      textSize(50);
      fill(255);
      noStroke();
      text('Impossible', 1050, 350);
    }
    stroke(255);
    noFill();
    triangle(1050, 260, 1020, 300, 1080, 300);
    triangle(1050, 410, 1020, 370, 1080, 370);

    if (mouseX > 1000 && mouseX < 1100 && mouseY > 220 && mouseY < 320) {
      fill(255, 255, 180);
      stroke(255);
      strokeWeight(4);
      triangle(1050, 260, 1020, 300, 1080, 300);
    } else if (mouseX > 1000 && mouseX < 1100 && mouseY > 330 && mouseY < 430) {
      fill(255, 255, 180);
      stroke(255);
      strokeWeight(4);
      triangle(1050, 410, 1020, 370, 1080, 370);
    } else {
      stroke(255);
      noFill();
      triangle(1050, 260, 1020, 300, 1080, 300);
      triangle(1050, 410, 1020, 370, 1080, 370);
    }
  }

  this.mousePressed = function () {
    if (mouseX > 300 && mouseX < 900 && mouseY > rectX && mouseY < rectX + 100) {
      clickAudio();
      mgr.showScene(Normal);
      setTimeout(ballSpawn, 1200);
    } else if (mouseX > 300 && mouseX < 900 && mouseY > rectX + 175 && mouseY < rectX + 175 + 100) {
      clickAudio();
      mgr.showScene(Timed);
      setTimeout(ballSpawn, 1200);
    } else if (mouseX > 300 && mouseX < 900 && mouseY > rectX + 2 * 175 && mouseY < rectX + 2 * 175 + 100) { //free play
      clickAudio();
      mgr.showScene(FreePlay);
    } else if (mouseX > 250 && mouseX < 950 && mouseY > 50 && mouseY < 150) { //single player
      clickAudio();
      mgr.showScene(SinglePlayer);
      setTimeout(ballSpawn, 1200);
    }

    if (mouseX > 1000 && mouseX < 1100 && mouseY > 220 && mouseY < 320 && AIdifficulty > 1) {
      clickAudio();
      AIdifficulty -= 1;
    } else if (mouseX > 1000 && mouseX < 1100 && mouseY > 330 && mouseY < 430 && AIdifficulty < 4) {
      clickAudio();
      AIdifficulty += 1;
    }
  }
}


function Normal() {
  this.draw = function () {
    background(backgroundColor);
    strokeWeight(0);
    fill(rightPlayerColor);
    rect(Width - 50 - rightPlayerWidth, rightPlayerY, rightPlayerWidth, rightPlayerHeight); //right player
    fill(leftPlayerColor);
    rect(50, leftPlayerY, leftPlayerWidth, leftPlayerHeight); //left player
    move();
    textSize(100);
    textAlign(CENTER);
    text(leftScore, Width / 2 - 100, Height / 4);
    fill(rightPlayerColor);
    text(rightScore, Width / 2 + 100, Height / 4);
    textSize(20);

    for (i = 0; i <= balls.length - 1; i++) {
      balls[i].show();
      balls[i].move();
    }

    for (let i = balls.length - 1; i >= 0; i--) { //score
      if (balls[i].offScreenRight()) {
        balls.splice(i, 1);
        leftScore += 1;
        fortniteAudio();
        this.d = setTimeout(ballSpawn, 1200);
      } else if (balls[i].offScreenLeft()) {
        balls.splice(i, 1);
        rightScore += 1;
        fortniteAudio();
        this.d = setTimeout(ballSpawn, 1200);
      }
    }
    textSize(30);
    fill(255);
    strokeWeight(9);
    line(Width / 2, 0, Width / 2, Height);
    strokeWeight(0);
    text('Main Menu', 1120, 25);
  }

  this.mousePressed = function () {
    if (mouseX > 1025 && mouseY < 50) {
      mgr.showScene(Title);
      leftScore = 0;
      rightScore = 0;
      rightPlayerY = Height / 2;
      leftPlayerY = Height / 2;
      balls = [];
      clearTimeout(this.d);
    }
  }
}



function Timed() {
  this.setup = function () {
    this.d = setInterval(ballSpawn, 7000);
  }
  this.draw = function () {
    background(backgroundColor);
    fill(255);
    fill(rightPlayerColor);
    rect(Width - 50 - rightPlayerWidth, rightPlayerY, rightPlayerWidth, rightPlayerHeight); //right player
    fill(leftPlayerColor);
    rect(50, leftPlayerY, leftPlayerWidth, leftPlayerHeight); //left player
    move();
    textSize(100);
    textAlign(CENTER);
    text(leftScore, Width / 2 - 100, Height / 4);
    fill(rightPlayerColor);
    text(rightScore, Width / 2 + 100, Height / 4);
    for (i = 0; i <= balls.length - 1; i++) {
      balls[i].show();
      balls[i].move();
    }

    for (let i = balls.length - 1; i >= 0; i--) { //score
      if (balls[i].offScreenRight()) {
        balls.splice(i, 1);
        leftScore += 1;
        fortniteAudio();
      } else if (balls[i].offScreenLeft()) {
        balls.splice(i, 1);
        rightScore += 1;
        fortniteAudio();
      }
    }
    textSize(30);
    fill(255);
    strokeWeight(9);
    line(Width / 2, 0, Width / 2, Height);
    strokeWeight(0);
    text('Main Menu', 1120, 25);
  }
  this.mousePressed = function () {
    if (mouseX > 1025 && mouseY < 50) {
      mgr.showScene(Title);
      leftScore = 0;
      rightScore = 0;
      rightPlayerY = Height / 2;
      leftPlayerY = Height / 2;
      balls = [];
      clearInterval(this.d);
    }
  }
}

function FreePlay() {
  this.draw = function () {
    background(backgroundColor);
  }
}

function SinglePlayer() {
  this.setup = function () {
    this.randoNum = 0;
  }
  this.draw = function () {
    fill(255);
    background(backgroundColor);
    strokeWeight(0);
    fill(rightPlayerColor);
    rect(Width - 50 - rightPlayerWidth, rightPlayerY, rightPlayerWidth, rightPlayerHeight); //right player
    fill(leftPlayerColor);
    rect(50, leftPlayerY, leftPlayerWidth, leftPlayerHeight); //left player
    move();
    textSize(100);
    textAlign(CENTER);
    text(leftScore, Width / 2 - 100, Height / 4);
    fill(rightPlayerColor);
    text(rightScore, Width / 2 + 100, Height / 4);
    textSize(20);
    this.AI();
    this.randomNum();
    for (i = 0; i <= balls.length - 1; i++) {
      balls[i].show();
      balls[i].move();
    }
    for (let i = balls.length - 1; i >= 0; i--) { //score
      if (balls[i].offScreenRight() && leftScore < 6) {
        balls.splice(i, 1);
        leftScore += 1;
        fortniteAudio();
        this.randoNum = 0;
        this.d = setTimeout(ballSpawn, 1200);
      } else if (balls[i].offScreenLeft() && rightScore < 6) {
        balls.splice(i, 1);
        rightScore += 1;
        fortniteAudio();
        this.randoNum = 0;
        this.d = setTimeout(ballSpawn, 1200);
      } else if (balls[i].offScreenRight() && leftScore == 6) {
        balls.splice(i, 1);
        leftScore += 1;
        fortniteAudio();
        this.randoNum = 0;
        mgr.showScene(leftWins);
      } else if (balls[i].offScreenLeft() && rightScore == 6) {
        balls.splice(i, 1);
        rightScore += 1;
        fortniteAudio();
        this.randoNum = 0;
        mgr.showScene(rightWins);
      }
    }
    textSize(30);
    fill(255);
    strokeWeight(9);
    line(Width / 2, 0, Width / 2, Height);
    strokeWeight(0);
    text('Main Menu', 1120, 25);
  }

  this.mousePressed = function () {
    if (mouseX > 1025 && mouseY < 50) {
      mgr.showScene(Title);
      leftScore = 0;
      rightScore = 0;
      rightPlayerY = Height / 2;
      leftPlayerY = Height / 2;
      balls = [];
      clearTimeout(this.d);
    }
  }

  this.AI = function () {
    for (i = 0; i < balls.length; i++) {
      if (balls[i].y > rightPlayerY + 3 * rightPlayerHeight / 4 + this.randoNum && balls[i].x > Width / 2) {
        rightPlayerY += AIspeed;
      } else if (balls[i].y < rightPlayerY + rightPlayerHeight / 4 + this.randoNum && balls[i].x > Width / 2) {
        rightPlayerY -= AIspeed;
      } else {
        rightPlayerY += 0;
      }
    }
  }

  this.randomNum = function () {
    for (i = 0; i < balls.length; i++) {
      if (balls[i].x < 100 && balls[i].x > 50) {
        this.randoNum = floor(Math.pow(random(-AIerror, AIerror), 3));
      }
    }
  }
}

function rightWins() {
  this.draw = function () {
    background(0);
    textSize(100);
    textAlign(CENTER);
    fill(leftPlayerColor);
    text(leftScore, Width / 2 - 100, Height / 4);
    fill(rightPlayerColor);
    text(rightScore, Width / 2 + 100, Height / 4);
    fill(255);
    noStroke();
    text('Player 2 Wins!', Width / 2, Height / 2);
    textSize(60);
    text('Play Again', Width / 2, 500);
    text('Main Menu', Width / 2, 600);
    strokeWeight(1.5);
    stroke(255);
    if (mouseX > 440 && mouseX < 760 && mouseY > 445 && mouseY < 515) {
      noFill();
      rect(440, 445, 320, 70);
    } else if (mouseX > 440 && mouseX < 760 && mouseY > 545 && mouseY < 615) {
      noFill();
      rect(440, 545, 320, 70);
    }
  }
  this.mousePressed = function () {
    if (mouseX > 440 && mouseX < 760 && mouseY > 445 && mouseY < 515) {
      mgr.showScene(SinglePlayer);
      leftScore = 0;
      rightScore = 0;
      rightPlayerY = Height / 2;
      leftPlayerY = Height / 2;
      balls = [];
      setTimeout(ballSpawn, 1200);
    } else if (mouseX > 440 && mouseX < 760 && mouseY > 545 && mouseY < 615) {
      mgr.showScene(Title);
      leftScore = 0;
      rightScore = 0;
      rightPlayerY = Height / 2;
      leftPlayerY = Height / 2;
      balls = [];
      clearTimeout(this.d);
    }
  }
}

function leftWins() {
  this.draw = function () {
    background(0);
    textSize(100);
    textAlign(CENTER);
    fill(leftPlayerColor);
    text(leftScore, Width / 2 - 100, Height / 4);
    fill(rightPlayerColor);
    text(rightScore, Width / 2 + 100, Height / 4);
    fill(255);
    noStroke();
    text('Player 1 Wins!', Width / 2, Height / 2);
    textSize(60);
    text('Play Again', Width / 2, 500);
    text('Main Menu', Width / 2, 600);
    strokeWeight(1.5);
    stroke(255);
    if (mouseX > 440 && mouseX < 760 && mouseY > 445 && mouseY < 515) {
      noFill();
      rect(440, 445, 320, 70);
    } else if (mouseX > 440 && mouseX < 760 && mouseY > 545 && mouseY < 615) {
      noFill();
      rect(440, 545, 320, 70);
    }
  }
  this.mousePressed = function () {
    if (mouseX > 440 && mouseX < 760 && mouseY > 445 && mouseY < 515) {
      mgr.showScene(SinglePlayer);
      leftScore = 0;
      rightScore = 0;
      rightPlayerY = Height / 2;
      leftPlayerY = Height / 2;
      setTimeout(ballSpawn, 1200);
    } else if (mouseX > 440 && mouseX < 760 && mouseY > 545 && mouseY < 615) {
      mgr.showScene(Title);
      leftScore = 0;
      rightScore = 0;
      rightPlayerY = Height / 2;
      leftPlayerY = Height / 2;
    }
  }
}




function move() {
  if (keyIsDown(UP_ARROW) && rightPlayerY > 0) {
    rightPlayerY -= playerSpeed;
  } else if (keyIsDown(DOWN_ARROW) && rightPlayerY < Height - rightPlayerHeight) {
    rightPlayerY += playerSpeed;
  } if (keyIsDown(87) && leftPlayerY > 0) {
    leftPlayerY -= playerSpeed;
  } else if (keyIsDown(83) && leftPlayerY < Height - leftPlayerHeight) {
    leftPlayerY += playerSpeed;
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
    this.ballAcceleration = 1.0001;
    this.x = Width / 2;
    this.y = Height / 2;
    this.random = random(2);
    this.random2 = random(-6, 6);
    if (this.random < 1) {
      this.Xvelocity = this.ballXvelocity;
    } else {
      this.Xvelocity = -this.ballXvelocity;
      //this.ballAcceleration*=-1;
    }
    this.Yvelocity = this.random2;
    this.terminalYvelocity = 15;
  }
  show() {
    fill(255, 255, 180);
    //noStroke();
    ellipse(this.x, this.y, ballRadius);
  }

  move() {
    this.y += this.Yvelocity;
    this.x += this.Xvelocity;
    if (this.x <= 50 + ballRadius / 2 + leftPlayerWidth && this.x > 50 && this.y >= leftPlayerY - ballRadius / 2 && this.y <= leftPlayerY + leftPlayerHeight / 2) { //bounce left paddle top half
      this.x = 50 + ballRadius / 2 + leftPlayerWidth;
      this.Xvelocity *= -1;
      paddleAudio();
      this.Yvelocity -= dist(this.x, this.y, 50, leftPlayerY + Height / 14) * dist(this.x, this.y, 50, leftPlayerY + Height / 14) * paddleEdgeBounceDampener;
    }

    if (this.x <= 50 + ballRadius / 2 + leftPlayerWidth && this.x > 50 && this.y > leftPlayerY + leftPlayerHeight / 2 && this.y <= leftPlayerY + leftPlayerHeight + ballRadius / 2) { //bounce left paddle bottom half
      this.x = 50 + ballRadius / 2 + leftPlayerWidth;
      this.Xvelocity *= -1;
      paddleAudio();
      this.Yvelocity += dist(this.x, this.y, 50, leftPlayerY + Height / 14) * dist(this.x, this.y, 50, leftPlayerY + Height / 14) * paddleEdgeBounceDampener;
    }

    if (this.x >= Width - 50 - rightPlayerWidth - ballRadius / 2 && this.x < Width - 50
      && this.y >= rightPlayerY - ballRadius / 2 && this.y <= rightPlayerY + rightPlayerHeight / 2) { //bounce right paddle top half
      this.x = Width - 50 - rightPlayerWidth - ballRadius / 2;
      this.Xvelocity *= -1;
      paddleAudio();
      this.Yvelocity -= dist(this.x, this.y, (Height * 1.7) - 75, rightPlayerY + Height / 14) * dist(this.x, this.y, (Height * 1.7) - 75, rightPlayerY + Height / 14) * paddleEdgeBounceDampener;
    }

    if (this.x >= Width - 50 - rightPlayerWidth - ballRadius / 2 && this.x < Width - 50
      && this.y >= rightPlayerY + rightPlayerHeight / 2 && this.y <= rightPlayerY + rightPlayerHeight + ballRadius / 2) { //bounce right paddle bottom half
      this.x = Width - 50 - rightPlayerWidth - ballRadius / 2;
      this.Xvelocity *= -1;
      paddleAudio();
      this.Yvelocity += dist(this.x, this.y, (Height * 1.7) - 75, rightPlayerY + Height / 14) * dist(this.x, this.y, (Height * 1.7) - 75, rightPlayerY + Height / 14) * paddleEdgeBounceDampener;
    }

    if (this.y >= Height - ballRadius / 2) { //bounce bottom wall
      this.y = Height - ballRadius / 2;
      this.Yvelocity *= -1;
      wallAudio();
    }

    if (this.y <= 0 + ballRadius / 2) { //bounce top wall
      this.y = 0 + ballRadius / 2;
      this.Yvelocity *= -1;
      wallAudio();
    }

    if (abs(this.Yvelocity) > this.terminalYvelocity && this.Yvelocity < 0) {
      this.Yvelocity = -this.terminalYvelocity;
    }
    if (abs(this.Yvelocity) > this.terminalYvelocity && this.Yvelocity > 0) {
      this.Yvelocity = this.terminalYvelocity;
    }
    this.Xvelocity *= this.ballAcceleration;
  }

  offScreenRight() {
    return (this.x > Width + ballRadius);
  }

  offScreenLeft() {
    return (this.x < 0 - ballRadius);
  }
}

ballSpawn = function () {
  balls.unshift(new Ball);
}
