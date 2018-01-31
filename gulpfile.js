const gulp = require('gulp'),
    less = require('gulp-less'),
    prefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('webpack-stream'),
    rename = require('gulp-rename');


const path = {
    dist: {
        js: 'public/js/',
        css: 'public/css/',
    },
    
    src: {
        less: ['app/components/**/*.less', '!app/components/**/base.less'],
        js: 'app/index.js',
    },
    
    watch: {
        js: ['app/components/**/*.js', 'app/index.js'],
        less: ['app/components/**/*.less'],
    },
    outputDir: '.'
};


// start server
gulp.task('connect', function () {
    connect.server({
        root: [path.outputDir],
        port: 5000,
        livereload: true
    });
});


// build css
gulp.task('less', function () {
    gulp.src(path.src.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('index.css'))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(connect.reload());
});


gulp.task('build:css', ['less']);


// build js
gulp.task('js', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js))
        .pipe(connect.reload());
});

gulp.task('build:js', ['js']);


// watch
gulp.task('watch', function () {
    gulp.watch(path.watch.less, ['build:css']);
    gulp.watch(path.watch.js, ['build:js'])
});


gulp.task('default', ['connect', 'watch']);