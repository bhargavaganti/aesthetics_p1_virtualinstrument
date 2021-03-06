var sf = ["accordion","acoustic_bass","acoustic_grand_piano","acoustic_guitar_nylon","acoustic_guitar_steel","agogo","alto_sax","applause","bagpipe","banjo","baritone_sax","bassoon","bird_tweet","blown_bottle","brass_section","breath_noise","bright_acoustic_piano","celesta","cello","choir_aahs","church_organ","clarinet","clavinet","contrabass","distortion_guitar","drawbar_organ","dulcimer","electric_bass_finger","electric_bass_pick","electric_grand_piano","electric_guitar_clean","electric_guitar_jazz","electric_guitar_muted","electric_piano_1","electric_piano_2","english_horn","fiddle","flute","french_horn","fretless_bass","fx_1_rain","fx_2_soundtrack","fx_3_crystal","fx_4_atmosphere","fx_5_brightness","fx_6_goblins","fx_7_echoes","fx_8_scifi","glockenspiel","guitar_fret_noise","guitar_harmonics","gunshot","harmonica","harpsichord","helicopter","honkytonk_piano","kalimba","koto","lead_1_square","lead_2_sawtooth","lead_3_calliope","lead_4_chiff","lead_5_charang","lead_6_voice","lead_7_fifths","lead_8_bass__lead","marimba","melodic_tom","music_box","muted_trumpet","oboe","ocarina","orchestral_harp","orchestra_hit","overdriven_guitar","pad_1_new_age","pad_2_warm","pad_3_polysynth","pad_4_choir","pad_5_bowed","pad_6_metallic","pad_7_halo","pad_8_sweep","pan_flute","percussive_organ","piccolo","pizzicato_strings","recorder","reed_organ","reverse_cymbal","rock_organ","seashore","sf.txt","shakuhachi","shamisen","shanai","sitar","slap_bass_1","slap_bass_2","soprano_sax","steel_drums","string_ensemble_1","string_ensemble_2","synth_bass_1","synth_bass_2","synth_brass_1","synth_brass_2","synth_choir","synth_drum","synth_strings_1","synth_strings_2","taiko_drum","tango_accordion","telephone_ring","tenor_sax","timpani","tinkle_bell","tremolo_strings","trombone","trumpet","tuba","tubular_bells","vibraphone","viola","violin","voice_oohs","whistle","woodblock","xylophone"]; //use this as a master list of instruments to choose from -- note that loading too many will crash the page eventually

var instr_array_1 = ["choir_aahs","acoustic_grand_piano","accordion","acoustic_bass","acoustic_guitar_nylon"];
var instr_array_2 = ["acoustic_guitar_nylon"];
var instr_array_3 = ["acoustic_grand_piano"];

MIDI.loadPlugin({
	instruments: instr_array_1.concat(instr_array_2),//concatenate all the instr_arrays you want to use here.
	onprogress: function(state, progress) {
			console.log(state, progress);
			},
	onsuccess: function()	{
	MIDI.setEffects([
	{
		type: "Chorus",
		rate: 0.5,
		feedback: 0.2,
		delay: 0.0045,
		bypass: 0
	}]);
							}
});

function play_randnote(instr_array,channel,note,velocity,delay) {
	var instr_name =  instr_array[Math.floor(Math.random()*instr_array.length)];
	MIDI.programChange(channel, MIDI.GM.byName[instr_name].number);
	MIDI.noteOn(channel,note,velocity,delay);
	MIDI.noteOff(channel,note,delay+1.25);
}

