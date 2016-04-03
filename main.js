canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx = canvas.getContext("2d");

a1 = new automaton(10,10,240,0,0);
a1.initialize_body();

var args = {n:60,v:127,d:0};

function MainLoopA()
{
	a1.calc_live_neighbours();
	a1.calc_future_values();
	a1.update_curr_values();
	a1.detect_clicks(mousedown_coords);
	a1.update_colours();
	a1.draw(ctx);
}

b1 = new automaton(20,10,360,200,200);
b1.initialize_body();

function MainLoopB()
{
	b1.calc_live_neighbours();
	b1.calc_future_values();
	b1.update_curr_values();
	b1.detect_clicks(mousedown_coords);
	b1.update_colours();
	b1.draw(ctx);
}

var mousedown_coords = [null,null];
canvas.addEventListener("mousedown", OnMouseDown, false);
canvas.addEventListener("mouseup", OnMouseUp, false);
function OnMouseDown()
{
	mousedown_coords[0] = event.pageX;
	mousedown_coords[1] = event.pageY;
}

function OnMouseUp()
{
	mousedown_coords[0] = null;
	mousedown_coords[1] = null;
}

function MainMain()
{
	MainLoopA();
	MainLoopB();
}

var blah = setInterval(MainMain,100);
