canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx = canvas.getContext("2d");


//console.log("hello world!");
a1 = new automaton(20,20,240,0,0); //define an automaton with the arguments(array size, cell size, base colour(hue),x offset, y offset)
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

b1 = new automaton(10,25,100,500,200);
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

function MainMain()
{
	MainLoopA();
	MainLoopB();
}

var blah = setInterval(MainMain,500);
//MainMain();
