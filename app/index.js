const deviceRouter = require('./devices/index');
const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');


//Routing to sub URLs
app.use('/devices', deviceRouter);


app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

app.get('/save/:id', (req, res) => {

    db.insert({ id: req.params.id, name: "test save" }, function (err, newDocs) {});

})

app.get('/get/:id', (req, res) => {

    db.find({id: req.params.id}, function (err, docs) {
      res.send(docs);
    });
})

