theGame.menu = function (game) {};

theGame.menu.prototype = {

  create: function() {

    //Background
    this.stage.backgroundColor = "#ffffff";
    this.add.image(0, 0, 'ui', 'menu-background.png');

    //Window lights
    this.windowLights = this.add.image(55, 240, 'ui', 'window-lights.png');
    this.windowLights.alpha = 0.5;
    var windowLightsTween = game.add.tween(this.windowLights).to({ alpha: 0 }, 500, "Linear", true, 0, Number.MAX_VALUE, true).loop(true);

    //Title
    this.title = this.add.image(game.width/2, 80, 'ui', 'title.png');
    this.title.anchor.setTo(0.5, 0);


    //T&Cs link
    this.termsLink = this.add.button(game.width/2, 680, 'ui', this.openTerms, this, 'terms-link.png', 'terms-link.png', 'terms-link.png', 'terms-link.png' );
    this.termsLink.anchor.setTo(0.5);



    //Twitter Button
    this.share = this.add.image(555, 15, 'ui', 'share.png');
    this.twitterButton = this.add.button(570, 57, 'ui2', this.twitterShare, this, 'twitter.png', 'twitter.png', 'twitter.png', 'twitter.png' );
    this.twitterButton.anchor.setTo(0.5);
    this.twitterButton.scale.setTo(0.6);


    //Facebook Button
    this.facebookButton = this.add.button(610, 55, 'ui2', this.facebookShare, this, 'facebook.png', 'facebook.png', 'facebook.png', 'facebook.png' );
    this.facebookButton.anchor.setTo(0.5);
    this.facebookButton.scale.setTo(0.6);


    //More background elements
    this.add.image(0, 555, 'ui', 'spotlights.png');
    this.add.image(-20, 400, 'ui', 'ropes.png');
    this.leftSpotlights = this.add.image(20, 580, 'ui', 'menu-lights-left.png');
    this.leftSpotlights.anchor.setTo(0,1);
    var leftSpotlightsTween = game.add.tween(this.leftSpotlights).to({ angle: 10}, 3000, "Linear", true, 0, Number.MAX_VALUE, true).loop(true);
    this.rightSpotlights = this.add.image(610, 580, 'ui', 'menu-lights-right.png');
    this.rightSpotlights.anchor.setTo(1,1);
    var rightSpotlightsTween = game.add.tween(this.rightSpotlights).to({ angle: -10}, 3000, "Linear", true, 0, Number.MAX_VALUE, true).loop(true);



  	//Play Button
    this.beginButton = this.add.button(game.width/2, 330, 'ui', this.fadeOut, this, 'btn-play.png', 'btn-play.png', 'btn-play.png', 'btn-play.png' );
    this.beginButton.anchor.setTo(0.5);
    this.beginButton.nextState = 'gameplay';

    //Instructions button
    this.instructionsButton = this.add.button(game.width/2, 415, 'ui', this.fadeOut, this, 'btn-instructions.png', 'btn-instructions.png', 'btn-instructions.png', 'btn-instructions.png' );
    this.instructionsButton.anchor.setTo(0.5);
    this.instructionsButton.nextState = 'instructions';

    //Prizes button
    this.prizesButton = this.add.button(game.width/2, 495, 'ui', this.fadeOut, this, 'btn-prizes.png', 'btn-prizes.png', 'btn-prizes.png', 'btn-prizes.png' );
    this.prizesButton.anchor.setTo(0.5); 
    this.prizesButton.nextState = 'prizes';

    //Sound toggle button
    this.soundButton = this.add.sprite(20, 645, 'ui', 'sound-1.png' ); 
    this.soundButton.scale.setTo(0.5);
    this.soundButton.animations.add('frames', Phaser.Animation.generateFrameNames('sound-', 1, 2, '.png', 1));
    this.soundButton.inputEnabled = true;
    this.soundButton.input.useHandCursor = true;
    this.soundButton.events.onInputDown.add(this.soundToggle, this);

    //Play music
    if(!this.music && theGame.playSounds) {
      this.music = this.game.add.audio('music', 1, true, true);
      this.music.play();
    }

    //Sound for button
    this.buttonSound = this.game.add.audio('button', 1, false, true);

    //state transition overlay
    this.faderLight = game.add.bitmapData(game.width, game.height);
    this.faderLight.ctx.beginPath();
    this.faderLight.ctx.rect(0, 0, game.width, game.height);
    this.faderLight.ctx.fillStyle = '#ffffff';
    this.faderLight.ctx.fill();
    this.faderLight = game.add.sprite(game.world.centerX, game.world.centerY, this.faderLight);
    this.faderLight.anchor.setTo(0.5, 0.5);
    this.faderLight.alpha = 1;
    this.fadeIn();
  },

  //Transition state in
  fadeIn: function() {
    var tween = game.add.tween(this.faderLight).to({ alpha: 0}, 500, "Linear", true);
    tween.start();
  },

  //Transition state out
  fadeOut: function(button) {

    if(theGame.playSounds) {
      this.buttonSound.play();
    }

    gtag('event', 'Button Clicks', {
      'event_category': 'General',
      'event_label': 'Menu: '+ button.nextState,
    });

    var tween = game.add.tween(this.faderLight).to({ alpha: 1}, 500, "Linear", true);
    tween.start();

    tween.onComplete.add(function(){

      if(button.nextState==="instructions") {
        this.state.start(button.nextState, true, false, "full");
      } else if(button.nextState==="gameplay") {
        this.state.start("instructions", true, false, "simple");
      }else {
        this.state.start(button.nextState, true, false);
      }
    }, this);
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

  //Play game
  start: function() {
    this.state.start('gameplay', true, false);
  },

  openTerms: function() {
    window.open("https://www.eylure.com/terms-conditions/#bac");
  },

  //share on twitter
  twitterShare: function() {
    if (this.clickable === false ) {
      return;
    } else {
      this.clickable = false;
    }
    window.open("http://twitter.com/intent/tweet?url=https://blendandcare.eylure.com");  
    this.time.events.add(Phaser.Timer.SECOND * 0.5, this.allowClick, this); 
  },

  //share on facebook
  facebookShare: function() {
    if (this.clickable === false ) {
      return;
    } else {
      this.clickable = false;
    }
    window.open("http://www.facebook.com/sharer.php?u=https://blendandcare.eylure.com");  
    this.time.events.add(Phaser.Timer.SECOND * 0.5, this.allowClick, this); 
  },

  //This addresses a double-firing bug in Android.
  allowClick: function() {
    this.clickable = true;
  },

};



