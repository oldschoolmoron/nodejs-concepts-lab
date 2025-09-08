//all about express framework
//http : 80 , https: 443, ssh : 80
//CRUD : create, read, update, delete || Major Requests are => POST, GET, PUT, DELETE 

const express = require('express');
const app = express();

//route handlers 
app.get('/', function (req , res) {
  res.send("hello world");
})


app.listen(3000, () => {
  console.log('This port is running on 3000',3000);
});
