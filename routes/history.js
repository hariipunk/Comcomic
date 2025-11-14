const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { comics } = req.comicsData;

  // In a real app, history would be stored in database/localStorage
  // For demo, we'll show comics that have lastRead property
  const historyComics = comics.filter(c => c.lastRead);

  res.render('history', {
    title: 'Riwayat Baca - Comcomic',
    currentPage: 'history',
    history: historyComics
  });
});

module.exports = router;
