const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

module.exports = () => {
  open({
    filename: './db.sqlite',
    drive: sqlite3.Database
  });
};