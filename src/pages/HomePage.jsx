import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Gamepad2, 
  Clapperboard, 
  Tv, 
  Music2, 
  BookOpen, 
  BookMarked,
  ArrowRight, 
  Calendar, 
  Clock, 
  Star, 
  Play, 
  ShoppingBag,
  TrendingUp,
  Bookmark
} from 'lucide-react';

/**
 * HomePage Component
 * Landing page featuring portal logo, animated heading, introductory text,
 * category navigation cards, rotating/grid featured content showcase across categories.
 */
export default function HomePage({
  categories = [],
  articles = [],
  trailers = [],
  events = [],
  characters = [],
  merchandise = [],
  onNavigate,
  onOpenArticle,
  onOpenTrailer,
  onOpenCharacter,
  onAddToCart,
  onToggleBookmark,
  bookmarkedIds = new Set()
}) {
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'trailers' | 'events' | 'characters' | 'merch'

  // Map icon name to Lucide component
  const getCategoryIcon = (iconName, size = 22) => {
    switch (iconName) {
      case 'Flame': return <Flame size={size} />;
      case 'Gamepad2': return <Gamepad2 size={size} />;
      case 'Clapperboard': return <Clapperboard size={size} />;
      case 'Tv': return <Tv size={size} />;
      case 'Music2': return <Music2 size={size} />;
      case 'BookOpen': return <BookOpen size={size} />;
      case 'BookMarked': return <BookMarked size={size} />;
      default: return <Sparkles size={size} />;
    }
  };

  return (
    <div className="home-page-view">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-tag">
          <Sparkles size={14} />
          <span>Aptech TechWiz 7 Project • Web Innovation Unleashed</span>
        </div>
        <h1 className="hero-title">
          The Centralized Universe For <span className="brand-gradient">Fandom Enthusiasts</span>
        </h1>
        <p className="hero-subtitle">
          Discover, explore, and stay connected with the greatest stories ever told. From epic anime battles and next-gen gaming realms to cinematic sagas, K-Pop sensations, and legendary comic mythologies.
        </p>

        <div className="hero-actions-group">
          <button 
            type="button" 
            className="btn-primary"
            onClick={() => onNavigate('category-hub', 'anime')}
            style={{ padding: '0.75rem 1.6rem', fontSize: '1rem' }}
          >
            <span>Explore Fandom Hubs</span>
            <ArrowRight size={18} />
          </button>

          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => onNavigate('merchandise')}
            style={{ padding: '0.75rem 1.6rem', fontSize: '1rem' }}
          >
            <ShoppingBag size={18} />
            <span>Fan Merchandise</span>
          </button>
        </div>
      </section>

      {/* Category Hubs Showcase Cards */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-head-wrap">
          <div>
            <h2 className="section-head-title">
              <Sparkles size={24} style={{ color: 'var(--accent-gold)' }} />
              <span>Seven Fandom Universes</span>
            </h2>
            <p className="section-head-desc">
              Select any category hub to dive into its curated catalog, characters, media, and lore.
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            7 Curated Fandom Categories
          </span>
        </div>

        <div className="categories-showcase-grid">
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className="cat-card-preview"
              onClick={() => onNavigate('category-hub', cat.id)}
            >
              <div 
                className="cat-icon-circle"
                style={{
                  background: cat.accentBg || 'rgba(99,102,241,0.15)',
                  color: cat.themeColor || '#6366f1'
                }}
              >
                {getCategoryIcon(cat.icon, 26)}
              </div>
              <h3 className="cat-card-name">{cat.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.3 }}>
                {cat.tagline.split('&')[0]}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '0.5rem', width: '100%', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="cat-card-count" style={{ color: cat.themeColor, fontWeight: 600 }}>
                  {cat.stats?.fans || '3M+'} Fans
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Showcase Across Categories (Tabs for Articles, Trailers, Events, Characters, Merch) */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-head-wrap">
          <div>
            <h2 className="section-head-title">
              <TrendingUp size={24} style={{ color: 'var(--accent-gold)' }} />
              <span>Cross-Category Highlights</span>
            </h2>
            <p className="section-head-desc">
              Curated highlights across all seven fandoms loaded dynamically from client-side JSON datasets.
            </p>
          </div>

          {/* Showcase Tabs */}
          <div className="filter-chips-list">
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'articles' ? 'active' : ''}`}
              onClick={() => setActiveTab('articles')}
            >
              Featured Articles ({articles.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'trailers' ? 'active' : ''}`}
              onClick={() => setActiveTab('trailers')}
            >
              Trailers ({trailers.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              Conventions & Events ({events.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'characters' ? 'active' : ''}`}
              onClick={() => setActiveTab('characters')}
            >
              Popular Characters ({characters.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'merch' ? 'active' : ''}`}
              onClick={() => setActiveTab('merch')}
            >
              Fan Merch ({merchandise.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Articles */}
        {activeTab === 'articles' && (
          <div className="cards-grid-layout">
            {articles.slice(0, 6).map(art => {
              const isFav = bookmarkedIds.has(art.id);
              return (
                <article key={art.id} className="content-card">
                  <div className="card-image-wrap">
                    <img src={art.image} alt={art.title} loading="lazy" />
                    <span className="card-category-badge">{art.category}</span>
                    <button 
                      type="button"
                      className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                      onClick={() => onToggleBookmark({ ...art, contentType: 'article' })}
                      title={isFav ? 'Remove from bookmarks' : 'Add to bookmarks'}
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="card-meta-line">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="card-title">{art.title}</h3>
                    <p className="card-description">{art.excerpt}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                      <button 
                        type="button" 
                        className="btn-secondary" 
                        style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                        onClick={() => onOpenArticle(art)}
                      >
                        <span>Read Full Story</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Tab 2: Trailers */}
        {activeTab === 'trailers' && (
          <div className="cards-grid-layout">
            {trailers.slice(0, 6).map(tr => {
              const isFav = bookmarkedIds.has(tr.id);
              return (
                <div key={tr.id} className="content-card">
                  <div className="card-image-wrap" style={{ cursor: 'pointer' }} onClick={() => onOpenTrailer(tr)}>
                    <img src={tr.thumbnail} alt={tr.title} loading="lazy" />
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <div 
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          background: 'rgba(99, 102, 241, 0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          boxShadow: '0 4px 15px rgba(99,102,241,0.5)'
                        }}
                      >
                        <Play size={20} style={{ marginLeft: '3px' }} />
                      </div>
                    </div>
                    <span className="card-category-badge">{tr.category}</span>
                    <button 
                      type="button"
                      className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark({ ...tr, contentType: 'trailer' });
                      }}
                      title="Bookmark trailer"
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="card-meta-line">
                      <span style={{ textTransform: 'capitalize', color: tr.releaseStatus === 'upcoming' ? '#ffa502' : '#2ed573', fontWeight: 600 }}>
                        {tr.releaseStatus}
                      </span>
                      <span>•</span>
                      <span>{tr.studio}</span>
                    </div>
                    <h3 className="card-title">{tr.title}</h3>
                    <p className="card-description">{tr.synopsis}</p>
                    <button 
                      type="button" 
                      className="btn-primary" 
                      style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', fontSize: '0.85rem' }}
                      onClick={() => onOpenTrailer(tr)}
                    >
                      <Play size={14} />
                      <span>Watch Trailer ({tr.duration})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Events */}
        {activeTab === 'events' && (
          <div className="cards-grid-layout">
            {events.slice(0, 6).map(ev => {
              const isFav = bookmarkedIds.has(ev.id);
              return (
                <div key={ev.id} className="content-card">
                  <div className="card-image-wrap">
                    <img src={ev.image} alt={ev.title} loading="lazy" />
                    <span className="card-category-badge">{ev.category}</span>
                    <button 
                      type="button"
                      className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                      onClick={() => onToggleBookmark({ ...ev, contentType: 'event' })}
                      title="Bookmark event"
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="card-meta-line">
                      <Calendar size={13} style={{ color: 'var(--accent-gold)' }} />
                      <span>{ev.date}</span>
                    </div>
                    <h3 className="card-title">{ev.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                      📍 {ev.location}
                    </div>
                    <p className="card-description">{ev.description}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="trait-pill" style={{ color: '#2ed573' }}>{ev.status.toUpperCase()}</span>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{ev.attendees}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 4: Characters */}
        {activeTab === 'characters' && (
          <div className="cards-grid-layout">
            {characters.slice(0, 6).map(ch => {
              const isFav = bookmarkedIds.has(ch.id);
              return (
                <div key={ch.id} className="content-card">
                  <div className="card-image-wrap" style={{ cursor: 'pointer' }} onClick={() => onOpenCharacter(ch)}>
                    <img src={ch.image} alt={ch.name} loading="lazy" />
                    <span className="card-category-badge">{ch.category}</span>
                    <button 
                      type="button"
                      className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark({ ...ch, contentType: 'character' });
                      }}
                      title="Bookmark character"
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="card-meta-line">
                      <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{ch.franchise}</span>
                    </div>
                    <h3 className="card-title">{ch.name}</h3>
                    <div style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
                      {ch.role}
                    </div>
                    <div className="traits-pills-list">
                      {ch.traits?.slice(0, 3).map((tr, i) => (
                        <span key={i} className="trait-pill">{tr}</span>
                      ))}
                    </div>
                    <p className="card-description">{ch.biography}</p>
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', fontSize: '0.85rem' }}
                      onClick={() => onOpenCharacter(ch)}
                    >
                      <span>View Character Profile</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 5: Merchandise */}
        {activeTab === 'merch' && (
          <div className="cards-grid-layout">
            {merchandise.slice(0, 6).map(prod => {
              const isFav = bookmarkedIds.has(prod.id);
              return (
                <div key={prod.id} className="content-card">
                  <div className="card-image-wrap">
                    <img src={prod.image} alt={prod.name} loading="lazy" />
                    <span className="card-category-badge">{prod.category}</span>
                    <button 
                      type="button"
                      className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                      onClick={() => onToggleBookmark({ ...prod, contentType: 'merchandise' })}
                      title="Bookmark product"
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="card-meta-line">
                      <span style={{ color: 'var(--accent-gold)' }}>{prod.franchise}</span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: 'var(--accent-gold)' }}>
                        <Star size={13} fill="var(--accent-gold)" /> {prod.rating}
                      </span>
                    </div>
                    <h3 className="card-title">{prod.name}</h3>
                    <p className="card-description">{prod.description}</p>
                    
                    <div className="merch-price-bar">
                      <span className="price-text">${prod.price.toFixed(2)}</span>
                      <button 
                        type="button" 
                        className="btn-primary"
                        onClick={() => onAddToCart(prod)}
                        style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
                      >
                        <ShoppingBag size={14} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Community Banner */}
      <section 
        style={{
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.22) 0%, rgba(124, 58, 237, 0.22) 50%, rgba(236, 72, 153, 0.15) 100%)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginBottom: '2rem'
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Join the Global Fandom Movement</h2>
        <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto 1.5rem', fontSize: '0.98rem' }}>
          Bookmark your favorite stories, organize conventions you wish to attend, create session notes, and explore the universe of fandom without distractions.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            className="btn-primary"
            onClick={() => onNavigate('bookmarks')}
          >
            <Bookmark size={16} />
            <span>View Saved Bookmarks</span>
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => onNavigate('about')}
          >
            <span>Learn About FandomVerse</span>
          </button>
        </div>
      </section>
    </div>
  );
}
