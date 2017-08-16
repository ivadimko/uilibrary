'use strict';

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var browserSync     = require('browser-sync');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var notify          = require("gulp-notify");
var concat          = require('gulp-concat');
var bourbon         = require("bourbon").includePaths;
var del             = require('del');
var uglify          = require('gulp-uglify');

gulp.task('common-js', function() {
	return gulp.src([
		'./dev/assets/scripts/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify()) // Minimize JS
	.pipe(gulp.dest('./dev/assets/scripts'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'./dev/assets/scripts/libs/jquery/dist/jquery.min.js', //Always at the beginning
//-----------------------Include libraries-------------------------
		'./dev/assets/scripts/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
//-----------------------------------------------------------------
		'./dev/assets/scripts/common.min.js', //Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Minimize JS
	.pipe(gulp.dest('./dev/assets/scripts'))
	.pipe(browserSync.reload({stream: true}));
});



gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './dev'
		},
		browser: ["google chrome", "firefox"],
		notify: false
	});
});

gulp.task('sass', function () {
  return gulp.src('./dev/assets/scss/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass({
    	includePaths: [bourbon]
    }).on("error", notify.onError()))
    .pipe(autoprefixer(['last 3 versions', '> 5%', 'Firefox ESR', 'ie >= 7']))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dev/assets/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('./dev/assets/scss/**/*.scss', ['sass']);
	gulp.watch('./dev/assets/scripts/**/*.js', browserSync.reload);
	gulp.watch('./dev/*.html', browserSync.reload);
});

gulp.task('build', ['removerel', 'sass', 'js'], function() {

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