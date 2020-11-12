const router = require('express').Router();
const {Log} = require('../models');

router.get('/', (req, res) => {
  //get all logs for an individual user
  //so they must be logined in
  //findAll()
})

router.post('/', (req, res) => {
  //allow users to create a workout log with descriptions, definitions, results, and owner properties
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


