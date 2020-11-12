const router = require('express').Router();
const {Log} = require('../models');

router.get('/', (req, res) => {
  //get all logs for an individual user
  //so they must be logined in
  //findAll()
  Log.findAll()
  .then(log => {
    if(log){
      res.status(200).json(log)
    } else {
      res.status(500).json('There are no logs')
    }
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
})

router.post('/', (req, res) => {
  //allow users to create a workout log with descriptions, definitions, results, and owner properties
  try {
    const{owner, description, definition, result} = Log.create()
  } catch (error) {
    
  }
})

router.get('/:id', (req, res) => {
  //gets individual logs by id for an individual user.
  //findAll()
})

router.put('/:id', (req, res) => {
  //allows individual logs to be updated by the user
  //the user must be logged in
  //findOne()
})

router.delete('/:id', (req, res) => {
  //allows individual logs to be deleted by a user
  //must be logged in
  //findOne
})


