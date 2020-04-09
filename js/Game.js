

MyGame.Game = function (game) 
{
	this.text_timer = null;				// print timer / score
//	this.text_difficulty = null;		// current level
	this.text_highscore = null;			// highest score
	
	this.timer_game = null;				// timer / score
	this.sprite_player = null;			// player
	this.cursors = null;				// cursor keys control
	this.group_obstacles = null;		// all obstables
	this.group_bonus = null;
	
	this.counter_time = 0;				// time
	this.counter_score = 0;				// score
	this.gap_between_obstacles = 0;		// gap between walls
	this.speed = 0;						// player's speed
	this.offset = 0;					// offset from center
//	this.counter_difficulty = 0;
	
	this.delta = 0;						// camera
	this.init_y = 0;					// camera	
	
	this.gameover = false;				// start cleanups and end game procedures
	this.last_obst_pos = 0;				// y of the last created obstacle
	
	this.particles_smoke_trail = null;
	this.particles_player_explosion = null;
	
	this.sprite_top = null;
	
	
	this.sound_engine = null;
	this.sound_explosion = null;
	this.sound_music = null;
	this.sound_bonus = null;
	
	this.button_sound = null;
	
	//////
	
};


MyGame.Game.prototype = 
{
	
	preload: function()
	{
		this.game.time.advancedTiming = true;
	},
	
	create: function() 
	{	

		this.game.add.sprite(0,0,'');

		this.counter_time = 0;
		this.counter_score = 0;
		this.gap_between_obstacles = initial_gap_between_obstacles;
		this.speed = player_initial_speed;
		this.offset = 0;
	//	this.counter_difficulty = 0;
		this.delta = 0;
		this.init_y = 0;
		
		this.gameover = false;
		
		this.last_obst_pos = this.game.world.height;		// to create first obstavle at end of world
	
				
		//this.game.physics.arcade.gravity.y = 0;
		// ########################################
		// ############### SETUP  #################
		// ########################################
		
		//  Modify the world and camera bounds
		this.game.world.setBounds(0, 0, width, height);
		
		this.game.stage.backgroundColor = backgroundcolor;
		
		// ########################################
		// ############### ACTORS #################
		// ########################################
		
		// ****** PLAYER ******		
		this.sprite_player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');		
		this.sprite_player.anchor.setTo(0.5, 0.5);
		//this.sprite_player.scale.setTo(0.5 / global_scale ,0.5 / global_scale);
		this.game.physics.enable(this.sprite_player, Phaser.Physics.ARCADE);
		this.init_y = this.sprite_player.y;
		this.sprite_player.body.collideWorldBounds = true;
		//this.game.physics.p2.enable(this.sprite_player);
		
		
		// ****** OBSTACLES ******					
		this.group_obstacles = game.add.group();
		this.group_obstacles.enableBody = true;		
		this.group_obstacles.createMultiple(obstacles_cache_size, 'obstacle');
		this.group_obstacles.setAll('anchor.x', 0.5);
		this.group_obstacles.setAll('anchor.y', 0.5);
		this.group_obstacles.setAll('outOfBoundsKill', true);
		this.group_obstacles.setAll('checkWorldBounds', true);
		
		
		// create first obstavles at end of world
		this.createSingleObstacle( this.offset + this.game.world.centerX - obstacles_width / 2 - this.gap_between_obstacles / 2, this.last_obst_pos );
		this.createSingleObstacle( this.offset + this.game.world.centerX + obstacles_width / 2 + this.gap_between_obstacles / 2, this.last_obst_pos );
	
		
		// ****** BONUS ******					
		this.group_bonus = game.add.group();
		this.group_bonus.enableBody = true;		
		this.group_bonus.createMultiple(bonus_cache_size, 'bonus');
		this.group_bonus.setAll('anchor.x', 0.5);
		this.group_bonus.setAll('anchor.y', 0.5);
		this.group_bonus.setAll('outOfBoundsKill', true);
		this.group_bonus.setAll('checkWorldBounds', true);
		
		
		

		
		// ########################################
		// ############### TIMERS #################
		// ########################################
		this.timer_game = this.game.time.create(false);
		this.timer_game.loop(Phaser.Timer.SECOND, this.updateTimer, this);
		this.timer_game.start();	
		
	

		
		// ########################################
		// ############### CONTROL ################
		// ########################################
		
		//  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.    
		this.cursors = this.game.input.keyboard.createCursorKeys();

		
		// ########################################
		// ###############     FX     #############
		// ########################################	

		
		this.particles_smoke_trail =  this.game.add.emitter(0,0, 400);
		this.particles_smoke_trail.makeParticles('smoke');	
		this.particles_smoke_trail.x = this.sprite_player.x;
		this.particles_smoke_trail.y = this.sprite_player.y - trail_offset;		
		this.particles_smoke_trail.setXSpeed(0, 0);
		this.particles_smoke_trail.setYSpeed(-10 / global_scale, -50 / global_scale);
		this.particles_smoke_trail.setRotation(-50, 50);
		this.particles_smoke_trail.gravity = 0;
		this.particles_smoke_trail.minParticleScale = 0.3 / global_scale;
		this.particles_smoke_trail.maxParticleScale = 1 / global_scale;
		this.particles_smoke_trail.start(false, 500, trail_init_frequency);
		
		
		this.particles_player_explosion = game.add.emitter(0, 0, 100);
		this.particles_player_explosion.makeParticles('spark');
		this.particles_player_explosion.gravity = 100 / global_scale;
		this.particles_player_explosion.setXSpeed(-100 / global_scale, 100 / global_scale);
		this.particles_player_explosion.setYSpeed(-100 / global_scale, 100 / global_scale);

		
		

		// ########################################
		// ###############  GUI   #################
		// ########################################
		

		
		this.sprite_top = this.game.add.sprite(0 ,0, 'topframe');
		this.sprite_top.scale.setTo(1 / global_scale ,1 / global_scale);
		this.sprite_top.fixedToCamera = true;		
		
		this.text_timer = this.game.add.bitmapText(this.game.world.centerX - 20 / global_scale, 60 / global_scale, 'font1', '0', 50 / global_scale);
		this.text_timer.fixedToCamera = true;		

		this.text_highscore = this.game.add.bitmapText(120 / global_scale, 10 / global_scale, 'font1', highestscore.toString(), 40 / global_scale);
		this.text_highscore.fixedToCamera = true;
		//this.text_highscore.setText());	
		
		this.button_sound = this.game.add.button(width - 50 / global_scale, 40 / global_scale, 'sound', this.actionOnSound, this);		
		this.button_sound.anchor.setTo(0.5);
		this.button_sound.scale.setTo(1 / global_scale, 1 / global_scale);
		if (this.game.sound.mute)
		{
			this.button_sound.frame = 1;
		}
		else
		{
			this.button_sound.frame = 0;
		}		
		this.button_sound.fixedToCamera = true;

		// ########################################
		// ############### AUDIO  #################
		// ########################################
		
		this.sound_bonus = this.game.add.audio('bonus');
		this.sound_engine = this.game.add.audio('engine');
		this.sound_explosion = this.game.add.audio('explosion');
		this.sound_music = this.game.add.audio('music');
		this.sound_engine.play('',0,0.5,true);
		this.sound_music.play('',0,1,true);

		
    },

    
    update: function() 
	{	
		
		if (!this.gameover)
		{
			this.game.physics.arcade.overlap(this.sprite_player, this.group_obstacles, null, this.collisionHandler, this);
			this.game.physics.arcade.overlap(this.group_bonus, this.sprite_player, this.collisionBonus, null, this);
			
			
			this.game.world.setBounds(0, 0, width, height + this.delta );
			this.camera.view.y = this.delta;
			
			this.playerMovs();
							
			this.delta = Math.abs(this.sprite_player.y - this.init_y);


			// dynamically create obstacles at the bottom of screen by reusing dead ones
			// -20 is to avoid flickering at bottom of the screen
			if (height + this.delta - this.last_obst_pos > obstacles_height - 20 / global_scale && this.group_obstacles.countDead() > 1)
			{
				var temp_offset = Math.floor(min_offset + Math.random() * max_offset);	
				//this.temp_offset = this.game.rnd.integerInRange(1,max_offset);				
				var _max = this.game.world.centerX - bound_offset - Math.round(this.gap_between_obstacles / 2);
				switch(Math.floor(0 + Math.random() * 2)) //this.game.rnd.integerInRange(0, 2))
				{
					case 10: 
							{								
								if (this.offset + temp_offset < _max) 
								{
									this.offset += temp_offset; 
								}
								break;
							}
					case 11: 
							{
								if (this.offset - temp_offset > -_max) 
								{
									this.offset -= temp_offset; 
								}
								break;
							}
					}					
					
					this.last_obst_pos += obstacles_height;
					this.createSingleObstacle( this.offset + this.game.world.centerX - Math.round(obstacles_width / 2) - Math.round(this.gap_between_obstacles / 2), this.last_obst_pos );
					this.createSingleObstacle( this.offset + this.game.world.centerX + Math.round(obstacles_width / 2) + Math.round(this.gap_between_obstacles / 2), this.last_obst_pos );
					
					
					// create bonus					
					if (this.game.rnd.integerInRange(0, 5) == 1 && this.group_bonus.countDead() > 0)
					{
						var x1 = this.offset + this.game.world.centerX - Math.round(this.gap_between_obstacles / 2) + bonus_from_walls
						var x2 = x1 + this.gap_between_obstacles - bonus_from_walls * 2;
						this.createBonus(this.game.rnd.integerInRange(x1, x2),this.last_obst_pos);					
					}					
					
				}
				
				this.particles_smoke_trail.x = this.sprite_player.x;
				this.particles_smoke_trail.y = this.sprite_player.y - trail_offset;
				
			}			
			
			/*
			if (this.game.input.activePointer.justPressed() && this.gameover) 
			{
				this.gameOver();
			}
			*/
						
	},
	

	collisionHandler: function()
	{		
		this.particles_player_explosion.x = this.sprite_player.x;
		this.particles_player_explosion.y = this.sprite_player.y;
		this.particles_player_explosion.start(true, 3000, null, 40);			
		
		this.gameover = true;
		this.sprite_player.kill();
		this.timer_game.stop();
		this.particles_smoke_trail.on = false;
		this.particles_smoke_trail.kill();
		
		//this.timer_gameover = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameOver, this);		
		timer = this.game.time.create(true);
		timer.add(2000,  this.gameOver, this);
		timer.start();
		
		this.sound_explosion.play();
		this.sound_engine.stop();
		this.sound_music.stop();
		
		
		
	},
	
	
	collisionBonus: function(player,bonus)
	{
		bonus.kill();
		this.incScore(1);
		this.sound_bonus.play();
		
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
				
	
    
	//render: function()
    //{		
	//	this.game.debug.cameraInfo(this.game.camera, 500, 32);	
	//	this.game.debug.text(this.delta, 300, 32);	
	//},
	//
	
	
	
	// ########################################
	// ########  WORLD & GAME LOGIC  ##########
	// ########################################	
	
    updateTimer: function()
    {
		this.counter_time ++;
		
		if (this.speed < player_max_speed)
		{
			this.speed +=player_inc_speed;
			if (this.particles_smoke_trail.frequency < trail_min_frequency)
			{	
				this.particles_smoke_trail.frequency -= trail_inc_frequency;						
			}
		//	this.game.debug.text("speed updated > " + this.speed, 300, 130);
		}
		
		if (this.gap_between_obstacles > min_gap_between_obstacles)
		{
			this.gap_between_obstacles -= obstacle_dec_gap;
		//	this.game.debug.text("gap updated > " + this.gap_between_obstacles, 300, 150);	
		}						
			
		this.incScore(1);
	},	
	
	
	incScore: function(n)
	{
		this.counter_score += n;
		this.text_timer.setText(this.counter_score);
	},
		
	
	
	createSingleObstacle: function (x,y) 
	{
		//  recycle obstacle
		var temp = this.group_obstacles.getFirstExists(false)
		temp.reset(x,y);        
	},
	
	createBonus: function (x,y) 
	{
		//  recycle bonus
		var temp = this.group_bonus.getFirstExists(false);
		temp.reset(x,y);        
	},
	
	

	// ########################################
	// ############### PLAYER  ################
	// ########################################	

	
	playerMovs: function()
	{			
		//  Reset the player, then check for movement keys
		this.sprite_player.body.velocity.setTo(0, this.speed);		

/*		if (this.cursors.left.isDown)
		{
			this.sprite_player.body.velocity.x = -player_horizontal_speed;
			this.sprite_player.angle = player_movement_angle;
		}
		else if (this.cursors.right.isDown)
		{
			this.sprite_player.body.velocity.x = player_horizontal_speed;
			this.sprite_player.angle = -player_movement_angle;
		}
		else
		{
			this.sprite_player.rotation = 0;		
		}
*/	


		if (this.game.input.x < this.sprite_player.x - 20 / global_scale)
		{
			this.sprite_player.body.velocity.x = -player_horizontal_speed;
			this.sprite_player.angle = player_movement_angle;
		}
		else if (this.game.input.x > this.sprite_player.x + 20 / global_scale)
		{
			this.sprite_player.body.velocity.x = player_horizontal_speed;
			this.sprite_player.angle = -player_movement_angle;
		}
		else
		{
			this.sprite_player.rotation = 0;		
		}

						
	},
	
	
	// ########################################
	// ############### CLEANNINGS #############
	// ########################################	
	
	
	gameOver: function()
	{
		this.cleanUp();
		this.game.state.start('GameOver',true,false,this.counter_score);
		
	},
	

	
	cleanUp: function()
	{
		this.game.world.setBounds(0, 0, width, height);	
			

		
		// timers
		if (this.timer_game != null)
		{
			this.timer_game.stop();		
			this.game.time.events.remove(this.timer_game);
			this.timer_game.destroy();	
			this.timer_game = null;
		}

		
		
		// fx
		if (this.particles_smoke_trail != null)
		{	
			this.particles_smoke_trail.on = false;
			this.game.particles.remove(this.particles_smoke_trail);
			this.particles_smoke_trail.destroy();
			this.particles_smoke_trail = null;		
		}
		
		if (this.particles_player_explosion != null)
		{
			this.particles_player_explosion.on = false;
			this.game.particles.remove(this.particles_player_explosion);
			this.particles_player_explosion.destroy();
			this.particles_player_explosion = null;
		}
		
		
		// sprites
		
		if (this.sprite_player != null)
		{
			this.sprite_player.destroy();		
			this.sprite_player = null;
		}

		
		if (this.sprite_top != null)
		{
			this.sprite_top.destroy();		
			this.sprite_top = null;
		}
		
		
		// groups
		if (this.group_obstacles != null)
		{
			this.group_obstacles.callAll('kill');
			this.group_obstacles.removeAll();	
			this.group_obstacles.destroy();
			this.group_obstacles = null;
		}
		
		if (this.group_bonus != null)
		{
			this.group_bonus.callAll('kill');
			this.group_bonus.removeAll();	
			this.group_bonus.destroy();
			this.group_bonus = null;
		}
		
		// sounds

			
				
		// texts	
		if (this.text_timer != null)
		{		
			this.text_timer.destroy();
			this.text_timer = null;		
		}
		
	/*	if (this.text_difficulty != null)
		{		
			this.text_difficulty.destroy();
			this.text_difficulty = null;
		}
	*/	
		if (this.text_highscore != null)
		{		
			this.text_highscore.destroy();
			this.text_highscore = null;		
		}

		
		// misc
		// ????????????????????
		this.cursors = null;	
		// ????????????????????

		if (this.sound_explosion != null)
		{		
			this.sound_explosion.stop();
			this.sound_explosion.destroy();
			this.sound_explosion = null;
		}
		
		if (this.sound_music != null)
		{		
			this.sound_music.stop();
			this.sound_music.destroy();
			this.sound_music = null;
		}
		
		if (this.sound_engine != null)
		{		
			this.sound_engine.stop();
			this.sound_engine.destroy();
			this.sound_engine = null;
		}
		
		if (this.sound_bonus != null)
		{		
			this.sound_bonus.stop();
			this.sound_bonus.destroy();
			this.sound_bonus = null;
		}
		
		if (this.button_sound != null)
		{		
			this.button_sound.destroy();
			this.button_sound = null;
		}		

		

	},
	
};
