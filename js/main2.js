/*canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx = canvas.getContext("2d");
ctx.globalAlpha = 0.5;*/


//console.log("hello world!");
let a1 = new automaton(20,50,0xff0000,0xBB00FA,-1000,0,0); //define an automaton with the arguments(array size, cell size, base colour(hue),x offset, y offset)
a1.initialize_body();

function MainLoopA()
{
	a1.calc_live_neighbours();
	a1.calc_future_values();
	a1.update_curr_values();
	a1.update_colours();
	//a1.rotate_cells();
	//a1.draw(ctx);
	a1.exec_cb_on_cell_state(instr_array_3,48);	//this function will do more in the future. 
	if(keys[81])
		a1.initialize_body();
}

let b1 = new automaton(20,50,0xff0000,0x00bfff,-1000,0,200);
b1.initialize_body();

function MainLoopB()
{
	b1.calc_live_neighbours();
	b1.calc_future_values();
	b1.update_curr_values();
	b1.detect_clicks(mousedown_coords);
	b1.update_colours();
	//b1.rotate_cells();
	//b1.draw(ctx);
	b1.exec_cb_on_cell_state(instr_array_2,60);
}

var mousedown_coords = [null,null];
var keys = [];
//canvas.addEventListener("keydown", OnKeyDown, false);
//canvas.addEventListener("keyup", OnKeyUp, false);

function OnKeyDown(e)
{
	console.log("keydown");
	keys[e.keyCode] = true;
}

function OnKeyUp(e)
{
	keys[e.keyCode] = false;
}

function bg_update()
{
	//a1.rotate_cells();
	//a1.draw(ctx);
	//b1.rotate_cells();
	//b1.draw(ctx);
	//console.log("bgupdate");
}


var blah3 = setInterval(bg_update,100);

var blah1 = setInterval(MainLoopA,600);
var blah2 = setInterval(MainLoopB,800);


//MainMain();
