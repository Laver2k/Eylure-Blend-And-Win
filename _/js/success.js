theGame.success = function (game) {};

theGame.success.prototype = {

  create: function() {

    this.stage.backgroundColor = 0x000000;

    this.background= this.add.image(0, 0, 'ui2', 'game-success.png');

    this.faderLight = game.add.bitmapData(game.width, game.height);
    this.faderLight.ctx.beginPath();
    this.faderLight.ctx.rect(0, 0, game.width, game.height);
    this.faderLight.ctx.fillStyle = '#ffffff';
    this.faderLight.ctx.fill();
    this.faderLight = game.add.sprite(game.world.centerX, game.world.centerY, this.faderLight);
    this.faderLight.anchor.setTo(0.5, 0.5);
    this.faderLight.alpha = 1;

    this.enterCompetitionButton = game.add.bitmapData(game.width, game.height);
    this.enterCompetitionButton.ctx.beginPath();
    this.enterCompetitionButton.ctx.rect(0, 0, 445, 100);
    this.enterCompetitionButton.ctx.fillStyle = '#gggggg';
    this.enterCompetitionButton.ctx.fill();
    this.enterCompetitionButton = game.add.sprite(100, 375, this.enterCompetitionButton);
    this.enterCompetitionButton.inputEnabled = true;
    this.enterCompetitionButton.input.useHandCursor = true;
    this.enterCompetitionButton.events.onInputDown.add(this.haveIWon, this);
    this.enterCompetitionButton.alpha = 0;

    this.buttonSound = this.game.add.audio('button', 1, false, true);
    this.cheerSound = this.game.add.audio('cheer', 1, false, true);
    this.cheerSound.play();
    this.fadeIn();

    //$('#registration').show();

    gtag('event', 'Success/Fail', {
      'event_category': 'General',
      'event_label':'Success',
    });
  },

  haveIWon: function() {
    if(theGame.playSounds) {
      this.buttonSound.play();
    }
    var tween = game.add.tween(this.faderLight).to({ alpha: 1}, 1000, "Linear", true);
    tween.start();

    //When fade animation complete, show registration form
    tween.onComplete.add(function(){
      //this.background.alpha = 0;
      this.faderLight.alpha = 0;
      $('#registration').show();
      $("#registration").css("height", $("#gameWrapper").height()-30);
    }, this);
  },

  fadeIn: function() {
    var tween = game.add.tween(this.faderLight).to({ alpha: 0}, 500, "Linear", true);
    tween.start();
  },

  fadeOut: function(button) {    
    if(theGame.playSounds) {
      this.buttonSound.play();
    }
    var tween = game.add.tween(this.faderLight).to({ alpha: 1}, 500, "Linear", true);
    tween.start();
    tween.onComplete.add(function(){this.state.start(button.nextState, true, false);}, this);
  },

};



