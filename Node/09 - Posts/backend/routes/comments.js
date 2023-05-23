const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware');
const db = require('../db');

// Créer un nouveau commentaire
router.post('/', verifyToken, async (req, res) => {
  try {
    console.log(req)
    const { post_id, content } = req.body;
    const author_id = req.user.uid;
    const date = new Date();
    const createdAt = `${date.toISOString().split("T")[0]} ${
      date.toTimeString().split(" ")[0]
    }`;
    const updated_at = createdAt;
// return;
    // insert the new article into the database
    const result = await db.promise().query(
      'INSERT INTO comments (content, author_id, created_at, updated_at, post_id) VALUES (?, ?, ?, ?, ?)',
      [content, author_id, createdAt, updated_at, post_id]
    );
    
    // return the ID of the newly created article
    const newArticleId = result[0].insertId;
    res.status(201).json({ id: newArticleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Récupérer tous les commentaires pour un article spécifique
router.get('/post/:postId', async (req, res) => {
  try{
    const postID = req.params.postId;
    const result = await db.promise().query('SELECT * FROM comments WHERE post_id = ?', [postID]);

    if (result[0].length === 0) {
      return res.status(404).json({ message: 'No comments for this article' });
    } else {
      return res.status(200).json(result[0]);
    }
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
});

// Récupérer un commentaire par ID
router.get('/:id', async (req, res) => {
// ...
});

// Mettre à jour un commentaire
router.put('/:id', verifyToken, async (req, res) => {
// ...
});

// Supprimer un commentaire
router.delete('/:id', verifyToken, async (req, res) => {
// ...
});

module.exports = router;
