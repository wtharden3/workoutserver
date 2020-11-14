const router = require('express').Router();
const { Log } = require('../models');
const validateSession = require('../middleware/validateSession');

router.post('/', async (req, res) => {
  try {
    const { description, definition, result } = req.body;

    let newLog = await Log.create({
      owner_id: req.user.id,
      description,
      definition,
      result,
    });
    res.status(200).json({
      Log: newLog,
      message: 'New Log Created',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error: Could not create Log.',
    });
  }
});

//get all logs for individual user
router.get('/', validateSession, (req, res) => {
  let ownerid = req.user.id;
  Log.findAll({
    where: { owner_id: ownerid },
  })
    .then(log => {
     
        res.status(200).json({
          log,
          OwnerID: ownerid
        });
      
    })
    .catch(err => res.status(500).json({ error: err }));
});

// router.get('/', (req, res) => {
//   Log.findAll()
//     .then(log => {
//       // console.log('log------> ', log);
//       if (log) {
//         res.status(200).json(log);
//       } else {
//         res.status(500).json('There are no logs');
//       }
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

module.exports = router;
