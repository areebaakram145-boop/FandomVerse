import React, { useState, useMemo } from 'react';
import { Users, Filter, Bookmark, User, Quote, ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * CharactersPage Component
 * Fulfills SRS Requirement:
 * "Every category should contain at least five character profiles loaded from JSON.
 * Filterable by category and franchise. Each profile includes Name, Image, Series, Biography, and Traits."
 */
export default function CharactersPage({
  characters = [],
  onOpenCharacter,
  onToggleBookmark,
  bookmarkedIds = new Set(),
  onNavigate
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFranchise, setSelectedFranchise] = useState('all');

  // Extract unique franchises for filtering
  const availableFranchises = useMemo(() => {
    const list = characters
      .filter(c => selectedCategory === 'all' || c.category === selectedCategory)
      .map(c => c.franchise);
    return ['all', ...Array.from(new Set(list))];
  }, [characters, selectedCategory]);

  // Filtered characters list
  const filteredCharacters = useMemo(() => {
    return characters.filter(char => {
      if (selectedCategory !== 'all' && char.category !== selectedCategory) {
        return false;
      }
      if (selectedFranchise !== 'all' && char.franchise !== selectedFranchise) {
        return false;
      }
      return true;
    });
  }, [characters, selectedCategory, selectedFranchise]);

  return (
    <div className="characters-page-view">
      <Breadcrumb 
        crumbs={[{ label: 'Character Profiles' }]} 
        onHomeClick={() => onNavigate('home')} 
      />

      <div className="section-head-wrap">
        <div>
          <h1 className="section-head-title">
            <Users size={28} style={{ color: 'var(--accent-gold)' }} />
            <span>Character Profiles & Lore Roster</span>
          </h1>
          <p className="section-head-desc">
            Explore 35+ legendary figures, sorcerers, superheroes, witchers, and idols across all seven fandom universes.
          </p>
        </div>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          {filteredCharacters.length} Characters Displayed
        </span>
      </div>

      {/* Category Filter Chips */}
      <div className="filter-sort-bar">
        <div className="filter-chips-list">
          {['all', 'anime', 'gaming', 'movies', 'tv-shows', 'k-pop', 'comics', 'manga'].map(cat => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedFranchise('all');
              }}
            >
              {cat === 'all' ? 'All Fandoms (35+)' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Franchise Dropdown Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Franchise:</span>
          <select 
            className="sort-select-box"
            value={selectedFranchise}
            onChange={(e) => setSelectedFranchise(e.target.value)}
          >
            {availableFranchises.map((fr, idx) => (
              <option key={idx} value={fr}>
                {fr === 'all' ? 'All Franchises' : fr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Characters Cards Grid */}
      <div className="cards-grid-layout">
        {filteredCharacters.map(char => {
          const isFav = bookmarkedIds.has(char.id);

          return (
            <div key={char.id} className="content-card">
              <div className="card-image-wrap" style={{ cursor: 'pointer' }} onClick={() => onOpenCharacter(char)}>
                <img src={char.image} alt={char.name} loading="lazy" />
                <span className="card-category-badge">{char.category}</span>
                <button 
                  type="button"
                  className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark({ ...char, contentType: 'character' });
                  }}
                  title={isFav ? 'Remove bookmark' : 'Bookmark this character'}
                >
                  <Bookmark size={15} />
                </button>
              </div>

              <div className="card-body">
                <div className="card-meta-line">
                  <span style={{ color: '#818cf8', fontWeight: 600 }}>{char.franchise}</span>
                </div>

                <h3 className="card-title" style={{ cursor: 'pointer' }} onClick={() => onOpenCharacter(char)}>
                  {char.name}
                </h3>

                <div style={{ fontSize: '0.82rem', color: '#a5b4fc', marginBottom: '0.65rem' }}>
                  {char.role}
                </div>

                {/* Traits */}
                <div className="traits-pills-list">
                  {char.traits?.map((trait, i) => (
                    <span key={i} className="trait-pill">{trait}</span>
                  ))}
                </div>

                {/* Quote teaser */}
                {char.quote && (
                  <div style={{ fontSize: '0.78rem', fontStyle: 'italic', color: '#94a3b8', marginBottom: '0.75rem', borderLeft: '2px solid rgba(99,102,241,0.5)', paddingLeft: '6px' }}>
                    "{char.quote.length > 70 ? char.quote.slice(0, 70) + '...' : char.quote}"
                  </div>
                )}

                <p className="card-description">{char.biography}</p>

                <div style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)' }}>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                    onClick={() => onOpenCharacter(char)}
                  >
                    <User size={14} />
                    <span>View Biography</span>
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
