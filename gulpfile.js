var gulp = require('gulp');

var path = require('path');
var through = require('through2');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var handlebars = require('gulp-hb');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var replace = require('gulp-replace');
var minifyCss = require('gulp-minify-css');

gulp.task('clean', cleaner);
gulp.task('scss', sassCompiler);
gulp.task('scripts', scriptCompiler);
gulp.task('template', handlebarsCompiler);
gulp.task('inline:styles', stylesInliner);
gulp.task('inline:scripts', scriptsInliner);
gulp.task('test', tester);
gulp.task('deploy', deployer);
gulp.task('default', function (cb) {
  gulpSequence('clean', ['scss', 'scripts', 'template'], 'inline:styles', 'inline:scripts', cb);
});
gulp.task('deploy', function (cb) {
  gulpSequence('default', 'test', 'deploy', cb);
});

var styles = {};
var scripts = {};

function scriptCompiler() {
  return browserify('./src/js/main.js')
    .bundle()
    .on('error', function (err) {
      console.log('error occured:', err);
      this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(through.obj(function (file, encoding, done) {
      var content = '';
      file.contents.on('data', function (chunk) {
        content += chunk.toString();
      }).on('end', function () {
        scripts[path.basename(file.path)] = content;
        done();
      });
    }))
    .pipe(gulp.dest('out/js'));
}

function sassCompiler() {
  return gulp.src(['./src/scss/all.scss', './src/scss/home.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(through.obj(function (file, encoding, done) {
      styles[path.basename(file.path)] = file.contents.toString();
      this.push(file);
      done();
    }))
    .pipe(gulp.dest('out/css'));
}

function handlebarsCompiler() {
  return gulp
    .src('./src/**/*.html')
    .pipe(handlebars({
      data : './src/templates/data/**/*.{js,json}',
      helpers : './src/templates/helpers/*.js',
      partials : './src/templates/partials/**/*.hbs'
    }))
    .pipe(gulp.dest('out/'));
}

function stylesInliner() {
  return gulp.src('out/template.html')
    .pipe(replace(/<link href="(.*?)" rel="stylesheet" type="text\/css"\/>/g, mappedStyles))
    .pipe(gulp.dest('out/'));

  function mappedStyles(match, cssFile) {
    var style = styles[cssFile];
    if (style) {
      return '<style type="text/css">' + style + '</style>';
    } else {
      return match;
    }
  }
}

function scriptsInliner() {
  return gulp.src('out/template.html')
    .pipe(replace(/<script src="(.*?)"><\/script>/g, mappedScripts))
    .pipe(gulp.dest('out/'));

  function mappedScripts(match, jsFile) {
    var script = scripts[jsFile];
    if (script) {
      return '<script>' + script + '</script>';
    } else {
      return match;
    }
  }
}

function tester(cb) {
  cb(new Error('help!'));
}

function deployer(cb) {
  cb(new Error('help2!'));
}

function cleaner(cb) {
  del('out', cb);
}