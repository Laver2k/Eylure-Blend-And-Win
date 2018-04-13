theGame.preloader = function (game) {};

theGame.preloader.prototype = {

	init: function() {
	},

	preload: function() {
        
        this.stage.backgroundColor = "#ffffff";

        this.loadingtext = this.add.image(game.width/2, game.height/2, 'loading');
        this.loadingtext.anchor.setTo(0.5, 0.5);


        this.load.audio('music', ['assets/sounds/music.mp3', 'assets/sounds/music.ogg']);
        this.load.audio('correct', ['assets/sounds/correct.mp3', 'assets/sounds/correct.ogg']);
        this.load.audio('wrong', ['assets/sounds/wrong.mp3', 'assets/sounds/wrong.ogg']);
        this.load.audio('button', ['assets/sounds/button.mp3', 'assets/sounds/button.ogg']);
        this.load.audio('cheer', ['assets/sounds/cheer.mp3', 'assets/sounds/cheer.ogg']);
        this.load.audio('aww', ['assets/sounds/aww.mp3', 'assets/sounds/aww.ogg']);


        this.load.atlasJSONArray(
            'game-elements',
            'assets/spritesheets/game-elements.png',
            'assets/spritesheets/game-elements.json'
        );

        this.load.atlasJSONArray(
            'stage-background',
            'assets/spritesheets/stage-background.png',
            'assets/spritesheets/stage-background.json'
        );


        this.load.atlasJSONArray(
            'ui',
            'assets/spritesheets/ui.png',
            'assets/spritesheets/ui.json'
        );

        this.load.atlasJSONArray(
            'ui2',
            'assets/spritesheets/ui2.png',
            'assets/spritesheets/ui2.json'
        );


    },


    create: function() {
        var music = this.add.audio('music');
        var correct = this.add.audio('correct');
        var wrong = this.add.audio('wrong');
        var button = this.add.audio('button');
        var cheer = this.add.audio('cheer');
        var aww = this.add.audio('aww');
        this.sound.setDecodedCallback(
            [music, correct, wrong, button, cheer, aww],
            this.start, this
        );
    },





    start: function() {
        this.state.start('menu'); //After preloading, go to the menu screen.
    },

};