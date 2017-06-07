var sanitize = require('mongo-sanitize');

module.exports = function (app) {

   var Contato = app.models.contato;

   var controller = {};

   controller.listaContatos = function (req, res) {
      Contato.find().populate('emergencia').exec().then(
         function (contatos) {
            res.json(contatos);
         },
         function (erro) {
            console.error(erro);
            // HTTP 500: Erro interno do servidor
            res.status(500).json(erro);
         }
      );
   };

   controller.obtemContato = function (req, res) {
      Contato.findById(req.params.id).exec().then(
         function (contato) {
            if (!contato) { // Não encontrou o id
               throw new Error('Contato não encontrado');
            }
            res.json(contato);
         },
         function (erro) {
            console.log(erro);
            res.status(404).json(erro);
         }
      );
   };

   controller.removeContato = function (req, res) {
      // Remove do id eventuais operadores do MongoDB
      // que poderiam causar exclusões maliciosas no BD
      var id = sanitize(req.params.id);

      Contato.remove({ _id: id }).exec().then(
         function () {
            // HTTP 204: OK, sem conteúdo posterior
            res.status(204).end();
         },
         function (erro) {
            return console.error(erro);
         }
      );
   };

   controller.salvaContato = function (req, res) {

      // Selecionando apenas os campos que estão
      // previstos no esquema do BD
      var dados = {
         nome: req.body.nome,
         email: req.body.email,
         emergencia: req.body.emergencia || null
      };

      if (req.body._id) { // Atualização

         Contato.findByIdAndUpdate(req.body._id, dados)
            .exec().then(
            function (contato) {
               res.json(contato);
            },
            function (erro) {
               console.error(erro);
               // HTTP 500: erro interno do servidor                  
               res.status(500).json(erro);
            }
         );

      }
      else { // Inserção

         Contato.create(dados).then(
            function (contato) {
               // HTTP 201: criado
               res.status(201).json(contato);
            },
            function (erro) {
               console.log(erro);
               res.status(500).json(erro);
            }
         );

      }
   };

   return controller;
};