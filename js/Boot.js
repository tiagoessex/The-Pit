


MyGame.Boot = function (game) 
{
 
};

 
//setting game configuration and loading the assets for the loading screen
MyGame.Boot.prototype = 
{
	preload: function() 
	{
		//assets to be used in the loading screen
		this.load.image('intro', 'assets/images/intro.png');		
		if (global_scale == 1)
		{
			this.load.image('preloadbar', 'assets/images/preloader-bar.png');
		}
		else
		{
			this.load.image('preloadbar', 'assets/images/preloader-bar_min.png');
		}		
		this.load.image('perloadbar_empty', 'assets/images/loadingbarempty.png');
		
	},
	
	
	create: function() 
	{	
		this.game.add.sprite(0,0,'');
/*		if (this.game.device.desktop) 								//if playing on desktop
		{
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 	//always show whole game
			this.scale.pageAlignHorizontally = true; 				//align horizontally						
			this.scale.pageAlignVertically = true;
			this.scale.setMinMax(320, 480, width, height);         
			
		}
		else
		{*/
		//	this.input.maxPointers = 1;
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.minWidth = mobile_minWidth;  				//set up minimum and maximum game widths allowed.
			this.scale.minHeight = mobile_minHeight;  
			//above and below these limits, the show_all attribute wont bother scaling
			this.scale.maxWidth = mobile_maxWidth;
			this.scale.maxHeight = mobile_maxHeight;
			this.scale.forceLandscape = mobile_forceLandscape;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
		//	this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
		//	this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
			
			/*this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
            this.scale.refresh();*/
			
			
		//}
 
		this.scale.setScreenSize(true);  //apply the setting we set up
		this.state.start('Preload'); 
 
	},
	
	/*
	
	gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }
	*/
	
	
};



