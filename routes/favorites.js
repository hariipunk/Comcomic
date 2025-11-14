const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { comics } = req.comicsData;

  // In a real app, favorites would be stored in database/localStorage
  // For demo, we'll show first 4 comics as favorites
  const favoriteComics = comics.slice(0, 4);

  res.render('favorites', {
    title: 'Favorit Saya - Comcomic',
    currentPage: 'favorites',
    favorites: favoriteComics
  });
});

module.exports = router;
