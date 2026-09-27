import React, { useState, useEffect } from 'react';
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
  Bookmark,
  Film,
  Volume2,
  Image as ImageIcon,
  Maximize2
} from 'lucide-react';

/**
 * HomePage Component
 * Landing page featuring portal logo, hero banner with darkened image overlay,
 * comprehensive introductory text section, category navigation cards, 
 * 7 cross-category highlight feature tabs (Articles, Trailers, Events, Characters, Merch, Audio Clips, Lightbox Galleries),
 * community banner, and dedicated Anime Video Showcase section right after Join the Global Movement.
 */
export default function HomePage({
  categories = [],
  articles = [],
  trailers = [],
  events = [],
  characters = [],
  merchandise = [],
  media = [],
  galleries = [],
  onNavigate,
  onOpenArticle,
  onOpenTrailer,
  onOpenMedia,
  onOpenCharacter,
  onOpenGalleryLightbox,
  onAddToCart,
  onToggleBookmark,
  bookmarkedIds = new Set()
}) {
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'trailers' | 'events' | 'characters' | 'merch' | 'audio' | 'galleries'

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

  // Filter audio clips specifically from media dataset
  const audioClips = media.filter(m => m.type === 'podcast' || !!m.audioUrl);

  // Typewriter animation state for hero headline (infinite forward & reverse)
  const fullHeadline = "The Centralized Universe For Fandom Enthusiasts";
  const [typedChars, setTypedChars] = useState(fullHeadline.length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    if (!isDeleting) {
      if (typedChars < fullHeadline.length) {
        timer = setTimeout(() => {
          setTypedChars(prev => prev + 1);
        }, 65);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (typedChars > 0) {
        timer = setTimeout(() => {
          setTypedChars(prev => prev - 1);
        }, 30);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 600);
      }
    }
    return () => clearTimeout(timer);
  }, [typedChars, isDeleting]);

  const currentText = fullHeadline.slice(0, typedChars);
  const prefixLength = 29; // Length of "The Centralized Universe For "
  const prefixText = currentText.slice(0, prefixLength);
  const gradientText = currentText.length > prefixLength ? currentText.slice(prefixLength) : '';

  return (
    <div className="home-page-view">
      {/* 1. Hero Banner Section - Side-by-Side Text & Clean Image Visual */}
      <section className="hero-banner-split" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        alignItems: 'center',
        background: '#161616',
        border: '1px solid #2e2e2e',
        borderLeft: '4px solid #800020',
        borderRadius: '4px',
        padding: '2.5rem 2rem',
        marginBottom: '2.5rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Left Column: Text & CTAs */}
        <div style={{ zIndex: 2 }}>
          <div className="hero-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#202020', border: '1px solid #800020', padding: '0.35rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', color: '#f5f5f5', marginBottom: '1.25rem' }}>
            <span>FandomVerse Centralized Portal</span>
          </div>

          <h1 
            className="hero-title typewriter-title" 
            style={{ 
              fontSize: '2.3rem', 
              fontWeight: 800, 
              lineHeight: 1.25, 
              marginBottom: '1rem', 
              color: '#fff',
              minHeight: '6.25rem'
            }}
          >
            <span>{prefixText}</span>
            {gradientText && (
              <span style={{ color: '#c23351' }}>{gradientText}</span>
            )}
            <span className="typewriter-cursor" aria-hidden="true">|</span>
          </h1>

          <p className="hero-subtitle" style={{ fontSize: '0.98rem', color: '#b0b0b0', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            Discover, explore, and stay connected with the greatest stories ever told. From epic anime battles and next-gen gaming realms to cinematic sagas, K-Pop sensations, and legendary comic mythologies.
          </p>

          <div className="hero-actions-group" style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              className="btn-primary"
              onClick={() => onNavigate('category-hub', 'anime')}
            >
              <span>Explore Fandom Hubs</span>
              <ArrowRight size={16} />
            </button>

            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => onNavigate('media')}
            >
              <Film size={16} />
              <span>Media & Audio Hub</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual Image Card with Dark Overlay */}
        <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid #333333' }}>
          <div style={{ position: 'relative', width: '100%', height: '340px', overflow: 'hidden' }}>
            <img 
              src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80" 
              alt="FandomVerse Epic Multi-Universe Portal" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.38) contrast(1.15)'
              }} 
            />
            {/* Dark Mask for text visibility */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10, 10, 10, 0.75)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '1.5rem',
              color: '#fff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <span style={{ padding: '3px 8px', borderRadius: '3px', background: '#800020', color: '#ffffff', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  FEATURED SAGA
                </span>
                <span style={{ fontSize: '0.78rem', color: '#aaaaaa' }}>• 7 Universes Connected</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Demon Slayer: Infinity Castle & Cyberpunk Realms
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#cccccc' }}>
                Experience high-bitrate video trailers, original soundtrack clips, character lore, and interactive image lightboxes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Home Introduction Text Section */}
      <section className="home-intro-section" style={{
        background: '#161616',
        border: '1px solid #2e2e2e',
        borderRadius: '4px',
        padding: '2rem 1.75rem',
        marginBottom: '3rem'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#c23351', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.65rem' }}>
            <BookOpen size={15} />
            <span>Welcome to FandomVerse Portal</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.85rem', color: '#fff' }}>
            Your Unified Destination For Everything Fandom & Pop Culture
          </h2>
          <p style={{ fontSize: '0.94rem', color: '#b0b0b0', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            FandomVerse is an accessible, client-side web application built to bring fans together across 7 major entertainment verticals: <strong>Anime, Gaming, Movies, TV Shows, Music & K-Pop, Books & Novels, and Comics & Manga</strong>. Whether you are looking to stream high-action video trailers, listen to fandom audio podcasts, explore high-definition category image lightboxes, study character battle stats, or collect exclusive fan merchandise, FandomVerse organizes the entire pop culture universe in one simple interface.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.75rem', textAlign: 'left' }}>
            <div style={{ background: '#1c1c1c', border: '1px solid #2e2e2e', borderRadius: '4px', padding: '1.15rem' }}>
              <div style={{ color: '#c23351', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ImageIcon size={15} /> Category Lightboxes
              </div>
              <p style={{ fontSize: '0.8rem', color: '#888888' }}>Distinct category-wise image galleries with interactive full-screen lightbox controls.</p>
            </div>

            <div style={{ background: '#1c1c1c', border: '1px solid #2e2e2e', borderRadius: '4px', padding: '1.15rem' }}>
              <div style={{ color: '#c23351', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Volume2 size={15} /> Video & Audio Clips
              </div>
              <p style={{ fontSize: '0.8rem', color: '#888888' }}>HD video trailers, anime battle teasers, and original soundtrack podcasts with built-in audio players.</p>
            </div>

            <div style={{ background: '#1c1c1c', border: '1px solid #2e2e2e', borderRadius: '4px', padding: '1.15rem' }}>
              <div style={{ color: '#c23351', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Star size={15} /> Characters & Lore
              </div>
              <p style={{ fontSize: '0.8rem', color: '#888888' }}>Deep-dive character biographies, combat stats, traits, and complete universe histories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Hubs Showcase Cards */}
      {/* 3. Category Hubs Showcase Cards */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div className="section-head-wrap">
          <div>
            <h2 className="section-head-title">
              <Flame size={22} style={{ color: '#c23351' }} />
              <span>Seven Fandom Universes</span>
            </h2>
            <p className="section-head-desc">
              Select any category hub to dive into its curated catalog, characters, media, and lore.
            </p>
          </div>
          <span style={{ fontSize: '0.82rem', color: '#888888' }}>
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
                {cat.tagline ? cat.tagline.split('&')[0] : 'Explore lore & media'}
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

      {/* 4. Cross-Category Highlights Across 7 Features */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-head-wrap">
          <div>
            <h2 className="section-head-title">
              <TrendingUp size={22} style={{ color: '#c23351' }} />
              <span>Cross-Category Highlights</span>
            </h2>
            <p className="section-head-desc">
              Explore 7 distinct features loaded dynamically across all fandom categories.
            </p>
          </div>

          {/* 7 Feature Filter Tabs */}
          <div className="filter-chips-list">
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'articles' ? 'active' : ''}`}
              onClick={() => setActiveTab('articles')}
            >
              1. Featured Articles ({articles.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'trailers' ? 'active' : ''}`}
              onClick={() => setActiveTab('trailers')}
            >
              2. Trailers & Videos ({trailers.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              3. Events ({events.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'characters' ? 'active' : ''}`}
              onClick={() => setActiveTab('characters')}
            >
              4. Popular Characters ({characters.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'merch' ? 'active' : ''}`}
              onClick={() => setActiveTab('merch')}
            >
              5. Fan Merch ({merchandise.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'audio' ? 'active' : ''}`}
              onClick={() => setActiveTab('audio')}
            >
              6. Audio & OST Clips ({audioClips.length})
            </button>
            <button 
              type="button" 
              className={`filter-chip ${activeTab === 'galleries' ? 'active' : ''}`}
              onClick={() => setActiveTab('galleries')}
            >
              7. Lightbox Galleries ({galleries.length})
            </button>
          </div>
        </div>

        {/* Feature 1: Articles */}
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

        {/* Feature 2: Trailers */}
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
                          width: '42px',
                          height: '42px',
                          borderRadius: '4px',
                          background: '#800020',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff'
                        }}
                      >
                        <Play size={18} style={{ marginLeft: '2px' }} />
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

        {/* Feature 3: Events */}
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
                    <div style={{ fontSize: '0.8rem', color: '#b0b0b0', marginBottom: '0.75rem' }}>
                      Location: {ev.location}
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

        {/* Feature 4: Characters */}
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

        {/* Feature 5: Merchandise */}
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

        {/* Feature 6: Audio Clips & OST Podcasts (ADDED FEATURE 6) */}
        {activeTab === 'audio' && (
          <div className="cards-grid-layout">
            {audioClips.slice(0, 6).map(aud => {
              const isFav = bookmarkedIds.has(aud.id);
              return (
                <div key={aud.id} className="content-card">
                  <div className="card-image-wrap" style={{ cursor: 'pointer' }} onClick={() => onOpenMedia(aud)}>
                    <img src={aud.thumbnail} alt={aud.title} loading="lazy" />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: 'rgba(46, 213, 115, 0.95)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: '0 4px 15px rgba(46, 213, 115, 0.5)'
                      }}>
                        <Volume2 size={22} />
                      </div>
                    </div>
                    <span className="card-category-badge">{aud.category}</span>
                    <button 
                      type="button"
                      className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark({ ...aud, contentType: 'media' });
                      }}
                      title="Bookmark Audio Clip"
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="card-meta-line">
                      <span style={{ color: '#2ed573', fontWeight: 600 }}>AUDIO PODCAST & OST</span>
                      <span>•</span>
                      <span>{aud.duration || '35:00'}</span>
                    </div>
                    <h3 className="card-title">{aud.title}</h3>
                    <p className="card-description">{aud.description}</p>

                    <div style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                      <audio controls style={{ width: '100%', height: '36px', borderRadius: '6px' }}>
                        <source src={aud.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} type="audio/mpeg" />
                        Audio playback not supported.
                      </audio>
                    </div>

                    <button 
                      type="button" 
                      className="btn-secondary" 
                      style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', fontSize: '0.85rem' }}
                      onClick={() => onOpenMedia(aud)}
                    >
                      <Volume2 size={14} />
                      <span>Open Audio Stream</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Feature 7: Category Lightbox Galleries (ADDED FEATURE 7) */}
        {activeTab === 'galleries' && (
          <>
            <div className="cards-grid-layout">
              {galleries.slice(0, 6).map((gal, idx) => {
                const isFav = bookmarkedIds.has(gal.id);
                return (
                  <div key={gal.id} className="content-card">
                    <div 
                      className="card-image-wrap" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => onOpenGalleryLightbox(galleries, idx)}
                    >
                      <img src={gal.imageUrl || gal.thumbnail} alt={gal.title} loading="lazy" />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          background: 'rgba(0, 242, 254, 0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          boxShadow: '0 4px 15px rgba(0, 242, 254, 0.5)'
                        }}>
                          <Maximize2 size={20} />
                        </div>
                      </div>
                      <span className="card-category-badge">{gal.category}</span>
                      <button 
                        type="button"
                        className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark({ ...gal, contentType: 'gallery' });
                        }}
                        title="Bookmark Image"
                      >
                        <Bookmark size={15} />
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="card-meta-line">
                        <span style={{ color: '#c23351', fontWeight: 600 }}>{gal.franchise || 'Category Gallery'}</span>
                      </div>
                      <h3 className="card-title">{gal.title}</h3>
                      <p className="card-description">{gal.caption || 'High definition artwork from category gallery.'}</p>
                      <button 
                        type="button" 
                        className="btn-primary" 
                        style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', fontSize: '0.85rem' }}
                        onClick={() => onOpenGalleryLightbox(galleries, idx)}
                      >
                        <Maximize2 size={14} />
                        <span>Open Lightbox Viewer</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => onNavigate('gallery')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
              >
                <span>Explore All {galleries.length} Artworks in Full Gallery</span>
                <span>&rarr;</span>
              </button>
            </div>
          </>
        )}
      </section>

      {/* 5. Community Banner */}
      <section 
        style={{
          background: '#161616',
          borderRadius: '4px',
          border: '1px solid #2e2e2e',
          borderLeft: '4px solid #800020',
          padding: '2.5rem 1.75rem',
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}
      >
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.65rem', color: '#fff' }}>Join the Global Fandom Movement</h2>
        <p style={{ color: '#b0b0b0', maxWidth: '650px', margin: '0 auto 1.5rem', fontSize: '0.94rem' }}>
          Bookmark your favorite stories, organize conventions you wish to attend, create session notes, and explore the universe of fandom without distractions.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            className="btn-primary"
            onClick={() => onNavigate('bookmarks')}
          >
            <Bookmark size={15} />
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

      {/* 6. Anime Video Showcase Section */}
      <section style={{
        background: '#181818',
        border: '1px solid #333333',
        borderLeft: '4px solid #800020',
        borderRadius: '4px',
        padding: '2rem 1.75rem',
        marginBottom: '3rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
      }}>
        <div className="section-head-wrap" style={{ marginBottom: '1.25rem', borderBottom: '1px solid #2e2e2e', paddingBottom: '0.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#c23351', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>
              <Tv size={14} /> FEATURED ANIME VIDEO CLIPS
            </div>
            <h2 className="section-head-title" style={{ fontSize: '1.6rem', color: '#fff' }}>
              <span>Demon Slayer: Infinity Castle Battle Video Showcase</span>
            </h2>
            <p className="section-head-desc" style={{ color: '#aaaaaa' }}>
              Watch the official teaser breakdown and high-octane battle scene trailer.
            </p>
          </div>
          <span style={{ padding: '0.35rem 0.75rem', borderRadius: '4px', background: '#800020', color: '#ffffff', fontWeight: 600, fontSize: '0.78rem' }}>
            HD 1080p • 02:18
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', alignItems: 'center' }}>
          {/* Video Player Box */}
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '4px', overflow: 'hidden', border: '1px solid #333333', background: '#000' }}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Demon Slayer Infinity Castle Anime Trailer"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Details & Actions */}
          <div>
            <span style={{ fontSize: '0.78rem', color: '#c23351', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ANIPLEX & UFOTABLE OFFICIAL
            </span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0.4rem 0', color: '#fff', lineHeight: 1.3 }}>
              Demon Slayer: Kimetsu no Yaiba - The Final Movie Trilogy
            </h3>
            <p style={{ color: '#b0b0b0', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '1rem' }}>
              Witness the climactic showdown as Tanjiro, Nezuko, and the Hashira descend into the sprawling interdimensional labyrinth of the Infinity Castle to face Muzan Kibutsuji and the Upper Demon Moons.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', background: '#131313', padding: '0.85rem', borderRadius: '4px', border: '1px solid #282828', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cccccc' }}>
                <span>Studio:</span> <strong style={{ color: '#fff' }}>Ufotable</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cccccc' }}>
                <span>Soundtrack composer:</span> <strong style={{ color: '#fff' }}>Yuki Kajiura & Go Shiina</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cccccc' }}>
                <span>Release Status:</span> <strong style={{ color: '#ffffff' }}>In Theaters Soon</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => onNavigate('trailers')}
                style={{ fontSize: '0.85rem' }}
              >
                <Play size={15} />
                <span>Watch More Trailers</span>
              </button>

              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => onNavigate('category-hub', 'anime')}
                style={{ fontSize: '0.85rem' }}
              >
                <span>Anime Category Hub</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
