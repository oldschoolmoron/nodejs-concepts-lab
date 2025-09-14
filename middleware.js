const express = require('express');
const app = express();

function isOldEnough(age){
  if(age >= 14){
    return true;
  }else{
    return false;
  }
}
app.get("/ride1", function(req, res){
  const personsage = isOldEnough(req.query.age);
  console.log(personsage);
  if(personsage){
    res.json({
      msg : "You have successfully riden the ride 1"
    })
  }else{
    res.status(411).json({
      msg : "Sorry you're not eligible"
    })
  }
})

// after implementing middleware

// app.use(isOldEnoughMiddleware);

function isOldEnoughMiddleware(req, res, next){
  const age = req.query.age;
  if(age >= 14){
    next();
  }else{
    res.status(411).json({
      msg : "Sorry you are not eligible"
    })
  }
}

app.get("/ride2", isOldEnoughMiddleware,  function(req, res){
  res.json({
    msg : "You have successfully riden the ride"
  }
  )
})

let request_count = 0;

app.use(function(req, res, next){
  request_count += 1;
  next();
  console.log("Path: ", req.path, "Count: ", request_count);
})

app.get('/dummyUser1', function(req, res){
  res.json({
    msg : "Created dummy user"
  })
})

app.get('/dummyUser2', function(req, res){
  res.json({
    msg : "user2"
  })
})

app.get('/requestCount', function(req, res){
  res.json({
    msg : request_count
  })
})
app.listen(3000);