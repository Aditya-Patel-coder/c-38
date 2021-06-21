var bow, arrow, background, redB, pinkB, greenB, blueB, arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage, blue_balloonImage, backgroundImage;


var score;
localStorage["HighestScore"] = 0;

function preload() {

  backgroundImage = loadImage("background0.png");

  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");

}

function setup() {
  createCanvas(displayWidth - 40, displayHeight-120);

  //creating background
  background = createSprite(0, 0,600, 600);
  background.addImage(backgroundImage);
  background.scale = 2.5

  // creating bow to shoot arrow
  bow = createSprite(480, 220, 20, 50);
  bow.addImage(bowImage);
  bow.scale = 1;

  score = 0;
  redB = new Group();
  greenB = new Group();
  blueB = new Group();
  pinkB = new Group();
  arrowGroup = new Group();

}

function draw() {
 
  
  camera.x = bow.x;
  camera.y = bow.y;

  

  background.velocityX = -3

  if (background.x < 0) {
    background.x = background.width / 2;
  }

  bow.y = World.mouseY;

  if (keyWentDown("space")) {
    createArrow();
  }

  var select_balloon = Math.round(random(1, 4));

  if (World.frameCount % 40 === 0) {
    if (select_balloon === 1) {
      redBalloon();
    } else if (select_balloon === 2) {
      greenBalloon();
    } else if (select_balloon === 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }

  if (arrowGroup.isTouching(redB)) {
    redB.destroyEach();
    arrowGroup.destroyEach();
    score = score + 1;
  }

  if (arrowGroup.isTouching(greenB)) {
    greenB.destroyEach();
    arrowGroup.destroyEach();
    score = score + 5;
  }

  if (arrowGroup.isTouching(blueB)) {
    blueB.destroyEach();
    arrowGroup.destroyEach();
    score = score + 10;
  }

  if (arrowGroup.isTouching(pinkB)) {
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    score = score + 15;
  }



  drawSprites();



  textSize(20);
  fill("black");
  text("Deaths : ", 5, 30);
  text("Points :", 5, 470);
  text("Score: " + score, 210, 30);

  fill("red");
  text("Red : 1", 85, 470);

  fill("green");
  text("Green : 5", 165, 470);

  fill("darkblue");
  text("Blue : 10", 265, 470);

  fill("pink");
  text("Pink : 15", 370, 470);


}



function redBalloon() {
  var red = createSprite(0, Math.round(random(20, 300)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 5;
  red.lifetime = 200;
  red.scale = 0.1;
  redB.add(red);

}

function blueBalloon() {
  var blue = createSprite(Math.round(random(20, 370)), 0, 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityY = 7;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
}



function greenBalloon() {
  var green = createSprite(0, Math.round(random(20, 350)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 6;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
}



function pinkBalloon() {
  var pink = createSprite(Math.round(random(20, 370)), 0, 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityY = 8;
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
}

// Creating  arrows for bow
function createArrow() {
  var arrow = createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 480;
  arrow.y = bow.y;
  arrow.velocityX = -10;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);


}

function reset(){
  gameState = PLAY;
  arrow.visible = false;
  restart.visible = false;
  
  arrowGroup.destroyEach();
  
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}