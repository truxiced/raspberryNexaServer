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
    //TODO do check to verify that pair worked.
    db.put(req.params.id, 'new save'); 
    //deviceLogic.pair(req.body.name);
})

app.get('/get/:id', (req, res) => {
    //TODO do check to verify that pair worked.

    db.get(req.params.id, function(err, value) {  
      if (err) {
        res.send(err);
      }
      res.send(value);
    });
})

/*app.get('/getAll', (req, res) => {
    
    var stream = db.createReadStream();  

    var devices = [];
    stream.on('data', function(data) {
      devices.push(data); 
    });

    stream.once('end', function() {  
      console.log('stream end');
      res.send(devices);
    }); 
})*/

