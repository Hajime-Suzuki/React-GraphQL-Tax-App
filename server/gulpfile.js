'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const pug = require('gulp-pug')
const browserSync = require('browser-sync').create()

const src = './src/services/invoice/src'
const build = './src/services/invoice/build'

const initBrowserSync = () =>
  browserSync.init({
    server: build
  })

const compileSass = () =>
  gulp
    .src(`${src}/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(build))
    .pipe(browserSync.stream())

const compilePug = () =>
  gulp
    .src(`${src}/*.pug`)
    .pipe(pug())
    .pipe(gulp.dest(build))

gulp.task('default', () => {
  initBrowserSync()
  gulp
    .watch(
      [`${src}/*.scss`, `${src}/*.pug`],
      gulp.series(compileSass, compilePug)
    )
    .on('change', browserSync.reload)
  gulp.watch(`${build}/*.html`).on('change', browserSync.reload)
})

gulp.task('compile', async () => {
  await gulp
    .src(`${src}/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(src))
})
