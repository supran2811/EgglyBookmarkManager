var gulp = require('gulp'),
runSequence = require("run-sequence"),
del = require("del"),
inject = require("gulp-inject"),
serve = require("gulp-serve"),
files = require("./gulp/gulp.config.js")
jshint = require("gulp-jshint");

gulp.task('default',function(callback){
    runSequence("watch","serve",callback);
});


gulp.task("build",function(callback){
    runSequence("clean","copy-build" , "index",callback);
});

gulp.task("serve",serve("build"));

gulp.task("index",function(){
    

    return gulp.src("index.html")
            .pipe(inject(gulp.src(files.app_files.tbl_files),{ignorePath : 'build'})  )
            .pipe(gulp.dest("./build"));
})

gulp.task("clean",function(){
        del.sync(["./build"],{force:true});
});

gulp.task("copy-build",["copy-assets","copy-app-js","copy-vendor-js","copy-json"]);


gulp.task("copy-assets",function(){
      return gulp.src("assets/**")
            .pipe(gulp.dest("build/assets/"));
});


gulp.task("copy-app-js",function(){
    return gulp.src("app/**")
            .pipe(gulp.dest("build/app/"));
});


gulp.task("copy-vendor-js",function(){
      return gulp.src("vendor/**")
            .pipe(gulp.dest("build/vendor/"));
});

gulp.task("copy-json" , function(){
    return gulp.src("data/**")
                .pipe(gulp.dest("build/data/"));
});

gulp.task("lint" , function(){

    return gulp.src(files.app_files.js_files)
                .pipe(jshint())
                .pipe(jshint.reporter("default"));
});

gulp.task("watch" ,function(){
    gulp.watch(files.app_files.js_files , ["lint","build"]);
});