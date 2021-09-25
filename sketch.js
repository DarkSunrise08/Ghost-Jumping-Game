var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostJump, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJump = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4;

  ghost = createSprite(300,300,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;

  ghost.setCollider("rectangle",-25,25,80,250);
  
}

function draw() {
  background(200);

  ghost.collide(climbersGroup);

  if(ghost.isTouching(invisibleBlockGroup)){
    gameState = "end"
  }

  if(gameState === "end"){
    ghost.visible = false;
    ghost.x = 300;
    ghost.y = 300;
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    climbersGroup.destroyEach();
    tower.velocityY = 0;
  }

  if(keyDown("SPACE")){
    ghost.velocityY = -6;
  }

  if(ghost.velocityX>0){
    ghost.velocityX-=0.045;
  }

  if(ghost.velocityX<0){
    ghost.velocityX+=0.045;
  }

  if(keyDown("RIGHT")){
    ghost.velocityX = 3;
  }

  if(keyDown("LEFT")){
    ghost.velocityX = -3;
  }

  if(keyDown("DOWN")){
    ghost.velocityY+=1;
  }

  ghost.velocityY+=0.25;
  
  if(tower.y > 250){
      tower.y = 0
      score+=1;
    }
  
    if(frameCount % 50 === 0 && gameState === "play"){
      doors();
    }

    drawSprites();  
    
    text(score,25,25);

    if(ghost.y>615 || ghost.y<-15){
      gameState = "end";
    }

    if(gameState === "end"){
      fill("red");
      textSize(25);
      text("Game Over", 250,250);
    }


    if(gameState === "end" && keyDown("SPACE")){
      reset();
    }
}

function doors(){
  door = createSprite(random(125,475),-100,20,20);
  door.addImage(doorImg);

  door.velocityY = 4;

  door.lifetime = 350;

  doorsGroup.add(door);

  climber = createSprite(door.x,door.y+65,20,20);
  climber.addImage(climberImg);

  climbersGroup.add(climber);

  climber.velocityY = 4;

  climber.lifetime = 350;

  invisibleBlock = createSprite(door.x,door.y+75,80,10);

  invisibleBlock.velocityY = 4;

  invisibleBlock.visible = false;

  invisibleBlockGroup.add(invisibleBlock);

  invisibleBlock.lifetime = 350;

  ghost.depth = climber.depth+1;
}

function reset(){
  ghost.x = 300;
  ghost.y = 300;
  ghost.visible = true;
  gameState = "play";
  tower.velocityY = 4;
  score = 0;
}
