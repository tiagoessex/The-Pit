


MyGame.GameOver = function (game) 
{

	this.score = 0;

	this.text_1 = null;
	this.text_2 = null;
	this.text_3 = null;
	this.text_4 = null;
	this.button_again = null;
};



MyGame.GameOver.prototype = 
{
	init: function(score)
	{
		this.score = score;        
    },
    
	create: function() 
	{
		this.game.add.sprite(0,0,'');
		
		this.game.stage.backgroundColor = backgroundcolor;	

		this.text_1 = this.game.add.bitmapText(30 / global_scale, 150 / global_scale, 'font1', 'GAMEOVER', 110 / global_scale);
		
		this.button_again = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 250 / global_scale, 'tryagain', this.actionOnAgain, this, 0, 0, 1);
		this.button_again.anchor.setTo(0.5);
		this.button_again.scale.setTo(1 / global_scale, 1 / global_scale);
		
		if (this.score > highestscore)
		{
			
			this.text_4 = game.add.text(game.world.centerX, game.world.centerY + 80 / global_scale, "HIGHEST SCORE YET!");
			this.text_4.anchor.set(0.5);
			this.text_4.align = 'center';
			this.text_4.font = 'Arial';
			this.text_4.fontWeight = 'bold';
			this.text_4.fontSize = 50 / global_scale;
			var grd = this.text_4.context.createLinearGradient(0, 0, 0, this.text_4.canvas.height);
			grd.addColorStop(0, '#ff0000');   
			grd.addColorStop(1, '#ffff00');
			this.text_4.fill = grd;				
			
			
			highestscore = this.score;
		/*	var text = "!!!NEW HIGHSCORE!!!";
			var style = { font: "30px Arial", fill: "#f00", align: "center" };
			var t = this.game.add.text(this.game.world.centerX, this.game.world.centerY, text, style);
			t.anchor.set(0.5);*/

		}
		
		this.text_2 = this.game.add.bitmapText(130 / global_scale, this.game.world.centerY - 80 / global_scale, 'font1', 'SCORE: ', 50 / global_scale);							
		this.text_3 = this.game.add.bitmapText(315 / global_scale, this.game.world.centerY - 80 / global_scale, 'font1', this.score.toString(), 50 / global_scale);
		

    },
    

    actionOnAgain: function() 
	{
		this.cleanUp();
		this.game.state.start('Game');
	},  
  	  	
    
	
	cleanUp: function()
	{

		if (this.button_again != null)
		{		
			this.button_again.destroy();
			this.button_again = null;
		}	
		
		if (this.text_1 != null)
		{		
			this.text_1.destroy();
			this.text_1 = null;
		}	
		
		if (this.text_2 != null)
		{		
			this.text_2.destroy();
			this.text_2 = null;
		}	
		
		if (this.text_3 != null)
		{		
			this.text_3.destroy();
			this.text_3 = null;
		}			
		
		if (this.text_4 != null)
		{		
			this.text_4.destroy();
			this.text_4 = null;
		}			
		
	},
	
};
