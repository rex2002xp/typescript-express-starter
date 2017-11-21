module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "./public",
            src: ["**"],
            dest: "./build/dist/public"
          },
          {
            expand: true,
            cwd: "./src/views",
            src: ["**"],
            dest: "./build/dist/views"
          },
          {
            expand: true,
            cwd: "./bin",
            src: ["www"],
            dest: "./build/bin"
          },
          {
            expand: true,
            cwd: "./assets/materialize-src/fonts",
            src: ["**/**"],
            dest: "./build/dist/public/assets/fonts"
          },
          {
            expand: true,
            cwd: "./assets/materialize-src/js",
            src: ["**/**"],
            dest: "./build/dist/public/assets/js"
          }
        ]
      }
    },
    ts: {
      app: {
        files: [{
          src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
          dest: "./build/dist"
        }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: false
        }
      }
    },
    watch: {
      ts: {
        files: ["src/\*\*/\*.ts"],
        tasks: ["ts"]
      },
      views: {
        files: ["src/views/**/*.hbs"],
        tasks: ["copy"]
      }
    },
    sass: {                              // Tarea
      build: {
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          './build/dist/public/assets/css/styles.css': './assets/materialize-src/sass/materialize.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "sass",
    "copy",
    "ts"
  ]);

};