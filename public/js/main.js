// ====================================
// Tab Functionality
// ====================================
document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const activeContent = document.getElementById(`${tabName}-tab`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // ====================================
  // Synopsis Read More
  // ====================================
  const btnReadMore = document.getElementById('btnReadMore');
  const synopsisText = document.getElementById('synopsisText');

  if (btnReadMore && synopsisText) {
    btnReadMore.addEventListener('click', () => {
      if (synopsisText.classList.contains('expanded')) {
        synopsisText.classList.remove('expanded');
        btnReadMore.textContent = 'Selengkapnya';
      } else {
        synopsisText.classList.add('expanded');
        btnReadMore.textContent = 'Sembunyikan';
      }
    });
  }

  // ====================================
  // Favorite Toggle
  // ====================================
  const btnFavorites = document.querySelectorAll('.btn-favorite');

  btnFavorites.forEach(btn => {
    // Check if comic is already in favorites (from localStorage)
    const comicId = btn.getAttribute('data-comic-id');
    const favorites = getFavorites();

    if (favorites.includes(comicId)) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleFavorite(comicId);
      btn.classList.toggle('active');
    });
  });

  // ====================================
  // Remove from Favorites
  // ====================================
  const btnRemoveFavorites = document.querySelectorAll('.btn-remove-favorite');

  btnRemoveFavorites.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const comicId = btn.getAttribute('data-comic-id');
      removeFavorite(comicId);
      // Remove the item from DOM
      btn.closest('.favorite-item').remove();

      // Check if favorites list is empty
      const favoritesList = document.querySelector('.favorites-list');
      if (favoritesList && favoritesList.querySelectorAll('.favorite-item').length === 0) {
        location.reload();
      }
    });
  });

  // ====================================
  // Remove from History
  // ====================================
  const btnRemoveHistory = document.querySelectorAll('.btn-remove-history');

  btnRemoveHistory.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const comicId = btn.getAttribute('data-comic-id');
      removeHistory(comicId);
      // Remove the item from DOM
      btn.closest('.history-item').remove();

      // Check if history list is empty
      const historyList = document.querySelector('.history-list');
      if (historyList && historyList.querySelectorAll('.history-item').length === 0) {
        location.reload();
      }
    });
  });

  // ====================================
  // Search Input Auto-submit
  // ====================================
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (e.target.value.length >= 2 || e.target.value.length === 0) {
          e.target.closest('form').submit();
        }
      }, 500);
    });
  }
});

// ====================================
// LocalStorage Functions
// ====================================

// Get favorites from localStorage
function getFavorites() {
  const favorites = localStorage.getItem('comcomic_favorites');
  return favorites ? JSON.parse(favorites) : [];
}

// Toggle favorite
function toggleFavorite(comicId) {
  let favorites = getFavorites();

  if (favorites.includes(comicId)) {
    // Remove from favorites
    favorites = favorites.filter(id => id !== comicId);
  } else {
    // Add to favorites
    favorites.push(comicId);
  }

  localStorage.setItem('comcomic_favorites', JSON.stringify(favorites));
}

// Remove from favorites
function removeFavorite(comicId) {
  let favorites = getFavorites();
  favorites = favorites.filter(id => id !== comicId);
  localStorage.setItem('comcomic_favorites', JSON.stringify(favorites));
}

// Get history from localStorage
function getHistory() {
  const history = localStorage.getItem('comcomic_history');
  return history ? JSON.parse(history) : [];
}

// Add to history
function addToHistory(comicId, chapterNum) {
  let history = getHistory();

  // Remove if already exists
  history = history.filter(item => item.comicId !== comicId);

  // Add to beginning
  history.unshift({
    comicId,
    chapterNum,
    timestamp: new Date().toISOString()
  });

  // Keep only last 50 items
  history = history.slice(0, 50);

  localStorage.setItem('comcomic_history', JSON.stringify(history));
}

// Remove from history
function removeHistory(comicId) {
  let history = getHistory();
  history = history.filter(item => item.comicId !== comicId);
  localStorage.setItem('comcomic_history', JSON.stringify(history));
}

// ====================================
// Smooth Scroll
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ====================================
// Lazy Loading Images
// ====================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ====================================
// Service Worker Registration (Optional)
// ====================================
if ('serviceWorker' in navigator) {
  // Uncomment to enable PWA features
  // navigator.serviceWorker.register('/sw.js')
  //   .then(reg => console.log('Service Worker registered'))
  //   .catch(err => console.log('Service Worker registration failed'));
}

// ====================================
// Prevent Pull-to-Refresh on Mobile
// ====================================
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const touchY = e.touches[0].clientY;
  const touchDiff = touchY - touchStartY;

  if (touchDiff > 0 && window.scrollY === 0) {
    e.preventDefault();
  }
}, { passive: false });

// ====================================
// Active Navigation Highlight
// ====================================
function setActiveNav() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath !== '/' && href !== '/' && currentPath.startsWith(href))) {
      item.classList.add('active');
    }
  });
}

// Call on page load
setActiveNav();
