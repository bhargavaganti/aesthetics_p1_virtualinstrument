let ionian = [0,2,4,5,7,9,11];
let i,j,x,y;

function cell(x,y,curr_value,future_value,live_neighbour,colour)
{
	this.x = x;
	this.y = y;
	this.curr_value = curr_value;
	this.future_value = future_value;
	this.colour = colour;
	this.scene_mesh = null;
}

function automaton(array_size,cell_size,dead_colour,live_colour,x_offset,y_offset,z_offset,dead_cell_visibility = false)
{
	this.array_size = array_size;
	this.cell_size = cell_size;
	var texture = new THREE.TextureLoader().load( "textures/white.jpg" );
	this.dead_material = new THREE.MeshBasicMaterial( { color: dead_colour, wireframe: true, visible: dead_cell_visibility } );
	this.live_material = new THREE.MeshBasicMaterial( { color: live_colour, wireframe: true } ); // THREE.MeshPhongMaterial( { color: live_colour, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } )
	this.x_offset = x_offset;
	this.y_offset = y_offset;
	this.z_offset = z_offset;
	this.body = [];
	this.initialize_body = a_initialize_body;
	this.calc_live_neighbours = a_calc_live_neighbours;
	this.rotate_cells = a_rotate_cells;
	this.calc_future_values = a_calc_future_values;
	this.update_curr_values = a_update_curr_values;
	this.update_colours = a_update_colours;
	this.update_empty_colours = a_update_empty_colours;
	this.draw = a_draw;
	this.exec_cb_on_cell_state = a_exec_cb_on_cell_state;
	this.detect_clicks = a_detect_clicks;
}

let a_initialize_body =  function() {
	for(i=0;i<this.array_size;i++)
	{
		this.body[i] = [];
		for(j=0;j<this.array_size;j++)
		{
			this.body[i][j] = new cell(i,j,0,0,"white");
			this.body[i][j].curr_value = Math.floor(Math.random()*2);
			this.body[i][j].scene_mesh = new THREE.Mesh( geometry, this.dead_material );
			scene.add( this.body[i][j].scene_mesh );
			this.body[i][j].scene_mesh.position.x = this.x_offset+i*100;
			this.body[i][j].scene_mesh.position.z = -1*(this.y_offset+j*100);
			this.body[i][j].scene_mesh.position.y = this.z_offset;
		}
	}
	return(this);
}

let a_calc_live_neighbours = function() {
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

let a_rotate_cells = function() {
	for(i=0;i<this.array_size;i++)
		{
			for(j=0;j<this.array_size;j++)
			{
				//this.body[i][j].scene_mesh.rotation.x+=0.01;
				this.body[i][j].scene_mesh.rotation.y+=0.5;
				//this.body[i][j].scene_mesh.rotation.z+=0.2;
			}
		}
		
}

let a_calc_future_values = function() {
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

let a_update_curr_values = function() {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			this.body[i][j].curr_value = this.body[i][j].future_value;
		}
	}
}

let a_update_colours = function() {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
		/*
			if(this.body[i][j].curr_value == 1)
				this.body[i][j].colour = "hsl(" + (this.base_colour + Math.random() * 10) + ", 100%, 35%)";
			else
				this.body[i][j].colour = "hsl(" + (this.base_colour + Math.random() * 20) + ", 100%, 75%)";*/
			if(this.body[i][j].curr_value == 1)
				this.body[i][j].scene_mesh.material = this.live_material;
			else
				this.body[i][j].scene_mesh.material = this.dead_material;
		}
	}
}

let a_update_empty_colours = function() {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			/*if(this.body[i][j].curr_value == 0)
				this.body[i][j].colour = "hsl(" + (this.base_colour + Math.random() * 20) + ", 100%, 75%)";*/
		}
	}
}

let a_draw = function(ctx) {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			//ctx.fillStyle = this.body[i][j].colour;
			//ctx.fillRect(this.x_offset+i*this.cell_size,this.y_offset+j*this.cell_size,this.cell_size,this.cell_size);
			
			
		}
	}
}

let a_exec_cb_on_cell_state = function(instr_array,base_note) {
	for(i=0;i<this.array_size;i++)
	{
		for(j=0;j<this.array_size;j++)
		{
			if(this.body[i][j].curr_value == true)
			{
				if(Math.random() > 0.9)
					play_randnote(instr_array,0,base_note+ionian[(i*this.array_size+j)%7],30,0);
			}
		}
	}
}

let a_detect_clicks = function(mousedown_coords) {
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
					//play_note("violin",0,60+(i*3)+j,120,0);
				}
			}
		}
	}
}