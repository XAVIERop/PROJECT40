var PLAY = 1;
var END = 0;
var gameState = PLAY;
var unicorn, unicorn_running, unicorn_collided;
var ground
var birdGroup, birdImage, bird;
var score;
var gameOverImg, restartImg
var jumpSound, checkPointSound, dieSound
var bg
var backgroundImage
var object, objectImage
var trainImage
var trainGround
var trainsGroup
var bird_stop

function preload() {
  //background
  backgroundImage = loadImage("background.jpg")

  //unicorn
  unicorn_running = loadImage("ezgif.com-gif-maker.gif");
  unicorn_collided = loadImage("u1.png")

  //birdImage
  birdImage = loadImage("b1.gif")

  //endgame
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

  //trainImage
  trainImage = loadImage("train.png")

  //birdEndstate
  bird_stop = loadImage("bird12.png")


}

function setup() {
  createCanvas(600, 400)
  //display bg
  bg = createSprite(0, 0, 600, 600)
  bg.addImage("background", backgroundImage);
  bg.scale = 2.5

  //endgame prop.
  gameOver = createSprite(300, 100);
  gameOver.addImage("gameover", gameOverImg);


  restart = createSprite(300, 140);
  restart.addImage(restartImg);


  gameOver.scale = 0.5;
  restart.scale = 0.5;




  //score
  score = 0



  //unicorn prop.
  unicorn = createSprite(50, 200, 20, 50)
  unicorn.addImage("unicorn", unicorn_running);
  unicorn.scale = 0.8



  //ground
  trainGround = createSprite(200, 300, 900, 10);
  trainGround.visible = false

  //unicorn collided
  unicorn_co = createSprite(50, 250, 20, 50)
  unicorn_co.addImage("unicorn", unicorn_collided);
  unicorn_co.scale = 0.8

  //groups

  birdGroup = createGroup();
  trainsGroup = createGroup();

  unicorn.setCollider("circle", 0, 0, 50)

  unicorn.debug = false;


}

function draw() {


  if (gameState === PLAY) {

    //background velocity
    bg.velocityX = -4


    //getScore
    score = score + Math.round(getFrameRate() / 60);

    // visibility
    gameOver.visible = false;
    restart.visible = false;
    unicorn_co.visible = false

    //resetBg
    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }


    //space command
    if (keyDown("space") && unicorn.y >= 200) {
      unicorn.velocityY = -9;

    }
    //gravity
    unicorn.velocityY = unicorn.velocityY + 0.3

    //spawnItems
    spawnBirds()

    spawnTrain()

    if (trainsGroup.isTouching(unicorn)) {


      gameState = END;

    }
  } else if (gameState === END) {


    gameOver.visible = true;
    restart.visible = true;
    unicorn.visible = false;

    unicorn_co.visible = true


    unicorn.velocityY = 0
    trainsGroup.setVelocityXEach(0);
    birdGroup.setVelocityXEach(0);

    trainsGroup.setLifetimeEach(-1);
    birdGroup.setLifetimeEach(-1);


    bird.changeImage('birdstop');

    bg.velocityX = 0

    if (mousePressedOver(restart)) {
      reset();
    }
  }


  //colliding unicorn with ground
  unicorn.collide(trainGround);

  drawSprites();
  //score
  textSize(20)
  fill("white")
  textFont("Comic Sans MS")
  text("Score: " + score, 430, 50)



}

function reset() {
  gameState = PLAY;
  gameOver.visible = false
  restart.visible = false
  unicorn.visible = true
  trainsGroup.destroyEach()
  birdGroup.destroyEach()
  score = 0



}

function spawnBirds() {

  if (frameCount % 60 === 0) {
    bird = createSprite(400, 100, 20, 50)
    bird.addImage('birdfly', birdImage);
    bird.addImage('birdstop', bird_stop);
    bird.scale = 0.25
    bird.y = Math.round(random(50, 100));
    bird.velocityX = -3;
    bird.lifetime = 200;
    //adding to bird group
    birdGroup.add(bird);
  }
}


function spawnTrain() {

  if (frameCount % 150 === 0) {
    var train1 = createSprite(1200, 250,50,50);
    train1.collide(trainGround)
    train1.x = Math.round(random(400, 700));
    train1.addImage(trainImage);
    train1.scale = 0.4;
    train1.velocityX = -5;
    train1.lifetime = 250;
    trainsGroup.add(train1);
  }
}