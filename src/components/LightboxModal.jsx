import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

/**
 * LightboxModal Component
 * Fulfills SRS Requirement: "Supports a lightbox or carousel view for browsing images without leaving the page."
 */
export default function LightboxModal({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  onPrev,
  onNext
}) {
  // Keyboard listeners for arrow keys and escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || {};

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{ zIndex: 1100, background: 'rgba(5, 7, 12, 0.94)' }}
    >
      <div 
        style={{
          position: 'relative',
          maxWidth: '1000px',
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div 
          style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            color: '#fff',
            marginBottom: '1rem' 
          }}
        >
          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            <span>{currentImage.category?.toUpperCase()} GALLERY</span> • <span>Image {currentIndex + 1} of {images.length}</span>
          </div>

          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            style={{ position: 'static' }}
            aria-label="Close Lightbox"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Image Viewport with Previous & Next controls */}
        <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
          <img 
            src={currentImage.imageUrl || currentImage.image} 
            alt={currentImage.title}
            style={{
              maxHeight: '68vh',
              maxWidth: '100%',
              margin: '0 auto',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
              objectFit: 'contain'
            }}
          />

          {/* Left Arrow Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={onPrev}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'rgba(15, 23, 42, 0.75)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Right Arrow Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={onNext}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'rgba(15, 23, 42, 0.75)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Caption & Metadata info */}
        <div 
          style={{
            marginTop: '1.25rem',
            textAlign: 'center',
            maxWidth: '700px',
            color: '#f8fafc'
          }}
        >
          <h4 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>{currentImage.title}</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            {currentImage.caption || currentImage.description}
          </p>
          {currentImage.artist && (
            <div style={{ fontSize: '0.8rem', color: '#818cf8' }}>
              Artwork Credit: {currentImage.artist} ({currentImage.franchise})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
