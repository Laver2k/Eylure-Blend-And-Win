//Add and place an image
logo = this.add.image(this.world.centerX, 100, 'logo');

//Add and place text
var beginButton = this.add.text(285, 775, "Terms", { font: "35px Verdana", fill: "#000" });  


//Preload a sprite
this.load.spritesheet('bat', 'assets/bats.png', 107, 80);

//Preload a sound
this.load.audio('menu', 'assets/menu.mp3');

//Play a sound effect
this.zombie2Sound = this.game.add.audio('zombie2', 1, false, true); // (Create function)
this.zombie2Sound.play() // (Wherever)

//Add an input to an image or text
beginButton.inputEnabled = true;
beginButton.events.onInputDown.add(this.start, this); // (Start is the function)


//Add gravity to a scene
game.physics.arcade.gravity.y = 1000;

//Make an item static
this.ground.body.allowGravity = false;

//Player animations
this.player.animations.add('run', [2, 3], 7, true); 
this.player.animations.add('jump', [1], 3, true); 
this.player.animations.add('dead', [0], 3, true);
this.player.animations.play('run');

//Background Gradient
var backgroundGradient = game.add.bitmapData(400, 600);
var grd = backgroundGradient.context.createLinearGradient(0,0,0,600);
grd.addColorStop(0,"#dddddd");
grd.addColorStop(1,"white");
backgroundGradient.context.fillStyle = grd;
backgroundGradient.context.fillRect(0,0,400,600);
game.add.sprite(0, 0, backgroundGradient);


//Random value 2
var x = this.rnd.between(-16, this.gameWidth-16);


//Random value with switch
randomValue = game.rnd.integerInRange(1, 2);
switch(randomValue) {
	case 1:
	var treeType = "tree1";
	var treeWidth = 10;
	var treeHeight = 43;
	var treeXOffset = 0;
	var treeYOffset = 0;
	break;
	case 2:
	var treeType = "tree2";
	var treeWidth = 10;
	var treeHeight = 40;
	var treeXOffset = 2;
	var treeYOffset = 0;
	break;
}


//Reuse sprite
if (gift && gift.name !== 'player') {
	gift.reset(x, y);
	gift.anchor.x = 0.5;
	gift.anchor.y = 0.5;
	gift.loadTexture('gift', 1);
	gift.body.velocity.y = this.scrollSpeed;
} else {
	gift = this.land.create(x, y, 'gift', 1);
	gift.anchor.x = 0.5;
	gift.anchor.y = 0.5;
	gift.body.velocity.y = this.scrollSpeed;
	gift.angle = this.rnd.between(0, 360);	
}


//If the item is off the top of the page, kill it.
checkY: function(item) {
	if (item.y < -32) {
		item.kill();
	}
},


//Detect for collisions every loop.
this.physics.arcade.overlap(this.player, this.land, this.collideItem, this.checkCollision, this);



// Call a function on a timer
this.time.events.loop(Phaser.Timer.SECOND * this.enemySpawnDelay, this.createEnemy, this);

//Go to the game over function after delay. 
this.time.events.add(1000, this.gameOver, this); 


//Directions
goLeft: function() {
	if (this.player.x > 30) { //check that the player isnt going off of the left edge - stop it if it is.
		this.player.body.velocity.x = -150;
		this.player.frame = 0;				
	} else {
		this.player.body.velocity.x = 0;
		this.player.frame = 1;					
	}
},
goRight: function() {
	if (this.player.x > 30) { //check that the player isnt going off of the left edge - stop it if it is.
		this.player.body.velocity.x = 150;
		this.player.frame = 2;				
	} else {
		this.player.body.velocity.x = 0;
		this.player.frame = 2;					
	}
}


//Jump
if ( game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.player.body.y == 470 ) {
	this.player.body.velocity.y = this.jumpVelocity;	
	this.player.body.gravity.y = this.playerGravity;		
	this.player.animations.play('jump');
	this.jumpSound.play();
}	
if (this.player.body.y < 20) {
	this.player.body.y = 20;
}

//Tween
tweenA = game.add.tween(bat).to({ x: 600, y: batHeight+50 }, 1000, "Quad.easeIn");
tweenB = game.add.tween(bat).to({ x: 200, y: batHeight+50 }, this.batSpeed, "Linear");
tweenC = game.add.tween(bat).to({ x: -200, y: batHeight-50 }, this.batSpeed, "Linear");
tweenA.chain(tweenB);
tweenB.chain(tweenC);
tweenA.start();
		


//Timer (create{})
this.timer.add(this.levelLength-800, this.stopObstaclesSpawn, this);
this.timer.add(this.levelLength, this.createGoal, this); 
this.timer.start();