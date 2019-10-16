const express = require('express');
// console.log(express);

const server = express();

server.use(express.json());
//req representa todos os dados da requisicao
//res todas as info que precisa para retornar para o front

//query params = ?teste=1

//Route params /users/1
//req -> pega resposta get,post,etc. res -> envia ao front
//request body { "name:" }  conteudo que vem da post, criar, alterar
//CRUD 


const users = ['Diego', 'Robson', 'Tenso'];

server.use((req,res, next) => {

console.time('Request');

  console.log(`Metodo: ${req.method};${req.url}; `);
//executa antes

 next();

console.timeEnd('Request');

  //so executa depois que tudo q vier do next

});

function checkUserInArray(req,res,next){
  const user = users[req.params.index];
if(!user){
  return res.status(400).json({error:'User not exist'})
}
req.user = user;
next();
}

server.get('/users', (req,res)=> {
return res.json(users);

});
server.get('/users/:index', checkUserInArray,(req,res) => {
const nome = req.query.nome;
// const index = req.query.id;
const { index } = req.params; 
const id = req.params.id;
//ou
// const { id } = req.params;
return res.json(req.user);
  // return res.json({message: `Hello ${nome} e o seu id ${id} `});
// console.log('teste');

});

function checkUserExists(req,res,next) {
if(!req.body.name){
  return res.status(400).json({error: 'User name is required'});
  }
  return next();
}
//create

server.post('/users',checkUserExists,(req,res)=> {

  const { name } = req.body; // nao precisa informar pois
  //e o mesmo nome
 
  users.push(name);

  return res.json(users);

});





//update

server.put('/users/:index',checkUserInArray,checkUserExists,(req,res) => {
const { index } = req.params;
const {name } = req.body;

users[index] = name;

return res.json(users);

});

server.delete('/users/:index',checkUserInArray, (req,res) => {
const { index } = req.params;
users.splice(index, 1);
//return res.json(users);
return res.send();
});
server.listen(3000);