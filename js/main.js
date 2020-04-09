
//var Defender = Defender || {};

//Defender.game = new Phaser.Game(800, 600, Phaser.AUTO, '');
//Defender.game = new Phaser.Game(800, 600, Phaser.AUTO, '');
//Defender.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');


game = new Phaser.Game(width, height, Phaser.AUTO, '');

game.state.add('Boot', MyGame.Boot);
game.state.add('Preload', MyGame.Preload);
game.state.add('GameOver', MyGame.GameOver);
game.state.add('Game', MyGame.Game);

game.state.start('Boot');

