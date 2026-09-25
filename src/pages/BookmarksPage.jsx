import React, { useState } from 'react';
import { Bookmark, Download, Trash2, Edit3, Save, FileText, Sparkles, AlertCircle } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { exportBookmarksAsText } from '../utils/exportHelper';

/**
 * BookmarksPage Component
 * Fulfills SRS Requirement:
 * "Bookmarks are stored in browser's local storage.
 * Personal notes remain only for the current browser session using Session Storage.
 * Favorite articles, media, characters, and events.
 * Personal notes attached to bookmarked content (session-only).
 * Export bookmarks as a formatted list."
 */
export default function BookmarksPage({
  bookmarks = [],
  sessionNotes = {},
  onRemoveBookmark,
  onSaveNote,
  onNavigate
}) {
  const [selectedType, setSelectedType] = useState('all');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteDraft, setNoteDraft] = useState('');

  // Filter bookmarks by type
  const filteredBookmarks = bookmarks.filter(b => {
    if (selectedType !== 'all' && b.contentType !== selectedType) {
      return false;
    }
    return true;
  });

  const handleStartEditNote = (itemId) => {
    setEditingNoteId(itemId);
    setNoteDraft(sessionNotes[itemId] || '');
  };

  const handleSaveDraftNote = (itemId) => {
    onSaveNote(itemId, noteDraft);
    setEditingNoteId(null);
  };

  const handleExport = () => {
    exportBookmarksAsText(bookmarks, sessionNotes);
  };

  return (
    <div className="bookmarks-page-view">
      <Breadcrumb 
        crumbs={[{ label: 'Saved Bookmarks & Personal Notes' }]} 
        onHomeClick={() => onNavigate('home')} 
      />

      <div className="section-head-wrap">
        <div>
          <h1 className="section-head-title">
            <Bookmark size={28} style={{ color: '#ff4757' }} />
            <span>My Bookmarked Favorites & Session Notes</span>
          </h1>
          <p className="section-head-desc">
            Organize articles, characters, trailers, and conventions. Saved persistently in LocalStorage with temporary session-only personal notes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            type="button" 
            className="btn-primary"
            onClick={handleExport}
            disabled={bookmarks.length === 0}
            style={{ opacity: bookmarks.length === 0 ? 0.5 : 1 }}
          >
            <Download size={16} />
            <span>Export Bookmarks List (.txt)</span>
          </button>
        </div>
      </div>

      {/* SRS Storage Architecture Notice */}
      <div 
        style={{
          background: 'rgba(255, 71, 87, 0.08)',
          border: '1px solid rgba(255, 71, 87, 0.25)',
          borderRadius: '10px',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          fontSize: '0.84rem',
          color: '#fca5a5',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <AlertCircle size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>SRS Storage Architecture:</strong> Bookmarks persist in browser <code>LocalStorage</code>. Personal notes attached to bookmarks are held in <code>SessionStorage</code> and reset when you close the browser tab.
        </span>
      </div>

      {/* Filter Chips */}
      <div className="filter-sort-bar">
        <div className="filter-chips-list">
          {[
            { id: 'all', label: `All Favorites (${bookmarks.length})` },
            { id: 'article', label: 'Articles' },
            { id: 'character', label: 'Characters' },
            { id: 'trailer', label: 'Trailers' },
            { id: 'media', label: 'Media' },
            { id: 'event', label: 'Events' },
            { id: 'merchandise', label: 'Merchandise' }
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

      {/* Bookmarks List */}
      {filteredBookmarks.length === 0 ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '12px' }}>
          <Bookmark size={48} style={{ opacity: 0.2, margin: '0 auto 1rem', color: '#ff4757' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No bookmarked items found</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            Click the heart/bookmark icon on any article, character, event, or merchandise item to save it here!
          </p>
          <button type="button" className="btn-secondary" onClick={() => onNavigate('home')}>
            Browse FandomVerse
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredBookmarks.map((item, idx) => {
            const currentNote = sessionNotes[item.id] || '';
            const isEditing = editingNoteId === item.id;

            return (
              <div 
                key={`${item.contentType}-${item.id}`}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1.25rem',
                  flexWrap: 'wrap'
                }}
              >
                {/* Thumbnail */}
                <div style={{ width: '90px', height: '90px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <img 
                    src={item.image || item.thumbnail} 
                    alt={item.title || item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Main Item Info */}
                <div style={{ flexGrow: 1, minWidth: 'min(100%, 220px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span 
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            background: 'rgba(99,102,241,0.2)',
                            color: '#a5b4fc'
                          }}
                        >
                          {item.contentType}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {item.category?.toUpperCase()}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>
                        {item.title || item.name}
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: '#818cf8' }}>
                        {item.franchise || item.author || (item.price ? `$${item.price.toFixed(2)}` : '')}
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => onRemoveBookmark(item.id)}
                      style={{ color: '#ef4444', padding: '6px', cursor: 'pointer', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)' }}
                      title="Remove from favorites"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Personal Session Note Section */}
                  <div 
                    style={{
                      marginTop: '1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px dashed rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <Edit3 size={13} style={{ color: '#ffa502' }} />
                        <span>PERSONAL SESSION NOTE (SessionStorage)</span>
                      </span>

                      {!isEditing && (
                        <button 
                          type="button"
                          onClick={() => handleStartEditNote(item.id)}
                          style={{ fontSize: '0.75rem', color: '#818cf8', cursor: 'pointer' }}
                        >
                          {currentNote ? 'Edit Note' : '+ Add Note'}
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div>
                        <textarea
                          rows={2}
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          placeholder="Write your private note for this item (e.g. 'Must buy at convention' or 'Rewatch episode 4')..."
                          style={{
                            width: '100%',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-focus)',
                            borderRadius: '6px',
                            padding: '0.5rem',
                            color: '#fff',
                            fontSize: '0.85rem',
                            outline: 'none',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                          }}
                        />
                        <div style={{ display: 'flex', gap: '6px', marginTop: '0.5rem' }}>
                          <button 
                            type="button" 
                            className="btn-primary"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                            onClick={() => handleSaveDraftNote(item.id)}
                          >
                            <Save size={13} />
                            <span>Save Note</span>
                          </button>
                          <button 
                            type="button" 
                            className="btn-secondary"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                            onClick={() => setEditingNoteId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.84rem', color: currentNote ? '#cbd5e1' : '#64748b', fontStyle: currentNote ? 'normal' : 'italic' }}>
                        {currentNote ? `"${currentNote}"` : "No session note attached yet."}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
