import React from 'react';
import { X, Calendar, Clock, User, Bookmark, ArrowRight } from 'lucide-react';

/**
 * ArticleDetailModal Component
 * Fulfills SRS Requirement: "Selecting an article opens a full read view with related content suggestions."
 */
export default function ArticleDetailModal({
  isOpen,
  onClose,
  article,
  allArticles = [],
  onSelectArticle,
  isBookmarked,
  onToggleBookmark
}) {
  if (!isOpen || !article) return null;

  // Filter 2 related articles in same category or adjacent categories
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && (a.category === article.category || !article.category))
    .slice(0, 2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog" 
        style={{ maxWidth: '820px' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close article">
          <X size={18} />
        </button>

        {/* Hero Image */}
        {article.image && (
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '320px', marginBottom: '1.5rem', position: 'relative' }}>
            <img 
              src={article.image} 
              alt={article.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div 
              style={{
                position: 'absolute',
                top: 15,
                left: 15,
                background: 'rgba(15,23,42,0.85)',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}
            >
              {article.category}
            </div>

            <button
              type="button"
              className={`card-bookmark-btn ${isBookmarked ? 'active' : ''}`}
              style={{ top: 15, right: 15 }}
              onClick={() => onToggleBookmark(article)}
              title={isBookmarked ? 'Remove from Bookmarks' : 'Bookmark this article'}
            >
              <Bookmark size={16} />
            </button>
          </div>
        )}

        {/* Header Metadata */}
        <h2 style={{ fontSize: '1.9rem', marginBottom: '0.85rem', lineHeight: 1.25 }}>
          {article.title}
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <User size={14} style={{ color: '#818cf8' }} />
            <span>By {article.author || 'Fandom Staff'}</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={14} />
            <span>{article.date}</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} />
            <span>{article.readTime || '5 min read'}</span>
          </span>
        </div>

        {/* Article Body */}
        <div style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
          {article.content ? (
            article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} style={{ marginBottom: '1.25rem' }}>
                {paragraph}
              </p>
            ))
          ) : (
            <p>{article.excerpt || article.description}</p>
          )}
        </div>

        {/* Tags */}
        {article.tags && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {article.tags.map((tag, i) => (
              <span key={i} className="trait-pill">#{tag}</span>
            ))}
          </div>
        )}

        {/* Related Articles Suggestions */}
        {relatedArticles.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: '#fff' }}>
              Related Stories in {article.category?.toUpperCase()}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {relatedArticles.map(rel => (
                <div 
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                >
                  <h5 style={{ fontSize: '0.95rem', marginBottom: '0.35rem' }}>{rel.title}</h5>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#818cf8' }}>
                    <span>{rel.readTime}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
