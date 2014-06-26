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
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var bower = require('gulp-bower');
var bowerFiles = require('gulp-bower-files');
var bowerSrc = require('gulp-bower-src');
var minifycss = require('gulp-minify-css');
var rimraf = require('gulp-rimraf');

gulp.task('connect', function(){
	connect.server({
		root: ['public'],
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
		.pipe(minifycss())
		.pipe(rename({
	        suffix: ".min"
	    }))
		.pipe(gulp.dest('./public/css/'))
		.pipe(notify("<%= file.relative %> correctly compiled with Stylus."))
		.pipe(connect.reload());
});

gulp.task('scripts', function(){
	gulp.src('./src/scripts/main.js', './src/scripts/**/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/scripts/'))
		.pipe(notify("Scripts ready."))
		.pipe(connect.reload());
});

gulp.task('vendor-scripts', function() {
	bowerFiles()
		.pipe(flatten())
		.pipe(filter('*.js'))
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(rename({
	        suffix: ".min"
	    }))
		.pipe(gulp.dest('./public/scripts/'))
		.pipe(connect.reload());
});

gulp.task('vendor-styles', function() {
	bowerFiles()
		.pipe(flatten())
		.pipe(filter('*.css'))
		.pipe(concat('vendor.css'))
		.pipe(minifycss())
		.pipe(rename({
	        suffix: ".min"
	    }))
		.pipe(gulp.dest('./public/css/'))
});

gulp.task('clean', function () {
    gulp.src('./public/*', { read: false })
	    .pipe(rimraf());
});

gulp.task('watch', ['connect'], function(){
	gulp.watch('./src/stylus/*.styl', ['stylus']);
	gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/scripts/**/*.js', ['scripts']);
});


gulp.task('default', ['clean', 'connect', 'html', 'stylus', 'scripts', 'vendor-scripts', 'vendor-styles', 'watch']);