/*
** index.js
*/

/**
 * Imports
 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

/**
 * U T I L S
 */

const getDbByName = (dbName) => {
  const adapter = new FileSync(`${dbName}.json`);
  const db = low(adapter);

  db.defaults({})
    .write();
  return (db);
};

/**
 * W R I T E
 */

const addMessageInDb = (dbName, from, msg, promise) => {
  const db = getDbByName(dbName);

  db.get('posts')
    .push({ from, msg })
    .write();
  promise.resolve();
};

const addMessageInDbPromise = (dbName, from, msg) => {
  return (new Promise((resolve, reject) => {
    addMessageInDb(dbName, from, msg, { resolve, reject });
  }));
};

const addMessage = (dbName, from, msg) => {
  return (addMessageInDbPromise(dbName, from, msg));
};

/**
 * R E A D
 */

const getMessageHistoryFromDb = (dbName, promise) => {
  const db = getDbByName(dbName);

  promise.resolve(db.get('posts'));
};

const getMessageHistoryFromDbPromise = (dbName) => {
  return (new Promise((resolve, reject) => {
    getMessageHistoryFromDb(dbName, { resolve, reject });
  }));
};

const getMessageHistory = (dbName) => {
  return (getMessageHistoryFromDbPromise(dbName));
};

/**
 * Exports
 */
module.exports = {
  addMessage,
  getMessageHistory,
};
