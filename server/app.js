require('dotenv').config(); //env file

const express = require('express');
const db = require('./db');
const app = express();

const controllers = require('./controllers');

app.use(express.json());

app.use('/user', controllers.usercontroller);

//app.use(require('./middleware/validateSession'));
const validateSession = require('./middleware/validateSession');
app.use('/log', validateSession, controllers.logcontroller);
// app.use('/log', validateSession, controllers.logcontroller);
//app.use('/api/log', controllers.logcontroller);

db.authenticate()
  .then(() => db.sync()) //I can pass in {force: true} for when I want to reset my tables
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[SERVER] App is listening on Port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(`[SERVER] Server Crashed`);
    console.log(err);
  });
