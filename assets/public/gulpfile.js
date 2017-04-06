var gulp = require('gulp'),
    uglify = require('gulp-uglify'), //压缩js
    rename = require("gulp-rename"), //文件重命名
    changed = require('gulp-changed'), //监听文件是否修改
    imagemin = require('gulp-imagemin'), // 图片压缩
    pngquant = require('imagemin-pngquant'), // 深度压缩
    runSequence = require('run-sequence'),     // 同步运行任务插件
    del = require('del'), //删除文件
    spritesmith = require('gulp.spritesmith'), //合成雪碧图
    find = require("gulp-find-glob"); //得到glob对象
gulp.task('clean:images:dist', function (cb) {
    return del('images/dist');
});

gulp.task('clean:js:dist', function (cb) {
    return del('js/dist');
});

gulp.task('js', function (cb) {
    return gulp.src(['js/*.js', '!js/*.min.js'])
        .pipe(changed('js/dist')) 
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' })) 
        .pipe(gulp.dest('js/dist'));
});

gulp.task('images', ['clean:images:dist'], function(){
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

gulp.task('sprite', function () {
  var sprite_dir = [];
  find("images/sprite/**").then(function(dir){
    dir.forEach(function(item){
        var items = item.split('/');
        if(items.length === 3){
          sprite_dir.push(items[2]);
        }
    });
    if(sprite_dir.length === 0){ return; }
    sprite_dir.forEach(function(d){
       del(['images/sprite/' + d + '/sprite.png', 'images/sprite/' + d + '/sprite.scss']).then(function(result){
         gulp.src('images/sprite/' + d + '/*.png')
           .pipe(spritesmith({
               imgName: 'sprite.png',
               cssName: 'sprite.scss',
               imgPath: 'images/sprite/' + d + '/sprite.png',
               cssFormat: 'scss',
               padding: 10
           }))
           .pipe(gulp.dest('images/sprite/' + d + '/'));
       });
    });
  });
});

gulp.task('watch', ['js', 'images'],  function () {
    gulp.watch(['js/*.js', '!js/*.min.js'], ['js']);
    gulp.watch('images/*.{png,jpg,gif,svg}', ['images']);
});

gulp.task('default', function (cb) {
    runSequence(['js', 'images', 'watch'], cb);
});
