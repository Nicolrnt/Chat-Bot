/*
** index.js
*/

/**
 * Imports
 */
const express = require('express');
const dbManager = require('../dbManager');
const dialog = require('../dialogModule');

/**
 * Variables
 */
const router = express.Router();

/**
 * GET
 */
router.get('/', (req, res) => {
  res.json({
    'message': 'hello',
  });
});

/**
 * Add Message
 */
router.get('/addMessage', (req, res) => {
  const { sessionId, msg } = req.query;

  dbManager.addMessage(sessionId, 'usr', msg)
    .then(() => {
      dialog.sendMsg(msg)
        .then((data) => {
          dbManager.addMessage(sessionId, 'bot', data)
          .then(() => res.json('Ok'))
          .catch(() => res.json('Ko'));
        })
      .catch(() => res.json('Ko'));
    })
    .catch(() => res.json('Ko'));
});

/**
 * Get History
 */
router.get('/getHistory', (req, res) => {
  dbManager.getMessageHistory(req.query.sessionId)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

/**
 * Exports
 */
module.exports = router;
