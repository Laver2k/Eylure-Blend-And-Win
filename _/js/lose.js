theGame.lose = function (game) {};

theGame.lose.prototype = {
  create: function() {

    this.stage.backgroundColor = 0x000000;
    this.background= this.add.image(0, 0, 'ui2', 'prize-lose.png');

    this.faderLight = game.add.bitmapData(game.width, game.height);
    this.faderLight.ctx.beginPath();
    this.faderLight.ctx.rect(0, 0, game.width, game.height);
    this.faderLight.ctx.fillStyle = '#ffffff';
    this.faderLight.ctx.fill();
    this.faderLight = game.add.sprite(game.world.centerX, game.world.centerY, this.faderLight);
    this.faderLight.anchor.setTo(0.5, 0.5);
    this.faderLight.alpha = 1;

    //Play again button
    this.playAgainButton = game.add.bitmapData(game.width, game.height);
    this.playAgainButton.ctx.beginPath();
    this.playAgainButton.ctx.rect(0, 0, 250, 90);
    this.playAgainButton.ctx.fillStyle = '#gggggg';
    this.playAgainButton.ctx.fill();
    this.playAgainButton = game.add.sprite(70, 405, this.playAgainButton);
    this.playAgainButton.inputEnabled = true;
    this.playAgainButton.input.useHandCursor = true;
    this.playAgainButton.nextState = 'gameplay';
    this.playAgainButton.events.onInputDown.add(this.fadeOut, this);
    this.playAgainButton.alpha = 0;

    //Menu button
    this.menuButton = game.add.bitmapData(game.width, game.height);
    this.menuButton.ctx.beginPath();
    this.menuButton.ctx.rect(0, 0, 250, 90);
    this.menuButton.ctx.fillStyle = '#gggggg';
    this.menuButton.ctx.fill();
    this.menuButton = game.add.sprite(330, 405, this.menuButton);
    this.menuButton.inputEnabled = true;
    this.menuButton.input.useHandCursor = true;
    this.menuButton.nextState = 'menu';
    this.menuButton.events.onInputDown.add(this.fadeOut, this);
    this.menuButton.alpha = 0;

    //Sound effects
    this.buttonSound = this.game.add.audio('button', 1, false, true);
    this.loseSound = this.game.add.audio('aww', 1, false, true);
    this.loseSound.play();
    this.fadeIn();

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
      'event_label': 'Lose: '+ button.nextState,
    });
    var tween = game.add.tween(this.faderLight).to({ alpha: 1}, 500, "Linear", true);
    tween.start();
    tween.onComplete.add(function(){this.state.start(button.nextState, true, false);}, this);
  },


};



