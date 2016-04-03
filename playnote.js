MIDI.loadPlugin({
    instrument: "acoustic_grand_piano", // or the instrument code 1 (aka the default)
    onsuccess: function() { MIDI.noteOn(0,60,127,0); }
});

function play_note(n,v,d) {
	MIDI.noteOn(0,n,v,d);
}