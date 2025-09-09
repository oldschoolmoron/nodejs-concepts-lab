//all about express framework
//http : 80 , https: 443, ssh : 80
//CRUD : create, read, update, delete || Major Requests are => POST, GET, PUT, DELETE 

const express = require('express');
const app = express();
 
// //route handlers 
// app.get('/', function (req , res) {
//   res.send("hello world");
// })

// function calculateSum(n){
//   let ans = 0;
//   for(let i =1; i<=n ; i++){
//     ans += i;
//   }
//   return ans;
// }
// //127.0.0.1:3000/sum?n=5  || ans = 15
// app.get("/sum", function(req, res){
//   const n = req.query.n;
//   const ans = calculateSum(n);
//   res.send(ans);
// })

//127.0.0.1:3000/sum?a=5&b=5
function addTwoNum(a, b){
  return a + b;
}

app.get("/sum", (req, res) => {
  const a = Number(req.query.a); //s
  const b = Number(req.query.b);
  const ans = addTwoNum(a, b);
  if(isNaN(a,b)) {
    return res.send("Please provide valid number in query ?a=value1&b=value2")
  }
  res.send(ans);
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
