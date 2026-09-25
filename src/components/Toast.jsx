import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * Toast Component
 * Displays lightweight popup messages for user actions with theme-aware styling.
 */
export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} style={{ color: '#2ed573' }} />,
    error: <AlertCircle size={18} style={{ color: '#ef4444' }} />,
    info: <Info size={18} style={{ color: 'var(--primary)' }} />
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1200,
        background: 'var(--bg-card)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border-hover)',
        borderRadius: 'var(--radius-md)',
        padding: '0.9rem 1.35rem',
        boxShadow: 'var(--shadow-card), var(--shadow-glow)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: 'var(--text-main)',
        fontSize: '0.92rem',
        fontWeight: 500,
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      {icons[type] || icons.info}
      <span>{message}</span>
      <button 
        type="button" 
        onClick={onClose}
        style={{ color: 'var(--text-muted)', marginLeft: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
