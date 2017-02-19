const exec = require('exec');
const db = require('../db');
var Promise = require('promise');

/**
 * 
 * @param [String] {name} - The given name of the device
 * @returns [promise]
 */
function pair(name) {

    return new Promise(function(fulfill){
        //Generate a id that does not conflict in the storage.
        var id = getRandomInt();

        deviceScript(id, 0, 0);
        //Verify that pair worked. 

        db.put(id, name);
        //Save name and id in storage. 
        fulfill(id);
    })
}
/**
 * Gets all devices in the data base. 
 * 
 * @returns [promise]
 */
function getAllDevices() {
    return new Promise(function(fulfill){
        var stream = db.createReadStream();  

        var devices = [];

        stream.on('data', function(data) {
            devices.push(data); 
        });

        stream.once('end', function() {  
            fulfill(devices);
        }); 
    })
}
/**
 * 
 * @param [num] {id} - Identifier of the device to turn off
 */
function turnOffDevice(id) {
    deviceScript(id, 0, 0);
}

/**
 * 
 * @param [num] {id} - Identifier of the device to turn on
 */
function turnOnDevice(id) {
    deviceScript(id, 0, 1);
}

function deviceScript(id, channel, state) {
    exec('sudo ~/pihat/pihat --repeats=50 --id=' + id + ' --channel=' + channel + ' --state=' + state,
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
        console.log('exec error: ' + error);
        }
    });  
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt() {
    var min = 0;
    var max = 60000;
    var id =  Math.floor(Math.random() * (max - min + 1)) + min;

    db.get(req.params.id, function(err, value) {  
      if (err) {
        return id;
      }
      getRandomInt();
    });
}

module.exports.turnOffDevice = turnOffDevice; 
module.exports.turnOnDevice = turnOnDevice;
module.exports.getAllDevices = getAllDevices;