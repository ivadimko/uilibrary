'use strict';

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var browserSync     = require('browser-sync');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var notify          = require("gulp-notify");
var concat          = require('gulp-concat');

gulp.task('js', function() {
	return gulp.src([
		'./dev/assets/scripts/libs/jquery/*.js',
		'./dev/assets/scripts/libs/**/*.js',
		'./dev/assets/scripts/common.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest('./dev/assets/scripts'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './dev'
		},
		browser: ["firefox"],
		notify: false
	});
});

gulp.task('sass', function () {
  return gulp.src('./dev/assets/scss/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError()))
    .pipe(autoprefixer(['last 2 versions', '> 5%', 'Firefox ESR', 'ie >= 10']))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dev/assets/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('./dev/assets/scss/**/*.scss', ['sass']);
	gulp.watch(['./dev/assets/scripts/**/*.js'], ['js']);
	gulp.watch('./dev/*.html', browserSync.reload);
});

gulp.task('build', ['removedist', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'./dev/*.html',
		]).pipe(gulp.dest('./rel'));

	var buildCss = gulp.src([
		'./dev/assets/css/main.css',
		]).pipe(gulp.dest('./rel/assets/css'));

	var buildJs = gulp.src([
		'./dev/assets/scripts/scripts.min.js',
		]).pipe(gulp.dest('./rel/assets/scripts'));

	var buildFonts = gulp.src([
		'./dev/assets/fonts/**/*',
		]).pipe(gulp.dest('./rel/assets/fonts'));

});

gulp.task('removerel', function() { return del.sync('./rel'); });
 
gulp.task('default', ['watch']);