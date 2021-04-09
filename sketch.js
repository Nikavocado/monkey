
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground,invisible;
var survivalTime=0;
var gameState;
var PLAY,END;
var end;
 

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(500,600);
  PLAY=1;
  gameState=PLAY;
  END=0;
  
    FoodGroup= new Group();
  obstacleGroup= new Group();
  
  monkey =createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
   ground=createSprite(400,350,900,10);
  ground.velocityX=4; 
  
  console.log(ground.x)
   
}


function draw() {
background("pink");
   
  if(gameState===PLAY){
    
    if(ground.x<0){
  ground.x=ground.width/2
  
}


  


    
     if(keyDown("space")&&monkey.y>=300) {
       monkey.velocityY= -20;
       
       
     }
    monkey.velocityY = monkey.velocityY + 0.9;
     score = Math.round(frameCount / 3);
    survivalTime = Math.ceil(frameCount / frameRate());
     ground.velocityX = -(5 + 2 * score / 100);
    
     Food();
   Obstacle();

    if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
  }
   
  

    if (obstacleGroup.isTouching(monkey)) {
      GameState = END;
    }

} 
  else if (GameState === END) {
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    //monkey.changeAnimation("monkey_running",end);
    
    

  }


  //gravity
  

  monkey.collide(ground);

  stroke("black");
  textSize(20);
  fill("red");
  text("score:" + score, 400, 50);

  stroke("black");
  textSize(20);
  fill("black");
  text("survival Time:" + survivalTime, 100, 50);





  drawSprites();
}

function Food() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 40, 400);

  }

}

function Obstacle() {

  if (frameCount % 200 === 0) {
    var obstacle = createSprite(500, 330, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(200);
    // obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 200)
  }
}