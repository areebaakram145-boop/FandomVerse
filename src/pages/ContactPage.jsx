import React, { useState, useCallback } from 'react';
import { Mail, Phone, MapPin, Send, Navigation, CheckCircle2, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * ContactPage Component
 * Fulfills SRS Requirement:
 * "Responsive team contact information with a Google Map showing location and GPS functionality."
 */

// ─── Validation Rules (Industry-Level Regex) ────────────────────────────────
const VALIDATION_RULES = {
  name: {
    // Letters (Unicode), spaces, hyphens, apostrophes. No digits, no special chars, no HTML/script tags.
    pattern: /^[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]+([\s'\-][A-Za-z\u00C0-\u024F\u1E00-\u1EFF]+)*$/,
    minLength: 2,
    maxLength: 80,
    messages: {
      required: 'Full name is required.',
      minLength: 'Name must be at least 2 characters long.',
      maxLength: 'Name cannot exceed 80 characters.',
      pattern: 'Name can only contain letters, spaces, hyphens, and apostrophes.',
    },
  },
  email: {
    // RFC 5322 simplified — covers 99.9% of real-world addresses.
    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/,
    maxLength: 254,
    messages: {
      required: 'Email address is required.',
      maxLength: 'Email cannot exceed 254 characters.',
      pattern: 'Please enter a valid email address (e.g. user@domain.com).',
    },
  },
  subject: {
    // Alphanumeric + common punctuation. No angle brackets to prevent XSS.
    pattern: /^[A-Za-z0-9\u00C0-\u024F\s.,!?'"()\-:;&#/]+$/,
    minLength: 3,
    maxLength: 150,
    messages: {
      minLength: 'Subject must be at least 3 characters long.',
      maxLength: 'Subject cannot exceed 150 characters.',
      pattern: 'Subject contains invalid characters. Avoid using < or > symbols.',
    },
  },
  message: {
    // Anything except angle brackets (basic XSS guard).
    pattern: /^[^<>]+$/,
    minLength: 10,
    maxLength: 2000,
    messages: {
      required: 'Message is required.',
      minLength: 'Message must be at least 10 characters long.',
      maxLength: 'Message cannot exceed 2000 characters.',
      pattern: 'Message contains invalid characters. Please remove < or > symbols.',
    },
  },
};

// Inline error text style
const errorTextStyle = {
  color: '#ff6b6b',
  fontSize: '0.78rem',
  marginTop: '5px',
  display: 'block',
  lineHeight: '1.3',
};

// Input style with error border variant
const getInputStyle = (hasError) => ({
  width: '100%',
  background: 'var(--bg-secondary)',
  border: `1px solid ${hasError ? '#ff6b6b' : 'var(--border-color)'}`,
  borderRadius: '4px',
  padding: '0.65rem 0.9rem',
  color: '#fff',
  outline: 'none',
  fontSize: '0.9rem',
  transition: 'border-color 0.2s ease',
});

export default function ContactPage({ onNavigate, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fandom: 'anime',
    subject: '',
    message: ''
  });

  // Track which fields user has interacted with (touched)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  // Per-field error messages
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [gpsCoordinates, setGpsCoordinates] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ─── Single field validator ───────────────────────────────────────────
  const validateField = useCallback((fieldName, value) => {
    const rule = VALIDATION_RULES[fieldName];
    if (!rule) return '';

    const trimmed = value.trim();

    // Required check (name, email, message are required)
    if (['name', 'email', 'message'].includes(fieldName)) {
      if (trimmed.length === 0) {
        return rule.messages.required;
      }
    }

    // Optional field with no input — skip further validation
    if (trimmed.length === 0) return '';

    // Min length check
    if (rule.minLength && trimmed.length < rule.minLength) {
      return rule.messages.minLength;
    }

    // Max length check
    if (rule.maxLength && trimmed.length > rule.maxLength) {
      return rule.messages.maxLength;
    }

    // Regex pattern check
    if (rule.pattern && !rule.pattern.test(trimmed)) {
      return rule.messages.pattern;
    }

    return '';
  }, []);

  // ─── Validate all fields at once (for submit) ────────────────────────
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    for (const field of ['name', 'email', 'subject', 'message']) {
      const err = validateField(field, formData[field]);
      newErrors[field] = err;
      if (err) isValid = false;
    }

    setErrors(newErrors);
    // Mark all fields as touched so errors are visible
    setTouched({ name: true, email: true, subject: true, message: true });
    return isValid;
  }, [formData, validateField]);

  // ─── Handle input change with live validation ─────────────────────────
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Only show live validation if the field has been touched (blurred once)
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  // ─── Handle blur — mark as touched and validate ───────────────────────
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  // ─── Form submit handler ──────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) {
      return; // Errors are shown inline, no alert needed
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
      setTouched({ name: false, email: false, subject: false, message: false });
      setErrors({ name: '', email: '', subject: '', message: '' });
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
        <div style={{ background: '#161616', border: '1px solid #2e2e2e', borderRadius: '4px', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#fff' }}>Send Us a Message</h2>
          <p style={{ color: '#a3a3a3', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            Fill out the form below and our fan relations desk will reply within 24 hours.
          </p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '4px',
                  background: '#800020',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>Message Dispatched!</h3>
              <p style={{ color: '#d4d4d4', fontSize: '0.9rem' }}>
                Thank you, {formData.name || 'Fan'}. Your message has been logged in our client session simulator.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Name Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  style={getInputStyle(touched.name && errors.name)}
                />
                {touched.name && errors.name && (
                  <span style={errorTextStyle}>
                    <AlertCircle size={13} style={{ verticalAlign: 'middle', marginRight: '4px', display: 'inline' }} />
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Email Address *
                </label>
                <input
                  type="text"
                  placeholder="alex@fandomdomain.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  style={getInputStyle(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <span style={errorTextStyle}>
                    <AlertCircle size={13} style={{ verticalAlign: 'middle', marginRight: '4px', display: 'inline' }} />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Fandom Select */}
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

              {/* Subject Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is this inquiry about?"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  onBlur={() => handleBlur('subject')}
                  style={getInputStyle(touched.subject && errors.subject)}
                />
                {touched.subject && errors.subject && (
                  <span style={errorTextStyle}>
                    <AlertCircle size={13} style={{ verticalAlign: 'middle', marginRight: '4px', display: 'inline' }} />
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                  Message * <span style={{ color: '#666', fontSize: '0.75rem', fontWeight: 400 }}>({formData.message.length}/2000)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Type your message, convention suggestion, or question here..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  style={{
                    ...getInputStyle(touched.message && errors.message),
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
                {touched.message && errors.message && (
                  <span style={errorTextStyle}>
                    <AlertCircle size={13} style={{ verticalAlign: 'middle', marginRight: '4px', display: 'inline' }} />
                    {errors.message}
                  </span>
                )}
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
          <div style={{ background: '#161616', border: '1px solid #2e2e2e', borderRadius: '4px', padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#fff' }}>Official Headquarters Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={20} style={{ color: '#c23351', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>Physical Address</div>
                  <div style={{ color: '#a3a3a3', fontSize: '0.85rem' }}>
                    FandomVerse Innovation Lab, Aptech Center, Tech Avenue, Innovation Quarter
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Mail size={20} style={{ color: '#c23351', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>Email Support</div>
                  <div style={{ color: '#a3a3a3', fontSize: '0.85rem' }}>contact@fandomverse-aptech.org</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Phone size={20} style={{ color: '#c23351', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>Direct Line</div>
                  <div style={{ color: '#a3a3a3', fontSize: '0.85rem' }}>+1 (800) 555-FANDOM / +92 21 111-APTECH</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Clock size={20} style={{ color: '#c23351', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>Operating Hours</div>
                  <div style={{ color: '#a3a3a3', fontSize: '0.85rem' }}>Monday - Saturday: 09:00 AM - 08:00 PM PST</div>
                </div>
              </div>
            </div>
          </div>

          {/* GPS Functionality Box (SRS requirement: "with a Google Map showing location and GPS functionality") */}
          <div style={{ background: '#161616', border: '1px solid #2e2e2e', borderRadius: '4px', padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Navigation size={18} style={{ color: '#c23351' }} />
              <span>GPS Geolocation Finder</span>
            </h3>
            <p style={{ color: '#a3a3a3', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
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
                  background: '#241015',
                  border: '1px solid #800020',
                  borderRadius: '4px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.84rem',
                  color: '#e28b9c'
                }}
              >
                <div><strong style={{ color: '#fff' }}>Detected Latitude:</strong> {gpsCoordinates.lat} N</div>
                <div><strong style={{ color: '#fff' }}>Detected Longitude:</strong> {gpsCoordinates.lng} E</div>
                <div style={{ fontSize: '0.75rem', color: '#a3a3a3', marginTop: '4px' }}>
                  GPS signal locked - Synced with FandomVerse Convention Radar
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Responsive Google Map (SRS Requirement: "Google Map showing location") */}
      <section style={{ background: '#161616', border: '1px solid #2e2e2e', borderRadius: '4px', overflow: 'hidden', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={20} style={{ color: '#c23351' }} />
          <span>Interactive Headquarters Google Map</span>
        </h3>
        
        <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #2e2e2e' }}>
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

