import React from 'react';
import { Sparkles, Heart, Shield, Cpu, ExternalLink } from 'lucide-react';

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
            <div className="logo-brand" style={{ marginBottom: '1rem' }} onClick={() => onNavigate('home')}>
              <div className="logo-icon-wrap">
                <Sparkles size={20} color="#fff" />
              </div>
              <span>Fandom<span className="brand-gradient">Verse</span></span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              FandomVerse is the premier centralized digital universe uniting passionate fans across Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga. Developed as a fast, accessible, responsive Single Page Application.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span className="trait-pill" style={{ color: '#818cf8', borderColor: 'rgba(129, 140, 248, 0.3)' }}>
                Aptech TechWiz 7
              </span>
              <span className="trait-pill" style={{ color: '#2ed573', borderColor: 'rgba(46, 213, 115, 0.3)' }}>
                100% Client-Side SPA
              </span>
            </div>
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

            <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2ed573', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                <Shield size={14} />
                <span>Client-Side Safe Architecture</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Zero backend databases or external file writes. Persistent LocalStorage + ephemeral SessionStorage for notes.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory AI Tool Disclosure as per SRS instructions */}
        <div className="ai-disclosure-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a5b4fc', fontWeight: 600, marginBottom: '4px' }}>
            <Cpu size={15} />
            <span>AI Assistance Disclosure (Aptech SRS Compliance)</span>
          </div>
          <p>
            In accordance with project guidelines, AI tools (including Figma AI for layout brainstorming, Gemini/ChatGPT for content structuring and dataset curation, and Unsplash for royalty-free photography) were utilized as supportive aids. All UI logic, component architecture, state management, and styling have been crafted, modified, and validated by the team.
          </p>
        </div>

        {/* Bottom copyright bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} <strong>FandomVerse</strong> • All Rights Reserved. Built for <strong>Aptech Limited</strong> TechWiz Competition.
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
