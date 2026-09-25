import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';

/**
 * AuthModal Component
 * Fulfills SRS Requirement:
 * "Dummy Login/Signup: Login and Signup buttons are UI only and do not authenticate users."
 */
export default function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [simulatedUser, setSimulatedUser] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate login without any backend authentication
    setSimulatedUser(name || email.split('@')[0]);
    setTimeout(() => {
      onClose();
      setSimulatedUser(null);
      setEmail('');
      setPassword('');
      setName('');
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog" 
        style={{ maxWidth: '440px', padding: '2rem' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {simulatedUser ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div 
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(46, 213, 115, 0.2)',
                color: '#2ed573',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}
            >
              <ShieldCheck size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#2ed573' }}>
              Welcome, {simulatedUser}!
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Simulated session initialized. Enjoy your personalized FandomVerse experience!
            </p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: activeTab === 'login' ? '#fff' : '#94a3b8',
                  borderBottom: activeTab === 'login' ? '2px solid var(--primary)' : '2px solid transparent',
                  background: 'transparent'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: activeTab === 'signup' ? '#fff' : '#94a3b8',
                  borderBottom: activeTab === 'signup' ? '2px solid var(--primary)' : '2px solid transparent',
                  background: 'transparent'
                }}
              >
                Create Account
              </button>
            </div>

            {/* SRS Notice */}
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '1.25rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
              ℹ️ <strong>Note:</strong> UI simulation only. No sensitive passwords or backend credentials required.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeTab === 'signup' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                    Full Name or Fan Handle
                  </label>
                  <div className="search-input-wrap" style={{ margin: 0 }}>
                    <User size={16} style={{ color: '#94a3b8' }} />
                    <input
                      type="text"
                      className="search-input-field"
                      placeholder="e.g. HokageFan99"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Email Address
                </label>
                <div className="search-input-wrap" style={{ margin: 0 }}>
                  <Mail size={16} style={{ color: '#94a3b8' }} />
                  <input
                    type="email"
                    className="search-input-field"
                    placeholder="fan@fandomverse.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Password
                </label>
                <div className="search-input-wrap" style={{ margin: 0 }}>
                  <Lock size={16} style={{ color: '#94a3b8' }} />
                  <input
                    type="password"
                    className="search-input-field"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem' }}
              >
                {activeTab === 'login' ? 'Sign In to FandomVerse' : 'Create Free Fan Account'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
