module.exports = function() {

    var gulp         = require('gulp'),
        plumber      = require('gulp-plumber'),
        svgmin       = require('gulp-svgmin'),
        // cheerio      = require('gulp-cheerio'),
        config       = require('./../config');

    // gulp.task('svgo', function() {

        return gulp.src(config.src.svg + '/not-optimized/*.svg')
            .pipe(plumber({errorHandler: config.errorHandler}))
            .pipe(svgmin({
                js2svg: {
                    pretty: true
                },
                plugins: [{
                    removeDesc: true
                },{
                    cleanupIDs: true
                },{
                    mergePaths: false
                }
            ]}))
            // .pipe(cheerio({
            //     run: function ($, file) {
            //         $('[fill]:not([fill="currentColor"])').removeAttr('fill');
            //     },
            //     parserOptions: { xmlMode: true }
            // }))
            .pipe(gulp.dest(config.src.svg + '/optimized'));
    // });

};