const router = require('express').Router();
const { User } = require('../models');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/register', async (req, res) => {
  let { username, passwordhash} = req.body;

  try {
    const newUser = await User.create({
      username,
      passwordhash: bcrypt.hashSync(passwordhash, 13)
    });
    res.status(201).json({
      message: 'User registered!',
      user: newUser
    })
  } catch (error) {
    if (error instanceof UniqueConstraintError){
      res.status(409).json({
        message: 'username unavailable. Please try again'
      })
    } else {
      res.status(500).json({
        error: 'failed to register user. Please Try Again'
      })
    }
  }
})

router.post('/login', async (req, res) => {
  let {username, password} = req.body;

  try {
    let loginUser = await User.findOne({ where: {username}});
    console.log(loginUser);

    if(loginUser && bcrypt.compare(password, loginUser.password)) {
      const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
      res.status(200).json({
        message: `Welcome, ${loginUser.username}!`,
        username: loginUser.username,
        token
      })
    } else {
      res.status(401).json({
        message: 'Login failed: User Credentials Incorrect'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Error loginning in'
    })
  }
});

module.exports = router;
