import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Navigation, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * ContactPage Component
 * Fulfills SRS Requirement:
 * "Responsive team contact information with a Google Map showing location and GPS functionality."
 */
export default function ContactPage({ onNavigate, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fandom: 'anime',
    subject: '',
    message: ''
  });
  const [gpsCoordinates, setGpsCoordinates] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please complete all required fields.");
      return;
    }

    setSubmitted(true);
    showToast("Thank you for your message! Our team will get back to you shortly.", "success");
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        fandom: 'anime',
        subject: '',
        message: ''
      });
    }, 4000);
  };

  // GPS functionality
  const handleGetGPS = () => {
    setGpsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsCoordinates({
            lat: position.coords.latitude.toFixed(4),
            lng: position.coords.longitude.toFixed(4)
          });
          setGpsLoading(false);
          showToast("GPS coordinates acquired successfully!", "success");
        },
        (error) => {
          console.warn("Geolocation denied or unavailable, using simulated headquarters coordinates:", error);
          // Fallback simulated Aptech HQ coordinates
          setGpsCoordinates({ lat: "24.8607", lng: "67.0011" });
          setGpsLoading(false);
          showToast("Simulated GPS coordinates loaded.", "info");
        }
      );
    } else {
      setGpsCoordinates({ lat: "24.8607", lng: "67.0011" });
      setGpsLoading(false);
      showToast("Simulated GPS coordinates loaded.", "info");
    }
  };

  return (
    <div className="contact-page-view">
      <Breadcrumb 
        crumbs={[{ label: 'Contact Us & HQ Map' }]} 
        onHomeClick={() => onNavigate('home')} 
      />

      <div className="section-head-wrap">
        <div>
          <h1 className="section-head-title">
            <Mail size={28} style={{ color: 'var(--accent-gold)' }} />
            <span>Contact FandomVerse & HQ Location</span>
          </h1>
          <p className="section-head-desc">
            Have questions, franchise tips, convention partnerships, or bug reports? Reach out to our community team.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
        {/* Left Column: Contact Form */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#fff' }}>Send Us a Message</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            Fill out the form below and our fan relations desk will reply within 24 hours.
          </p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
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
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#2ed573', marginBottom: '0.5rem' }}>Message Dispatched!</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                Thank you, {formData.name || 'Fan'}. Your message has been logged in our client session simulator.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.9rem',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@fandomdomain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.9rem',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Primary Fandom Interest
                </label>
                <select
                  value={formData.fandom}
                  onChange={(e) => setFormData({ ...formData, fandom: e.target.value })}
                  className="sort-select-box"
                  style={{ width: '100%', padding: '0.65rem 0.9rem' }}
                >
                  <option value="anime">Anime Hub</option>
                  <option value="gaming">Gaming Realm</option>
                  <option value="movies">Movies & Cinema</option>
                  <option value="tv-shows">TV Shows & Series</option>
                  <option value="k-pop">K-Pop World</option>
                  <option value="comics">Comics Multiverse</option>
                  <option value="manga">Manga & Webtoons</option>
                  <option value="general">General Feedback / Aptech Project</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is this inquiry about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.9rem',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type your message, convention suggestion, or question here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.9rem',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Details & GPS Tool */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#fff' }}>Official Headquarters Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>Physical Address</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                    FandomVerse Innovation Lab, Aptech Center, Tech Avenue, Innovation Quarter
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Mail size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>Email Support</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>contact@fandomverse-aptech.org</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Phone size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>Direct Line</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>+1 (800) 555-FANDOM / +92 21 111-APTECH</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Clock size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>Operating Hours</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Monday - Saturday: 09:00 AM - 08:00 PM PST</div>
                </div>
              </div>
            </div>
          </div>

          {/* GPS Functionality Box (SRS requirement: "with a Google Map showing location and GPS functionality") */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Navigation size={18} style={{ color: 'var(--accent-gold)' }} />
              <span>GPS Geolocation Finder</span>
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Click to detect your current browser GPS coordinates and check proximity to upcoming fandom convention venues.
            </p>

            <button 
              type="button" 
              className="btn-secondary"
              onClick={handleGetGPS}
              disabled={gpsLoading}
              style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }}
            >
              <Navigation size={15} />
              <span>{gpsLoading ? 'Detecting Coordinates...' : 'Detect GPS Coordinates'}</span>
            </button>

            {gpsCoordinates && (
              <div 
                style={{
                  background: 'rgba(46, 213, 115, 0.1)',
                  border: '1px solid rgba(46, 213, 115, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.84rem',
                  color: '#86efac'
                }}
              >
                <div><strong>Detected Latitude:</strong> {gpsCoordinates.lat}° N</div>
                <div><strong>Detected Longitude:</strong> {gpsCoordinates.lng}° E</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                  GPS signal locked • Synced with FandomVerse Convention Radar
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Responsive Google Map (SRS Requirement: "Google Map showing location") */}
      <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={20} style={{ color: 'var(--accent-gold)' }} />
          <span>Interactive Headquarters Google Map</span>
        </h3>
        
        <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: '12px', overflow: 'hidden' }}>
          <iframe
            title="FandomVerse Headquarters Location Map"
            src="https://maps.google.com/maps?q=Times%20Square,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            style={{ width: '100%', height: '100%', border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
