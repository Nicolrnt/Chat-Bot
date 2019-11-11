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
  const adapter = new FileSync(`./db/${dbName}.json`);
  const db = low(adapter);

  db.defaults({})
    .write();
  return (db);
};

/**
 * W R I T E
 */

const addMessageInDb = (dbName, source, msg, promise) => {
  const db = getDbByName(dbName);

  db.get('posts')
    .push({ source, msg })
    .write();
  promise.resolve();
};

const addMessageInDbPromise = (dbName, source, msg) => {
  return (new Promise((resolve, reject) => {
    addMessageInDb(dbName, source, msg, { resolve, reject });
  }));
};

const addMessage = (dbName, source, msg) => {
  return (addMessageInDbPromise(dbName, source, msg));
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
