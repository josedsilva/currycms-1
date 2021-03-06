var gulp = require("gulp");

// include plug-ins
var jshint = require("gulp-jshint");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

var files = [
  '../backend/common/js/preconfigure.js',
  // jquery
  'bower_components/jquery/dist/jquery.js',
  // jquery-ui
  'bower_components/jquery-ui/ui/{core,widget,mouse,position,draggable,droppable,resizable,selectable,sortable}.js',
  // flexigrid
  'flexigrid-1.0b3/flexigrid.js',
  'flexigrid-1.0b3/flexigrid.css',
  // codemirror
  'bower_components/codemirror/lib/codemirror.js',
  'bower_components/codemirror/lib/codemirror.css',
  'bower_components/codemirror/mode/xml/xml.js',
  'bower_components/codemirror/mode/javascript/javascript.js',
  'bower_components/codemirror/mode/css/css.js',
  // tinymce
  'bower_components/tinymce/tinymce.js',
  'bower_components/tinymce/plugins/{table,image,autolink,link,media,contextmenu,paste,searchreplace,lists,advlist,hr,anchor,visualblocks,visualchars,code,fullscreen}/plugin.js',
  'bower_components/tinymce/themes/modern/theme.js',
  'bower_components/tinymce/skin/lightgray/content.min.css',
  'bower_components/tinymce/skin/lightgray/skin.min.css',
  'bower_components/tinymce/jquery.tinymce.min.js',
  // jquery-cookie (dependency of dynatree)
  'bower_components/jquery-cookie/jquery.cookie.js',
  // dynatree
  'bower_components/dynatree/dist/jquery.dynatree.js',
  'bower_components/dynatree/dist/skin-vista/ui.dynatree.css',
  'bower_components/dynatree/dist/skin-vista/*.gif',
  // chosen
  'bower_components/chosen/chosen.jquery.min.js',
  'bower_components/chosen/chosen.min.css',
  'bower_components/chosen/*.png',
  // URI.js
  'bower_components/uri.js/src/URI.js',
  // grid
  'bower_components/curry-grid/grid.js',
  'bower_components/curry-grid/grid.css',
  // Curry
  '../backend/common/js/core.js',
  '../backend/common/js/plugins.js',
  '../backend/common/js/main.js',
  '../backend/common/js/finder.js',
  '../backend/common/js/postconfigure.js'
];

function scripts() {
  return files.filter(function(file) { return /\.js$/.test(file); });
}
function styles() {
  return files.filter(function(file) { return /\.css$/.test(file); });
}
function images() {
  return files.filter(function(file) { return /\.(gif|png)$/.test(file); });
}

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  return gulp.src(scripts())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('build'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  return gulp.src(styles())
    .pipe(concat('all.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build'));
});

gulp.task('images', function() {
  return gulp.src(images())
    .pipe(gulp.dest('build'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(scripts(), ['scripts']);
  gulp.watch(styles(), ['styles']);
  gulp.watch(images(), ['images']);
});

gulp.task('default', ['scripts', 'styles', 'images']);
