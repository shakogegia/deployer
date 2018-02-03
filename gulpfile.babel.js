import gulp from 'gulp'
import run from 'gulp-run-command'

gulp.task('cleanapp', run('rm -rf app '))
gulp.task('cleandist', run('rm -rf dist '))
gulp.task('vue', run('npm run build'))
gulp.task('appvue', () => {
  gulp.src(['dist/**/*']).pipe(gulp.dest('app'));
})

gulp.task('build', ['cleanapp', 'appvue', 'cleandist'], run('yarn dist', {
  env: { NODE_ENV: 'production' }
}))