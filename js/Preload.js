


MyGame.Preload = function (game) 
{
	this.splash = null;
	this.preloadBar = null;
	this.loaderBar1 = null;
	this.loaderBar2 = null;
	this.ready = false;
	
	this.button_play = null;
	this.button_sound = null;
};


MyGame.Preload.prototype = 
{
	preload: function() 
	{
		//this.game.stage.backgroundColor = backgroundcolor;
		
		//show logo in loading screen
		this.splash = this.add.sprite(0,0, 'intro');
		this.splash.scale.setTo(1 / global_scale, 1 / global_scale);	


		this.loaderBar1 = this.game.add.text(140 / global_scale, this.game.world.centerY + 20 / global_scale, "Loading...");
		this.loaderBar1.anchor.set(0.5);
		this.loaderBar1.align = 'center';
		this.loaderBar1.font = 'Arial';
		this.loaderBar1.fontWeight = 'bold';
		this.loaderBar1.fontSize = 50 / global_scale;
		var grd = this.loaderBar1.context.createLinearGradient(0, 0, 0, this.loaderBar1.canvas.height);
		grd.addColorStop(0, '#ff0000');   
		grd.addColorStop(1, '#ffff00');
		this.loaderBar1.fill = grd;		


	//	this.loaderBar1 = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 200, 'loading');
	//	this.loaderBar1.anchor.setTo(0.5);

		this.loaderBar2 = this.add.sprite(this.game.world.centerX + 80 / global_scale, this.game.world.centerY + 16 / global_scale, 'perloadbar_empty');
		this.loaderBar2.anchor.setTo(0.5);
		this.loaderBar2.scale.setTo(1 / global_scale, 1 / global_scale);

		this.preloadBar = this.add.sprite(this.game.world.centerX - 38 / global_scale, this.game.world.centerY, 'preloadbar');
	//	this.preloadBar.scale.setTo(1 / global_scale, 1 / global_scale);
	//	this.preloadBar.anchor.setTo(0.5);

		this.load.setPreloadSprite(this.preloadBar,0);



		//load game assets
	//	this.game.load.image('menubk', 'assets/images/splash.png');		
		
		if (global_scale == 1)
		{
			this.game.load.image('player', 'assets/images/rocket.png');
			this.game.load.image('obstacle', 'assets/images/obstacle.png');
			this.game.load.image('bonus', 'assets/images/bonus.png');
		}
		else
		{
			this.game.load.image('player', 'assets/images/rocket_min.png');
			this.game.load.image('obstacle', 'assets/images/obstacle_min.png');
			this.game.load.image('bonus', 'assets/images/bonus_min.png');
		}
		
		
		this.game.load.image('smoke', 'assets/images/smoke.png');		
		this.game.load.image('spark', 'assets/images/spark.png');
		this.game.load.image('topframe', 'assets/images/topframe.png');
		//this.game.load.image('sound', 'assets/images/soundon.png');
	//	this.game.load.image('helpscreen', 'assets/images/helpscreen.png');
		
		this.game.load.spritesheet('returnmenu', 'assets/images/menu.png', 278, 159);
		this.game.load.spritesheet('tryagain', 'assets/images/again.png', 278, 159);
		this.game.load.spritesheet('play', 'assets/images/play.png', 278, 159);
		this.game.load.spritesheet('sound', 'assets/images/sound.png', 64, 64);
		//this.game.load.spritesheet('help', 'assets/images/help.png', 278, 159);		
		
		this.load.audio('music', 'assets/audio/music.ogg');
		this.load.audio('explosion', 'assets/audio/explosion.ogg');
		this.load.audio('engine', 'assets/audio/engine.ogg');
		this.load.audio('bonus', 'assets/audio/bonus.ogg');
		
		
		this.game.load.bitmapFont('font1', 'assets/fonts/font1.png', 'assets/fonts/font1.fnt');

		
		
	},
	
	create: function() 
	{
		this.game.add.sprite(0,0,'');
	},
	
	
	update: function() 
	{
		if (this.game.load.progress == 100  && !this.ready)
		{
			this.preloadBar.kill();
			this.loaderBar1.destroy();
			this.loaderBar2.kill();
			
			this.ready = true;
			
		/*	timer = this.game.time.create(true);
			timer.add(2000,  this.nextState, this);
			timer.start();		
		*/	
			this.button_play = this.game.add.button(this.game.world.centerX + 150 / global_scale , 150 / global_scale, 'play', this.actionOnPlay, this, 0, 0, 1);
			this.button_play.anchor.setTo(0.5);
			this.button_play.scale.setTo(1 / global_scale, 1 / global_scale);
			
			this.button_sound = this.game.add.button(width - 50 / global_scale, 40 / global_scale, 'sound', this.actionOnSound, this);
			this.button_sound.anchor.setTo(0.5);
			this.button_sound.scale.setTo(1 / global_scale, 1 / global_scale);
			this.button_sound.frame = 0;	
			
		}
				
	},
	
	actionOnPlay: function()
	{
		this.cleanUp();
		this.state.start('Game',true, false)
	},
	
	
	actionOnSound: function()
	{
		this.game.sound.mute = !this.game.sound.mute;
		if (this.button_sound.frame == 0)
		{
			this.button_sound.frame = 1;
		}
		else
		{
			this.button_sound.frame = 0;
		}
		
	},	
	
	cleanUp: function()
	{		
		
		if (this.preloadBar != null)
		{		
			this.preloadBar.destroy();
			this.preloadBar = null;
		}	
		
		
		if (this.loaderBar1 != null)
		{		
			this.loaderBar1.destroy();
			this.loaderBar1 = null;
		}	
		
		
		if (this.loaderBar2 != null)
		{		
			this.loaderBar2.destroy();
			this.loaderBar2 = null;
		}	
		
		if (this.splash != null)
		{		
			this.splash.destroy();
			this.splash = null;
		}											
		
		
		if (this.button_play != null)
		{		
			this.button_play.destroy();
			this.button_play = null;
		}			

		
		if (this.button_sound != null)
		{		
			this.button_sound.destroy();
			this.button_sound = null;
		}		
		
	},
	

	
	
};
