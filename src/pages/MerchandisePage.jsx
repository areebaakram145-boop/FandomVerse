import React, { useState, useMemo } from 'react';
import { ShoppingBag, Star, Bookmark, Filter, ArrowUpDown, Info, Check, Eye } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * MerchandisePage Component
 * Fulfills SRS Requirement:
 * "Displays fan merchandise items such as ‘t-shirt’ in a card format — image, name, price range, and short description.
 * Users can click to view product information and can add items to a temporary shopping cart,
 * where the total billing amount is calculated and displayed using JavaScript. Checkout and payment features are not included."
 */
export default function MerchandisePage({
  merchandise = [],
  onAddToCart,
  onOpenCart,
  onToggleBookmark,
  bookmarkedIds = new Set(),
  onNavigate
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceSort, setPriceSort] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredMerchandise = useMemo(() => {
    let list = merchandise.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      return true;
    });

    if (priceSort === 'low-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-low') {
      list.sort((a, b) => b.price - a.price);
    } else if (priceSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [merchandise, selectedCategory, priceSort]);

  return (
    <div className="merchandise-page-view">
      <Breadcrumb 
        crumbs={[{ label: 'Fan Merchandise Shop' }]} 
        onHomeClick={() => onNavigate('home')} 
      />

      <div className="section-head-wrap">
        <div>
          <h1 className="section-head-title">
            <ShoppingBag size={28} style={{ color: '#2ed573' }} />
            <span>Fan Merchandise Showcase</span>
          </h1>
          <p className="section-head-desc">
            Explore officially inspired apparel, kimonos, figures, and collectibles with real-time cart total calculations.
          </p>
        </div>
        <button 
          type="button" 
          className="btn-primary"
          onClick={onOpenCart}
          style={{ fontSize: '0.85rem' }}
        >
          <ShoppingBag size={16} />
          <span>Open Cart</span>
        </button>
      </div>

      {/* SRS Project Notice */}
      <div 
        style={{
          background: 'rgba(46, 213, 115, 0.08)',
          border: '1px solid rgba(46, 213, 115, 0.25)',
          borderRadius: '10px',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          fontSize: '0.84rem',
          color: '#86efac',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Info size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>SRS Compliance Notice:</strong> This showcase includes dynamic client-side shopping cart calculations (subtotal, tax, discounts). Checkout and online payments are not included as per Aptech competition specifications.
        </span>
      </div>

      {/* Filter and Sort Bar */}
      <div className="filter-sort-bar">
        {/* Category Filters */}
        <div className="filter-chips-list">
          {['all', 'anime', 'gaming', 'movies', 'tv-shows', 'k-pop', 'comics', 'manga'].map(cat => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? 'All Merch' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpDown size={14} style={{ color: '#94a3b8' }} />
          <select 
            className="sort-select-box"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="default">Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Merchandise Grid */}
      <div className="cards-grid-layout">
        {filteredMerchandise.map(item => {
          const isFav = bookmarkedIds.has(item.id);

          return (
            <div key={item.id} className="content-card">
              <div 
                className="card-image-wrap" 
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedProduct(item)}
              >
                <img src={item.image} alt={item.name} loading="lazy" />
                <span className="card-category-badge">{item.category}</span>
                {item.badge && (
                  <span 
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(99,102,241,0.9)',
                      color: '#fff',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}

                <button 
                  type="button"
                  className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark({ ...item, contentType: 'merchandise' });
                  }}
                  title={isFav ? 'Remove bookmark' : 'Bookmark this item'}
                >
                  <Bookmark size={15} />
                </button>
              </div>

              <div className="card-body">
                <div className="card-meta-line">
                  <span style={{ color: '#818cf8' }}>{item.franchise}</span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#ffa502' }}>
                    <Star size={13} fill="#ffa502" /> {item.rating} ({item.reviewsCount})
                  </span>
                </div>

                <h3 
                  className="card-title" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedProduct(item)}
                >
                  {item.name}
                </h3>

                <p className="card-description">{item.description}</p>

                <div className="merch-price-bar">
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Price</div>
                    <span className="price-text">${item.price.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      style={{ padding: '0.45rem 0.65rem' }}
                      onClick={() => setSelectedProduct(item)}
                      title="View product information"
                    >
                      <Eye size={15} />
                    </button>
                    <button 
                      type="button" 
                      className="btn-primary"
                      onClick={() => onAddToCart(item)}
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
                    >
                      <ShoppingBag size={14} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Information Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div 
            className="modal-dialog" 
            style={{ maxWidth: '620px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                style={{ width: '220px', height: '220px', borderRadius: '10px', objectFit: 'cover' }}
              />
              <div style={{ flexGrow: 1, minWidth: '220px' }}>
                <span className="trait-pill" style={{ color: '#818cf8', marginBottom: '0.4rem', display: 'inline-block' }}>
                  {selectedProduct.category.toUpperCase()} • {selectedProduct.franchise}
                </span>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{selectedProduct.name}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffa502', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <Star size={15} fill="#ffa502" />
                  <span>{selectedProduct.rating} / 5.0 ({selectedProduct.reviewsCount} customer reviews)</span>
                </div>

                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2ed573', marginBottom: '1rem' }}>
                  ${selectedProduct.price.toFixed(2)}
                </div>

                <button 
                  type="button" 
                  className="btn-primary"
                  onClick={() => {
                    onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <ShoppingBag size={16} />
                  <span>Add to Temporary Cart</span>
                </button>
              </div>
            </div>

            <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.4rem' }}>Product Description</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {selectedProduct.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
