var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var nib = require('nib');

gulp.task('connect', function(){
	connect.server({
		port: 3000,
		livereload: true
	});
});

gulp.task('stylus', function(){
	gulp.src('./src/stylus/main.styl')
		.pipe(stylus({use: [nib()]}))
		.pipe(gulp.dest('./public/css/'))
		.pipe(connect.reload());
});

gulp.task('watch', ['connect'], function(){
	gulp.watch('./src/stylus/*.styl', ['stylus'])
});

gulp.task('default', ['connect', 'stylus', 'watch']);