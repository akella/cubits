module.exports = function() {

    var gulp         = require('gulp'),
        sass         = require('gulp-ruby-sass'),
        sourcemaps   = require('gulp-sourcemaps'),
        postcss      = require('gulp-postcss'),
        assets       = require('postcss-assets'),
        autoprefixer = require('autoprefixer-core'),
        config       = require('./../config');

    // gulp.task('sass', function() {

        var processors = [
            autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }),
            assets({
                basePath: './site',
                baseUrl: '/',
                cachebuster: false,
                loadPaths: ['img/'],
                relativeTo: false
            })
        ];

        return sass(config.src.sass, {
            sourcemap: true,
            style: 'compact'
        })
        .on('error', config.errorHandler)
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.css));

    // });

};