'use strict';

var CONFIG = require('./gulp/config');
// Plugins
var gulp = require('gulp');
var watch = require('gulp-watch');
var plugins = require('gulp-load-plugins')(CONFIG.plugins);
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
//var gulpIgnore = require('gulp-ignore');
//General
gulp.task('default', ['watch']);

//Build

gulp.task('build', ['icons', 'less'], function() {
    console.log('BUILD DONE');
});


// HTML
gulp.task('html', function() {
    browserSync.reload();
});

// LESS

gulp.task('less', function() {
    return gulp.src(CONFIG.less.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(CONFIG.autoprefixer))
        .pipe(gulp.dest(CONFIG.less.dest))
        .pipe(browserSync.stream());
});

// Icons
gulp.task('icons', function() {
    return gulp.src(CONFIG.icons.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.uri({
            template: {
                file: CONFIG.icons.template
            }
        }))
        .pipe(plugins.concat(CONFIG.icons.concat))
        .pipe(gulp.dest(CONFIG.icons.dest));
});

// Browser sync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            directory: true
        },
        startPath: "./index.html"
    });
});

// General watch task
gulp.task('watch', ['browserSync'], function() {
    gulp.watch(CONFIG.watch.html, ['html']);
    gulp.watch(CONFIG.watch.less, ['less']);
    gulp.watch(CONFIG.watch.icons, ['icons']);
});



// Helpers

process.on('uncaughtException', function(err) {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
});

gulp.on('err', function(gulpErr) {
    if (gulpErr.err) {
        console.error('Gulp error details', [gulpErr.err.message, gulpErr.err.stack, gulpErr.err.errors].filter(Boolean));
    }
});

function onPlumberError(error) {
    console.log(error);
    this.emit('end');
}