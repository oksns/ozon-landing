module.exports = {
    autoprefixer: {
        browsers: [
            'last 2 versions',
            'safari 5',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ],
        cascade: true
    },
    less: {
        src: 'styles/*.less',
        dest: 'styles/'
    },
    soy: {
        src: ['./templates/com/netcracker/portal/**/*.soy', '!./scripts/templates/soyutils.js'],
        dest: './scripts/templates/',
        concat: 'main.js',
        ignore: './scripts/templates/soyutils.js'
    },

    icons: {
        src: ['./images/icons/**/*'],
        dest: './styles/common/',
        template: './gulp/icons-template.css',
        concat: './icons.less'
    },
    watch: {
        html: '*.html',
        less: 'styles/**/*.less',
        icons: 'images/icons/*'
    },

    browserSync: {
        src: 'styles/main.css',
        dest: 'styles/'
    },

    plugins: {
        scope: ['dependencies', 'devDependencies', 'peerDependencies'],
        rename: {
            'gulp-plumber'          : 'plumber',
            'gulp-less'             : 'less',
            'gulp-autoprefixer'     : 'autoprefixer',
            'gulp-image-data-uri'   : 'uri',
            'browser-sync'          : 'browserSync',
            'gulp-concat'           : 'concat'
        }
    }
};