const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const admin = require("firebase-admin");
const admin = require('firebase-admin');
const serviceAccount = require('./config/test-auth-72b99-firebase-adminsdk-2ahy4-faf060c7fa.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const authorized = true;

// Fonction middleware pour vérifier l'authentification
function checkAuth(req, res, next) {
  if (!req.headers.authorization){
    return res.status(403).send('Unauthorized!')
  }
  admin
  .auth()
  .verifyIdToken(req.headers.authorization)
  .then(() => next())
  .catch(() => res.status(403).send('Unauthorized'))
}

app.get('/secret', checkAuth, (req, res) => {
  res.json({ message: 'Information secrète' })
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(9999, () => {
  console.log(`App running on localhost:9999`)
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});