/*
** debug.js
*/

/*
** Import
*/
const express = require('express');
const router = express.Router();

const dialog = require('../dialogModule');

/**
 * GET - /debug/msg
 */
router.get('/msg/:msg', (req, res) => {
  dialog.sendMsg(req.params.msg);
  res.json({
    'code': 200,
    'msg': req.params.msg
  });
});

module.exports = router;
