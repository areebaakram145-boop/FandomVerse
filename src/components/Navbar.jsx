import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bookmark, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import RealTimeClock from './RealTimeClock';
import VisitorCounter from './VisitorCounter';
import LogoBrand from './LogoBrand';

/**
 * Navbar Component
 * Features sticky navigation, dynamic counters, search trigger, category dropdown,
 * and quick access to cart and user profile in Burgundy & Soft Gold aesthetic.
 */
export default function Navbar({
  activePage,
  onNavigate,
  bookmarkCount = 0,
  cartCount = 0,
  onOpenSearch,
  onOpenCart,
  onOpenAuth,
  categories = []
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const catDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (catDropdownRef.current && !catDropdownRef.current.contains(e.target)) {
        setCategoriesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu and navigate
  const handleNavClick = (pageId, categoryId = null) => {
    onNavigate(pageId, categoryId);
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  };

  return (
    <header className="site-header">
      {/* Top utility bar with RealTimeClock & VisitorCounter */}
      <div className="container">
        <div className="header-topbar">
          <div className="topbar-left">
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Welcome to FandomVerse Portal</span>
           
          </div>
          <div className="topbar-right">
            <RealTimeClock />
            <VisitorCounter />
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="container">
        <div className="navbar-main">
          {/* Custom SVG Crest Logo with Animated Sparkles */}
          <LogoBrand onClick={() => handleNavClick('home')} />

          {/* Desktop Navigation Links */}
          <nav className="nav-menu">
            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>

            {/* Categories Dropdown */}
            <div style={{ position: 'relative' }} ref={catDropdownRef}>
              <button 
                type="button" 
                className={`nav-item-btn ${activePage === 'category-hub' ? 'active' : ''}`}
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>Categories</span>
                <ChevronDown size={14} style={{ transform: categoriesDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {categoriesDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '210px',
                    background: '#1a1a1a',
                    border: '1px solid #800020',
                    borderRadius: '4px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.7)',
                    padding: '0.4rem',
                    zIndex: 999,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleNavClick('category-hub', cat.id)}
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: '#f5f5f5',
                        fontSize: '0.86rem',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'background 0.2s',
                        background: 'transparent'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#252525'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <span>{cat.name}</span>
                      <span 
                        style={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '2px', 
                          background: cat.themeColor || '#800020'
                        }} 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'articles' ? 'active' : ''}`}
              onClick={() => handleNavClick('articles')}
            >
              Articles
            </button>

            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'characters' ? 'active' : ''}`}
              onClick={() => handleNavClick('characters')}
            >
              Characters
            </button>

            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'media' ? 'active' : ''}`}
              onClick={() => handleNavClick('media')}
            >
              Media
            </button>

            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'trailers' ? 'active' : ''}`}
              onClick={() => handleNavClick('trailers')}
            >
              Trailers
            </button>

            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'events' ? 'active' : ''}`}
              onClick={() => handleNavClick('events')}
            >
              Events
            </button>

            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'merchandise' ? 'active' : ''}`}
              onClick={() => handleNavClick('merchandise')}
            >
              Merch
            </button>

            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'gallery' ? 'active' : ''}`}
              onClick={() => handleNavClick('gallery')}
            >
              Gallery
            </button>

            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              About
            </button>

            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
            >
              Contact
            </button>
          </nav>

          {/* Action Icons */}
          <div className="header-actions">
            {/* Search Trigger */}
            <button 
              type="button" 
              className="icon-btn" 
              title="Search FandomVerse (Ctrl + K)"
              onClick={onOpenSearch}
            >
              <Search size={18} />
            </button>

            {/* Bookmarks Page Trigger */}
            <button 
              type="button" 
              className="icon-btn" 
              title="Saved Favorites & Personal Notes"
              onClick={() => handleNavClick('bookmarks')}
            >
              <Bookmark size={18} />
              {bookmarkCount > 0 && <span className="badge-counter">{bookmarkCount}</span>}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button 
              type="button" 
              className="icon-btn" 
              title="Temporary Shopping Cart"
              onClick={onOpenCart}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="badge-counter">{cartCount}</span>}
            </button>

            {/* Dummy Login/Signup Button */}
            <button 
              type="button" 
              className="btn-secondary nav-auth-btn"
              onClick={onOpenAuth}
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.86rem', whiteSpace: 'nowrap', flexShrink: 0 }}
              title="Sign in to your account"
            >
              <User size={15} style={{ flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>Sign In</span>
            </button>

            {/* Mobile menu toggle button */}
            <button 
              type="button" 
              className="icon-btn mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title={mobileMenuOpen ? "Close Menu" : "Open Navigation Menu"}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div 
            style={{
              padding: '1.25rem 0',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            {/* Mobile Quick Sign In Button */}
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              style={{ width: '100%', justifyContent: 'center', padding: '0.65rem', marginBottom: '0.5rem' }}
            >
              <User size={16} />
              <span>Sign In / Fan Profile</span>
            </button>

            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>

            <div style={{ padding: '0.4rem 0.85rem', color: 'var(--text-dim)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.5px' }}>
              CATEGORIES
            </div>
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className="nav-item-btn"
                onClick={() => handleNavClick('category-hub', cat.id)}
                style={{ paddingLeft: '1.5rem' }}
              >
                {cat.name}
              </button>
            ))}

            <button 
              type="button" 
              className="nav-item-btn"
              onClick={() => handleNavClick('articles')}
            >
              Articles
            </button>
            <button 
              type="button" 
              className="nav-item-btn"
              onClick={() => handleNavClick('characters')}
            >
              Characters
            </button>
            <button 
              type="button" 
              className="nav-item-btn"
              onClick={() => handleNavClick('media')}
            >
              Media Hub
            </button>
            <button 
              type="button" 
              className="nav-item-btn"
              onClick={() => handleNavClick('trailers')}
            >
              Trailers
            </button>
            <button 
              type="button" 
              className="nav-item-btn"
              onClick={() => handleNavClick('events')}
            >
              Events
            </button>
            <button 
              type="button" 
              className="nav-item-btn"
              onClick={() => handleNavClick('merchandise')}
            >
              Merch Shop
            </button>
            <button 
              type="button" 
              className={`nav-item-btn ${activePage === 'gallery' ? 'active' : ''}`}
              onClick={() => handleNavClick('gallery')}
            >
              Image Gallery
            </button>
            <button 
              type="button" 
              className="nav-item-btn"
              onClick={() => handleNavClick('about')}
            >
              About Us
            </button>
            <button 
              type="button" 
              className="nav-item-btn"
              onClick={() => handleNavClick('contact')}
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
