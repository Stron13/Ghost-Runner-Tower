var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;

var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var jumpSound,spookySound;

var PLAY = 1
var END = 0
var gameState = PLAY

var score = 0
var gameOverImg,restartImg

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");

  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
  jumpSound = loadSound("jump.mp3");

  restartImg = loadImage("restart copy.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300,10,10);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,300,10,5);
  ghost.addImage("ghost-standing",ghostImg)
  ghost.scale=0.3;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);

  doorsGroup = new Group()
  climbersGroup = new Group()

  ghost.setCollider("rectangle",0,0,ghost.width,ghost.height);
  ghost.debug = false

  gameOver.visible = false;
  restart.visible = false;
  
}

function draw() {
  background(200);

  if(tower.y > 400){
      tower.y = 300
    }

   text("Score: "+ score, 500,50);
 
  if( gameState === PLAY){

    if(keyDown("left_arrow")){
      ghost.x -=3  
     }
  
     if(keyDown("right_arrow")){
      ghost.x +=3  
     }
  
     if(keyDown("space")){
      ghost.velocityY = -5  
     }
    
   
    //scoring
    score = score + Math.round(getFrameRate()/60);

    
   
    spawnClimbers()

    //jump when the space key is pressed
    if(keyDown("space")&& ghost >= 100) {
        ghost.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity
    ghost.velocityY = ghost.velocityY+0.8
   
    if(doorsGroup.isTouching(ghost)){
        jumpSound.play();
        gameState = END;
        spookySound.play();
    }
  }
  else if (gameState === END) {
    console.log(gameState)
    gameOver.visible = true;
    restart.visible = true;

    ghost.velocityY = 0;
    tower.velocityY = 0;
    
    //set lifetime of the game objects so that they are never destroyed
  doorsGroup.setLifetimeEach(-1);
  climbersGroup.setLifetimeEach(-1);
   
   doorsGroup.setVelocityYEach(0);
   climbersGroup.setVelocityYEach(0);  
   
   if(mousePressedOver(restart)) {
    reset();
  }
 }

    drawSprites()

  
}

function reset(){
  gameState = PLAY
  gameOver.visible=false
  restart.visible=false
  doorsGroup.destroyEach();
  climbersGroup.destroyEach();
  score=0
  spookySound.stop();
}




function spawnClimbers(){
  if (frameCount % 60 === 0) {
    var doors = createSprite(600,120,40,10);
    doors.x = Math.round(random(120,400));
    doors.addImage(doorImg);
    doors.velocityY = 2;
    
     //assign lifetime to the variable
    doors.lifetime = 400;
  
    //add each door to the group
    doorsGroup.add(doors);

    var climbers = createSprite(600,175,40,10);
    climbers.x = doors.x;
    climbers.addImage(climberImg);
    climbers.velocityY = 2;
    
     //assign lifetime to the variable
    climbers.lifetime = 400;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each climber to the group
    climbersGroup.add(climbers);
  }
}



