var hypnoticBalloon, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBalloon = createSprite(250,250,10,10);
  hypnoticBalloon.shapeColor = "red";


  var hypnoticBalloonPosition = database.ref('balloon');
  hypnoticBalloonPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('balloon').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBalloon.x = position.x;
  hypnoticBalloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
