'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

var sassPath = "./resource/assets/css/";

gulp.task('default', function() {
  // place code for your default task here

});

gulp.task('sass', function () {
  // return gulp.src('./sass/**/*.scss')
  return gulp.src(sassPath + 'main.sass')
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(sassPath + '*.sass', ['sass']);
});