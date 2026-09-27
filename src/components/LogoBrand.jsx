import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import logoIconImg from '../assets/logo-icon.png';

/**
 * FandomVerse Official Brand Logo Component
 * High-definition Portal Crest & Gradient Typography
 */
export default function LogoBrand({ 
  onClick, 
  className = "", 
  size = "md",
  variant = "full" 
}) {
  const [imgError, setImgError] = useState(false);

  // Height definitions
  const heights = {
    sm: 32,
    md: 42,
    lg: 52,
    xl: 64
  };
  const currentHeight = heights[size] || 42;

  return (
    <div 
      className={`logo-brand logo-brand-${size} ${className}`} 
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      role="button"
      tabIndex={0}
      title="FandomVerse Portal - Click to return Home"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        cursor: 'pointer',
        userSelect: 'none',
        textDecoration: 'none'
      }}
    >
      {!imgError ? (
        variant === "icon" ? (
          <img 
            src={logoIconImg} 
            alt="FandomVerse Emblem" 
            className="logo-brand-icon-img"
            style={{ 
              height: `${currentHeight}px`, 
              width: 'auto',
              display: 'block',
              flexShrink: 0
            }}
            onError={() => setImgError(true)}
            loading="eager"
          />
        ) : (
          <img 
            src={logoImg} 
            alt="FandomVerse Portal" 
            className="logo-brand-img"
            style={{ 
              height: `${currentHeight}px`, 
              width: 'auto',
              display: 'block',
              flexShrink: 0,
              maxWidth: 'none' // Prevent flexbox from shrinking image width to 0
            }}
            onError={() => setImgError(true)}
            loading="eager"
          />
        )
      ) : (
        /* Fallback if image fails */
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="FandomVerse" style={{ height: `${currentHeight}px` }} />
        </div>
      )}
    </div>
  );
}
