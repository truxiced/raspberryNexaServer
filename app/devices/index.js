//const hueLightLogic = require('./hueLightLogic');
const express = require('express')  
const router = express.Router()
const deviceLogic = require('./deviceLogic');


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
    //TODO do check to verify that pair worked.

    deviceLogic.pair(req.body.name).then(function(id){
        res.send(id);
    });
})

/**
 * Turns the devices with the given id off
 * 
 * @param [num] {id} - Identifier of the light to turn off
 */
router.get('/:id/off', (req, res) => {  
  
  deviceLogic.turnOffDevice(req.params.id);

  res.send("device " + id + " is turned off");
})

/**
 * Turns the devices with the given id on
 * 
 * @param [num] {id} - Identifier of the light to turn on
 */
router.get('/:id/on', (req, res) => {  

  deviceLogic.turnOnDevice(req.params.id);

  res.send("device " + id + " is turned on");
})

module.exports = router