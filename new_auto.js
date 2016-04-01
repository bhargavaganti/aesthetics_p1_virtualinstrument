function cell(x,y,curr_value,future_value,live_neighbour,colour)
{
	this.x = x;
	this.y = y;
	this.curr_value = curr_value;
	this.future_value = future_value;
	this.colour = colour;
}

function automaton(array_size,cell_size,base_colour,x_offset,y_offset)
{
	this.array_size = array_size;
	this.cell_size = cell_size;
	this.base_colour = base_colour;
	this.x_offset = x_offset;
	this.y_offset = y_offset;
	this.body = [];
	this.initialize_body = a_initialize_body;
	this.calc_live_neighbours = a_calc_live_neighbours;
	this.calc_future_values = a_calc_future_values;
	this.update_curr_values = a_update_curr_values;
	this.update_colours = a_update_colours;
	this.draw = a_draw;
	this.detect_clicks = a_detect_clicks;
}

a_initialize_body =  function() {
	for(i=0;i<this.array_size;i++)
	{
		this.body[i] = [];
		for(j=0;j<this.array_size;j++)
		{
			this.body[i][j] = new cell(i,j,0,0,"white");
			this.body[i][j].curr_value = Math.floor(Math.random()*2);
		}
	}
	return(this);
}

a_calc_live_neighbours = function() {
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

a_calc_future_values = function() {
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

a_update_curr_values = function() {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			this.body[i][j].curr_value = this.body[i][j].future_value;
		}
	}
}

a_update_colours = function() {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			if(this.body[i][j].curr_value == 1)
				this.body[i][j].colour = "hsl(" + (this.base_colour + Math.random() * 10) + ", 100%, 35%)";
			else
				this.body[i][j].colour = "hsl(" + (this.base_colour + Math.random() * 20) + ", 100%, 75%)";
		}
	}
}

a_draw = function(ctx) {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			ctx.fillStyle = this.body[i][j].colour;
			ctx.fillRect(this.x_offset+i*this.cell_size,this.y_offset+j*this.cell_size,this.cell_size,this.cell_size);
		}
	}
}

a_detect_clicks = function(mousedown_coords) {
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