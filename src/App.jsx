import React, { useState, useEffect, useMemo } from 'react';

// Navigation & Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalSearchModal from './components/GlobalSearchModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import LightboxModal from './components/LightboxModal';
import ArticleDetailModal from './components/ArticleDetailModal';
import MediaDetailModal from './components/MediaDetailModal';
import CharacterDetailModal from './components/CharacterDetailModal';
import ChatbotWidget from './components/ChatbotWidget';
import Toast from './components/Toast';

// Pages
import HomePage from './pages/HomePage';
import CategoryHubPage from './pages/CategoryHubPage';
import ArticlesPage from './pages/ArticlesPage';
import CharactersPage from './pages/CharactersPage';
import MediaPage from './pages/MediaPage';
import TrailersPage from './pages/TrailersPage';
import EventsPage from './pages/EventsPage';
import MerchandisePage from './pages/MerchandisePage';
import BookmarksPage from './pages/BookmarksPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Storage Helpers
import { 
  getSavedBookmarks, 
  toggleBookmarkItem, 
  getSessionNotes, 
  saveSessionNote 
} from './utils/storage';

/**
 * Main Application Component: FandomVerse
 * Developed for Aptech TechWiz 7 Competition (Category: Web Innovation Unleashed)
 * 
 * Fulfills SRS Constraints:
 * 1. 100% Client-side SPA (no backend database required).
 * 2. Pre-populated datasets loaded from clean JSON files under /data.
 * 3. LocalStorage for Bookmarks & Visitor count; SessionStorage for Personal Notes.
 */
export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState('anime');

  // Datasets loaded from JSON
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [events, setEvents] = useState([]);
  const [media, setMedia] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [merchandise, setMerchandise] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Storage State: Bookmarks (LocalStorage) & Session Notes (SessionStorage)
  const [bookmarks, setBookmarks] = useState([]);
  const [sessionNotes, setSessionNotes] = useState({});

  // Temporary Shopping Cart State
  const [cartItems, setCartItems] = useState([]);

  // Modals & Drawers Visibility State
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Lightbox Viewer State
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0
  });

  // Detailed Modals for Items
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);
  const [activeCharacter, setActiveCharacter] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Global Theme State: Default to 'purple-cyan' (Creative & Modern Zenith Theme)
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('fandomverse_theme') || 'purple-cyan';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('fandomverse_theme', currentTheme);
  }, [currentTheme]);

  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    showToast(`Switched theme to ${themeId.toUpperCase()} mode!`, 'info');
  };

  // 1. Initial Data Fetching from /data/*.json on Mount
  useEffect(() => {
    async function loadAllDatasets() {
      try {
        const [
          catRes,
          artRes,
          charRes,
          evRes,
          medRes,
          trailRes,
          merchRes,
          galRes
        ] = await Promise.all([
          fetch('/data/categories.json').then(r => r.json()),
          fetch('/data/articles.json').then(r => r.json()),
          fetch('/data/characters.json').then(r => r.json()),
          fetch('/data/events.json').then(r => r.json()),
          fetch('/data/media.json').then(r => r.json()),
          fetch('/data/trailers.json').then(r => r.json()),
          fetch('/data/merchandise.json').then(r => r.json()),
          fetch('/data/galleries.json').then(r => r.json())
        ]);

        setCategories(catRes);
        setArticles(artRes);
        setCharacters(charRes);
        setEvents(evRes);
        setMedia(medRes);
        setTrailers(trailRes);
        setMerchandise(merchRes);
        setGalleries(galRes);
      } catch (error) {
        console.error("Error loading JSON datasets:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAllDatasets();

    // Load initial bookmarks and session notes from browser storage
    setBookmarks(getSavedBookmarks());
    setSessionNotes(getSessionNotes());
  }, []);

  // Quick lookup set for bookmarked item IDs
  const bookmarkedIds = useMemo(() => {
    return new Set(bookmarks.map(b => b.id));
  }, [bookmarks]);

  // Combined content list across all categories for Global Search
  const allSearchableContent = useMemo(() => {
    return [
      ...characters.map(c => ({ ...c, contentType: 'character' })),
      ...articles.map(a => ({ ...a, contentType: 'article' })),
      ...trailers.map(t => ({ ...t, contentType: 'trailer' })),
      ...media.map(m => ({ ...m, contentType: 'media' })),
      ...events.map(e => ({ ...e, contentType: 'event' })),
      ...merchandise.map(m => ({ ...m, contentType: 'merchandise' }))
    ];
  }, [characters, articles, trailers, media, events, merchandise]);

  // Active Category Object
  const currentCategory = useMemo(() => {
    return categories.find(c => c.id === selectedCategoryId) || categories[0];
  }, [categories, selectedCategoryId]);

  // 2. Navigation Handler
  const handleNavigate = (page, categoryId = null) => {
    setActivePage(page);
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Bookmark Toggle Handler (LocalStorage)
  const handleToggleBookmark = (item) => {
    const { isBookmarked, updatedList } = toggleBookmarkItem(item);
    setBookmarks(updatedList);
    showToast(
      isBookmarked 
        ? `Added "${item.title || item.name}" to Bookmarks!` 
        : `Removed "${item.title || item.name}" from Bookmarks.`,
      isBookmarked ? 'success' : 'info'
    );
  };

  // 4. Save Session Note Handler (SessionStorage)
  const handleSaveNote = (itemId, noteText) => {
    const updatedNotes = saveSessionNote(itemId, noteText);
    setSessionNotes({ ...updatedNotes });
    showToast("Personal note saved for this browser session!", "success");
  };

  // 5. Shopping Cart Handlers
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existsIndex = prev.findIndex(item => item.id === product.id);
      if (existsIndex > -1) {
        // Increment quantity
        const updated = [...prev];
        updated[existsIndex].quantity += 1;
        return updated;
      } else {
        // Add new item with qty = 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    showToast(`Added "${product.name}" to temporary cart!`, 'success');
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(prev => 
        prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item)
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    showToast("Item removed from cart.", "info");
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast("Cart cleared.", "info");
  };

  // 6. Lightbox Handlers
  const handleOpenLightbox = (imagesList, startIndex = 0) => {
    setLightboxState({
      isOpen: true,
      images: imagesList,
      currentIndex: startIndex
    });
  };

  const handleLightboxPrev = () => {
    setLightboxState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  const handleLightboxNext = () => {
    setLightboxState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  // 7. Search Selection Handler
  const handleSelectSearchResult = (item) => {
    if (item.contentType === 'article') {
      setActiveArticle(item);
    } else if (item.contentType === 'character') {
      setActiveCharacter(item);
    } else if (item.contentType === 'trailer' || item.contentType === 'media') {
      setActiveMedia(item);
    } else if (item.contentType === 'merchandise') {
      handleNavigate('merchandise');
    } else if (item.contentType === 'event') {
      handleNavigate('events');
    } else if (item.category) {
      handleNavigate('category-hub', item.category);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-primary)', color: 'var(--text-main)' }}>
        <div className="live-indicator" style={{ width: '22px', height: '22px', marginBottom: '1.25rem', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)' }}></div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Loading FandomVerse...</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Preparing 7 Curated Fandom Universes</p>
      </div>
    );
  }

  return (
    <div className="app-root-layout" data-theme={currentTheme}>
      {/* Dynamic Ambient Mesh Lighting Background */}
      <div className="ambient-glow-background" aria-hidden="true">
        <div className="ambient-glow-orb-1" />
        <div className="ambient-glow-orb-2" />
        <div className="ambient-glow-orb-3" />
      </div>

      {/* Action Toast Notifications */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />

      {/* Global Navigation Bar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        bookmarkCount={bookmarks.length}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        categories={categories}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
      />

      {/* Main Content Router View */}
      <main className="container page-wrapper">
        {activePage === 'home' && (
          <HomePage
            categories={categories}
            articles={articles}
            trailers={trailers}
            events={events}
            characters={characters}
            merchandise={merchandise}
            onNavigate={handleNavigate}
            onOpenArticle={(art) => setActiveArticle(art)}
            onOpenTrailer={(tr) => setActiveMedia(tr)}
            onOpenCharacter={(ch) => setActiveCharacter(ch)}
            onAddToCart={handleAddToCart}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
          />
        )}

        {activePage === 'category-hub' && (
          <CategoryHubPage
            category={currentCategory}
            allCategories={categories}
            articles={articles}
            characters={characters}
            events={events}
            media={media}
            trailers={trailers}
            merchandise={merchandise}
            galleries={galleries}
            onSelectCategory={(catId) => setSelectedCategoryId(catId)}
            onNavigate={handleNavigate}
            onOpenArticle={(art) => setActiveArticle(art)}
            onOpenTrailer={(tr) => setActiveMedia(tr)}
            onOpenCharacter={(ch) => setActiveCharacter(ch)}
            onOpenGalleryLightbox={handleOpenLightbox}
            onAddToCart={handleAddToCart}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
          />
        )}

        {activePage === 'articles' && (
          <ArticlesPage
            articles={articles}
            onOpenArticle={(art) => setActiveArticle(art)}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'characters' && (
          <CharactersPage
            characters={characters}
            onOpenCharacter={(ch) => setActiveCharacter(ch)}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'media' && (
          <MediaPage
            media={media}
            onOpenMedia={(med) => setActiveMedia(med)}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'trailers' && (
          <TrailersPage
            trailers={trailers}
            onOpenTrailer={(tr) => setActiveMedia(tr)}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'events' && (
          <EventsPage
            events={events}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'merchandise' && (
          <MerchandisePage
            merchandise={merchandise}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setCartDrawerOpen(true)}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'bookmarks' && (
          <BookmarksPage
            bookmarks={bookmarks}
            sessionNotes={sessionNotes}
            onRemoveBookmark={(id) => handleToggleBookmark({ id })}
            onSaveNote={handleSaveNote}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {activePage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} showToast={showToast} />
        )}
      </main>

      {/* Global AI Chatbot Widget */}
      <ChatbotWidget onNavigate={handleNavigate} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        allContent={allSearchableContent}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Temporary Cart Slide-Out Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenCheckout={() => {
          setCartDrawerOpen(false);
          setCheckoutModalOpen(true);
        }}
      />

      {/* Simulated Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={(receipt) => {
          setCartItems([]);
          showToast(`Order #${receipt.orderId} placed successfully!`, 'success');
        }}
      />

      {/* Dummy Login & Signup Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState(prev => ({ ...prev, isOpen: false }))}
        images={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />

      {/* Article Reader Detail Modal */}
      <ArticleDetailModal
        isOpen={!!activeArticle}
        onClose={() => setActiveArticle(null)}
        article={activeArticle}
        allArticles={articles}
        onSelectArticle={(art) => setActiveArticle(art)}
        isBookmarked={activeArticle ? bookmarkedIds.has(activeArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Media & Video Player Modal */}
      <MediaDetailModal
        isOpen={!!activeMedia}
        onClose={() => setActiveMedia(null)}
        mediaItem={activeMedia}
        isBookmarked={activeMedia ? bookmarkedIds.has(activeMedia.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Character Profile Detail Modal */}
      <CharacterDetailModal
        isOpen={!!activeCharacter}
        onClose={() => setActiveCharacter(null)}
        character={activeCharacter}
        isBookmarked={activeCharacter ? bookmarkedIds.has(activeCharacter.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} categories={categories} />
    </div>
  );
}
