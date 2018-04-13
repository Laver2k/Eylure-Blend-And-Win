theGame.instructions = function (game) {};

theGame.instructions.prototype = {

  init: function(type) {
    this.instructionsType = type;
  },

  create: function() {

    if(this.instructionsType === "full") {
      this.instructionsBackground = this.add.image(0, 0, 'ui', 'instructions.png');
    } else {
      this.instructionsBackground = this.add.image(0, 0, 'ui2', 'instructions-simple.png');
    }

    this.faderLight = game.add.bitmapData(game.width, game.height);


    //Different buttons on the 2 types of background
    if(this.instructionsType === "full") {
      this.playButton = game.add.bitmapData(game.width, game.height);
      this.playButton.ctx.beginPath();
      this.playButton.ctx.rect(0, 0, 125, 90);
      this.playButton.ctx.fillStyle = '#ffffff';
      this.playButton.ctx.fill();
      this.playButton = game.add.sprite(330, 520, this.playButton);
      this.playButton.inputEnabled = true;
      this.playButton.input.useHandCursor = true;
      this.playButton.nextState = 'gameplay';
      this.playButton.events.onInputDown.add(this.fadeOut, this);
      this.playButton.alpha = 0;

      this.menuButton = game.add.bitmapData(game.width, game.height);
      this.menuButton.ctx.beginPath();
      this.menuButton.ctx.rect(0, 0, 125, 90);
      this.menuButton.ctx.fillStyle = '#ffffff';
      this.menuButton.ctx.fill();
      this.menuButton = game.add.sprite(460, 520, this.menuButton);
      this.menuButton.inputEnabled = true;
      this.menuButton.input.useHandCursor = true;
      this.menuButton.nextState = 'menu';
      this.menuButton.events.onInputDown.add(this.fadeOut, this);
      this.menuButton.alpha = 0;
    } else {
      this.playButton = game.add.bitmapData(game.width, game.height);
      this.playButton.ctx.beginPath();
      this.playButton.ctx.rect(0, 0, 185, 90);
      this.playButton.ctx.fillStyle = '#ffffff';
      this.playButton.ctx.fill();
      this.playButton = game.add.sprite(350, 500, this.playButton);
      this.playButton.inputEnabled = true;
      this.playButton.input.useHandCursor = true;
      this.playButton.nextState = 'gameplay';
      this.playButton.events.onInputDown.add(this.fadeOut, this);
      this.playButton.alpha = 0;
    }



    this.faderLight = game.add.bitmapData(game.width, game.height);
    this.faderLight.ctx.beginPath();
    this.faderLight.ctx.rect(0, 0, game.width, game.height);
    this.faderLight.ctx.fillStyle = '#ffffff';
    this.faderLight.ctx.fill();
    this.faderLight = game.add.sprite(game.world.centerX, game.world.centerY, this.faderLight);
    this.faderLight.anchor.setTo(0.5, 0.5);
    this.faderLight.alpha = 1;

    this.buttonSound = this.game.add.audio('button', 1, false, true);

    this.fadeIn();

  },

  //back to menu
  menu: function() {
    this.state.start('menu', true, false);
  },  


  fadeIn: function() {
    var tween = game.add.tween(this.faderLight).to({ alpha: 0}, 500, "Linear", true);
    tween.start();
  },

  fadeOut: function(button) {    
    if(theGame.playSounds) {
      this.buttonSound.play();
    }

    gtag('event', 'Button Clicks', {
      'event_category': 'General',
      'event_label': 'Instructions: '+ button.nextState,
    });

    var tween = game.add.tween(this.faderLight).to({ alpha: 1}, 500, "Linear", true);
    tween.start();
    tween.onComplete.add(function(){this.state.start(button.nextState, true, false);}, this);
  },


};



