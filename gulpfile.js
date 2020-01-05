var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task('default', function () {
    return gulp.src('assets/scripts/src/*.ts')
        .pipe(ts({
			noImplicitAny: true,
			target: 'ES5'
        }))
        .pipe(gulp.dest('assets/scripts/dist'));
});