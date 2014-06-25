/*
Author: Rubén Moya Rodríguez (@rubenmoya_)
You need to define the dependencies in bower.json
See the README.md for more information
*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var nib = require('nib');
var notify = require('gulp-notify');
var newer = require('gulp-newer');

gulp.task('connect', function(){
	connect.server({
		port: 3000,
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src('./src/*.html')
		.pipe(newer('./public/'))
		.pipe(gulp.dest('./public/'))
		.pipe(notify("File <%= file.relative %> added correctly."))
		.pipe(connect.reload());
});

gulp.task('stylus', function(){
	gulp.src('./src/stylus/main.styl')
		.pipe(stylus({use: [nib()]}))
		.pipe(gulp.dest('./public/css/'))
		.pipe(notify("<%= file.relative %> correctly compiled with Stylus."))
		.pipe(connect.reload());
});

gulp.task('watch', ['connect'], function(){
	gulp.watch('./src/stylus/*.styl', ['stylus'])
	gulp.watch('./src/*.html', ['html'])
});

gulp.task('default', ['connect', 'stylus', 'html', 'watch']);