const express = require('express');
const app = express();
const port = 3000;
const exec = require('exec');

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

app.get('/off', (req, res) => {  
    
    res.send("It's dead!");
exec('sudo ~/pihat/pihat --repeats=50 --id=1 --channel=0 --state=0',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});   
})

app.get('/on', (req, res) => {

    res.send("It's alive!");
exec('sudo ~/pihat/pihat --repeats=50 --id=1 --channel=0 --state=1',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
})
