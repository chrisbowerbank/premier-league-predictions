module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        style: 'compressed',
        sourcemap: 'none'
      },
      target: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        processors: [
          require('pixrem')(),
          require('autoprefixer')({
            browsers: 'last 2 versions'
          }),
          require('cssnano')()
        ]
      },
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: "js/",
          src: ["*.js", "!*.min.js"],
          dest: "js/min/",
          ext: ".min.js"
        }]
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          livereload: true
        }
      }
    },
    imagemin: {
      target: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif,jpeg}'],
          dest: 'img/'
        }]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: 'index.html',
      },
      uglify: {
        files: ['js/*.js'],
        tasks: ['newer:uglify:target']
      },
      sass: {
        files: ['scss/*.scss'],
        tasks: ['newer:sass:target']
      },
      imagemin: {
        files: 'img/*.{png,jpg,gif,jpeg}',
        tasks: ['newer:imagemin:target']
      },
      postcss: {
        files: ['css/*.css'],
        tasks: ['newer:postcss:target']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default', ['uglify', 'sass', 'postcss','connect','watch']);
};
