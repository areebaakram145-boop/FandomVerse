import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Filter, 
  ArrowUpDown, 
  Bookmark, 
  Play, 
  Calendar, 
  ShoppingBag, 
  Eye, 
  Image as ImageIcon,
  ArrowRight,
  User,
  Star
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * CategoryHubPage Component
 * Fulfills SRS Requirement:
 * "Displays a catalog of content items loaded from JSON files, specific to the selected category.
 * Filtering by type & sub-tags. Sorting alphabetically, by newest, or popularity/featured status.
 * Image Galleries with lightbox view."
 */
export default function CategoryHubPage({
  category,
  allCategories = [],
  articles = [],
  characters = [],
  events = [],
  media = [],
  trailers = [],
  merchandise = [],
  galleries = [],
  onSelectCategory,
  onNavigate,
  onOpenArticle,
  onOpenTrailer,
  onOpenCharacter,
  onOpenGalleryLightbox,
  onAddToCart,
  onToggleBookmark,
  bookmarkedIds = new Set()
}) {
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'character' | 'article' | 'gallery' | 'media' | 'event' | 'merchandise'
  const [selectedSubTag, setSelectedSubTag] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'a-z' | 'z-a' | 'newest'

  const categoryId = category?.id || '';

  // Filter items specifically belonging to this category
  const categoryArticles = useMemo(() => 
    articles.filter(a => a.category === categoryId).map(a => ({ ...a, contentType: 'article' })), 
    [articles, categoryId]
  );

  const categoryCharacters = useMemo(() => 
    characters.filter(c => c.category === categoryId).map(c => ({ ...c, contentType: 'character' })), 
    [characters, categoryId]
  );

  const categoryEvents = useMemo(() => 
    events.filter(e => e.category === categoryId).map(e => ({ ...e, contentType: 'event' })), 
    [events, categoryId]
  );

  const categoryMedia = useMemo(() => 
    media.filter(m => m.category === categoryId).map(m => ({ ...m, contentType: 'media' })), 
    [media, categoryId]
  );

  const categoryTrailers = useMemo(() => 
    trailers.filter(t => t.category === categoryId).map(t => ({ ...t, contentType: 'trailer' })), 
    [trailers, categoryId]
  );

  const categoryMerch = useMemo(() => 
    merchandise.filter(m => m.category === categoryId).map(m => ({ ...m, contentType: 'merchandise' })), 
    [merchandise, categoryId]
  );

  const categoryGalleries = useMemo(() => 
    galleries.filter(g => g.category === categoryId).map(g => ({ ...g, contentType: 'gallery' })), 
    [galleries, categoryId]
  );

  // Combine content items for unified catalog filtering and sorting
  const combinedCatalog = useMemo(() => {
    let list = [
      ...categoryCharacters,
      ...categoryArticles,
      ...categoryTrailers,
      ...categoryMedia,
      ...categoryEvents,
      ...categoryMerch,
      ...categoryGalleries
    ];

    // 1. Filter by Content Type
    if (selectedType !== 'all') {
      list = list.filter(item => item.contentType === selectedType);
    }

    // 2. Filter by Sub-Tag if selected
    if (selectedSubTag !== 'all') {
      const lowerTag = selectedSubTag.toLowerCase();
      list = list.filter(item => {
        const inTags = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(lowerTag));
        const inFranchise = (item.franchise || '').toLowerCase().includes(lowerTag);
        const inDesc = (item.description || item.excerpt || item.biography || '').toLowerCase().includes(lowerTag);
        return inTags || inFranchise || inDesc;
      });
    }

    // 3. Sort items
    list.sort((a, b) => {
      const titleA = (a.title || a.name || '').toLowerCase();
      const titleB = (b.title || b.name || '').toLowerCase();

      if (sortBy === 'a-z') return titleA.localeCompare(titleB);
      if (sortBy === 'z-a') return titleB.localeCompare(titleA);
      if (sortBy === 'newest') return (b.id || '').localeCompare(a.id || '');
      return 0; // default featured
    });

    return list;
  }, [categoryCharacters, categoryArticles, categoryTrailers, categoryMedia, categoryEvents, categoryMerch, categoryGalleries, selectedType, selectedSubTag, sortBy]);

  if (!category) return null;

  return (
    <div className="category-hub-view">
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        crumbs={[
          { label: 'Category Hubs', onClick: () => onNavigate('home') },
          { label: category.name }
        ]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Category Hero Banner */}
      <div 
        className="hero-banner"
        style={{
          background: '#161616',
          border: '1px solid #2e2e2e',
          borderLeft: '4px solid #800020',
          marginBottom: '2rem',
          borderRadius: '4px',
          padding: '2.5rem 2rem'
        }}
      >
        <div 
          className="hero-tag"
          style={{
            background: '#222222',
            color: '#ffffff',
            borderColor: '#800020'
          }}
        >
          <span>Fandom Hub • {category.name}</span>
        </div>
        <h1 className="hero-title" style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{category.name} Universe</h1>
        <p className="hero-subtitle" style={{ fontSize: '0.98rem', color: '#b0b0b0', marginBottom: '1.5rem' }}>{category.description}</p>

        {/* Quick Category Stats */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{categoryCharacters.length}</span>
            <div style={{ fontSize: '0.8rem', color: '#888888' }}>Character Profiles</div>
          </div>
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{categoryArticles.length}</span>
            <div style={{ fontSize: '0.8rem', color: '#888888' }}>Featured Articles</div>
          </div>
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{categoryEvents.length}</span>
            <div style={{ fontSize: '0.8rem', color: '#888888' }}>Events & Conventions</div>
          </div>
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{categoryGalleries.length}</span>
            <div style={{ fontSize: '0.8rem', color: '#888888' }}>Gallery Artworks</div>
          </div>
        </div>
      </div>

      {/* Category Quick Switcher Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.75rem' }}>
        {allCategories.map(cat => (
          <button
            key={cat.id}
            type="button"
            className={`filter-chip ${category.id === cat.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              borderColor: category.id === cat.id ? '#800020' : '#333333',
              background: category.id === cat.id ? '#800020' : '#202020',
              color: category.id === cat.id ? '#ffffff' : '#cccccc'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filter and Sort Control Bar */}
      <div className="filter-sort-bar">
        {/* Content Type Filter */}
        <div className="filter-chips-list">
          <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={14} /> Type:
          </span>
          {[
            { id: 'all', label: 'All Catalog' },
            { id: 'character', label: `Characters (${categoryCharacters.length})` },
            { id: 'article', label: `Articles (${categoryArticles.length})` },
            { id: 'trailer', label: `Trailers (${categoryTrailers.length})` },
            { id: 'media', label: `Media (${categoryMedia.length})` },
            { id: 'event', label: `Events (${categoryEvents.length})` },
            { id: 'merchandise', label: `Merch (${categoryMerch.length})` },
            { id: 'gallery', label: `Gallery (${categoryGalleries.length})` }
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

        {/* Sorting Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowUpDown size={14} style={{ color: '#94a3b8' }} />
          <select 
            className="sort-select-box"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort content"
          >
            <option value="featured">Featured / Default</option>
            <option value="a-z">Alphabetical (A - Z)</option>
            <option value="z-a">Alphabetical (Z - A)</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Sub-Tags Filter Row */}
      {category.subTags && category.subTags.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>SUB-TAGS:</span>
          <button
            type="button"
            className={`filter-chip ${selectedSubTag === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedSubTag('all')}
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
          >
            All Sub-tags
          </button>
          {category.subTags.map(tag => (
            <button
              key={tag}
              type="button"
              className={`filter-chip ${selectedSubTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedSubTag(tag)}
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Dedicated Image Gallery Section for Category (SRS: Every category includes Image Galleries) */}
      {(selectedType === 'all' || selectedType === 'gallery') && categoryGalleries.length > 0 && (
        <section style={{ marginBottom: '3rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={20} style={{ color: category.themeColor }} />
              <h3 style={{ fontSize: '1.25rem' }}>{category.name} Image Gallery</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Click any artwork to open Lightbox view</span>
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.78rem' }}
                onClick={() => onNavigate('gallery', category.id)}
              >
                Open in Full Gallery &rarr;
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {categoryGalleries.map((imgItem, idx) => (
              <div 
                key={imgItem.id}
                style={{
                  position: 'relative',
                  height: '180px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
                onClick={() => onOpenGalleryLightbox(categoryGalleries, idx)}
              >
                <img 
                  src={imgItem.thumbnail || imgItem.imageUrl} 
                  alt={imgItem.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1.0)'}
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    insetInline: 0,
                    background: 'rgba(0, 0, 0, 0.75)',
                    padding: '0.5rem 0.75rem',
                    color: '#fff',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}
                >
                  {imgItem.title}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Content Catalog Grid */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem' }}>
            {category.name} Catalog ({combinedCatalog.length} Items)
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Showing {combinedCatalog.length} items
          </span>
        </div>

        {combinedCatalog.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '12px' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              No items matched the selected filters.
            </p>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => {
                setSelectedType('all');
                setSelectedSubTag('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="cards-grid-layout">
            {combinedCatalog.map(item => {
              const isFav = bookmarkedIds.has(item.id);

              return (
                <div key={`${item.contentType}-${item.id}`} className="content-card">
                  {/* Card Image Thumbnail */}
                  <div className="card-image-wrap">
                    <img 
                      src={item.image || item.thumbnail || item.imageUrl} 
                      alt={item.title || item.name} 
                      loading="lazy" 
                    />
                    <span 
                      className="card-category-badge"
                      style={{ borderLeftColor: category.themeColor }}
                    >
                      {item.contentType}
                    </span>

                    <button 
                      type="button"
                      className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                      onClick={() => onToggleBookmark(item)}
                      title={isFav ? 'Remove bookmark' : 'Bookmark this item'}
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    {/* Meta line */}
                    <div className="card-meta-line">
                      <span>{item.franchise || category.name}</span>
                      {item.date && (
                        <>
                          <span>•</span>
                          <span>{item.date}</span>
                        </>
                      )}
                      {item.duration && (
                        <>
                          <span>•</span>
                          <span>{item.duration}</span>
                        </>
                      )}
                    </div>

                    <h4 className="card-title">{item.title || item.name}</h4>

                    {/* Character Role or Product Price */}
                    {item.role && (
                      <div style={{ fontSize: '0.82rem', color: '#a5b4fc', marginBottom: '0.5rem' }}>
                        {item.role}
                      </div>
                    )}

                    {/* Traits pills for characters */}
                    {item.traits && (
                      <div className="traits-pills-list">
                        {item.traits.slice(0, 3).map((tr, i) => (
                          <span key={i} className="trait-pill">{tr}</span>
                        ))}
                      </div>
                    )}

                    <p className="card-description">
                      {item.description || item.excerpt || item.biography || item.synopsis}
                    </p>

                    {/* Dynamic Action Buttons based on content type */}
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                      {item.contentType === 'article' && (
                        <button 
                          type="button" 
                          className="btn-secondary" 
                          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                          onClick={() => onOpenArticle(item)}
                        >
                          <span>Read Full Story</span>
                          <ArrowRight size={14} />
                        </button>
                      )}

                      {item.contentType === 'character' && (
                        <button 
                          type="button" 
                          className="btn-secondary" 
                          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                          onClick={() => onOpenCharacter(item)}
                        >
                          <User size={14} />
                          <span>View Full Profile</span>
                        </button>
                      )}

                      {(item.contentType === 'trailer' || item.contentType === 'media') && (
                        <button 
                          type="button" 
                          className="btn-primary" 
                          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                          onClick={() => onOpenTrailer(item)}
                        >
                          <Play size={14} />
                          <span>Play Media</span>
                        </button>
                      )}

                      {item.contentType === 'merchandise' && (
                        <div className="merch-price-bar" style={{ padding: 0, border: 'none', margin: 0 }}>
                          <span className="price-text">${item.price?.toFixed(2)}</span>
                          <button 
                            type="button" 
                            className="btn-primary"
                            onClick={() => onAddToCart(item)}
                            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                          >
                            <ShoppingBag size={14} />
                            <span>Add</span>
                          </button>
                        </div>
                      )}

                      {item.contentType === 'event' && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                          <span className="trait-pill" style={{ color: '#ffffff', borderColor: '#800020' }}>{item.status?.toUpperCase()}</span>
                          <span style={{ color: '#b0b0b0' }}>Location: {item.location?.split(',')[0]}</span>
                        </div>
                      )}

                      {item.contentType === 'gallery' && (
                        <button 
                          type="button" 
                          className="btn-secondary" 
                          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                          onClick={() => onOpenGalleryLightbox(categoryGalleries, 0)}
                        >
                          <Eye size={14} />
                          <span>View Lightbox</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
