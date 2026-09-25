import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Package, 
  MapPin, 
  ArrowRight,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

/**
 * CheckoutModal Component
 * Provides a simulated (demo) checkout workflow:
 * - Shipping address & contact inputs
 * - Demo payment selection (Fan Points, Test Card, or Cash on Delivery)
 * - Order summary
 * - Confirmation receipt with simulated Order ID
 */
export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  onOrderSuccess
}) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: 'DemonSlayer99',
    email: 'fan@fandomverse.org',
    address: '42 Baker Street, Apt 7B',
    city: 'New York',
    zip: '10001',
    paymentMethod: 'fan_credits' // 'fan_credits' | 'test_card' | 'cod'
  });
  const [orderReceipt, setOrderReceipt] = useState(null);

  if (!isOpen) return null;

  // Price calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const discount = subtotal > 100 ? 15.00 : (subtotal > 50 ? 5.00 : 0);
  const grandTotal = Math.max(0, subtotal + tax - discount);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.city) {
      alert("Please enter your complete shipping information.");
      return;
    }

    // Generate simulated order details
    const randomOrderId = `FV-${Math.floor(10000 + Math.random() * 90000)}`;
    const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });

    const receipt = {
      orderId: randomOrderId,
      date: new Date().toLocaleString(),
      deliveryDate: deliveryDate,
      customer: formData.name,
      address: `${formData.address}, ${formData.city} ${formData.zip}`,
      paymentMethod: formData.paymentMethod === 'fan_credits' ? 'Demo Fan Credits' : (formData.paymentMethod === 'test_card' ? 'Demo Card (•••• 4242)' : 'Demo Cash on Delivery'),
      items: [...cartItems],
      total: grandTotal
    };

    setOrderReceipt(receipt);
    setStep('success');

    // Inform parent app to clear the cart
    if (onOrderSuccess) {
      onOrderSuccess(receipt);
    }
  };

  const handleFinish = () => {
    setStep('form');
    setOrderReceipt(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={step === 'success' ? handleFinish : onClose}>
      <div 
        className="modal-dialog" 
        style={{ maxWidth: step === 'success' ? '560px' : '720px' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={step === 'success' ? handleFinish : onClose} 
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {step === 'form' ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: '#818cf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShoppingBag size={18} />
              </div>
              <h2 style={{ fontSize: '1.45rem' }}>Simulated Fan Checkout</h2>
            </div>
            
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Review your fandom order details. Test simulation mode — no actual money is charged.
            </p>

            <form onSubmit={handlePlaceOrder}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {/* Shipping Details */}
                <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={16} style={{ color: '#2ed573' }} />
                    <span>Shipping Address</span>
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '3px' }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '3px' }}>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '3px' }}>Street Address *</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{ flex: 2 }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '3px' }}>City *</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '3px' }}>Postal Code</label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Simulation & Delivery Options */}
                <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={16} style={{ color: '#818cf8' }} />
                    <span>Demo Payment Mode</span>
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    <label 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        background: formData.paymentMethod === 'fan_credits' ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                        border: formData.paymentMethod === 'fan_credits' ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'fan_credits'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'fan_credits' })}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>Demo Fan Credits 💎</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Simulated Balance: $500.00 Available</div>
                      </div>
                    </label>

                    <label 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        background: formData.paymentMethod === 'test_card' ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                        border: formData.paymentMethod === 'test_card' ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'test_card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'test_card' })}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>Fandom Test Card 💳</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Demo Sandbox Card (•••• 4242)</div>
                      </div>
                    </label>

                    <label 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        background: formData.paymentMethod === 'cod' ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                        border: formData.paymentMethod === 'cod' ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>Cash on Delivery (Test) 📦</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Pay upon physical package receipt</div>
                      </div>
                    </label>
                  </div>

                  <div style={{ background: 'rgba(46, 213, 115, 0.08)', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid rgba(46, 213, 115, 0.2)', fontSize: '0.78rem', color: '#86efac', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Truck size={14} />
                    <span>Free Standard Fan Delivery included (3-5 Business Days)</span>
                  </div>
                </div>
              </div>

              {/* Order Items Preview & Totals */}
              <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.75rem' }}>
                  Order Summary ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items)
                </h4>

                <div style={{ maxHeight: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem' }}>
                  {cartItems.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: '#cbd5e1' }}>
                      <span>{item.name} <strong style={{ color: '#818cf8' }}>× {item.quantity}</strong></span>
                      <span style={{ fontWeight: 600, color: '#f8fafc' }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Total Payable (Includes 8% Tax):</span>
                    <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#2ed573' }}>
                      ${grandTotal.toFixed(2)}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary"
                    style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
                  >
                    <span>Place Demo Order</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Step 2: Order Placed Celebratory Receipt */
          <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
            <div 
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(46, 213, 115, 0.2)',
                color: '#2ed573',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: '0 0 25px rgba(46, 213, 115, 0.4)'
              }}
            >
              <CheckCircle2 size={44} />
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.35rem', color: '#2ed573' }}>
              Order Confirmed! 🎉
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Thank you for shopping with FandomVerse. Your simulated fan order has been placed successfully!
            </p>

            {orderReceipt && (
              <div 
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'left',
                  marginBottom: '1.75rem',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#94a3b8' }}>Order Tracking ID:</span>
                  <strong style={{ color: '#818cf8', letterSpacing: '0.5px' }}>#{orderReceipt.orderId}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#94a3b8' }}>Customer:</span>
                  <span style={{ color: '#fff' }}>{orderReceipt.customer}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#94a3b8' }}>Estimated Delivery:</span>
                  <span style={{ color: '#2ed573', fontWeight: 600 }}>{orderReceipt.deliveryDate}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#94a3b8' }}>Payment Method:</span>
                  <span style={{ color: '#fff' }}>{orderReceipt.paymentMethod}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 700 }}>
                  <span style={{ color: '#fff' }}>Total Paid:</span>
                  <span style={{ color: '#2ed573' }}>${orderReceipt.total.toFixed(2)}</span>
                </div>
              </div>
            )}

            <button 
              type="button" 
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              onClick={handleFinish}
            >
              <span>Continue Exploring FandomVerse</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
