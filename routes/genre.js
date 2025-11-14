const express = require('express');
const router = express.Router();

router.get('/:genreName', (req, res) => {
  const { comics } = req.comicsData;
  const genreName = decodeURIComponent(req.params.genreName);

  // Filter comics by genre
  const filteredComics = comics.filter(c =>
    c.genres.some(g => g.toLowerCase() === genreName.toLowerCase())
  );

  res.render('genre', {
    title: `Genre ${genreName} - Comcomic`,
    currentPage: '',
    genreName,
    comics: filteredComics
  });
});

module.exports = router;
