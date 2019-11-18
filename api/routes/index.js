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
 * send Message
 */
// router.post('/sendMessage', (req, res) => {
router.get('/sendMessage', (req, res) => {
  const { sessionId, msg } = req.query;

  console.log('> GET - /sendMessage | { sessionId: ' + sessionId + ', msg: ' + msg + ' }');
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
  const sessionId = req.query.sessionId;

  console.log('> GET - /getHistory | { sessionId: ' + sessionId + ' }');
  dbManager.getMessageHistory(sessionId)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

/**
 * Exports
 */
module.exports = router;
