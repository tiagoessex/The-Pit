

// to hold all game states
var MyGame = {};		



	// game zone dims
//	var global_scale = 2;		// 1 => 320 x 480
//	var width = 320 * global_scale;		//window.innerWidth * window.devicePixelRatio;
//	var height = 480 * global_scale;	//window.innerHeight * window.devicePixelRatio;

	
var global_scale;


if ((window.innerHeight * window.devicePixelRatio > 640 && window.innerWidth * window.devicePixelRatio > 960) ||
	(window.innerHeight * window.devicePixelRatio > 960 && window.innerWidth * window.devicePixelRatio > 640))
{
	global_scale = 1;	// 640 x 960
}
else
{
	global_scale = 2;	// 320 x 480
}

	//global_scale = 2;
var width = 640 / global_scale;
var height = 960 / global_scale;
var obstacles_height = 50 / global_scale;
var obstacles_width = 640 / global_scale;
var obstacles_cache_size = (height / obstacles_height * 2) + 4;
var bonus_cache_size = 5;
	
var player_max_speed = 600 / global_scale;
var player_initial_speed = 200 / global_scale;
var player_horizontal_speed = 400 / global_scale;
var player_movement_angle = 15;			
var player_inc_speed = 50 / global_scale;			// inc in speed / level
var trail_offset = 40 / global_scale;
var trail_inc_frequency = 6 / global_scale;		// to control: inc speed => inc particles
var trail_min_frequency = 60 / global_scale;
var trail_init_frequency = 100 / global_scale;
	
var obstacle_dec_gap = 10 / global_scale;			// dec in gap / level
var next_level_threshold = 1;//5;		// score % x => next level
var initial_gap_between_obstacles = 400 / global_scale; // 
var min_gap_between_obstacles = 80 / global_scale; 
var min_offset = 6 / global_scale;					// min value for curve
var max_offset = 40 / global_scale;				// max value for curve
var bound_offset = 10 / global_scale; 				// to keep all obstacles in screen
var bonus_from_walls = 30 / global_scale;			// no bonus lesser than x from walls


var mobile_minWidth = 320 / global_scale;
var mobile_minHeight = 480 / global_scale;  
var mobile_maxWidth = 640 / global_scale;
var mobile_maxHeight = 960 / global_scale;
var mobile_forceLandscape = false;
	
var highestscore = 0;
var backgroundcolor = '#0aa';	// warm blue
	
	
	
	
