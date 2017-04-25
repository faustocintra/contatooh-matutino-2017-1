var contatos = [
   {
      _id: 1,
      nome: 'Contato Exemplo 1',
      email: 'cont1@empresa.com.br',
      empresa: 'Empresa 1'
   },
   {
      _id: 2,
      nome: 'Contato Exemplo 2',
      email: 'cont2@empresa.com.br',
      empresa: 'Empresa 2'
   },
   {
      _id: 3,
      nome: 'Contato Exemplo 3',
      email: 'cont3@empresa.com.br',
      empresa: 'Empresa 3'
   }
];

module.exports = function() {
   var controller = {};
   
   controller.listaContatos = function(req, res) {
      res.json(contatos);
   };
   
   controller.obtemContato = function(req, res) {
      //console.log(req.params.id);

      // A variável filtrados sempre será um vetor, mesmo
      // se o filtro encontrar apenas um único resultado
      var filtrados = contatos.filter(function(contato){
         return contato._id == req.params.id;
      });

      if(filtrados.length > 0) { // Encontrou alguém
         // Retorna o primeiro (e único) elemento do vetor
         res.json(filtrados[0]);
      }
      else {
         res.status(404).send('Contato ' + req.params.id + 
            ' não encontrado.');
      }

   }

   controller.removeContato = function(req, res) {
      
      // O vetor contatos é filtrado, de modo a excluir o
      // contato cujo id é passado como parâmetro. Em seguida,
      // o subconjunto filtrado sobrescreve o conjunto original
      contatos = contatos.filter(function(contato) {
         return contato._id != req.params.id;
      });

      // HTTP 204: OK, mas não há conteúdo para retornar na resposta
      res.status(204).end();
   }

   var ID_CONTATO_INC = 3; // Já temos 3 contatos pré-cadastrados

   controller.salvaContato = function(req, res) {

      var contato = req.body; // Recebe os dados do formulário

      contato = contato._id ? atualiza(contato) : adiciona(contato);

      res.json(contato);

   };

   function adiciona(novo) {
      novo._id = ++ID_CONTATO_INC;
      contatos.push(novo);
      return novo;
   }

   function atualiza(existente) {
      
      contatos = contatos.map(function(contato) {
         if(contato._id == existente._id) {
            contato = existente;
         }
         return contato;
      });

      return existente;
      
   }
   
   return controller;
};