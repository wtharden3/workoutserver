const router = require('express').Router();
const { User } = require('../models');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/user', async (req, res) => {
  let { email, password, firstName, lastName} = req.body;

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, 13),
      firstName,
      lastName
    });
    res.status(201).json({
      message: 'User registered!',
      user: newUser
    })
  } catch (error) {
    if (error instanceof UniqueConstraintError){
      res.status(409).json({
        message: 'email already in use'
      })
    } else {
      res.status(500).json({
        error: 'failed to register user'
      })
    }
  }
})

router.post('/login', async (req, res) => {
  let {email, password} = req.body;

  try {
    let loginUser = await User.findOne({ where: {email}});
    console.log(loginUser);

    if(loginUser && bcrypt.compare(password, loginUser.password)) {
      const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
      res.status(200).json({
        message: 'Login successful',
        user: loginUser,
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
