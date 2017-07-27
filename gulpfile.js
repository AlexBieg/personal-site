const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const livereload = require('gulp-livereload');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./app/build'));
});

gulp.task('watch', ['build'], function () {
  livereload.listen();

  gulp.watch('./app/sass/**/*.scss', ['sass', 'livereload']);
  gulp.watch('./app/scripts/**/*.js', ['browserify', 'livereload']);

  gulp.watch('./app/**/*.html', ['livereload']);
  gulp.watch('./app/img/**/*', ['livereload']);
  gulp.watch('./app/data/**/*', ['livereload']);
  gulp.watch('./app/fonts/**/*', ['livereload']);
});

gulp.task('livereload', ['sass', 'browserify', 'build'], function() {
  livereload.reload();
});

gulp.task('browserify', function () {
  return browserify('./app/scripts/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/build/'));
});

gulp.task('server', ['build', 'watch'], function () {
  env({
    file: '.env'
  })

  let stream = nodemon({
    script: 'server.js',
    ignore: 'app/build/**'
  })

  stream.on('restart', ['build', 'livereload'])
});

gulp.task('build', ['sass', 'browserify']);

gulp.task('default', ['build', 'watch', 'server']);
