## Automaton Orchestra

This is not intended as a standalone work of art, but rather as a framework in which those with a more musical bent of mind than mine can trivially create multiple automata capable of generating a variety of notes and chords according to specifications. 

##How to add more automata using the current example


1.  Declare the desired soundfonts in an array like so:

	var instr_array_3 = ["grand_acoustic_piano","xylophone"];
	
	MIDI.loadPlugin({
    instruments: instr_array_1.concat(instr_array_2,instr_array_3),//concatenate all the instr_arrays you want to use here.
	onprogress: function(state, progress) {
			console.log(state, progress);
			},
    onsuccess: function() {
							var blah = setInterval(MainMain,1200);
						  }
});
	
	
2. 	Add the following to main.js. 

	c1 = new automaton(10,25,100,500,200); //arguments(array size, cell size, base colour(hue),x offset, y offset)
	c1.initialize_body();

	Call the following functions as desired in a loop. 
	
	c1.calc_live_neighbours();
	c1.calc_future_values();
	c1.update_curr_values();
	c1.update_colours();
	c1.draw(ctx);
	c1.exec_cb_on_cell_state(instr_array_1);
	
Any number or variety of automata can be added, at least till you run out of memory. To keep repository size and file count manageable, only soundfonts used in the demo have been uploaded. More can be added as required. 

##Experimentation.

In addition to differing amounts, sizes and soundfonts of automata, varying the duration of the two setIntervals also yields interesting results.