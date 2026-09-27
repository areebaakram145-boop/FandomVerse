import React, { useState, useMemo } from 'react';
import { Clapperboard, Play, Bookmark, Clock, Film } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * TrailersPage Component
 * Fulfills SRS Requirement:
 * "A dedicated section aggregating trailers across all categories, embedded from responsive links in JSON.
 * Filterable by category and release status (upcoming, recently released)."
 */
export default function TrailersPage({
  trailers = [],
  onOpenTrailer,
  onToggleBookmark,
  bookmarkedIds = new Set(),
  onNavigate
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'upcoming' | 'recently released'

  const filteredTrailers = useMemo(() => {
    return trailers.filter(t => {
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'all' && t.releaseStatus !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [trailers, selectedCategory, selectedStatus]);

  return (
    <div className="trailers-page-view">
      <Breadcrumb 
        crumbs={[{ label: 'Dedicated Trailers' }]} 
        onHomeClick={() => onNavigate('home')} 
      />

      <div className="section-head-wrap">
        <div>
          <h1 className="section-head-title">
            <Clapperboard size={28} style={{ color: 'var(--accent-gold)' }} />
            <span>Dedicated Trailers Hub</span>
          </h1>
          <p className="section-head-desc">
            Aggregated official cinematic trailers and gameplay teasers filterable by franchise category and release schedule.
          </p>
        </div>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          {filteredTrailers.length} Trailers Available
        </span>
      </div>

      {/* Filters Bar */}
      <div className="filter-sort-bar">
        {/* Category Filters */}
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

        {/* Release Status Filter */}
        <div className="filter-chips-list">
          {[
            { id: 'all', label: 'All Releases' },
            { id: 'upcoming', label: 'Upcoming Releases' },
            { id: 'recently released', label: 'Recently Released' }
          ].map(status => (
            <button
              key={status.id}
              type="button"
              className={`filter-chip ${selectedStatus === status.id ? 'active' : ''}`}
              onClick={() => setSelectedStatus(status.id)}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trailers Grid */}
      <div className="cards-grid-layout">
        {filteredTrailers.map(trailer => {
          const isFav = bookmarkedIds.has(trailer.id);
          const isUpcoming = trailer.releaseStatus === 'upcoming';

          return (
            <div key={trailer.id} className="content-card">
              <div 
                className="card-image-wrap" 
                style={{ cursor: 'pointer' }}
                onClick={() => onOpenTrailer(trailer)}
              >
                <img src={trailer.thumbnail} alt={trailer.title} loading="lazy" />
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
                      width: '44px',
                      height: '44px',
                      borderRadius: '4px',
                      background: '#800020',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      border: '1px solid #a31d36'
                    }}
                  >
                    <Play size={20} style={{ marginLeft: '2px' }} />
                  </div>
                </div>

                <span className="card-category-badge">{trailer.category}</span>

                <button 
                  type="button"
                  className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark({ ...trailer, contentType: 'trailer' });
                  }}
                  title={isFav ? 'Remove bookmark' : 'Bookmark this trailer'}
                >
                  <Bookmark size={15} />
                </button>
              </div>

              <div className="card-body">
                <div className="card-meta-line">
                  <span 
                    style={{ 
                      fontWeight: 700, 
                      fontSize: '0.78rem',
                      color: isUpcoming ? '#e28b9c' : '#c23351',
                      textTransform: 'uppercase'
                    }}
                  >
                    ● {trailer.releaseStatus}
                  </span>
                  <span>•</span>
                  <span>{trailer.releaseDate}</span>
                </div>

                <h3 
                  className="card-title" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => onOpenTrailer(trailer)}
                >
                  {trailer.title}
                </h3>

                <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                  Studio / Publisher: {trailer.studio}
                </div>

                <p className="card-description">{trailer.synopsis}</p>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <button 
                    type="button" 
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                    onClick={() => onOpenTrailer(trailer)}
                  >
                    <Play size={14} />
                    <span>Watch ({trailer.duration})</span>
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
