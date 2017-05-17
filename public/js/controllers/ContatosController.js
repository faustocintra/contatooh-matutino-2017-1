angular.module('contatooh').controller('ContatosController',
   function($scope, $resource, Contato) {

      $scope.mensagem = {};

      var buscaContatos = function() { 
         Contato.query(
            function(contatos) {
               $scope.contatos = contatos;
            },
            function(erro) {
               $scope.mensagem = {
                  texto: 'Não foi possível carregar a lista de contatos',
                  classe: 'danger'
               };
            }
         );
      };

      // Carrega os dados iniciais da página
      buscaContatos();

      $scope.remover = function(contato) {
         var idDel = contato._id;
         Contato.delete({id: idDel},
            function() {
               $scope.mensagem = {
                  texto: 'Contato #' + idDel + ' excluído',
                  classe: 'info'
               };
               buscaContatos();
            },
            function(erro) {
               $scope.mensagem = {
                  texto: 'Não foi possível excluir o contato',
                  classe: 'danger'
               };
            }
         );
      }

      $scope.filtro = '';
   }
);