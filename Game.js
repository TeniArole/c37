class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef =  await database.ref('playerCountRef').once("value")
      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val()
        player.getCount();
      }

      
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide()
    textSize(30)
    text("Game Start", 130, 150)
    Player.getPlayerInfo()
   
    if(allPlayers !== undefined){
    var displayPosition = 130
    for(var i in allPlayers)
    if(i === "Player" + player.index){
      fill("red")
    }
    else{
      fill("black")
    }
    displayPosition += 30
    textSize(15)
    text(allPlayers[i].name + ":" + allPlayers[i].distance, 120, displayPosition)
  }
  if(keyIsDown(UP_ARROW) && player.index !== null){
    player.distance += 50
    player.update();
  }
  }

}
