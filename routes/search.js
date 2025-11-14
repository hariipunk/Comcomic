const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { comics } = req.comicsData;
  const query = req.query.q || '';

  let searchResults = [];

  if (query.trim()) {
    // Search in title, description, authors, and genres
    searchResults = comics.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.authors.some(a => a.toLowerCase().includes(query.toLowerCase())) ||
      c.genres.some(g => g.toLowerCase().includes(query.toLowerCase()))
    );
  }

  res.render('search', {
    title: query ? `Hasil Pencarian: ${query} - Comcomic` : 'Cari Komik - Comcomic',
    currentPage: 'search',
    query,
    results: searchResults
  });
});

module.exports = router;
