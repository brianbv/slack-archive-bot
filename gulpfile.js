let gulp = require("gulp");
let tsc = require("gulp-typescript");
//let sass = require("gulp-sass");
//let pack = require("webpack-stream");
let rimraf = require('rimraf');
//let packConfig = require('./webpack.config.js');

gulp.task('clean', ()=>{
    let sources = ['dist','obj'];

    let promises = sources.map(src=>new Promise((resolve,reject)=>{
        rimraf(src, {}, ()=>{
            resolve()
        });
    }));

    return Promise.all(promises);
});

gulp.task('build-ts', ()=>{
    let project = tsc.createProject('tsconfig.json');
    return gulp.src('src/**/*.ts')
        // .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(project())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('obj/ts'));
})

gulp.task('copy-views',()=>{
    return gulp.src('./src/viewer/views/**').pipe(gulp.dest('./obj/ts/viewer/views'));
})

gulp.task('default',
    gulp.series('build-ts','copy-views')
);
