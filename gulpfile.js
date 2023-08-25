const gulp = require('gulp');
const {series, parallel} = require('gulp');
const {src, dest} = require('gulp');

const fileinclude = require('gulp-file-include');
const del = require('del');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const group_media = require('gulp-group-css-media-queries');
const clean_css = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const webphtml = require('gulp-webp-html');
const webpcss = require('gulp-webpcss');
const sprite = require('gulp-svg-sprite');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter-unx');  // для Linux
// const fonter = require('gulp-fonter');   // для Windows
const newer = require('gulp-newer');
const browsersync = require('browser-sync').create();

var ghPages = require('gulp-gh-pages');

// Обновление браузера
function browserSync(){
    browsersync.init({
        server:{
            baseDir: "./" + projectFolder + "/"
        },
        port: 3000,
        notify: false,
    })
}

let sourceFolder = '#src'
let projectFolder = 'dist'
let path = {
    build:{
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        img: projectFolder + "/img/",
        js: projectFolder + "/js/",
        fonts: projectFolder + "/fonts/",
    },
    src:{
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
        css: sourceFolder + "/scss/*.scss",
        img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        js: sourceFolder + "/js/*.js",
        fonts: sourceFolder + "/fonts/*.*",
    },
    watch:{
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        js: sourceFolder + "/js/**/*.js",
    },
    clean: "./" + projectFolder + "/"
}

function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function images(){
    return src(path.src.img)
        .pipe(newer(path.build.img))
        .pipe(
            avif({
                quality: 70
            })
        )

        .pipe(src(path.src.img))
        .pipe(newer(path.build.img))
        .pipe(
            webp({
                quality: 70
            })
        )

        .pipe(src(path.src.img))
        .pipe(newer(path.build.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3    // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
        .pipe(concat('style.css'))
        .pipe(
            scss({
                outputstyle: "expanded"
            })
        )
        .pipe(group_media())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: true
                })
        )
        .pipe(webpcss(
            {
                webpClass: '.webp',
                noWebpClass: '.no-webp'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function fonts(){
    return src(path.src.fonts)
        .pipe(fonter({
            formats: ['woff', 'ttf']
          }))
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

// function fonts(){
//     src(path.src.fonts)
//         .pipe(ttf2woff())
//         .pipe(dest(path.build.fonts))
//     return src(path.src.fonts)
//         .pipe(ttf2woff2())
//         .pipe(dest(path.build.fonts))
// }

function js(){
    return src(path.src.js)
        .pipe(concat('script.js'))
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function svgSprite(){
    return src([sourceFolder + '/iconsprite/*.svg'])
        .pipe(sprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg",
                    example: true,
                }
            },
        }
        ))
        .pipe(dest(path.build.img))
}

function watchFiles(params){
    gulp.watch([path.watch.html],html)
    gulp.watch([path.watch.css],css)
    gulp.watch([path.watch.js],js)
    gulp.watch([path.watch.img],images)
}

function clean(){
    return del(path.clean)
}

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
      .pipe(ghPages());
  });

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts))
let watch = gulp.parallel(build, browserSync, watchFiles)

exports.fonts = fonts
exports.images = images
exports.js = js
exports.css = css
exports.build = build
exports.svgSprite = svgSprite
exports.html = html
exports.watch = watch 
exports.default = watch


