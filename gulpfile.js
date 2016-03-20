'use strict';

var fs = require("fs")
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var vueify = require('vueify');

var sassPath = "./resource/assets/css/";

gulp.task('default', function() {
  // place code for your default task here
  browserify('./resource/assets/vue/main.js')
    .transform(vueify)
    .bundle()
    .pipe(fs.createWriteStream("./app/js/main.js"));
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

