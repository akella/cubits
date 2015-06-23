var gulp = require('./gulp')([
    // connect your tasks here
    'server',
    'browserify',
    'watchify',
    'jade',
    'jade-all',
    'sass',
    'svg-sprite',
    'svgo',
    'sprite',
    'watch'
    ]);

gulp.task('build', [
    'svg-sprite',
    'sprite',
    'sass',
    'jade-all',
    'browserify'
    ]);

gulp.task('default', [
    'server',
    'watch',
    'watchify'
    ]);