var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var mongoose = require('mongoose');

module.exports = function() {

   var Usuario = mongoose.model('Usuario');

   passport.use(new GitHubStrategy({
      clientID: 'b826d39073de20747eb3',
      clientSecret: '9f482f3e779587dfa8be3bc9a06801eaf8f2c0d4',
      callbackURL: 'http://localhost:3000/auth/github/callback'
   }, function(accessToken, refreshToken, profile, done) {

      Usuario.findOrCreate(
         {login: profile.username},
         {nome: profile.username},
         function(erro, usuario) {
            if(erro) {
               console.log(erro);
               // Acabou o processo de registro, COM ERRO
               return done(erro);
            }
            // Acabou o processo de registro, SEM ERRO
            return done(null, usuario);
         }
      );
      
   }));

   passport.serializeUser(function(usuario, done) {
      done(null, usuario._id);
   });

   passport.deserializeUser(function(id, done) {
      Usuario.findById(id).exec().then(
         function(usuario) {
            done(null, usuario);
         }
      );
   });

};