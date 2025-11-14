const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { comics, genres } = req.comicsData;

  // Get featured comic for Top Komik section
  const topComic = comics.find(c => c.featured) || comics[0];

  // Get popular comics
  const popularComics = comics.filter(c => c.category === 'popular').slice(0, 6);

  // Get ongoing comics
  const ongoingComics = comics.filter(c => c.category === 'ongoing').slice(0, 6);

  // Get recommended comics
  const recommendedComics = comics.filter(c => c.category === 'recommended').slice(0, 6);

  // Get new comics (last 6 comics in the list)
  const newComics = comics.slice(-6).reverse();

  res.render('home', {
    title: 'Comcomic - Baca Komik Online Gratis',
    currentPage: 'home',
    topComic,
    popularComics,
    ongoingComics,
    recommendedComics,
    newComics,
    genres
  });
});

module.exports = router;
