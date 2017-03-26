var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'), // 图片压缩
    pngquant = require('imagemin-pngquant'); // 深度压缩

gulp.task('js', function (cb) {
    gulp.src(['js/*.js', '!js/*.min.js'])
        .pipe(changed('js/dist')) 
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' })) 
        .pipe(gulp.dest('js/dist'));
}); 

gulp.task('images', function(){
  return gulp.src('images/*.{png,jpg,gif,svg}')
    .pipe(changed('images/dist')) // 对比文件是否有过改动（此处填写的路径和输出路径保持一致）
    .pipe(imagemin({ 
      interlaced: true, //隔行扫描gif
      progressive: true, // 无损压缩JPG图片
      svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
      use: [pngquant()] // 使用pngquant插件进行深度压缩
    }))
    .pipe(gulp.dest('images/dist')); // 输出路径
});

gulp.task('default', function () {
    gulp.watch('js/*.js', ['js']);
});