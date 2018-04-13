var theGame = {}; //Declare this as the object to hold the game.

theGame = {

	//Global functions



}

theGame.gameboot = function (game) {};


theGame.gameboot.prototype = {

	init: function() {
		this.input.maxPointers = 1; //Setting for controlling the game
		game.scale.pageAlignVertically = true;   //Setting for scaling the game
		game.scale.pageAlignHorizontally = true;  //Setting for scaling the game
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		

		this.stage.disableVisibilityChange = true;
		theGame.playSounds = true;
	},

	preload: function() {
		//Images needed for preloader
        this.load.image('loading','assets/ui/loading.png');
	},

	create: function() {
		
        this.stage.backgroundColor = "#ffffff";

        //PRELOAD A CUSTOM FONT
		this.game.add.text(0, 0, ".", {font:"1px Johnston", fill:"#FFFFFF"});

		game.state.start('preloader'); //After preloading, go to the splash/menu screen.
	},

};