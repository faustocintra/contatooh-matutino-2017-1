var mongoose = require('mongoose');

module.exports = function() {

   var schema = mongoose.Schema({
      nome: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true,
         // Cada e-mail poderá ser utilizado por apenas
         // um contato
         index: {
            unique: true
         }
      },
      emergencia: {
         type: mongoose.Schema.ObjectId,
         ref: 'Contato'
      },
      telefone: {
         type: String
      },
      tipo_telefone: {
         type: String,
         default: 'celular'
      }
   });

   return mongoose.model('Contato', schema);

}