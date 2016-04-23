canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx = canvas.getContext("2d");
ctx.globalAlpha = 0.8;


//console.log("hello world!");
a1 = new automaton(19,50,240,canvas.width/2,0); //define an automaton with the arguments(array size, cell size, base colour(hue),x offset, y offset)
a1.initialize_body();

function MainLoopA()
{
	a1.calc_live_neighbours();
	a1.calc_future_values();
	a1.update_curr_values();
	a1.update_colours();
	a1.draw(ctx);
	a1.exec_cb_on_cell_state(instr_array_1);	//this function will do more in the future. 
	if(keys[81])
		a1.initialize_body();
}

b1 = new automaton(19,50,100,0,0);
b1.initialize_body();

function MainLoopB()
{
	b1.calc_live_neighbours();
	b1.calc_future_values();
	b1.update_curr_values();
	b1.detect_clicks(mousedown_coords);
	b1.update_colours();
	b1.draw(ctx);
	b1.exec_cb_on_cell_state(instr_array_2);
}

var mousedown_coords = [null,null];
var keys = [];
canvas.addEventListener("keydown", OnKeyDown, false);
canvas.addEventListener("keyup", OnKeyUp, false);

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
	a1.update_empty_colours();
	a1.draw(ctx);
	b1.update_empty_colours();
	b1.draw(ctx);
	console.log("bgupdate");
}


var blah3 = setInterval(bg_update,100);

var blah1 = setInterval(MainLoopA,3000);
var blah2 = setInterval(MainLoopB,1200);


//MainMain();
