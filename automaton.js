var cell = 	{
	x:0,
	y:0,
	curr_value:0,
	future_value:0,
	live_neighbours:0,
	colour: "white"
}

c1 = Object.create(cell);
console.log(c1);


var automaton = {
	array_size:0,
	cell_size:0,
	body:[],
	x_offset:0,
	y_offset:0	
}

automaton.initialize_body = function(){
	for(i=0;i<this.array_size;i++)
	{
		this.body[i] = [];
		for(j=0;j<this.array_size;j++)
		{
			this.body[i][j] = Object.create(cell);
			this.body[i][j].curr_value = Math.floor(Math.random()*2);
		}
	}
	return(this);
}

automaton.calc_live_neighbours = function() {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			this.body[i][j].live_neighbours = 0;
			for(x=-1;x<=1;x++)
			{
				for(y=-1;y<=1;y++)
				{
					if((!((x==0)&&(y==0)))&&((i+x)<this.array_size)&&((j+y)<this.array_size)&&((i+x)>0)&&((j+y)>0))
					{
						if(this.body[i+x][j+y].curr_value==1)
						{
							this.body[i][j].live_neighbours++;
						}
					}
				}
			}
		}
	}
}

automaton.calc_future_values = function() {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			if((this.body[i][j].live_neighbours<2)&&(this.body[i][j].curr_value==1))	//underpopulation
				this.body[i][j].future_value = 0;
			else if(((this.body[i][j].live_neighbours==3)||(this.body[i][j].live_neighbours==2))&&(this.body[i][j].curr_value==1))	//stays alive
				this.body[i][j].future_value = 1;
			else if((this.body[i][j].live_neighbours>3)&&(this.body[i][j].curr_value==1))	//overpopulation
				this.body[i][j].future_value = 0;
			else if((this.body[i][j].live_neighbours==3)&&(this.body[i][j].curr_value==0))	//reproduction
				this.body[i][j].future_value = 1;
			else
				this.body[i][j].future_value = 0;
		}
	}
}

automaton.update_curr_values = function() {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			this.body[i][j].curr_value = this.body[i][j].future_value;
		}
	}
}

automaton.update_colours = function() {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			if(this.body[i][j].curr_value == 1)
				this.body[i][j].colour = "black";
			else
				this.body[i][j].colour = "white";
		}
	}
}

automaton.draw = function(ctx) {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			ctx.fillStyle = this.body[i][j].colour;
			ctx.fillRect(this.x_offset+i*this.cell_size,this.y_offset+j*this.cell_size,this.cell_size,this.cell_size);
		}
	}
}

automaton.exec_cb_on_cell_state(state,cb,args) {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			if(this.body[i][j].curr_value == state)
			{
				play_note("choir_aahs",1,60,127,0);
			}
		}
	}
}

automaton.detect_clicks = function(mousedown_coords) {
	if((mousedown_coords[0]!=null)&&(mousedown_coords[1]!=null))
	{
		console.log("detecting clicks");
		for(i=0;i<this.array_size;i++)
		{
			for(j=0;j<this.array_size;j++)
			{
				x_coord = mousedown_coords[0];
				y_coord = mousedown_coords[1];
				if((x_coord>(this.x_offset+i*this.cell_size))&&(x_coord<(this.x_offset+(i+1)*this.cell_size))&&(y_coord>(this.y_offset+j*this.cell_size))&&(y_coord<(this.y_offset+(j+1)*this.cell_size)))
				{
					console.log("click detected!");
					this.body[i][j].curr_value = 1;
				}
			}
		}
	}
}


/*canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx = canvas.getContext("2d");
a1 = Object.create(automaton);
a1.array_size = 20;
a1.cell_size = 10;
a1.initialize_body();
// a1.calc_live_neighbours();
// a1.calc_future_values();
// a1.update_curr_values();
// a1.update_colours();
// a1.draw(ctx);
// console.log(a1.body);

function MainLoop()
{
	a1.calc_live_neighbours();
	a1.calc_future_values();
	a1.update_curr_values();
	a1.detect_clicks(mousedown_coords);
	a1.update_colours();
	a1.draw(ctx);
}



var blah = setInterval(MainLoop,100);
*/
