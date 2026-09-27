import React, { useState, useMemo } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Bookmark, 
  Maximize2, 
  Palette, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * GalleryPage Component
 * Fulfills SRS Requirement:
 * - Dedicated Image Gallery page for visual fan content.
 * - Dynamic category filters loading image datasets from JSON (/data/galleries.json).
 * - Full integration with full-screen Lightbox modal viewer.
 * - Persistent bookmarking of artworks into LocalStorage.
 * - Real-time keyword search and sorting by title, franchise, or artist.
 * - Styled consistently in the Classic Burgundy & Black theme.
 */
export default function GalleryPage({
  galleries = [],
  categories = [],
  onOpenGalleryLightbox,
  onToggleBookmark,
  bookmarkedIds = new Set(),
  onNavigate,
  initialCategory = 'all'
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'title' | 'franchise' | 'artist'

  // Compute category item counts for filter chips
  const categoryCounts = useMemo(() => {
    const counts = { all: galleries.length };
    galleries.forEach(item => {
      if (item.category) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });
    return counts;
  }, [galleries]);

  // Filter and sort gallery items
  const filteredGalleries = useMemo(() => {
    let result = galleries.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = (item.title || '').toLowerCase().includes(q);
        const inFranchise = (item.franchise || '').toLowerCase().includes(q);
        const inCaption = (item.caption || '').toLowerCase().includes(q);
        const inArtist = (item.artist || '').toLowerCase().includes(q);
        const inCat = (item.category || '').toLowerCase().includes(q);
        return inTitle || inFranchise || inCaption || inArtist || inCat;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'title') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortBy === 'franchise') {
      result.sort((a, b) => (a.franchise || '').localeCompare(b.franchise || ''));
    } else if (sortBy === 'artist') {
      result.sort((a, b) => (a.artist || '').localeCompare(b.artist || ''));
    }

    return result;
  }, [galleries, selectedCategory, searchQuery, sortBy]);

  // Information about currently selected category (if not 'all')
  const currentCategoryObj = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return categories.find(c => c.id === selectedCategory) || null;
  }, [categories, selectedCategory]);

  // Reset filters helper
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <div className="gallery-page-view">
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        crumbs={[{ label: 'Image Gallery' }]} 
        onHomeClick={() => onNavigate('home')} 
      />

      {/* Page Header */}
      <div className="section-head-wrap">
        <div>
          <h1 className="section-head-title">
            <ImageIcon size={28} style={{ color: '#800020' }} />
            <span>Fandom Visual Galleries & Artworks</span>
          </h1>
          <p className="section-head-desc">
            Explore high-definition concept art, official keyframes, and fan illustrations across all 7 Fandom universes. Loaded dynamically from catalog data with full-screen Lightbox browsing.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ 
            fontSize: '0.85rem', 
            color: '#ffffff', 
            background: '#1c1c1c', 
            border: '1px solid #2e2e2e', 
            padding: '0.35rem 0.75rem', 
            borderRadius: '4px' 
          }}>
            <strong>{filteredGalleries.length}</strong> of <strong>{galleries.length}</strong> Artworks
          </span>
        </div>
      </div>

      {/* Optional Category Spotlight Banner if a specific category is active */}
      {currentCategoryObj && (
        <div 
          style={{
            background: '#161616',
            border: '1px solid #2e2e2e',
            borderLeft: `4px solid ${currentCategoryObj.themeColor || '#800020'}`,
            padding: '1rem 1.25rem',
            borderRadius: '4px',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                fontSize: '0.72rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                background: currentCategoryObj.accentBg || 'rgba(128, 0, 32, 0.2)', 
                color: currentCategoryObj.themeColor || '#800020',
                padding: '2px 8px',
                borderRadius: '3px'
              }}>
                Active Universe
              </span>
              <h2 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>{currentCategoryObj.name} Gallery</h2>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#a8a8a8', marginTop: '0.35rem', margin: 0 }}>
              {currentCategoryObj.tagline || currentCategoryObj.description}
            </p>
          </div>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => onNavigate('category-hub', currentCategoryObj.id)}
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
          >
            <span>Visit {currentCategoryObj.name} Hub</span>
            <ExternalLink size={13} />
          </button>
        </div>
      )}

      {/* Filter, Search & Sort Bar */}
      <div className="filter-sort-bar">
        {/* Category Filter Chips */}
        <div className="filter-chips-list">
          <button
            type="button"
            className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Fandoms ({categoryCounts.all || 0})
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`filter-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name} ({categoryCounts[cat.id] || 0})
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Live Search Input */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: '#1c1c1c', 
            padding: '0.35rem 0.75rem', 
            borderRadius: '4px', 
            border: '1px solid #2e2e2e' 
          }}>
            <Search size={15} style={{ color: '#a3a3a3' }} />
            <input
              type="text"
              placeholder="Search artworks, artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#fff', 
                outline: 'none', 
                fontSize: '0.85rem', 
                width: '180px' 
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 0 }}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <select
            className="sort-select-box"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort artworks"
          >
            <option value="default">Sort: Default / Featured</option>
            <option value="title">Sort: Title (A - Z)</option>
            <option value="franchise">Sort: Franchise (A - Z)</option>
            <option value="artist">Sort: Artist (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Gallery Cards Grid / Empty State */}
      {filteredGalleries.length === 0 ? (
        <div style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center', 
          background: '#161616', 
          borderRadius: '4px', 
          border: '1px solid #2e2e2e',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <Palette size={48} style={{ color: '#555555' }} />
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.3rem' }}>
              No artworks match your criteria
            </h3>
            <p style={{ color: '#888888', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto' }}>
              We could not find any images matching {searchQuery ? `"${searchQuery}"` : ''} in the selected category filter. Try clearing filters to see all available gallery artworks.
            </p>
          </div>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={handleResetFilters}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="cards-grid-layout">
          {filteredGalleries.map((artwork, idx) => {
            const isFav = bookmarkedIds.has(artwork.id);

            return (
              <article key={artwork.id} className="content-card">
                {/* Image Container with Lightbox Click & Hover Trigger */}
                <div 
                  className="card-image-wrap" 
                  style={{ cursor: 'pointer', position: 'relative' }}
                  onClick={() => onOpenGalleryLightbox(filteredGalleries, idx)}
                  title="Click to view full-screen Lightbox"
                >
                  <img 
                    src={artwork.imageUrl || artwork.thumbnail} 
                    alt={artwork.title} 
                    loading="lazy" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Dark hover indicator with Maximize icon */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                    }}
                    className="gallery-hover-overlay"
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '4px',
                      background: 'rgba(128, 0, 32, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      border: '1px solid #ffffff33'
                    }}>
                      <Maximize2 size={18} />
                    </div>
                  </div>

                  {/* Category Pill Badge */}
                  <span className="card-category-badge">
                    {artwork.category}
                  </span>

                  {/* Bookmark Toggle Button */}
                  <button 
                    type="button"
                    className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark({
                        ...artwork,
                        contentType: 'gallery',
                        image: artwork.thumbnail || artwork.imageUrl
                      });
                    }}
                    title={isFav ? 'Remove from favorites' : 'Bookmark this artwork'}
                    aria-label="Bookmark artwork"
                  >
                    <Bookmark size={15} />
                  </button>
                </div>

                {/* Card Content Information */}
                <div className="card-body">
                  <div className="card-meta-line">
                    <span style={{ color: '#c23351', fontWeight: 600 }}>
                      {artwork.franchise || 'Featured Franchise'}
                    </span>
                    {artwork.artist && (
                      <>
                        <span>•</span>
                        <span style={{ color: '#888888', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          By {artwork.artist}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="card-title" title={artwork.title}>
                    {artwork.title}
                  </h3>

                  <p className="card-description">
                    {artwork.caption || 'High-definition artwork from the official FandomVerse gallery collection.'}
                  </p>

                  {/* Bottom Action: Open in Lightbox */}
                  <button 
                    type="button" 
                    className="btn-primary" 
                    style={{ 
                      width: '100%', 
                      justifyContent: 'center', 
                      marginTop: 'auto', 
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onClick={() => onOpenGalleryLightbox(filteredGalleries, idx)}
                  >
                    <Maximize2 size={14} />
                    <span>View in Lightbox</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
