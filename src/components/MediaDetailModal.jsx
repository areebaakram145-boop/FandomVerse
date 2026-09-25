import React from 'react';
import { X, Bookmark, Play, Volume2, Film } from 'lucide-react';

/**
 * MediaDetailModal Component
 * Embeds video trailers or audio podcast players based on media item type.
 */
export default function MediaDetailModal({
  isOpen,
  onClose,
  mediaItem,
  isBookmarked,
  onToggleBookmark
}) {
  if (!isOpen || !mediaItem) return null;

  const isAudio = mediaItem.type === 'podcast' || !!mediaItem.audioUrl;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog" 
        style={{ maxWidth: '780px' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close Media Player">
          <X size={18} />
        </button>

        {/* Video Player or Audio Showcase */}
        {isAudio ? (
          <div 
            style={{
              background: 'linear-gradient(135deg, #1e2638, #2a1f42)',
              borderRadius: '12px',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(99,102,241,0.3)',
                color: '#818cf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}
            >
              <Volume2 size={32} />
            </div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Audio Podcast Stream</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{mediaItem.title}</p>

            <audio controls style={{ width: '100%', maxWidth: '500px' }}>
              <source src={mediaItem.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : (
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', background: '#000' }}>
            <iframe
              src={mediaItem.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
              title={mediaItem.title}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Media Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
          <div>
            <span 
              style={{ 
                fontSize: '0.72rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                padding: '2px 8px', 
                borderRadius: '4px', 
                background: 'rgba(99,102,241,0.2)', 
                color: '#a5b4fc',
                display: 'inline-block',
                marginBottom: '0.4rem'
              }}
            >
              {mediaItem.category} • {mediaItem.type || 'Trailer'}
            </span>
            <h3 style={{ fontSize: '1.5rem', lineHeight: 1.3 }}>{mediaItem.title}</h3>
          </div>

          <button 
            type="button" 
            className={`card-bookmark-btn ${isBookmarked ? 'active' : ''}`}
            style={{ position: 'static' }}
            onClick={() => onToggleBookmark(mediaItem)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this media'}
          >
            <Bookmark size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
          {mediaItem.duration && <span>⏱ Duration: {mediaItem.duration}</span>}
          {mediaItem.author && <span>By {mediaItem.author}</span>}
          {mediaItem.releaseStatus && <span style={{ textTransform: 'capitalize' }}>Status: {mediaItem.releaseStatus}</span>}
        </div>

        <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6 }}>
          {mediaItem.description || mediaItem.synopsis}
        </p>
      </div>
    </div>
  );
}
