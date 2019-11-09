/*
** index.js
*/

/**
 * Imports
 */
const request = require('request');
const keys = require('../auth/keys');
const endPoint = 'https://api.dialogflow.com/v1/';

const call = (msg, promise) => {
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${keys.developerAcessToken}`
  };
  var dataString = JSON.stringify({
    'lang': 'en',
    'query': msg,
    'sessionId': '12345',
  });
  var options = {
    url: `${endPoint}query?v=20150910`,
    method: 'POST',
    headers: headers,
    body: dataString
  };

  request(options, (err, rep, body) => {
    if (!err && rep.statusCode == 200) {
      promise.resolve(body);
    } else {
      promise.reject(err);
    }
  });
}

const callPromise = (msg) => {
  return (new Promise((resolve, reject) => {
    call(msg, { resolve, reject });
  }));
};

const sendMessage = (msg, promise) => {
  callPromise(msg)
    .then(data => {
      const jsonData = JSON.parse(data);
      const rep = jsonData.result.fulfillment.speech;
      promise.resolve(rep);
    })
    .catch(err => {
      promise.reject(err);
    });
}

const sendMessagePromise = (msg) => {
  return (new Promise((resolve, reject) => {
    sendMessage(msg, { resolve, reject });
  }))
}

/**
 * Send Msg
 * @param {string} msg - message to send
 */
const sendMsg = (msg) => {
  return (sendMessagePromise(msg));
};

/*
** Exports
*/
module.exports = {
  sendMsg,
};
