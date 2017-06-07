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
      }

   });

   grunt.registerTask('dist', ['clean', 'copy']);
   grunt.registerTask('default', ['dist']);
   
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');

}