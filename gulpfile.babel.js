import gulp from 'gulp'
import run from 'gulp-run-command'

gulp.task('cleanapp', run('rm -rf app '))
gulp.task('cleandist', run('rm -rf dist '))
gulp.task('vue', run('npm run build'))
gulp.task('appvue', () => {
  gulp.src(['dist/**/*', './icon.png']).pipe(gulp.dest('app'));
})

gulp.task('prepare', ['cleanapp', 'appvue'])

gulp.task('build', ['appvue', 'cleandist'], run('yarn dist', {
  env: { NODE_ENV: 'production' }
}))