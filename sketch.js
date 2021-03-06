var balloon,balloon_Ani;
var database;
var position;

function preload(){
  bg = loadImage("images/Hot Air Ballon-01.png");
  balloon_Ani = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")
}

function setup() {
  createCanvas(1000,600);
  database = firebase.database();
  balloon = createSprite(184, 388, 50, 50);
  balloon.addAnimation("Flying",balloon_Ani)
  balloon.scale = 0.7;

  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(bg);
  textSize(30);
  fill("black")
  textFont("Forte")
  text("Use arrow keys to move the balloon!",30,50);
  if(keyDown(LEFT_ARROW)){
    writePosition(-5,0);
}
else if(keyDown(RIGHT_ARROW)){
    writePosition(5,0);
}
else if(keyDown(UP_ARROW)){
    writePosition(0,-5);
    balloon.addAnimation("hotAirBallon",balloon_Ani)
    balloon.scale = balloon.scale - 0.01
}
else if(keyDown(DOWN_ARROW)){
    writePosition(0,+5);
    balloon.addAnimation("hotAirBalloon", balloon_Ani)
    balloon.scale = balloon.scale + 0.01

    
}

  drawSprites();
}

function writePosition(x,y){
database.ref("balloon/position").set({
'x': position.x + x,
'y': position.y + y
})
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x
  balloon.y = position.y
}

function showError() {
  console.log("Error in writing to the Database")
}