var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var spawn = require('child_process').spawn;
var node;

gulp.task('sass', function() {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./app/style'));
});

gulp.task('watch', function() {
    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch('./app/scripts/**/*.js', ['browserify']);
});

gulp.task('browserify', function() {
    return browserify('./app/scripts/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/build/'));
});

gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['server.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('default', ['sass', 'browserify', 'watch', 'server']);
