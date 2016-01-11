var fs = require('fs')
var path = require('path')
var gulp = require('gulp')
var BrowserSync = require('browser-sync')
var Hexo = require('hexo')
var rimraf = require('rimraf')
var mkdirp = require('mkdirp')
var ncp = require('ncp').ncp
var runSequence = require('run-sequence')

// Hexo object creation helper
function getHexo(subdir) {
  return new Hexo(process.cwd()+'/'+subdir, {})
}

gulp.task('clean', cb => rimraf('dist', cb))

gulp.task('build', function(cb) {
  // Create output dir
  mkdirp('dist', function(err) {
    if(err)
      return cb(err)

    // Create .nojekyll to prevent github from running us through publishing steps
    fs.writeFileSync('dist/.nojekyll', '')

    // Run the things
    runSequence(['build:en', 'build:pt', 'assets'], 'copyFiles', cb)
  })
})

function build(subdir) {
  return function(cb) {
    rimraf('dist/'+subdir, function(err) {
      if(err)
        return cb(err)

      var hexo = getHexo(subdir)
      hexo.init()
        .then(() => hexo.call('generate', {}))
        .then(() => hexo.exit())
        .then(() => {
          ncp(subdir+'/public', 'dist/'+subdir, err => {
            if(err)
              return cb(err)

            fs.writeFile('dist/'+subdir+'/.buildtimestamp', Date.now(), cb)
          })
        })
    })
  }
}
gulp.task('build:en', build('en'))
gulp.task('build:pt', build('pt'))
gulp.task('assets', cb => ncp('assets', 'dist/assets', cb))
gulp.task('copyFiles', () => gulp.src(['index.html']).pipe(gulp.dest('dist')))

gulp.task('default', ['watch'])
gulp.task('watch', ['build'], function() {
  var browserSync = BrowserSync.create()

  browserSync.init(['dist/assets/**/*', 'dist/index.html', 'dist/.buildtimestamp'], {
    server: { baseDir: 'dist' }
  })

  // Watch and rebuild hexo
  gulp.watch('pt/**/*', ['build:pt'])
  gulp.watch('en/**/*', ['build:en'])
  gulp.watch('assets/**/*', ['assets'])
  gulp.watch('index.html', ['copyFiles'])
})
