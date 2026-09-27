import React, { useState, useMemo } from 'react';
import { Newspaper, Search, Bookmark, ArrowRight, Clock, User, Calendar } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * ArticlesPage Component
 * Fulfills SRS Requirement:
 * "Displays long-form articles and news pieces relevant to each fandom, in card and detail-page format."
 */
export default function ArticlesPage({
  articles = [],
  onOpenArticle,
  onToggleBookmark,
  bookmarkedIds = new Set(),
  onNavigate
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = art.title.toLowerCase().includes(q);
        const inExcerpt = (art.excerpt || '').toLowerCase().includes(q);
        const inTags = Array.isArray(art.tags) && art.tags.some(t => t.toLowerCase().includes(q));
        return inTitle || inExcerpt || inTags;
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="articles-page-view">
      <Breadcrumb 
        crumbs={[{ label: 'Featured Articles' }]} 
        onHomeClick={() => onNavigate('home')} 
      />

      <div className="section-head-wrap">
        <div>
          <h1 className="section-head-title">
            <Newspaper size={28} style={{ color: '#c23351' }} />
            <span>Featured Articles & Journalism</span>
          </h1>
          <p className="section-head-desc">
            Deep-dive analyses, industry spotlights, director retrospectives, and cultural commentary across all 7 fandoms.
          </p>
        </div>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          {filteredArticles.length} Stories Found
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-sort-bar">
        <div className="filter-chips-list">
          {['all', 'anime', 'gaming', 'movies', 'tv-shows', 'k-pop', 'comics', 'manga'].map(cat => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? 'All Fandoms' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1c1c1c', padding: '0.35rem 0.75rem', borderRadius: '4px', border: '1px solid #2e2e2e' }}>
          <Search size={15} style={{ color: '#a3a3a3' }} />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '0.85rem', width: '160px' }}
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: '#161616', borderRadius: '4px', border: '1px solid #2e2e2e' }}>
          <p style={{ color: '#a3a3a3', fontSize: '1.1rem' }}>No articles match your search criteria.</p>
        </div>
      ) : (
        <div className="cards-grid-layout">
          {filteredArticles.map(art => {
            const isFav = bookmarkedIds.has(art.id);

            return (
              <article key={art.id} className="content-card">
                <div className="card-image-wrap" style={{ cursor: 'pointer' }} onClick={() => onOpenArticle(art)}>
                  <img src={art.image} alt={art.title} loading="lazy" />
                  <span className="card-category-badge">{art.category}</span>
                  <button 
                    type="button"
                    className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark({ ...art, contentType: 'article' });
                    }}
                    title={isFav ? 'Remove bookmark' : 'Bookmark this article'}
                  >
                    <Bookmark size={15} />
                  </button>
                </div>

                <div className="card-body">
                  <div className="card-meta-line">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {art.date}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {art.readTime}
                    </span>
                  </div>

                  <h3 className="card-title" style={{ cursor: 'pointer' }} onClick={() => onOpenArticle(art)}>
                    {art.title}
                  </h3>

                  <div style={{ fontSize: '0.82rem', color: '#c23351', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={12} />
                    <span>By {art.author}</span>
                  </div>

                  <p className="card-description">{art.excerpt}</p>

                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {art.tags?.map((t, idx) => (
                      <span key={idx} className="trait-pill">#{t}</span>
                    ))}
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                      onClick={() => onOpenArticle(art)}
                    >
                      <span>Read Story</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
