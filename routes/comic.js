const express = require('express');
const router = express.Router();

// Comic detail page
router.get('/:slug', (req, res) => {
  const { comics } = req.comicsData;
  const comic = comics.find(c => c.slug === req.params.slug);

  if (!comic) {
    return res.status(404).render('404', {
      title: '404 - Komik Tidak Ditemukan',
      currentPage: ''
    });
  }

  res.render('comic_detail', {
    title: `${comic.title} - Comcomic`,
    currentPage: '',
    comic
  });
});

// Chapter reader page (placeholder)
router.get('/:slug/chapter/:chapterNum', (req, res) => {
  const { comics } = req.comicsData;
  const comic = comics.find(c => c.slug === req.params.slug);

  if (!comic) {
    return res.status(404).render('404', {
      title: '404 - Komik Tidak Ditemukan',
      currentPage: ''
    });
  }

  const chapterNum = parseInt(req.params.chapterNum);
  const chapter = comic.chapters.find(ch => ch.number === chapterNum);

  if (!chapter) {
    return res.status(404).render('404', {
      title: '404 - Chapter Tidak Ditemukan',
      currentPage: ''
    });
  }

  res.render('reader', {
    title: `${comic.title} - Chapter ${chapterNum}`,
    currentPage: '',
    comic,
    chapter,
    chapterNum
  });
});

module.exports = router;
