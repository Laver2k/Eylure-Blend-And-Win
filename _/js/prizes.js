theGame.prizes = function (game) {};

theGame.prizes.prototype = {

  create: function() {

    this.stage.backgroundColor = "#000000";

    this.prizes = this.add.group();
    this.prizes.position.x = 15;
    this.prizes.position.y = 20;

    this.weeklyPrizes = this.add.image(0, 0, 'ui', 'prizes-weekly.png');
    this.grandPrizes = this.add.image(0, 0, 'ui', 'prizes-grand.png');
    this.instantPrizes = this.add.image(0, 0, 'ui', 'prizes-instant.png');
    this.prizesClose = this.add.button(535, -10, 'ui', this.fadeOut, this, 'btn-close.png', 'btn-close.png', 'btn-close.png', 'btn-close.png' );
    this.prizesClose.nextState = 'menu';

    this.prizes.add(this.weeklyPrizes);
    this.prizes.add(this.grandPrizes);
    this.prizes.add(this.instantPrizes);
    this.prizes.add(this.prizesClose);

    this.showInstantPrizesButton = game.add.bitmapData(game.width, game.height);
    this.showInstantPrizesButton.ctx.beginPath();
    this.showInstantPrizesButton.ctx.rect(0, 0, 198, 50);
    this.showInstantPrizesButton.ctx.fillStyle = '#gggggg';
    this.showInstantPrizesButton.ctx.fill();
    this.showInstantPrizesButton = game.add.sprite(25, 160, this.showInstantPrizesButton);
    this.showInstantPrizesButton.inputEnabled = true;
    this.showInstantPrizesButton.input.useHandCursor = true;
    this.showInstantPrizesButton.nextState = 'gameplay';
    this.showInstantPrizesButton.events.onInputDown.add(this.showInstant, this);
    this.showInstantPrizesButton.alpha = 0;

    this.showWeeklyPrizesButton = game.add.bitmapData(game.width, game.height);
    this.showWeeklyPrizesButton.ctx.beginPath();
    this.showWeeklyPrizesButton.ctx.rect(0, 0, 198, 50);
    this.showWeeklyPrizesButton.ctx.fillStyle = '#gggggg';
    this.showWeeklyPrizesButton.ctx.fill();
    this.showWeeklyPrizesButton = game.add.sprite(220, 160, this.showWeeklyPrizesButton);
    this.showWeeklyPrizesButton.inputEnabled = true;
    this.showWeeklyPrizesButton.input.useHandCursor = true;
    this.showWeeklyPrizesButton.events.onInputDown.add(this.showWeekly, this);
    this.showWeeklyPrizesButton.alpha = 0;

    this.showGrandPrizesButton = game.add.bitmapData(game.width, game.height);
    this.showGrandPrizesButton.ctx.beginPath();
    this.showGrandPrizesButton.ctx.rect(0, 0, 198, 50);
    this.showGrandPrizesButton.ctx.fillStyle = '#gggggg';
    this.showGrandPrizesButton.ctx.fill();
    this.showGrandPrizesButton = game.add.sprite(418, 160, this.showGrandPrizesButton);
    this.showGrandPrizesButton.inputEnabled = true;
    this.showGrandPrizesButton.input.useHandCursor = true;
    this.showGrandPrizesButton.events.onInputDown.add(this.showGrand, this);
    this.showGrandPrizesButton.alpha = 0;

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



  showInstant: function() {
    if(theGame.playSounds) {
      this.buttonSound.play();
    }
    this.weeklyPrizes.alpha = 0;
    this.grandPrizes.alpha = 0;
    this.instantPrizes.alpha = 1;
  },

  showWeekly: function() {
    if(theGame.playSounds) {
      this.buttonSound.play();
    }
    this.weeklyPrizes.alpha = 1;
    this.grandPrizes.alpha = 0;
    this.instantPrizes.alpha = 0;
  },

  showGrand: function() {
    if(theGame.playSounds) {
      this.buttonSound.play();
    }
    this.weeklyPrizes.alpha = 0;
    this.grandPrizes.alpha = 1;
    this.instantPrizes.alpha = 0;
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
      'event_label': 'Prizes: '+ button.nextState,
    });

    this.buttonSound = this.game.add.audio('button', 1, false, true);
    var tween = game.add.tween(this.faderLight).to({ alpha: 1}, 500, "Linear", true);
    tween.start();
    tween.onComplete.add(function(){this.state.start(button.nextState, true, false);}, this);
  },




};



