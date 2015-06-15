module.exports = function() {

    var gulp         = require('gulp'),
        jade         = require('gulp-jade'),
        plumber      = require('gulp-plumber'),
        config       = require('./../config');

    // gulp.task('jade-all', function() {

        return gulp.src(config.src.jade + '/[^_]*.jade')
            .pipe(plumber({errorHandler: config.errorHandler}))
            .pipe(jade({pretty: true}))
            .pipe(gulp.dest(config.dest.html));

    // });

};