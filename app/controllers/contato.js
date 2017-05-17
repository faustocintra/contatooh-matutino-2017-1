module.exports = function(app) {
   
   var Contato = app.models.contato;

   var controller = {};
   
   controller.listaContatos = function(req, res) {
		Contato.find().exec().then(
			function(contatos) { //achou contato
				res.json(contatos);
			},
			function(erro) { //não achou contato
				console.error(erro);
				// HTTP 500: Erro interno do servidor
				res.status(500).json(erro);
			}
		);
   };
   
   controller.obtemContato = function(req, res) {
      Contato.findById(req.params.id).exec().then(
         function(contato) {
            if(! contato) { // Não encontrou o id
               throw new Error('Contato não encontrado');
            }
            res.json(contato);
         },
         function(erro) {
            console.log(erro);
            res.status(404).json(erro);
         }
      );
   };

   controller.removeContato = function(req, res) {
      Contato.remove({_id: req.params.id}).exec().then(
         function() {
            // HTTP 204: OK, sem conteúdo posterior
            res.status(204).end();
         },
         function(erro) {
            return console.error(erro); //não conseguiu remover
         }
      );
   };

   controller.salvaContato = function(req, res) {
      if(req.body._id) { // Atualização

         Contato.findByIdAndUpdate(req.body._id, req.body)
            .exec().then(
               function(contato) { // vai atualizar
                  res.json(contato);
               },
               function(erro) {     //não vai conseguir atualizar
                  console.error(erro);
                  // HTTP 500: erro interno do servidor                  
                  res.status(500).json(erro);
               }
            );

      }
      else { // Inserção

         Contato.create(req.body).then(
            function(contato) { //vai inserir
               // HTTP 201: criado
               res.status(201).json(contato);
            },
            function(erro) { //não vai inserir
               console.log(erro);
               res.status(500).json(erro);
            }
         ); 

      }
   };
   
   return controller;
};