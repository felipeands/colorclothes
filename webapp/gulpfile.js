// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;



// tasks
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
  gulp.src('./dist/*')
  .pipe(clean({force: true}));
});

gulp.task('sass', function() {
  return sass('./app/css/main.scss')
    .pipe(gulp.dest('app/css'))
    .pipe(reload({ stream:true }));
});

// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('./app/css/main.scss', ['sass']);
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
  .pipe(minifyCSS(opts))
  .pipe(gulp.dest('./dist/'))
});

gulp.task('minify-js', function() {
  gulp.src(['./app/***/*.js'])
  .pipe(uglify({
    // inSourceMap:
    // outSourceMap: "app.js.map"
  }))
  .pipe(gulp.dest('./dist/'))
});

gulp.task('concat', function() {
  return gulp.src(['./app/bower_components/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))

});

gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
  .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});

// default task
gulp.task('default',
  ['lint', 'connect']
);
// build task
gulp.task('build',
  [
  'lint',
  'minify-css',
  'minify-js',
  'copy-html-files',
  //'concat',
  'copy-bower-components',
  'connectDist'
  ]
);