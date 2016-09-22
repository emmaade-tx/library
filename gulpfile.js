const gulp = require('gulp');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');

const jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', () => {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs());
});

gulp.task('inject', () => {
	const wiredep = require('wiredep').stream;
	const gulpInject = require('gulp-inject');

	const injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});
	const injectOptions = {
		ignorePath: '/public'
	};
	const options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	}
	return gulp.src('./src/view/*.html')
		.pipe(wiredep(options))
		.pipe(gulpInject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/view'));
});

gulp.task('default', ['inject'], () => {
	nodemon({
		script: 'app.js',
		delayTime: 1,
		ext: 'js',
		env: {
			PORT: 3000
		},
		watch: jsFiles,
		ignore: ['./node_modules/**']
	})
	.on('restart', () => {
		console.log('restarting');
	});
});

