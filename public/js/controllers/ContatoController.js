angular.module('contatooh').controller('ContatoController', 
   function($scope, $routeParams, $resource, Contato) {
      
      var mensagem = {};

      //var Contato = $resource('contatos/:id');

      if($routeParams.contatoId) {
         
         Contato.get({id: $routeParams.contatoId},
            function(contato) {
               $scope.contato = contato;
            },
            function(erro) {
               $scope.mensagem = {
                  texto: 'Não foi possível obter o contato',
                  classe: 'danger'
               };
               console.log(erro);
            }
         );

      } else {
         $scope.contato = new Contato(); // Novo contato
      }

      $scope.salva = function() {
         $scope.contato.$save().then(
            function() {
               mensagem = {
                  texto: 'Contato salvo com sucesso',
                  classe: 'info'
               };
               // Limpa o formulário
               $scope.contato = new Contato();
            },
            function(erro) {
               mensagem = {
                  texto: 'Não foi possível salvar o contato',
                  classe: 'danger'
               };
               console.log(erro);
            }   
         );
      }
      

   });