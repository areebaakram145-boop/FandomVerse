import React from 'react';
import { X, Bookmark, Quote, Award } from 'lucide-react';

/**
 * CharacterDetailModal Component
 * Fulfills SRS Requirement:
 * "Each profile includes Name, Image, Series, Biography, and Traits."
 */
export default function CharacterDetailModal({
  isOpen,
  onClose,
  character,
  isBookmarked,
  onToggleBookmark
}) {
  if (!isOpen || !character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog" 
        style={{ maxWidth: '680px' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close Character Details">
          <X size={18} />
        </button>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {/* Character Avatar */}
          <div style={{ position: 'relative', width: '200px', height: '260px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
            <img 
              src={character.image} 
              alt={character.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <button
              type="button"
              className={`card-bookmark-btn ${isBookmarked ? 'active' : ''}`}
              style={{ top: 10, right: 10 }}
              onClick={() => onToggleBookmark(character)}
              title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
            >
              <Bookmark size={15} />
            </button>
          </div>

          {/* Character Identity & Details */}
          <div style={{ flexGrow: 1, minWidth: '240px' }}>
            <span 
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '4px',
                background: 'rgba(99,102,241,0.2)',
                color: '#a5b4fc',
                display: 'inline-block',
                marginBottom: '0.5rem'
              }}
            >
              {character.category} Fandom
            </span>

            <h2 style={{ fontSize: '1.8rem', lineHeight: 1.2, marginBottom: '0.35rem' }}>
              {character.name}
            </h2>

            <div style={{ fontSize: '0.95rem', color: '#818cf8', fontWeight: 600, marginBottom: '0.5rem' }}>
              {character.franchise}
            </div>

            <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '1rem' }}>
              <strong>Role:</strong> {character.role}
            </div>

            {/* Key Traits & Abilities */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.4rem' }}>
                SIGNATURE TRAITS & ABILITIES:
              </div>
              <div className="traits-pills-list">
                {character.traits?.map((trait, idx) => (
                  <span key={idx} className="trait-pill" style={{ borderColor: 'rgba(99,102,241,0.3)', color: '#e0e7ff' }}>
                    ✦ {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Famous Character Quote */}
        {character.quote && (
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderLeft: '4px solid var(--primary)',
              borderRadius: '0 8px 8px 0',
              padding: '0.85rem 1.25rem',
              marginBottom: '1.5rem',
              fontStyle: 'italic',
              color: '#f1f5f9',
              display: 'flex',
              gap: '10px'
            }}
          >
            <Quote size={20} style={{ color: '#818cf8', flexShrink: 0 }} />
            <span>"{character.quote}"</span>
          </div>
        )}

        {/* Biography */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>Biography & Lore</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.7 }}>
            {character.biography}
          </p>
        </div>
      </div>
    </div>
  );
}
