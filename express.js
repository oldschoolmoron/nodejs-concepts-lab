//all about express framework
//http : 80 , https: 443, ssh : 80
//CRUD : create, read, update, delete || Major Requests are => POST, GET, PUT, DELETE 

const express = require('express');
const app = express();
const fs = require('fs');

//https://devdocs.io/express/
app.use(express.json());

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

// app.get("/sum", (req, res) => {
//   const a = Number(req.query.a); //s
//   const b = Number(req.query.b);
//   const ans = addTwoNum(a, b);
//   if(isNaN(a,b)) {
//     return res.send("Please provide valid number in query ?a=value1&b=value2")
//   }
//   res.send(ans);
// })
const users = [{
  name : "userY",
  kidneys : [{
    healthy : false
  }]
}];

// GET endpoint: used to retrieve data from the server (here, kidney stats)
app.get("/", function(req, res){
  const userYKidney = users[0].kidneys;
  const numberOfKidneys = userYKidney.length;
  let numberOfHealthyKidney = 0;
  for (let i = 0; i < userYKidney.length; i++){
    if(userYKidney[i].healthy){
      numberOfHealthyKidney = numberOfHealthyKidney + 1;
    }
  }

  const numberOfUnHealthyKidney = numberOfKidneys - numberOfHealthyKidney;
  res.json({
    numberOfKidneys,
    numberOfHealthyKidney,
    numberOfUnHealthyKidney
  })
})

//POST endpoint : used to send data to the server (usually to create a new resource)
app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy
  })
  res.json({
    msg: 'Done!'
  })
})


//PUT endpoint : used to update/replace existing data on the server (here, mark all kidneys unhealthy)
app.put("/", function(req, res){
  for(let i =0; i< users[0].kidneys.length; i++){
    users[0].kidneys[i].healthy = false;
  }
  res.json({});
})

app.delete("/", function(req, res){
  if(isThereAtleastOneUnhealtyKidney()){
    const newKidneys = [];
  for(let i =0; i< users[0].kidneys.length; i++){
    newKidneys.push({
      healthy : true
    })
  }
  users[0].kidneys = newKidneys;
  res.json({
    "msg" : 'done!'
  })
  }else {
    res.status(411).json({
      "msg" : "you have no unhealthy kidneys"
    })
  }
})

function isThereAtleastOneUnhealtyKidney(){
  let isleastOneUnhealtyKidney = false;
  for(let i =0; i < users[0].kidneys.length; i++){
    if(!users[0].kidneys[i].healthy){
      isleastOneUnhealtyKidney = true;
    }
  }
  return isleastOneUnhealtyKidney;
}

app.get('/files/:fileName', function(req, res){
  const fname = req.params.fileName;
  console.log(fname);
  fs.readFile(fname, "utf-8", function(err, data){
    res.json({
      data
    });
  })
}) 

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


