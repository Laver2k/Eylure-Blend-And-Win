theGame.gameplay = function (game) {};

theGame.gameplay.prototype = {

	init: function() { 

	    gtag('event', 'Game played', {
	      'event_category': 'General'
	    });

	    //Background and animations
		this.add.image(0, 0, 'stage-background', 'club-background.png');
		this.backgroundLights = this.add.image(0, 0, 'stage-background', 'club-background-lights.png');
		var backgroundLightsTween = game.add.tween(this.backgroundLights).to({ alpha: 0 }, 2000, "Linear", true, 0, Number.MAX_VALUE, true).loop(true);
	    this.dj = game.add.sprite(200, 220, 'game-elements', 'DJ_01.png');
	    this.dj.animations.add('bop', Phaser.Animation.generateFrameNames('DJ_', 0, 10, '.png', 2), 15, true);
	    this.dj.animations.add('arm-raise', Phaser.Animation.generateFrameNames('DJ_', 11, 39, '.png', 2), 20, false);
		this.dj.animations.currentAnim.onComplete.add(function () {	this.dj.play('bop');}, this);
  		this.dj.play('bop');

  		//White flash behind DJ decks
		this.lightRectangle = game.add.bitmapData(game.width, game.height);
		this.lightRectangle.ctx.beginPath();
		this.lightRectangle.ctx.rect(0, 0, game.width, game.height);
		this.lightRectangle.ctx.fillStyle = '#ffffff';
		this.lightRectangle.ctx.fill();
		this.djLight = game.add.sprite(game.world.centerX, game.world.centerY, this.lightRectangle);
		this.djLight.anchor.setTo(0.5, 0.5);
		this.djLight.alpha = 0;

		//More background and animation elements
  		this.add.image(0, 0, 'stage-background', 'dj-lights.png');
		this.add.image(0, 270, 'stage-background', 'decks.png');
	    this.discoball = game.add.sprite(220, -100, 'game-elements', 'ball-1.png');
	    this.discoball.animations.add('flash', Phaser.Animation.generateFrameNames('ball-', 0, 3, '.png', 1), 2, true);
  		this.discoball.play('flash');
	    this.discoball = game.add.sprite(0, 525, 'game-elements', 'floor-1.png');
	    this.discoball.animations.add('colour-switch', Phaser.Animation.generateFrameNames('floor-', 0, 3, '.png', 1), 3, true);
  		this.discoball.play('colour-switch');


  		//Spotlight and animations
  		//white left
  		this.light1 = this.add.image(game.width, 50, 'stage-background', 'light-1.png');
  		this.light1.anchor.setTo(1, 0);
		var light1Tween = game.add.tween(this.light1).to({ angle: 20 }, 3000, "Linear", true, 0, Number.MAX_VALUE, true).loop(true);
		//blue
  		this.light2 = this.add.image(-100, 0, 'stage-background', 'light-2.png');
  		this.light2.anchor.setTo(0, 0);
		var light2Tween = game.add.tween(this.light2).to({ angle: -15 }, 5500, "Linear", true, 0, Number.MAX_VALUE, true).loop(true);
		//red
  		this.light3 = this.add.image(-100, 0, 'stage-background', 'light-3.png');
  		this.light3.anchor.setTo(0, 0);
		var light3Tween = game.add.tween(this.light3).to({ angle: -10 }, 2750, "Linear", true, 0, Number.MAX_VALUE, true).loop(true);
		//white right
  		this.light4 = this.add.image(300, 0, 'stage-background', 'light-4.png');
  		this.light4.anchor.setTo(0, 0);
		var light4Tween = game.add.tween(this.light4).to({ angle: -10 }, 2750, "Linear", true, 0, Number.MAX_VALUE, true).loop(true);

		//score
  		this.scoreLabel = this.add.image(550, 30, 'game-elements', 'label-score.png');

  		//Face group and lash group
		this.faces = this.add.group();
		this.leftLashGroup = this.add.group();
		this.rightLashGroup = this.add.group();

		this.faceWidth = 545;
		this.faceTweenDistance = 260;


		//Lash brushes
		this.brushLeftY = 420;
		this.brushLeft = this.add.image(this.faceWidth/2-250, this.brushLeftY, 'game-elements', 'brush-left.png');
		this.brushLeft.anchor.setTo(0,1);
		this.brushLeft.alpha = 0;
		this.brushRightY = 420;
		this.brushRight = this.add.image(this.faceWidth+70, this.brushRightY, 'game-elements', 'brush-right.png');
		this.brushRight.anchor.setTo(1,1);
		this.brushRight.alpha = 0;


		//Faces, lash data and animations
  		this.leftFace = game.add.sprite(-this.faceWidth, 100, 'game-elements', 'face-1.png');
  		this.leftFace.animations.add('frames', Phaser.Animation.generateFrameNames('face-', 1, 4, '.png', 0), 5, true);

  		this.rightFace = game.add.sprite(game.width, 100, 'game-elements', 'face-1.png');
  		this.rightFace.animations.add('faces', Phaser.Animation.generateFrameNames('face-', 5, 8, '.png', 1), 5, true);

		this.leftLash = game.add.sprite(80, -50, 'game-elements', 'lash-left.png');
		this.rightLash = game.add.sprite(-35, -85, 'game-elements', 'lash-right.png');

		this.leftLashGroup.add(this.leftLash);
		this.rightLashGroup.add(this.rightLash);
		this.leftLashGroup.position.x = -999;
		this.leftLashGroup.position.y = -999;
		this.rightLashGroup.position.x = -999;
		this.rightLashGroup.position.y = -999;

  		this.leftFace.side = "left";
  		this.rightFace.side = "right";

		this.leftFace.correct = true;
		this.rightFace.correct = true;

		this.leftFace.events.onInputDown.add(this.smack, this);
		this.rightFace.events.onInputDown.add(this.smack, this);

		this.faces.add(this.leftFace);
		this.faces.add(this.rightFace);

		//Eylure logo
		this.logo = this.add.image(465, 640, 'ui', 'logo.png');


	    //Sound toggle button
	    this.soundButton = this.add.sprite(20, 645, 'ui', 'sound-1.png' ); 
	    this.soundButton.scale.setTo(0.5);
	    this.soundButton.animations.add('frames', Phaser.Animation.generateFrameNames('sound-', 1, 2, '.png', 1));
	    this.soundButton.inputEnabled = true;
	    this.soundButton.input.useHandCursor = true;
	    this.soundButton.events.onInputDown.add(this.soundToggle, this);


		//Incorrect red overlay
	    this.incorectFlash = game.add.bitmapData(game.width, game.height);
	    this.incorectFlash.ctx.beginPath();
	    this.incorectFlash.ctx.rect(0, 0, game.width, game.height);
	    this.incorectFlash.ctx.fillStyle = '#a60000';
	    this.incorectFlash.ctx.fill();
	    this.incorectFlash = game.add.sprite(game.world.centerX, game.world.centerY, this.incorectFlash);
	    this.incorectFlash.anchor.setTo(0.5, 0.5);
	    this.incorectFlash.alpha = 0;

		//State transition overlay
	    this.faderLight = game.add.bitmapData(game.width, game.height);
	    this.faderLight.ctx.beginPath();
	    this.faderLight.ctx.rect(0, 0, game.width, game.height);
	    this.faderLight.ctx.fillStyle = '#ffffff';
	    this.faderLight.ctx.fill();
	    this.faderLight = game.add.sprite(game.world.centerX, game.world.centerY, this.faderLight);
	    this.faderLight.anchor.setTo(0.5, 0.5);
	    this.faderLight.alpha = 1;
	    this.fadeIn();

		//Difficulty
		this.faceTweenSpeed = 900;
		this.spawnDelay = 1000;
		this.retractDelay = 1100;

		//Audio
		this.wrongSound = this.game.add.audio('wrong', 1, false, true);
		this.correctSound = this.game.add.audio('correct', 1, false, true);

    	//this.music.play();

    	//Timer
		this.startTime = new Date();
		this.totalTime = 33;

		//Dont alter these

		this.facesRetracting = false;
		this.timeElapsed = 0;		
		this.theScore = 0;

	},




	//Transition the state in
	fadeIn: function() {
		var tween = game.add.tween(this.faderLight).to({ alpha: 0}, 500, "Linear", true);
		tween.start();
	},

	//Transition the state out
	fadeOut: function(button) {
		var tween = game.add.tween(this.faderLight).to({ alpha: 1}, 500, "Linear", true);
		tween.start();
		tween.onComplete.add(function(){this.state.start(button.nextState, true, false);}, this);
	},

	//Show a set of faces
	showSetofFaces: function() {

		if (this.facesRetracting === true) {
			return;
		}


		//Randomly choose faces to show and which side the wonky lash will be on
		var leftFaceFrame = game.rnd.integerInRange(1, 4); //0,3
		var rightFaceFrame= game.rnd.integerInRange(5, 8); //4,7
		var badLash = game.rnd.integerInRange(1, 2); //1,2

		leftFaceFrame = "face-"+leftFaceFrame+".png";
		rightFaceFrame = "face-"+rightFaceFrame+".png";

		if(badLash === 1 ) {
			this.leftFace.correct = true;
			this.rightFace.correct = false;
		} else {
			this.leftFace.correct = false;
			this.rightFace.correct = true;
		}

		this.leftFace.frameName = leftFaceFrame;
		this.showFace(this.leftFace);

		this.rightFace.frameName = rightFaceFrame;
		this.showFace(this.rightFace);

	},


	//User has clicked a face, so update score and retract the set of faces
	smack: function(face) {

		if(face.correct === true) {
			this.theScore = this.theScore+10;	
			if(theGame.playSounds){
				this.correctSound.play();		
			}
			if(face.side ==="left") {
				this.fixLeftLash();
			}	else {
				this.fixRightLash();
			}
		} else {

			this.wrongChoice();

			this.theScore = this.theScore-10;	
			if(theGame.playSounds){
				this.wrongSound.play();		
			}
		}
		this.theScoreCounter.text = this.theScore;	

		this.faces.forEach(function(face) {
			//If it hasnt been selected
			if(face.inputEnabled===true) {
				face.inputEnabled = false;
			} 
		}, this);


	//	this.retractFaces();
	},

	//Animations when the left lash has been corrected
	fixLeftLash: function() {

		this.brushLeft.position.y = this.brushLeftY;
		this.brushLeft.angle = 0;

		var brushMotionTween = game.add.tween(this.brushLeft).to({ y:this.brushLeft.position.y-70 }, 300, "Linear", false);
		brushMotionTween.start();

		var brushAngleTween = game.add.tween(this.brushLeft).to({ angle:-20 }, 300, "Linear", false);
		brushAngleTween.start();

		var brushAlphaTween = game.add.tween(this.brushLeft).to({ alpha: 1 }, 300, "Linear", true);
		brushAlphaTween.yoyo(true, 0);

		var lashTween = game.add.tween(this.leftLash).to({ alpha: 0}, 300, "Linear", true);
		lashTween.start();

		this.dj.play('arm-raise');

	},

	//Animations when the right lash has been corrected
	fixRightLash: function() {
		this.brushRight.position.y = this.brushRightY;
		this.brushRight.angle = 0;

		var brushMotionTween = game.add.tween(this.brushRight).to({ y:this.brushRight.position.y-70 }, 300, "Linear", false);
		brushMotionTween.start();

		var brushAngleTween = game.add.tween(this.brushRight).to({ angle:20 }, 300, "Linear", false);
		brushAngleTween.start();

		var brushAlphaTween = game.add.tween(this.brushRight).to({ alpha: 1 }, 300, "Linear", true);
		brushAlphaTween.yoyo(true, 0);

		var lashTween = game.add.tween(this.rightLash).to({ alpha: 0}, 300, "Linear", true);
		lashTween.start();

		this.dj.play('arm-raise');
	},


	//Hide the current set of faces and add a timer to show the next set of faces
	retractFaces: function() {

		if (this.facesRetracting === true) {
			return;
		}

		this.facesRetracting = true;

		this.faces.forEach(function(face) {
			//If it hasnt been selected
			//if(face.inputEnabled===true) {

				face.inputEnabled = false;
				this.game.time.events.add(0, this.retractFace, this, face); 
			//} 
		}, this);
		this.game.time.events.add(this.spawnDelay, this.showSetofFaces, this); 
	},


	//Function to animate an individual face
	showFace: function(face) {


		//How far to tween the face
		if(face.side==="left") {
			var newXPosition = face.position.x+this.faceTweenDistance;
		} else {
			var newXPosition = face.position.x-this.faceTweenDistance;
		}

		//Reset lashes
		this.rightLash.alpha = 1;
		this.leftLash.alpha = 1;
		this.leftLashGroup.position.y = 390;
		this.rightEyeXOffset = 160;
		this.rightLashGroup.position.y = 380;

		//Reposiion the lash depending on the face graphic used.
		switch(face._frame.name) {
			case "face-1.png":
				//man
				this.leftEyeXOffset = 100;
				this.leftEyeYOffset = 0;
			break;
			case "face-2.png":
				//brown hair lady
				this.leftEyeXOffset = 105;
				this.leftEyeYOffset = 3;
			break;
			case "face-3.png":
				//platinum lady
				this.leftEyeXOffset = 100;
				this.leftEyeYOffset = 10;
			break;
			case "face-4.png":
				//black hair lady
				this.leftEyeXOffset = 110;
				this.leftEyeYOffset = 5;
			break;
			case "face-5.png":
				//black lady
				this.rightEyeXOffset = 200;
				this.rightEyeYOffset = 60;
			break;
			case "face-6.png":
				//man
				this.rightEyeXOffset = 165;
				this.rightEyeYOffset = 55;
			break;
			case "face-7.png":
				//blonde lady
				this.rightEyeXOffset = 200;
				this.rightEyeYOffset = 47;
			break;
			case "face-8.png":
				//brunette lady
				this.rightEyeXOffset = 190;
				this.rightEyeYOffset = 50;
			break;
		}

		//Where to start the lash tween from
		this.leftLashGroup.position.x = 0-this.faceWidth/2+this.leftEyeXOffset;
		this.rightLashGroup.position.x = game.width+this.faceWidth/2-this.rightEyeXOffset;
		this.leftLashGroup.position.y = this.leftLashGroup.position.y+this.leftEyeYOffset;
		this.rightLashGroup.position.y = this.rightLashGroup.position.y+this.rightEyeYOffset;

		//Face Tween
		var faceTween = game.add.tween(face).to({ x: newXPosition }, this.faceTweenSpeed, "Quad.easeIn", false);
		faceTween.onComplete.add(this.enableClick, face);
		faceTween.start();

		//Left Lash Tween
		if(face.side==="left" && face.correct===true) {
			var lashTween = game.add.tween(this.leftLashGroup).to({ x: this.leftLashGroup.position.x+this.faceTweenDistance }, this.faceTweenSpeed, "Quad.easeIn", false);
			//lashTween.onComplete.add(this.enableClick, face);
			lashTween.start();
		}


		//Right Lash Tween
		if(face.side==="right" && face.correct === true) {
			var lashTween = game.add.tween(this.rightLashGroup).to({ x: this.rightLashGroup.position.x-this.faceTweenDistance }, this.faceTweenSpeed, "Quad.easeIn", false);
			//lashTween.onComplete.add(this.enableClick, face);
			lashTween.start();
		}



		//Retract faces if too user doesnt click one in time
		this.game.time.events.add(this.faceTweenSpeed+this.retractDelay, this.retractFaces, this); 

	},



	//Move face off-screen
	retractFace: function(face) {

		if(face.side=="left") {
			var newXPosition = face.position.x-this.faceTweenDistance ;
		} else {
			var newXPosition = face.position.x+this.faceTweenDistance ;
		}
		tween = game.add.tween(face).to({ x: newXPosition}, this.faceTweenSpeed, "Quad.easeIn", true);

		//Only increase difficulty one time, so attach it to just 1 tween (left side tween).
		if(face.side=="left") {
			tween.onComplete.add(this.difficultyUp, this);
			//Lash Tween
			var lashTweenA = game.add.tween(this.leftLashGroup).to({ x: this.leftLashGroup.position.x-this.faceTweenDistance }, this.faceTweenSpeed, "Quad.easeIn", false);
			//lashTween.onComplete.add(this.enableClick, face);
			lashTweenA.start();
		} else {
			var lashTweenB = game.add.tween(this.rightLashGroup).to({ x: this.rightLashGroup.position.x+this.faceTweenDistance }, this.faceTweenSpeed, "Quad.easeIn", false);
			//lashTween.onComplete.add(this.enableClick, face);
			lashTweenB.start();
		}

		//this.leftLashGroup.position.y = 380;

	},

	difficultyUp: function() {

		//Flag that the faces arent on view any more
		this.facesRetracting = false;

		/*
		this.faceTweenSpeed = 1000;
		this.spawnDelay = 1500;
		this.retractDelay = 500;
		console.log(this.faceTweenSpeed);
		*/


		//Updates variables to make game more difficult
		if(this.spawnDelay> 700) {
			this.spawnDelay = this.spawnDelay-50;
		}

		if(this.faceTweenSpeed> 500) {

			this.faceTweenSpeed = this.faceTweenSpeed-100;
		}

		if(this.retractDelay > 300) {
			this.retractDelay = this.retractDelay-85;
		}

	},

	//Take a face and enable input on it.
	enableClick: function(face) {
		face.inputEnabled = true;
		face.input.useHandCursor = true;

	},


	//Animation - flahs the DJs lights behind the deck
	djLightsFlash: function(){
		var flashTween = game.add.tween(this.djLight).to({ alpha: 0.1 }, 200, "Linear", true);
		flashTween.yoyo(100);
	},


	//Flash red when user makes wrong choice
	wrongChoice: function() {
		var wrongTween = game.add.tween(this.incorectFlash).to({ alpha: 0.6 }, 300, "Linear", true);
		wrongTween.yoyo(200);
	},


	create: function() {
		this.stage.backgroundColor = "#000000";
		//Timer
		this.createTimer();
		this.gameTimer = game.time.events.loop(100, this.updateTimer, this);
		//Light flash Animation
		this.lightsFlash = game.time.events.loop(1000, this.djLightsFlash, this);
		//Delay before showing first set of faces
		this.game.time.events.add(2000, this.showSetofFaces, this); 
		//Score text display
		this.theScoreCounter = this.add.text(580, 60, this.theScore, { font: "50px Johnston", fill: "#f0668e" }); 
		this.theScoreCounter.anchor.setTo(0.5, 0);
	},

 
	update: function() {


		//Time
		if(this.timeElapsed >= this.totalTime){
			//When time is up, go to success or fail page depending on the current score
		    if(this.theScore >= 100){
		    	this.state.start('success', true, false);
		    } else {
		    	this.state.start('fail', true, false);
		    }
		}
	},

	//Timer
	createTimer: function(){
	    this.timeLabel = this.game.add.text(50, 20, this.totalTime, {font: "40px Johnston", fill: "#fff"});
	    this.timeLabel.anchor.setTo(0.5, 0);
	    this.timeLabel.align = 'center';
	},

	//Timer
	updateTimer: function(){
	    var currentTime = new Date();
	    var timeDifference = this.startTime.getTime() - currentTime.getTime();
	    this.timeElapsed = Math.abs(timeDifference / 1000);
	    var timeRemaining = this.totalTime - this.timeElapsed;
	    var minutes = Math.floor(timeRemaining / 60);
	    var seconds = Math.floor(timeRemaining) - (60 * minutes);

	    //Exclude 'warm up' time from the timer
	    if(seconds>30) {
	    	seconds = 30;
	    }
	    var result = (seconds < 10) ? "0" + seconds :  seconds;
	    this.timeLabel.text = result;
	},


  //Toggle sound
  soundToggle: function() {
    if(theGame.playSounds) {
      theGame.playSounds = false;
      this.soundButton.frame = 0;
      game.sound.mute = true;
      this.soundButton.frameName = "sound-2.png";
    } else {
      theGame.playSounds = true;
      this.soundButton.frame = 0;
      game.sound.mute = false;
        this.soundButton.frameName = "sound-1.png";
    }
  },


};



