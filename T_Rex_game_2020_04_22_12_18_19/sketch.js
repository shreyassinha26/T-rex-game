var trex , ground , invisibleGround , clouds , obstacles , gameover , restart;

var trexCollided , trexRunning  , restartImg , gameoverImg , groundImg , obs1 , obs2 , obs3 , obs4 , obs5 , obs6 , cloudsImg;

var checkpoint , die , jump;
var cloudGrp , obstaclesGrp;

var score , gamestate;

var PLAY , LOSE;
function preload(){
  trexRunning = loadAnimation("trex1.png" , "trex3.png" , "trex4.png");
  trexCollided = loadImage("trex_collided.png");
  restartImg = loadImage("restart.png");
  gameoverImg = loadImage("gameOver.png");
  groundImg = loadImage("ground2.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  cloudsImg = loadImage("cloud.png");
}

function setup() {
  createCanvas(600, 300);
  score = 0;
  //sprites
  trex = createSprite(50 , 225 , 10 , 10);
  ground = createSprite(0 , 268 , 400 , 20);
  invisibleGround = createSprite(0 , 270, 400 , 5);
  gameover = createSprite(300 , 130 , 40 , 40);
  restart = createSprite(300, 200, 40  , 40);
  
  //animations
  trex.addAnimation("running" , trexRunning);
  trex.scale = 1/2;
  
  ground.addImage("ground" , groundImg);
  gameover.addImage("game Over" , gameoverImg);
  restart.addImage("reset" , restartImg);
  
  invisibleGround.visible = false;
  gameover.visible = false;
  restart.visible = false;
  
  cloudGrp = createGroup();
  obstaclesGrp = createGroup();
  trex.setCollider("circle" , 0 ,  0,40);
  
  PLAY = 0;
  LOSE = 1;
  gamestate = PLAY
}
function draw() {
  background("white");
  if(frameCount%4 == 0&& gamestate == PLAY){
    score++;
  }
  text("Score : "+score , 10 , 10) ;
  ground.velocityX = -7;
  if(ground.x<0&& gamestate == PLAY){
    ground.x = ground.width/2;
  }
  trex.velocityY = trex.velocityY+0.8
  trex.collide(invisibleGround);
  if(keyDown("space")&&trex.isTouching(ground) && gamestate == PLAY){
    trex.velocityY = -12;
  }
  spawnClouds();   
  spawnObstacles();
  if(trex.isTouching(obstaclesGrp)){
     gamestate = LOSE;
    obstaclesGrp.setLifetimeEach(-1);
    cloudGrp.setLifetimeEach(-1);
    ground.velocityX = 0;
    obstaclesGrp.setVelocityXEach(0);
    cloudGrp.setVelocityXEach(0);
    trex.addImage("trex collided" , trexCollided);
    trex.changeAnimation("trex collided");
    trex.setVelocity(0 , 0);
    gameover.visible = true;
    restart.visible = true;
  
    
  }
  
  drawSprites();
}


function spawnClouds(){
  if(frameCount%60 == 0 && gamestate == PLAY){
    var cloud = createSprite(600,random(100 , 175) , 10  , 10);
    cloud.addImage( "Cloud", cloudsImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifeTime = 210;
    
    trex.depth = cloud.depth+1;
    cloudGrp.add(cloud);
  }
}
function spawnObstacles(){
  if(frameCount%50 == 0 && gamestate == PLAY){
    
    var r = Math.round(random(1 , 6));
    var obstacle = createSprite(600 , 255 , 10 , 10);
    switch (r){
      case 1:
        obstacle.addImage(obs1);
        break;
      case 2:
        obstacle.addImage(obs2);
        break;
      case 3:
        obstacle.addImage(obs3);
        break;
      case 4:
        obstacle.addImage(obs4);
        break;
        case 5:
        obstacle.addImage(obs5);
        break;
      case 6:
        obstacle.addImage(obs6);
        break;
    }
    obstacle.scale = 0.5;
    obstacle.velocityX = -7;
    obstacle.lifeTime = 100;
    obstaclesGrp.add(obstacle);
    
  }
  
}
