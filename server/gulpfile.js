'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const pug = require('gulp-pug')
const browserSync = require('browser-sync').create()

const src = './src/pdf/src'
const build = './src/pdf/build'

const compileSass = () =>
  gulp
    .src(`${src}/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(build))

const compilePug = () =>
  gulp
    .src(`${src}/*.pug`)
    .pipe(pug())
    .pipe(gulp.dest(build))

const initBrowser = () =>
  browserSync.init({
    server: build
  })

gulp.task('default', () => {
  initBrowser()
  gulp.watch(`${src}/*.scss`, compileSass)
  gulp.watch(`${src}/*.pug`, compilePug)
  gulp.watch(`${build}/*.html`).on('change', browserSync.reload)
})
