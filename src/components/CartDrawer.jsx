import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, AlertCircle } from 'lucide-react';

/**
 * CartDrawer Component
 * Fulfills SRS Requirement:
 * "Users can click to view product information and can add items to a temporary shopping cart,
 * where the total billing amount is calculated and displayed using JavaScript.
 * Checkout and payment features are not included."
 */
export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOpenCheckout
}) {
  if (!isOpen) return null;

  // Calculate billings
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% simulated tax
  const discount = subtotal > 100 ? 15.00 : (subtotal > 50 ? 5.00 : 0); // Simulated fan club discount
  const grandTotal = Math.max(0, subtotal + tax - discount);

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div 
        className="cart-drawer-panel" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Cart Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} style={{ color: '#818cf8' }} />
            <h3 style={{ fontSize: '1.25rem' }}>Temporary Cart</h3>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)
            </span>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close Cart">
            <X size={18} />
          </button>
        </div>

        {/* Informative SRS Banner */}
        <div 
          style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '8px',
            padding: '0.65rem 0.85rem',
            marginBottom: '1rem',
            fontSize: '0.78rem',
            color: '#c7d2fe',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}
        >
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '2px', color: '#818cf8' }} />
          <span>
            <strong>Aptech SRS Notice:</strong> This cart demonstrates client-side JavaScript billing calculations. Actual checkout and online payment processing are disabled.
          </span>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-scroll">
          {cartItems.length === 0 ? (
            <div style={{ padding: '3rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
              <ShoppingBag size={48} style={{ opacity: 0.25, margin: '0 auto 1rem' }} />
              <p style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '0.35rem' }}>Your cart is empty</p>
              <p style={{ fontSize: '0.85rem' }}>Browse the Merch Shop to add fan collectibles and apparel!</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item-row">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-thumb" 
                />
                <div className="cart-item-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.25 }}>
                      {item.name}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => onRemoveItem(item.id)}
                      style={{ color: '#ef4444', padding: '2px', opacity: 0.8, cursor: 'pointer' }}
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#818cf8', margin: '4px 0' }}>
                    {item.franchise || item.category?.toUpperCase()}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#2ed573', fontSize: '0.95rem' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity controls */}
                    <div className="qty-control-group">
                      <button 
                        type="button" 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button 
                        type="button" 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Billing Calculations Summary */}
        {cartItems.length > 0 && (
          <div className="cart-footer-summary">
            <div className="cart-calc-row">
              <span>Subtotal:</span>
              <span style={{ color: '#f8fafc' }}>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-calc-row">
              <span>Estimated Tax (8%):</span>
              <span style={{ color: '#f8fafc' }}>${tax.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="cart-calc-row" style={{ color: '#2ed573' }}>
                <span>Fan Club Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="cart-total-row">
              <span>Estimated Total:</span>
              <span style={{ color: '#2ed573' }}>${grandTotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                onClick={onClearCart}
              >
                Clear Cart
              </button>
              <button 
                type="button" 
                className="btn-primary" 
                style={{ flex: 2, justifyContent: 'center' }}
                onClick={onOpenCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
