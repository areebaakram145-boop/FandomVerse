import React, { useState, useMemo } from 'react';
import { Film, Play, Volume2, Mic, Sparkles, Bookmark, Video } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * MediaPage Component
 * Fulfills SRS Requirement:
 * "Embeds trailers, interviews, fan content, and podcast-style audio clips relevant to each category.
 * Filterable by category and content type (trailer, interview, podcast, fan content)."
 */
export default function MediaPage({
  media = [],
  onOpenMedia,
  onToggleBookmark,
  bookmarkedIds = new Set(),
  onNavigate
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'trailer' | 'interview' | 'podcast' | 'fan content'

  const filteredMedia = useMemo(() => {
    return media.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }
      return true;
    });
  }, [media, selectedCategory, selectedType]);

  return (
    <div className="media-page-view">
      <Breadcrumb 
        crumbs={[{ label: 'Media Hub & Audio Clips' }]} 
        onHomeClick={() => onNavigate('home')} 
      />

      <div className="section-head-wrap">
        <div>
          <h1 className="section-head-title">
            <Film size={28} style={{ color: '#818cf8' }} />
            <span>Videos, Trailers & Audio Podcasts</span>
          </h1>
          <p className="section-head-desc">
            Embedded video trailers, behind-the-scenes interviews, fan tributes, and podcast-style audio clips across all categories.
          </p>
        </div>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          {filteredMedia.length} Media Items Found
        </span>
      </div>

      {/* Filter Bar */}
      <div className="filter-sort-bar">
        {/* Category Filter */}
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

        {/* Media Type Filter */}
        <div className="filter-chips-list">
          {[
            { id: 'all', label: 'All Media' },
            { id: 'trailer', label: 'Trailers' },
            { id: 'interview', label: 'Interviews' },
            { id: 'podcast', label: 'Podcasts' },
            { id: 'fan content', label: 'Fan Content' }
          ].map(t => (
            <button
              key={t.id}
              type="button"
              className={`filter-chip ${selectedType === t.id ? 'active' : ''}`}
              onClick={() => setSelectedType(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Cards Grid */}
      <div className="cards-grid-layout">
        {filteredMedia.map(item => {
          const isFav = bookmarkedIds.has(item.id);
          const isAudio = item.type === 'podcast';

          return (
            <div key={item.id} className="content-card">
              <div 
                className="card-image-wrap" 
                style={{ cursor: 'pointer' }}
                onClick={() => onOpenMedia(item)}
              >
                <img src={item.thumbnail} alt={item.title} loading="lazy" />
                
                {/* Overlay Play / Listen Icon */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.38)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div 
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: isAudio ? 'rgba(46, 213, 115, 0.9)' : 'rgba(99, 102, 241, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                    }}
                  >
                    {isAudio ? <Volume2 size={22} /> : <Play size={22} style={{ marginLeft: '3px' }} />}
                  </div>
                </div>

                <span className="card-category-badge">{item.category}</span>

                <button 
                  type="button"
                  className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark({ ...item, contentType: 'media' });
                  }}
                  title={isFav ? 'Remove bookmark' : 'Bookmark this media'}
                >
                  <Bookmark size={15} />
                </button>
              </div>

              <div className="card-body">
                <div className="card-meta-line">
                  <span 
                    style={{ 
                      textTransform: 'uppercase', 
                      color: isAudio ? '#2ed573' : '#818cf8', 
                      fontWeight: 700,
                      fontSize: '0.75rem' 
                    }}
                  >
                    {item.type}
                  </span>
                  <span>•</span>
                  <span>⏱ {item.duration}</span>
                </div>

                <h3 
                  className="card-title" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => onOpenMedia(item)}
                >
                  {item.title}
                </h3>

                {item.author && (
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    Channel: {item.author}
                  </div>
                )}

                <p className="card-description">{item.description}</p>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <button 
                    type="button" 
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                    onClick={() => onOpenMedia(item)}
                  >
                    {isAudio ? <Volume2 size={15} /> : <Play size={15} />}
                    <span>{isAudio ? 'Listen to Podcast' : 'Watch Video'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
