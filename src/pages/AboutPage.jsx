import React from 'react';
import { Info, Sparkles, Shield, Cpu, Code2, Users, Layers, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

/**
 * AboutPage Component
 * Fulfills SRS Requirement:
 * "Responsive information about the team and the Website,
 * architecture details, and mandatory AI Tool Usage Acknowledgement."
 */
export default function AboutPage({ onNavigate }) {
  return (
    <div className="about-page-view">
      <Breadcrumb 
        crumbs={[{ label: 'About Us & Project Architecture' }]} 
        onHomeClick={() => onNavigate('home')} 
      />

      <div className="section-head-wrap">
        <div>
          <h1 className="section-head-title">
            <Info size={28} style={{ color: 'var(--accent-gold)' }} />
            <span>About FandomVerse & Technical Architecture</span>
          </h1>
          <p className="section-head-desc">
            Aptech TechWiz 7 Competition Project • Category: Web Innovation Unleashed • Software Requirements Specification v1.0
          </p>
        </div>
      </div>

      {/* Project Vision & Background */}
      <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: '#fff' }}>
          Problem Statement & The FandomVerse Solution
        </h2>
        <p style={{ color: '#cbd5e1', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '0.96rem' }}>
          Fandom is an ever-expanding global phenomenon spanning Anime, Gaming, Movies, Television, K-Pop, Comics, and Manga. However, fan information is notoriously fragmented—scattered across separate wikis, social feeds, streaming apps, ticketing sites, and merchandise outlets. Fans are forced to shuffle across dozens of URLs simply to stay updated.
        </p>
        <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '0.96rem' }}>
          <strong>FandomVerse</strong> solves this fragmentation by providing a centralized, high-performance, responsive Single Page Application (SPA). Built with React.js and lightweight JSON datasets, FandomVerse brings articles, character bios, trailers, conventions, and fan merchandise together under one intuitive umbrella.
        </p>
      </section>

      {/* Technical Architecture Specs */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={22} style={{ color: 'var(--accent-gold)' }} />
          <span>Technical Architecture & Constraints Compliance</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem' }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', marginBottom: '0.75rem', fontWeight: 700 }}>
              <Code2 size={20} />
              <span>React.js SPA Architecture</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Pure Single Page Application (SPA) with lightning-fast component rendering, modular state management (useState, useEffect, useMemo), and zero page reloads.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', marginBottom: '0.75rem', fontWeight: 700 }}>
              <Shield size={20} />
              <span>Zero-Backend Constraint (SRS 1.5)</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>
              All dynamic content is fetched from pre-populated structured JSON files (<code>public/data/</code>). No server-side databases or writes, ensuring maximum portability and security.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', marginBottom: '0.75rem', fontWeight: 700 }}>
              <Sparkles size={20} />
              <span>Two-Tier Browser Storage</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>
              <strong>LocalStorage:</strong> Persistent visitor counter and bookmarked favorites.<br/>
              <strong>SessionStorage:</strong> Ephemeral personal notes that clear when the browser session ends.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', marginBottom: '0.75rem', fontWeight: 700 }}>
              <Cpu size={20} />
              <span>Rule-Based AI Assistant</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Pre-scripted conversational knowledge base operating completely offline/client-side without unpredictable external API calls or latency.
            </p>
          </div>
        </div>
      </section>

      {/* Mandatory AI Tool Disclosure as per SRS instructions */}
      <section 
        style={{
          background: 'rgba(0, 242, 254, 0.12)',
          border: '1px solid rgba(0, 242, 254, 0.35)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2.5rem'
        }}
      >
        <h2 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={22} />
          <span>Official AI Tools Acknowledgement (Aptech SRS Guidelines)</span>
        </h2>
        <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '1rem' }}>
          In strict accordance with the <strong>Aptech TechWiz Software Requirements Specification (Section: Important Note Regarding AI Usage)</strong>, our development team acknowledges the supporting tools utilized during the creation of this project:
        </p>
        <ul style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.5rem', marginBottom: '1.25rem' }}>
          <li><strong>UI & Wireframing Ideation:</strong> Figma AI & Penpot concepts were referenced for harmonious color tokens and responsive grid blueprints.</li>
          <li><strong>Content Structuring & FAQ Dataset:</strong> Gemini & ChatGPT were utilized as supportive aids to curate historical lore summaries, quotes, and rule-based FAQ patterns.</li>
          <li><strong>Visual Media & Royalty-Free Assets:</strong> Curated high-definition photography sourced via Unsplash under royalty-free licenses in compliance with SRS copyright constraints.</li>
          <li><strong>Code Implementation:</strong> All React components, custom hooks, storage adapters, calculation algorithms, and Vanilla CSS design tokens were authored, customized, and verified by the team.</li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2ed573', fontSize: '0.85rem', fontWeight: 600 }}>
          <CheckCircle2 size={16} />
          <span>All team members are fully prepared to explain, justify, and walk through every line of code during presentation evaluation.</span>
        </div>
      </section>

      {/* Team Roster */}
      <section style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={22} style={{ color: 'var(--accent-gold)' }} />
          <span>Project Team & Development Roles</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>Lead Frontend Architect</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>React.js & Component Design</div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Engineered SPA structure, routing state, modal overlays, and storage utilities.</p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>UI/UX & Design Tokens</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>CSS3 & Responsive Layouts</div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Crafted burgundy & soft gold royal palette, category accent colors, breadcrumbs, and micro-animations.</p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>Data & Content Curation</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>JSON Datasets & Chatbot</div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Formulated 35+ character bios, 21+ events, media catalog, and rule-based FAQ logic.</p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>QA & Accessibility</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Lighthouse & SEO Testing</div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Validated cross-browser compatibility, WCAG contrast ratios, and keyboard accessibility.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
