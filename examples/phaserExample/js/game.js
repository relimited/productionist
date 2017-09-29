var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

game.state.add('load', loadState);
game.state.add('main', mainState);

game.state.start('load');
