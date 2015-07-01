var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var spritesmith = require('gulp.spritesmith');
var config      = require('../config');

gulp.task('sprite', function() {
  var spriteData = gulp.src(config.src.img + '/icons/*.png')
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(spritesmith({
      imgName: 'icons.png',
      cssName: '_sprite.scss',
      imgPath: '../img/icons.png',
      cssFormat: 'scss',
      padding: 10,
      // algorithm: 'top-down',
      cssTemplate: config.src.helpers + '/sprite.template.mustache'
    }));
  spriteData.img
    .pipe(gulp.dest(config.dest.img));
  spriteData.css
    .pipe(gulp.dest(config.src.sass));
});
