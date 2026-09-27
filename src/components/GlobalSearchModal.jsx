import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Tag, ArrowRight } from 'lucide-react';

/**
 * GlobalSearchModal Component
 * Fulfills SRS Requirement: "Search operates over the pre-populated JSON content dataset using client-side JavaScript logic."
 * Allows multi-category and multi-content-type filtering with instant results.
 */
export default function GlobalSearchModal({
  isOpen,
  onClose,
  allContent = [],
  onSelectResult
}) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedCategory('all');
      setSelectedType('all');
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter content based on query, category, and type
  const searchResults = useMemo(() => {
    if (!query.trim() && selectedCategory === 'all' && selectedType === 'all') {
      // Show first 10 popular recommendations if no query typed
      return allContent.slice(0, 8);
    }

    const cleanQuery = query.toLowerCase().trim();

    return allContent.filter(item => {
      // Category filter check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Content Type filter check
      if (selectedType !== 'all' && item.contentType !== selectedType) {
        return false;
      }

      // If no query string, only filter by category/type
      if (!cleanQuery) return true;

      // Textual matching across title, name, description, franchise, and tags
      const matchTitle = (item.title || item.name || '').toLowerCase().includes(cleanQuery);
      const matchDesc = (item.description || item.excerpt || item.biography || '').toLowerCase().includes(cleanQuery);
      const matchFranchise = (item.franchise || '').toLowerCase().includes(cleanQuery);
      const matchTags = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(cleanQuery));

      return matchTitle || matchDesc || matchFranchise || matchTags;
    });
  }, [allContent, query, selectedCategory, selectedType]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog search-modal-box" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close search">
          <X size={18} />
        </button>

        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Search size={20} style={{ color: '#c23351' }} />
          <span>Search FandomVerse</span>
        </h3>

        {/* Search input field */}
        <div className="search-input-wrap">
          <Search size={18} style={{ color: '#94a3b8' }} />
          <input
            ref={inputRef}
            type="text"
            className="search-input-field"
            placeholder="Search characters, articles, trailers, events, merch..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} style={{ color: '#94a3b8' }}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter by Category */}
        <div style={{ marginBottom: '0.85rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.4rem' }}>
            FILTER BY CATEGORY:
          </div>
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
        </div>

        {/* Filter by Content Type */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.4rem' }}>
            CONTENT TYPE:
          </div>
          <div className="filter-chips-list">
            {['all', 'character', 'article', 'event', 'trailer', 'media', 'merchandise'].map(type => (
              <button
                key={type}
                type="button"
                className={`filter-chip ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>Showing {searchResults.length} matching result(s)</span>
          {query && <span>Press Escape to close</span>}
        </div>

        {/* Results List */}
        <div className="search-results-list">
          {searchResults.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
              No matches found for "{query}". Try checking another category or keyword!
            </div>
          ) : (
            searchResults.map(item => (
              <div 
                key={`${item.contentType}-${item.id}`}
                className="search-result-item"
                onClick={() => {
                  onSelectResult(item);
                  onClose();
                }}
              >
                {item.image && (
                  <img 
                    src={item.image || item.thumbnail} 
                    alt={item.title || item.name} 
                    style={{ width: '46px', height: '46px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' }}>
                    <span 
                      style={{ 
                        fontSize: '0.68rem', 
                        padding: '1px 6px', 
                        borderRadius: '4px', 
                        background: '#241015', 
                        color: '#e28b9c',
                        border: '1px solid #800020',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.contentType}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#a3a3a3' }}>
                      {item.category?.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title || item.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#a3a3a3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.franchise || item.author || item.location || (item.price ? `$${item.price.toFixed(2)}` : '')}
                  </div>
                </div>
                <ArrowRight size={16} style={{ color: '#c23351', flexShrink: 0 }} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
