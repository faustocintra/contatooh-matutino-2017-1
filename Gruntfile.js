module.exports = function(grunt) {

   grunt.initConfig({

      copy: {
         project: {
            expand: true, // Desce pelos subdiretórios
            cwd: '.', // A partir do diretório atual (raiz)
            // Copia todos os arquivos, exceto aqueles
            // marcados com !
            src: ['**', '!Gruntfile.js', '!package.json', 
               '!bower.json'],
            dest: 'dist' // O destino da cópia será a pasta 'dist'
         }
      },

      clean: {
         dist: {
            src: 'dist'
         }
      },

      useminPrepare: {
         html: 'dist/app/views/**/*.ejs',
         options: {
            root: 'dist/public',
            dest: 'dist/public'
         }
      },

      usemin: {
         html: 'dist/app/views/**/*.ejs'
      },

      ngAnnotate: {
         scripts: {
            expand: true,
            src: ['dist/public/js/**/*.js']
         }
      }

   });

   grunt.registerTask('dist', ['clean', 'copy']);
   grunt.registerTask('default', ['dist', 'minifica']);
   grunt.registerTask('minifica', ['useminPrepare', 'ngAnnotate', 'concat', 'uglify',
      'cssmin', 'usemin']);
   
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-usemin');
   grunt.loadNpmTasks('grunt-ng-annotate');

}