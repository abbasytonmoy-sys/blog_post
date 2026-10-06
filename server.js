// server.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(path.join(__dirname, 'admin.db'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'change_this_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

function authMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM admin WHERE username = ?', [username], (err, row) => {
    if (err) return res.render('login', { error: 'ডেটাবেস ত্রুটি' });
    if (!row) return res.render('login', { error: 'ভুল ব্যবহারকারী নাম অথবা পাসওয়ার্ড' });
    bcrypt.compare(password, row.password, (err, result) => {
      if (result) {
        req.session.userId = row.id;
        return res.redirect('/dashboard');
      } else {
        return res.render('login', { error: 'ভুল ব্যবহারকারী নাম অথবা পাসওয়ার্ড' });
      }
    });
  });
});

app.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`সার্ভার পোর্ট ${PORT} এ চলছে`);
});
