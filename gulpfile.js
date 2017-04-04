/**
 * @license (for original file)
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

const path = require('path')
const del = require('del')
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const gulpif = require('gulp-if')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const mergeStream = require('merge-stream')
const polymer = require('polymer-build')

// Got problems? Try logging 'em
// require('plylog').setVerbose()

// Config
const buildDir = 'dist'
const bundledPath = path.join(buildDir, 'bundled')
const unbundledPath = path.join(buildDir, 'unbundled')
const swPath = 'service-worker.js'
const swPrecacheConfig = require('./sw-precache-config')
const polymerJSON = require('./polymer.json')

// The mighty Polymer Project instance
const project = new polymer.PolymerProject(polymerJSON)

// The source task will split all of your source files into one
// big ReadableStream. Source files are those in src/** as well as anything
// added to the sourceGlobs property of polymer.json.
// Because most HTML Imports contain inline CSS and JS, those inline resources
// will be split out into temporary files. You can use gulpif to filter files
// out of the stream and run them through specific tasks. An example is provided
// which filters all images and runs them through imagemin
function source() {
	const htmlSplitter = new polymer.HtmlSplitter()

	return project.sources()
		.pipe(htmlSplitter.split())
		.pipe(gulpif('**/*.{png,gif,jpg,svg}', imagemin({
			progressive: true,
			interlaced: true
		})))
		.pipe(gulpif('**/*.css', autoprefixer()))
		.pipe(gulpif('**/*.js', babel()))
		.pipe(htmlSplitter.rejoin())
		.on('error', (...args) => console.error(...args))
}

// The dependencies task will split all of your bower_components files into one
// big ReadableStream
// You probably don't need to do anything to your dependencies but it's here in
// case you need it :)
function dependencies() {
	return project.dependencies()
		.on('error', (...args) => console.error(...args))
}

function build() {
	const htmlSplitter = new polymer.HtmlSplitter()

	const stream = mergeStream(source(), dependencies())
		.pipe(htmlSplitter.split())
		.pipe(gulpif('**/*.js', uglify()))
		.pipe(gulpif('**/*.html', htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			minifyCSS: true, // just in case there's some leftovers
			uglifyJS: true
		})))
		.pipe(gulpif('**/*.css', cleanCSS()))
		.pipe(htmlSplitter.rejoin())

	const outputs = []
	outputs.push(new Promise(resolve => {
		polymer.forkStream(stream)
			.pipe(project.bundler())
			.pipe(gulp.dest(bundledPath))
			.on('end', resolve)
	}))

	outputs.push(new Promise(resolve => {
		polymer.forkStream(stream)
			.pipe(gulp.dest(unbundledPath))
			.on('end', resolve)
	}))

	return Promise.all(outputs)
}

// Clean build directory
function cleanBuild() {
	return del(buildDir)
}

// Generate service workers for bundled and unbundled outputs
function buildSW() {
	return Promise.all([
		polymer.addServiceWorker({
			project,
			swPrecacheConfig,
			buildRoot: bundledPath,
			path: swPath,
			bundled: true
		}),
		polymer.addServiceWorker({
			project,
			swPrecacheConfig,
			buildRoot: unbundledPath,
			path: swPath
		})
	])
}

// Copies manifest.json to each output
function copyManifest() {
	return gulp.src('manifest.json')
		.pipe(gulp.dest(bundledPath))
		.pipe(gulp.dest(unbundledPath))
}

// Clean the build directory, split all source and dependency files into streams
// and process them, and output bundled and unbundled versions of the project
// with their own service workers
gulp.task('default', gulp.series([
	cleanBuild,
	build,
	gulp.parallel([buildSW, copyManifest])
]))
