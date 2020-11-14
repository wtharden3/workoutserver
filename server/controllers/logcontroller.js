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
        OwnerID: ownerid,
      });
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.get('/:id', validateSession, (req, res) => {
  let ownerid = req.params.id;
  Log.findAll({
    where: { owner_id: ownerid },
  })
    .then(log => {
      res.status(200).json({
        log,
        OwnerID: ownerid,
      });
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.put('/:id', validateSession, (req, res) => {
  const updateLog = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id
  };

  const query = { where: {id: req.params.id} };
  console.log('req.params.id=====> ', req.params.id);

  Log.update(updateLog, query)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }));
});

//Delete
router.delete('/:id', validateSession, (req, res) => {
  const query = { where: {id: req.params.id} };

  Log.destroy(query)
    .then(() => res.status(200).json({message: 'Log Deleted'}))
    .catch(err => res.status(500).json({ error: err }));
});


module.exports = router;
