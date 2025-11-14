# 📱 Comcomic - Mobile-First Comic Reader Website

A beautiful, modern comic reader website with dark theme and yellow accents. Built with Node.js, Express, and EJS with a mobile-first responsive design.

![Comcomic](https://img.shields.io/badge/version-1.0.0-yellow)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### 🏠 Home Page
- **Top Komik** section with featured comic in a striking yellow card
- **Komik Populer** section with tabs (Populer, Berjalan, Disarankan)
- **Kumpulan Genre** with yellow pill buttons
- **Komik Baru** horizontal scrollable section
- Responsive grid layout (3 cards on mobile, 4 on tablet, 6 on desktop)

### 📖 Comic Details Page
- Large poster image with favorite button
- Rating, status, authors, artists, and follower count
- Genre tags
- Expandable synopsis
- Complete chapter list with read status indicators
- Click to read any chapter

### 👤 User Features
- **Favorites**: Save your favorite comics (localStorage)
- **History**: Track your reading history with last read chapter
- **Search**: Find comics by title, author, or genre
- Real-time search suggestions

### 🎨 Design Features
- Dark theme (#0D0D0D background)
- Yellow accents (#F7C843)
- Rounded corners (16-24px border radius)
- Smooth animations and transitions
- Mobile-first responsive design
- Fixed bottom navigation bar

### 📱 Bottom Navigation
- Home (with active state)
- Favorites
- Search
- History
- Info/About

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Comcomic
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

Or for auto-reload during development:
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
Comcomic/
├── data/
│   └── comics.json           # Mock comic data
├── public/
│   ├── css/
│   │   └── style.css         # All styles
│   ├── js/
│   │   └── main.js           # Client-side JavaScript
│   ├── images/               # Static images
│   └── icons/                # Icon files
├── routes/
│   ├── home.js               # Home page route
│   ├── comic.js              # Comic detail & reader routes
│   ├── genre.js              # Genre listing route
│   ├── search.js             # Search route
│   ├── favorites.js          # Favorites route
│   └── history.js            # Reading history route
├── views/
│   ├── components/
│   │   ├── bottom_nav.ejs    # Bottom navigation
│   │   ├── comic_card.ejs    # Comic card component
│   │   ├── genre_badge.ejs   # Genre badge component
│   │   ├── rating_badge.ejs  # Rating badge component
│   │   └── section_title.ejs # Section title component
│   ├── home.ejs              # Home page
│   ├── comic_detail.ejs      # Comic detail page
│   ├── reader.ejs            # Chapter reader page
│   ├── favorites.ejs         # Favorites page
│   ├── history.ejs           # History page
│   ├── genre.ejs             # Genre page
│   ├── search.ejs            # Search page
│   ├── layout.ejs            # Main layout template
│   └── 404.ejs               # 404 error page
├── server.js                 # Express server setup
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🎯 Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured comics |
| `/comic/:slug` | Comic detail page |
| `/comic/:slug/chapter/:num` | Chapter reader |
| `/genre/:genreName` | Comics by genre |
| `/search?q=query` | Search results |
| `/favorites` | User's favorite comics |
| `/history` | Reading history |

## 🎨 Design System

### Colors
```css
--bg-dark: #0D0D0D          /* Main background */
--bg-card: #1A1A1A          /* Card background */
--yellow: #F7C843           /* Primary accent */
--text-primary: #FFFFFF     /* Main text */
--text-secondary: #B0B0B0   /* Secondary text */
```

### Typography
- Font Family: Inter (Google Fonts)
- Weights: 400, 500, 600, 700, 800, 900

### Border Radius
- Small: 12px
- Medium: 16px
- Large: 24px
- Pills: 20px

## 🔧 Customization

### Adding More Comics

Edit `data/comics.json`:

```json
{
  "id": 13,
  "title": "Your Comic Title",
  "slug": "your-comic-slug",
  "cover": "https://image-url.com/cover.jpg",
  "rating": 9.5,
  "status": "Berjalan",
  "rank": 13,
  "followers": 500000,
  "description": "Short description...",
  "synopsis": "Full synopsis...",
  "authors": ["Author Name"],
  "artists": ["Artist Name"],
  "genres": ["Action", "Adventure"],
  "chapters": [
    {
      "number": 1,
      "title": "Chapter 1",
      "date": "2024-01-15",
      "read": false
    }
  ],
  "category": "popular",
  "featured": false
}
```

### Modifying Colors

Edit `public/css/style.css` CSS variables:

```css
:root {
  --bg-dark: #0D0D0D;
  --yellow: #F7C843;
  /* ... other variables */
}
```

## 🗄️ Database Integration

Currently using mock JSON data. To integrate with a database:

1. **Install database driver** (e.g., MongoDB, MySQL)
```bash
npm install mongoose
# or
npm install mysql2
```

2. **Create database models** in `models/` directory

3. **Update routes** to fetch from database instead of `req.comicsData`

4. **Implement user authentication** for favorites and history

## 🚀 Deployment

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Vercel
```bash
vercel
```

### Traditional Server
```bash
npm install
npm start
```

Set `PORT` environment variable if needed.

## 📱 Progressive Web App (PWA)

To enable PWA features:

1. Uncomment service worker registration in `public/js/main.js`
2. Create `public/sw.js` service worker file
3. Add `manifest.json` for app metadata

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Inline SVG
- **Fonts**: Google Fonts (Inter)

## 📝 To-Do / Future Enhancements

- [ ] User authentication system
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Chapter image upload system
- [ ] Comments and ratings
- [ ] Reading progress tracking
- [ ] Dark/Light theme toggle
- [ ] Multiple language support
- [ ] Admin panel for comic management
- [ ] Push notifications for new chapters
- [ ] Social sharing features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for comic lovers everywhere.

## 🙏 Acknowledgments

- Design inspired by modern mobile comic reader apps
- Icons from inline SVG
- Images from Unsplash (placeholder)

---

**Happy Reading! 📚✨**
