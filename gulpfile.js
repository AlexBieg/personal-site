'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var lr = require('gulp-livereload');

gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./style'))
        .pipe(lr());
});

gulp.task('html', function() {
    return lr.reload();
})

gulp.task('watch', function() {
    lr.listen();
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('*.html', ['html'])
})
