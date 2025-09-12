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

app.use(isOldEnoughMiddleware);

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

app.listen(3000);