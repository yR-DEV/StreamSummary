import gulp from 'gulp';
import fs from 'fs';
import babel from 'babelify';
import browserify from 'browserify';
import watchify from 'watchify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import nodemon from 'nodemon';

const serverPath = './server'
const clientPath = './client'
const paths = {
    client: {
        mainView: `${clientPath}/index.html`,
        mainStyle: `${clientPath}/app/app.scss`,
        scripts: [
            `${clientPath}/**/!(*.spec|*.mock).js`,
            `${clientPath}/bower_components/**/*`
        ],
        styles: [
            `${clientPath}/{app, components}/**/*.scss`
        ],
        views: `${clientPath}/{app, components}/**/*.html`
    },
    server: {
        scripts: [`${serverPath}/**/!(*.spec|*.mock).js`]
    }
}

gulp.task('clean', => {

})
