// init_db.js
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.join(__dirname, 'admin.db');
const db = new sqlite3.Database(dbPath);

const createTable = `
CREATE TABLE IF NOT EXISTS admin (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
`;

// Replace these with desired admin credentials
const adminUsername = 'admin';
const adminPasswordPlain = 'admin123'; // you should change this after first login

bcrypt.hash(adminPasswordPlain, 10, (err, hash) => {
  if (err) {
    console.error('Password hashing error:', err);
    process.exit(1);
  }
  db.serialize(() => {
    db.run(createTable, err => {
      if (err) {
        console.error('Table creation error:', err);
        process.exit(1);
      }
    });
    const insert = `INSERT OR IGNORE INTO admin (username, password) VALUES (?, ?);`;
    db.run(insert, [adminUsername, hash], err => {
      if (err) {
        console.error('Insert admin error:', err);
        process.exit(1);
      }
      console.log('Admin user created (or already exists).');
      db.close();
    });
  });
});
