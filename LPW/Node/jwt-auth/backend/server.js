const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'efp-backend-auth-jwt'
});

const privateKey = 'shhhhh';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async(req, res) => {
  try{
    const { email, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if(!user || user.password !== password){
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      })
    }
    const token = jwt.sign({ userId: user.id}, privateKey);
    res.json({token})
  } catch(err){
    console.error(err);
    res.status(500).json({
      message: 'Une super erreur je ne sais pas pourquoi'
    })
  }
});

app.get('/checkAuth', (req, res) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decod = jwt.verify(token, privateKey)
    if(!decod || !decod.userId){
      return res.status(401).json({
        message: 'Token pas bon'
      })
    }
    res.status(200).json({ message: 'c\'est ok brah', decod: decod})
  } catch(e) {
    console.log(e);
  }
})

app.listen(8080, () => {
  console.log('Serveur sur 8080');
})