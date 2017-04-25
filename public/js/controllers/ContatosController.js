angular.module('contatooh').controller('ContatosController',
   function($scope, /* $http */ $resource, Contato) {
      
      //var Contato = $resource('contatos/:id');

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

      /*
      $http.get('/contatos').then(
         function(res) {
            $scope.contatos = res.data;
            console.log(res);
         },
         function(erro) {
            console.log('Não foi possível carregar a lista de contatos.');
            console.log(erro);
         }
      );
      */

      /*
      $scope.total = 0;

      $scope.incrementa = function() {
         $scope.total++;
      }

      $scope.contatos = [
         {
            '_id': 1,
            'nome': 'Contato Angular 1',
            'email': 'cont1@empresa.com.br'
         },
         {
            '_id': 2,
            'nome': 'Contato Angular 2',
            'email': 'cont2@empresa.com.br'
         },
         {
            '_id': 3,
            'nome': 'Contato Angular 3',
            'email': 'cont3@empresa.com.br'
         }
      ];

      */

      $scope.filtro = '';
   }
);