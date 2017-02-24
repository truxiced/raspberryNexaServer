//const hueLightLogic = require('./hueLightLogic');
const express = require('express')  
const router = express.Router()
const deviceLogic = require('./deviceLogic');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

/**
 * 
 * [{
 *    name: String
 *    id: Integer
 * }, ...]
 * @returns [Array] Array of all devices in database.
 */
router.get('/', (req, res) => {  
    deviceLogic.getAllDevices().then(function(devices){
        res.send(devices);
    })
})

/**
 * Pairs a device 
 * 
 * body:
 * {
 *  name: String
 * }
 */
router.post('/pair', (req, res) => {
    deviceLogic.pair(req.body.name).then(function(id){
        
        deviceLogic.test(id).then(function(){
            res.send({id:id});
        })
        
    });
});

router.get('/:id/test', (req, res) => {
    deviceLogic.test(req.params.id).then(function(){
        res.sendStatus(204);
    })
});

/**
 * Turns the devices with the given id off
 * 
 * @param [num] {id} - Identifier of the light to turn off
 */
router.get('/:id/off', (req, res) => {  
  
  deviceLogic.turnOffDevice(req.params.id);

  res.send("device " + req.params.id + " is turned off");
});

/**
 * Turns the devices with the given id on
 * 
 * @param [num] {id} - Identifier of the light to turn on
 */
router.get('/:id/on', (req, res) => {  

  deviceLogic.turnOnDevice(req.params.id);

  res.send("device " + req.params.id + " is turned on");
});

module.exports = router
