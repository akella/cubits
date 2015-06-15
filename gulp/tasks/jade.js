module.exports = function() {

    var gulp         = require('gulp'),
        jade         = require('gulp-jade'),
        plumber      = require('gulp-plumber'),
        changed      = require('gulp-changed'),
        config       = require('./../config');

    // gulp.task('jade', function() {

        return gulp.src(config.src.jade + '/[^_]*.jade')
            .pipe(plumber({errorHandler: config.errorHandler}))
            .pipe(changed(config.dest.html, {extension: '.html'}))
            .pipe(jade({pretty: true}))
            .pipe(gulp.dest(config.dest.html));

    // });

};