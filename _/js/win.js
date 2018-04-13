theGame.win = function (game) {};

theGame.win.prototype = { 

  init: function(outcome) {
    
    this.stage.backgroundColor = 0x000000;
    this.background= this.add.image(0, 0, 'ui2', 'prize-win.png');
    // 'outcome' is a number returned from the databade and corresponds to a Prize ID
    switch(outcome) {
      case 1:
      //blend and care
      this.add.image(200, 265, 'ui2', 'prize-blend-care.jpg');
      this.prizeName = "Blend%20%26%20Care";
      break;
      case 2:
      //texture 117
      this.add.image(200, 265, 'ui2','prize-texture.jpg');
      this.prizeName = "Texture%20No.%20117%20Lashes";
      break;
      case 3:
      //volume 101
      this.add.image(200, 265, 'ui2','prize-volume.jpg');
      this.prizeName = "Volume%20No.%20101%20Lashes";
      break;
      case 4:
      // accents 003
      this.add.image(200, 265, 'ui2','prize-accents.jpg');
      this.prizeName = "Accents%20No.%20003%20lashes";
      break;
      case 5:
      //exaggerate 141
      this.add.image(200, 265, 'ui2','prize-exaggerate.jpg');
      this.prizeName = "Exaggerate%20No.%20141%20Lashes";
      break;
      case 6:
      //Definition 126
      this.add.image( 200, 265, 'ui2','prize-definition.jpg');
      this.prizeName = "Definition%20No.%20126%20Lashes";
      break;
      default:
      this.state.start("lose", true, false);
      break;
    }

  },

  create: function() {


    //Twitter Button
    this.share = this.add.image(515, 55, 'ui', 'share.png');

    this.twitterButton = this.add.button(530, 97, 'ui2', this.twitterShare, this, 'twitter.png', 'twitter.png', 'twitter.png', 'twitter.png' );
    this.twitterButton.anchor.setTo(0.5);
    this.twitterButton.scale.setTo(0.6);


    //Facebook Button
    this.facebookButton = this.add.button(570, 95, 'ui2', this.facebookShare, this, 'facebook.png', 'facebook.png', 'facebook.png', 'facebook.png' );
    this.facebookButton.anchor.setTo(0.5);
    this.facebookButton.scale.setTo(0.6);


    //Play again button
    this.playAgainButton = game.add.bitmapData(game.width, game.height);
    this.playAgainButton.ctx.beginPath();
    this.playAgainButton.ctx.rect(0, 0, 250, 90);
    this.playAgainButton.ctx.fillStyle = '#gggggg';
    this.playAgainButton.ctx.fill();
    this.playAgainButton = game.add.sprite(70, 558, this.playAgainButton);
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
    this.menuButton = game.add.sprite(330, 558, this.menuButton);
    this.menuButton.inputEnabled = true;
    this.menuButton.input.useHandCursor = true;
    this.menuButton.nextState = 'menu';
    this.menuButton.events.onInputDown.add(this.fadeOut, this);
    this.menuButton.alpha = 0;

    this.buttonSound = this.game.add.audio('button', 1, false, true);

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
      'event_label': 'Win: '+ button.nextState,
    });

    var tween = game.add.tween(this.faderLight).to({ alpha: 1}, 500, "Linear", true);
    tween.start();
    tween.onComplete.add(function(){this.state.start(button.nextState, true, false);}, this);
  },

  

  //share on twitter
  twitterShare: function() {
    if (this.clickable === false ) {
      return;
    } else {
      this.clickable = false;
    }

    window.open("https://twitter.com/intent/tweet?url=https%3A%2F%2Fblendandcare.eylure.com&text=I%27ve%20just%20won%20a%20"+this.prizeName+"%20playing%20the%20Blend%26Win%20game%20by%20Eylure%21%20Play%20now%20for%20your%20chance%20to%20win&hashtags=BlendAndCare%20%2CBlendAndWin");  

   // window.open("http://twitter.com/intent/tweet?url=https://blendandcare.eylure.com");  
    this.time.events.add(Phaser.Timer.SECOND * 0.5, this.allowClick, this); 
  },

  //share on facebook
  facebookShare: function() {
    if (this.clickable === false ) {
      return;
    } else {
      this.clickable = false;
    }
    window.open("http://www.facebook.com/sharer.php?u=https://blendandwin.eylure.com&t=I've just won a "+this.prizeName+" playing the Blend&Win game by Eylure! Play now for your chance to win https://blendandcare.eylure.com #BlendAndCare #BlendAndWin");  
    this.time.events.add(Phaser.Timer.SECOND * 0.5, this.allowClick, this); 
  },

  //This addresses a double-firing bug in Android.
  allowClick: function() {
    this.clickable = true;
  },

  


};
