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
    success: <CheckCircle2 size={18} style={{ color: '#c23351' }} />,
    error: <AlertCircle size={18} style={{ color: '#ef4444' }} />,
    info: <Info size={18} style={{ color: '#800020' }} />
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1200,
        background: '#1a1a1a',
        border: '1px solid #800020',
        borderRadius: '4px',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: '#f5f5f5',
        fontSize: '0.9rem',
        fontWeight: 500
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
