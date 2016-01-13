var fs = require('fs')
var path = require('path')
var gulp = require('gulp')
var changed = require('gulp-changed')
var BrowserSync = require('browser-sync')
var Hexo = require('hexo')
var rimraf = require('rimraf')
var mkdirp = require('mkdirp')
var runSequence = require('run-sequence')
var browserSync = BrowserSync.create()

// Directory copy helper, doesn't copy already existing files
function copy(src, dest, base, cb) {
  cb = cb || function() {}
  var opts = !!base ? {base: base} : {}

  return gulp.src(src, opts)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
    .on('finish', cb)
}

// Hexo object creation helper
function getHexo(subdir) {
  return new Hexo(process.cwd()+'/'+subdir, {})
}

gulp.task('clean', cb => rimraf('dist', cb))

gulp.task('build', ['build:en', 'build:pt', 'assets', 'copyFiles'], cb => {
  // Create .nojekyll to prevent github from running us through publishing steps
  fs.writeFile('dist/.nojekyll', '', cb)
})

function build(subdir) {
  return function(cb) {
    var hexo = getHexo(subdir)
    hexo.init()
      .then(() => hexo.call('clean', {}))
      .then(() => hexo.call('generate', {}))
      .then(() => hexo.exit())
      .then(() => copy(subdir+'/public/**/*', 'dist/'+subdir, subdir+'/public', cb))
  }
}
gulp.task('build:dir', cb => {
  fs.stat('dist', (err, stats) => {
    if(!err && stats.isDirectory())
      return cb()

    console.log('Creating dir', stats)
    //mkdirp('dist', () => {
    //  console.log('finished')
      cb()
    //})
  })
})
gulp.task('build:en', ['build:dir'], build('en'))
gulp.task('build:pt', ['build:dir'], build('pt'))
gulp.task('assets', ['build:dir'], () => copy('assets/**/*', 'dist/assets'))
gulp.task('copyFiles', ['build:dir'], () => copy('index.html', 'dist'))

gulp.task('default', ['watch'])

function gulpTaskReload(task) {
  console.log('Reloading...')
  return gulp.start(task, () => {
    if(!browserSync.active)
      return

    console.log('Really reloading')
    browserSync.reload()
  })
}
gulp.task('watch', ['build'], () => {
  browserSync.init('dist/**/*', {
    server: { baseDir: 'dist' }
  })

  // Watch and rebuild hexo
  browserSync.watch(['pt/_config.yml', 'pt/source/**/*', 'themes/**/*'], gulpTaskReload('build:pt'))
  browserSync.watch(['pt/_config.yml', 'pt/source/**/*', 'themes/**/*'], gulpTaskReload('build:en'))
  browserSync.watch('assets/**/*', gulpTaskReload('assets'))
  browserSync.watch('index.html', gulpTaskReload('copyFiles'))
})
