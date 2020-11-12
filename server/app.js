require('dotenv').config();//env file

const express = require('express');
const app = express();

const db = require('./db');

const controllers = require('./controllers');

app.use(express.json());

app.use('/api', controllers.usercontroller);
//app.use('/api/log', controllers.logcontroller);

db.authenticate()
.then( () => db.sync())
.then( () => {
  app.listen(process.env.PORT, () => {
    console.log(`[SERVER] App is listening on Port ${process.env.PORT}`)
  })
})
.catch(err => {
  console.log(`[SERVER] Server Crashed`);
  console.log(err);
})