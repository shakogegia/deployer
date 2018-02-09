const gulp = require('gulp')
const clean = require('gulp-clean');
const shell = require('gulp-shell')
var runSequence = require('run-sequence');

gulp.task('cleanapp', function (cb) {
  gulp.src('app', {read: false})
  .pipe(clean());
    cb()
});

gulp.task('cleandist', function (cb) {
  gulp.src('dist', {read: false})
      .pipe(clean())

    setTimeout(() => {
      cb()
    }, 1000);
});

gulp.task('vue', function(cb) {
  gulp.src('.')
    .pipe(shell('npm run build'))
    .once('end', function() {
      cb()
    });
});

gulp.task('appvue', (cb) => {
  gulp.src(['dist/**/*', './icon.png']).pipe(gulp.dest('app'));
  setTimeout(() => {
    cb()
  }, 1000);

})

gulp.task('electron', shell.task('yarn dist'))

// gulp.task('prepare', ['cleanapp', 'cleandist', 'vue'])

// gulp.task('build', ['cleanapp', 'cleandist', 'vue', 'appvue', 'cleandist'])

gulp.task('build', function(callback) {
  runSequence('cleanapp',
              'cleandist',
              'vue',
              'appvue',
              'cleandist',
              'electron',
              callback);
});