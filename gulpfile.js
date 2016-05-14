var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var notify = require("gulp-notify");
var eslint = require("gulp-eslint");

gulp.task( 'default', function() {
 gulp.src( './js/**.js' )
 .pipe(eslint())
 .pipe(eslint.format())
 .pipe(babel({ presets:['es2015'] }))
 .pipe(uglify())
 .pipe(rename(function(path) {
	 path.basename+=".min"
 }))
 .pipe( gulp.dest('./dist') )
 .pipe(notify({ message:'Build has been completed', onLast:true }))
})

gulp.task( "watch", function() {
 gulp.watch( "./js/**.js", function() {
 gulp.run( 'default' )
 })
})