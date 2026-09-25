import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumb Component
 * Fulfills SRS Requirement: "Breadcrumb navigation for better UX across category and detail pages."
 * 
 * Props:
 * - crumbs: Array of objects { label: string, onClick?: () => void }
 */
export default function Breadcrumb({ crumbs = [], onHomeClick }) {
  return (
    <nav className="breadcrumbs-bar" aria-label="Breadcrumb">
      <button 
        type="button" 
        className="breadcrumb-crumb"
        onClick={onHomeClick}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
      >
        <Home size={14} />
        <span>Home</span>
      </button>

      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={13} style={{ opacity: 0.4 }} />
            {isLast ? (
              <span className="breadcrumb-active">{crumb.label}</span>
            ) : (
              <button 
                type="button" 
                className="breadcrumb-crumb"
                onClick={crumb.onClick}
              >
                {crumb.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
