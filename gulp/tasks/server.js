module.exports = function() {

    var gulp         = require('gulp'),
        browserSync  = require('browser-sync'),
        config       = require('./../config');


    // gulp.task('server', function() {

        browserSync({
            server: {
                baseDir: config.dest.root,
                // directory: true,
            },
            files: [
                config.dest.html + '/*.html',
                config.dest.css + '/*.css',
                config.dest.js + '/*.js'
            ],
            port: 8080,
            open: false,
            notify: false,
            ghostMode: false,
            online: false,
            open: false,
            // tunnel: 'site'
        });

    // });

};