const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load comics data
const comicsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'comics.json'), 'utf-8'));

// Make comics data available to all routes
app.use((req, res, next) => {
  req.comicsData = comicsData;
  next();
});

// Import routes
const homeRoutes = require('./routes/home');
const comicRoutes = require('./routes/comic');
const genreRoutes = require('./routes/genre');
const searchRoutes = require('./routes/search');
const favoritesRoutes = require('./routes/favorites');
const historyRoutes = require('./routes/history');

// Use routes
app.use('/', homeRoutes);
app.use('/comic', comicRoutes);
app.use('/genre', genreRoutes);
app.use('/search', searchRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/history', historyRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Halaman Tidak Ditemukan',
    currentPage: ''
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Comcomic server running on http://localhost:${PORT}`);
  console.log(`📱 Mobile-first comic reader ready!`);
});
