var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var svgmin = require('gulp-svgmin');
var responsive = require('gulp-responsive');
var distDir = 'dist';

gulp.task('clear', function() {
    return del.sync(distDir);
});

gulp.task('imagemin', function() {
    return gulp.src('src/*.{png,jpg}')
        .pipe(imagemin([imageminPngquant({quality: '40-60'})]))
        .pipe(gulp.dest(distDir));
});

gulp.task('svgmin', function () {
    gulp.src('src/*.svg')
        .pipe(svgmin({
            plugins: [{
                removeTitle: true
            }, {
                sortAttrs: true
            }, {
                removeDimensions: true
            }]
        }))
        .pipe(gulp.dest(distDir));
});

//https://github.com/mahnunchik/gulp-responsive
gulp.task('pics', function () {
    var imageSize = 420;

    return gulp.src('src/*.{png,jpg}')
        .pipe(responsive({
            '*.png': [
                {
                    width: imageSize
                },{
                    width: imageSize * 2,
                    rename: { suffix: '@2x' }
                },{
                    width: imageSize * 3,
                    rename: { suffix: '@3x' }
                }
            ]
        },{
            withMetadata: false,
            errorOnEnlargement: false
            // progressive: true,
        }))
        .pipe(imagemin([
            imageminPngquant({quality: '40-60'})
        ],{
            verbose: true
        }))
        .pipe(gulp.dest(distDir));
});

gulp.task('default', ['clear','svgmin','pics']);