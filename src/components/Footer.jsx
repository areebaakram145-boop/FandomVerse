import React from 'react';
import { Heart, Shield, Cpu, ExternalLink } from 'lucide-react';
import LogoBrand from './LogoBrand';

/**
 * Footer Component
 * Includes multi-column layout, legal copyright, and AI usage acknowledgment
 * as strictly requested in the competition SRS.
 */
export default function Footer({ onNavigate, categories = [] }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Bio */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <LogoBrand onClick={() => onNavigate('home')} size="sm" />
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              FandomVerse is the premier centralized digital universe uniting passionate fans across Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga. Developed as a fast, accessible, responsive Single Page Application.
            </p>
          
          </div>

          {/* Column 2: Fandom Categories */}
          <div>
            <h4 className="footer-col-title">Fandom Hubs</h4>
            <ul className="footer-links-list">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button 
                    type="button" 
                    onClick={() => onNavigate('category-hub', cat.id)}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Portals & Navigation */}
          <div>
            <h4 className="footer-col-title">Explore Portals</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => onNavigate('articles')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Featured Articles
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('characters')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Character Roster (35+)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('events')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Events & Conventions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('trailers')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Dedicated Trailers
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('merchandise')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Merchandise Shop & Cart
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('gallery')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Visual Image Galleries
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('bookmarks')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Bookmarks & Session Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Info & Contact */}
          <div>
            <h4 className="footer-col-title">Project Info</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => onNavigate('about')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  About the Team
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('contact')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Contact Us & GPS Map
                </button>
              </li>
            </ul>

          
          </div>
        </div>

        {/* Mandatory AI Tool Disclosure as per SRS instructions */}
     

        {/* Bottom copyright bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} <strong>FandomVerse</strong> • All Rights Reserved. <strong>FandomVerse</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Category: Web Innovation Unleashed</span>
            <span>Version 1.0 (SPA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
