"use strict";


var regexp = require("node-regexp");
var gulp = require("gulp");
var runSequence = require("run-sequence");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var minifyCss = require("gulp-minify-css");
var minifyHTML = require("gulp-minify-html");
var inlineSource = require("gulp-inline-source");
var del = require("del");
var svgCssInject = require("./gulp-css-svg-inject.js");


gulp.task("js-compile", function ()
{
    return gulp
    .src("./js/index.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist"));
});


gulp.task("scss-compile", function ()
{
    return gulp
    .src("./scss/index.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(svgCssInject())
    .pipe(minifyCss())
    .pipe(gulp.dest("./dist"));
});


gulp.task("html-compile", function ()
{
    return gulp
    .src("index.html")
    .pipe(minifyHTML())
    .pipe(inlineSource())
    .pipe(gulp.dest("./dist"));
});


gulp.task("dist-clean-up", function ()
{
    del(["./dist/*.js", "./dist/*.css"]);
});


gulp.task("build", function ()
{
    runSequence("js-compile", "scss-compile", "html-compile", "dist-clean-up");
});


gulp.task("watch", function ()
{
    gulp.run("build");

    gulp.watch(["./js/**/*.js", "./scss/**/*.scss", "./index.html"], ["build"]);
});
