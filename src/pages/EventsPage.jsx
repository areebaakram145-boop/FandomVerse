import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Clock, Users, Bookmark, Filter, Sparkles } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * EventsPage Component
 * Fulfills SRS Requirement:
 * "Each category should contain at least three events.
 * Displays past and upcoming fandom-related events such as conventions, watch parties, and meetups.
 * Includes Title, date, location, description, and an associated category."
 */
export default function EventsPage({
  events = [],
  onToggleBookmark,
  bookmarkedIds = new Set(),
  onNavigate
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'upcoming' | 'past'

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (selectedCategory !== 'all' && e.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'all' && e.status !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [events, selectedCategory, selectedStatus]);

  return (
    <div className="events-page-view">
      <Breadcrumb 
        crumbs={[{ label: 'Event Highlights' }]} 
        onHomeClick={() => onNavigate('home')} 
      />

      <div className="section-head-wrap">
        <div>
          <h1 className="section-head-title">
            <Calendar size={28} style={{ color: '#2ed573' }} />
            <span>Fandom Events, Conventions & Watch Parties</span>
          </h1>
          <p className="section-head-desc">
            Explore 21+ global fandom gatherings, international comic expos, stadium concerts, and premiere midnight screenings.
          </p>
        </div>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          {filteredEvents.length} Events Tracked
        </span>
      </div>

      {/* Filter Bar */}
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
              {cat === 'all' ? 'All Fandoms' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="filter-chips-list">
          {[
            { id: 'all', label: 'All Status' },
            { id: 'upcoming', label: 'Upcoming Conventions' },
            { id: 'past', label: 'Past Highlights' }
          ].map(s => (
            <button
              key={s.id}
              type="button"
              className={`filter-chip ${selectedStatus === s.id ? 'active' : ''}`}
              onClick={() => setSelectedStatus(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="cards-grid-layout">
        {filteredEvents.map(event => {
          const isFav = bookmarkedIds.has(event.id);
          const isUpcoming = event.status === 'upcoming';

          return (
            <div key={event.id} className="content-card">
              <div className="card-image-wrap">
                <img src={event.image} alt={event.title} loading="lazy" />
                <span className="card-category-badge">{event.category}</span>
                <button 
                  type="button"
                  className={`card-bookmark-btn ${isFav ? 'active' : ''}`}
                  onClick={() => onToggleBookmark({ ...event, contentType: 'event' })}
                  title={isFav ? 'Remove bookmark' : 'Bookmark this event'}
                >
                  <Bookmark size={15} />
                </button>
              </div>

              <div className="card-body">
                <div className="card-meta-line">
                  <span 
                    style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      color: isUpcoming ? '#2ed573' : '#94a3b8' 
                    }}
                  >
                    ● {event.status} ({event.type})
                  </span>
                </div>

                <h3 className="card-title">{event.title}</h3>

                {/* Event Schedule & Location */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} style={{ color: '#818cf8' }} />
                    <span>{event.date}</span>
                  </div>
                  {event.time && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} style={{ color: '#818cf8' }} />
                      <span>{event.time}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} style={{ color: '#ec4899' }} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="card-description">{event.description}</p>

                <div style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#94a3b8' }}>
                    <Users size={13} />
                    <span>{event.attendees}</span>
                  </div>

                  <button 
                    type="button"
                    className="btn-secondary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                    onClick={() => {
                      alert(`Event reminder for "${event.title}" saved! Make sure to bookmark it to keep personal notes.`);
                    }}
                  >
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
