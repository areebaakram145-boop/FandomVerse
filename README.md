# FandomVerse – Portal for Fandom World
### Software Requirements Specification (SRS v1.0) Implementation
**Competition:** Aptech TechWiz 7  
**Category:** Web Innovation Unleashed  
**Theme:** Fandom Universe  
**Platform:** Single Page Application (SPA) built with React.js & Vanilla CSS  

---

## 📌 Project Overview
**FandomVerse** is a centralized, responsive, media-rich web portal designed for fans of **Anime**, **Gaming**, **Movies**, **TV Shows**, **K-Pop**, **Comics**, and **Manga**. 

Before FandomVerse, fandom information was scattered across wikis, social media, ticketing platforms, and streaming portals. FandomVerse unites all seven categories in a unified portal featuring:
- 7 Dedicated Fandom Hubs with type filters, sub-tag filters, and multi-mode sorting.
- 35+ Detailed Character Profiles (at least 5 per category).
- 21+ Convention & Meetup Event Highlights (at least 3 per category).
- Image Galleries for every category with Fullscreen Lightbox Modal viewing.
- Media Hub with embedded video trailers, interviews, fan tributes, and audio podcasts.
- Dedicated Trailers section with upcoming & recently released status filters.
- Merchandise Showcase with temporary shopping cart calculations (subtotal, taxes, discounts).
- Pre-scripted rule-based AI Virtual Assistant ("VerseBot").
- Content Bookmarking System (persistent in `LocalStorage`) + Personal Notes (in `SessionStorage`) + Export Bookmarks (`.txt`).
- Real-time digital clock, simulated visitor counter, breadcrumbs, and UI dummy authentication.
- Responsive contact form with embedded interactive Google Map and GPS coordinate detector.

---

## 💻 Technology Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React.js 19 (via Vite) | Component-based Single Page Application |
| **Styling** | Vanilla CSS3 | Custom CSS variables, responsive grid & flexbox, accessible contrast |
| **Icons** | Lucide React | Modern, clean vector iconography |
| **Data Store** | Pre-populated JSON files | Satisfies SRS Constraint 1.5 (Zero backend database / read-only JSON) |
| **Persistent Storage** | Browser `LocalStorage` | Stores visitor count and user bookmarks |
| **Session Storage** | Browser `SessionStorage` | Stores private personal notes attached to bookmarks (cleared on browser close) |

---

## 🚀 Project Installation & Run Instructions (Mandatory)

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Step 1: Install Dependencies
Open your terminal in the project directory (`d:\fandom`) and run:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
The application will launch on your local host (e.g., `http://localhost:5173/` or `http://localhost:5176/`).

### Step 3: Build for Production (Optional)
To create an optimized production build:
```bash
npm run build
```
The output files will be generated in the `dist/` directory.

---

## 📁 Project Directory Structure

```
d:/fandom/
├── index.html                   # HTML5 Entry Point with Google Fonts & SEO tags
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite bundler configuration
├── public/
│   └── data/                    # JSON Content Datasets (No Backend Required)
│       ├── categories.json      # 7 Category definitions & theme colors
│       ├── characters.json      # 35+ Character profiles (5 per category)
│       ├── events.json          # 21+ Events & conventions (3 per category)
│       ├── articles.json        # Long-form journalism & analyses
│       ├── media.json           # Videos, interviews, podcasts, fan content
│       ├── trailers.json        # Dedicated trailers with release status
│       ├── merchandise.json     # Fan merchandise items for cart calculations
│       ├── galleries.json       # Artworks for all 7 category image galleries
│       └── chatbot_faq.json     # Rule-based Q&A & quick reply prompts
├── src/
│   ├── main.jsx                 # React root render
│   ├── App.jsx                  # Master App component (state, routing, modals)
│   ├── index.css                # Master CSS stylesheet with custom design tokens
│   ├── components/
│   │   ├── Navbar.jsx           # Topbar, clock, counter, search, cart, auth triggers
│   │   ├── Footer.jsx           # Multi-column footer & mandatory AI disclosure
│   │   ├── RealTimeClock.jsx    # Live ticking clock (setInterval)
│   │   ├── VisitorCounter.jsx   # Simulated LocalStorage visitor counter
│   │   ├── Breadcrumb.jsx       # UX Breadcrumb navigation
│   │   ├── GlobalSearchModal.jsx# Client-side multi-category instant search
│   │   ├── LightboxModal.jsx    # Fullscreen gallery viewer with keyboard controls
│   │   ├── ArticleDetailModal.jsx # Full reader view with related articles
│   │   ├── MediaDetailModal.jsx # Video & audio stream player modal
│   │   ├── CharacterDetailModal.jsx # Character bio, quote, and traits modal
│   │   ├── CartDrawer.jsx       # Temporary shopping cart calculations
│   │   ├── AuthModal.jsx        # Dummy Login / Signup modal (UI only)
│   │   ├── ChatbotWidget.jsx    # VerseBot virtual assistant
│   │   └── Toast.jsx            # Action notifications popup
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page with hero banner & highlights tabs
│   │   ├── CategoryHubPage.jsx  # Dynamic category hub with catalog, filters & gallery
│   │   ├── ArticlesPage.jsx     # Full articles library
│   │   ├── CharactersPage.jsx   # 35+ character roster with franchise filter
│   │   ├── MediaPage.jsx        # Videos, trailers, podcasts, interviews
│   │   ├── TrailersPage.jsx     # Dedicated trailers with status filters
│   │   ├── EventsPage.jsx       # 21+ events & conventions calendar
│   │   ├── MerchandisePage.jsx  # Fan shop with "Add to Cart"
│   │   ├── BookmarksPage.jsx    # Favorites list, session notes, and text export
│   │   ├── AboutPage.jsx        # Project vision, architecture, and team info
│   │   └── ContactPage.jsx      # Contact form, Google map, and GPS locator
│   └── utils/
│       ├── storage.js           # LocalStorage & SessionStorage helper methods
│       └── exportHelper.js      # Text file formatter and browser downloader
├── README.md                    # Project manual & presentation defense guide
└── PROJECT_REPORT.md            # TechWiz 7 Project Deliverable Report
```

---

## 🎤 Presentation & Viva Defense Guide (How to Explain Your Code to Judges)

If the judges or instructors ask you questions during your presentation, use these simple explanations:

### 1. "How does the project satisfy the constraint of having NO backend server?"
> *"Judges, we adhered strictly to SRS Constraint 1.5. Instead of an external server-side database, all data is organized into structured JSON files located in `public/data/`. On application launch, our main component (`App.jsx`) uses standard JavaScript `fetch()` and `Promise.all()` to load these files into React state. This makes our web application exceptionally fast, secure, lightweight, and capable of running anywhere without complex server setup."*

### 2. "How do you distinguish between LocalStorage and SessionStorage?"
> *"As requested in Section 1.6 of the SRS:  
> - **LocalStorage** is used for persistent data: the simulated **Visitor Counter** and the user's **Bookmarked Favorites**. These remain saved even if the user refreshes or closes the browser.  
> - **SessionStorage** is used for **Personal Notes** attached to bookmarked items. When the browser tab is closed, these temporary notes are automatically cleared, protecting user privacy."*

### 3. "How does the temporary Shopping Cart work?"
> *"Our merchandise section (`src/pages/MerchandisePage.jsx` and `src/components/CartDrawer.jsx`) maintains a `cartItems` state array in React. When a visitor clicks 'Add to Cart', we check if the item is already present; if so, we increment its quantity, otherwise we add it. Inside the cart drawer, client-side JavaScript dynamically calculates the subtotal, 8% sales tax, and promotional discounts. In accordance with the SRS note, actual checkout and payments are intentionally disabled."*

### 4. "How does the AI Chatbot function without external APIs?"
> *"SRS Constraint 1.5 states that the chatbot must not rely on live paid external APIs. Our chatbot (`VerseBot`) uses a pre-scripted JSON knowledge base (`chatbot_faq.json`). When a user types a query or clicks a quick reply, our component performs keyword token matching across the dataset to provide immediate, contextual answers and direct navigation buttons."*

### 5. "How does the Export Bookmarks feature work?"
> *"In `src/utils/exportHelper.js`, we construct a formatted text string containing the user's bookmarked items, categories, and session notes. We then create a native browser `Blob` of type `text/plain` and simulate an anchor click to download a file named `fandomverse_bookmarks_[timestamp].txt`."*

---

## 📋 Assumptions Made (as required by SRS Section 1.9)
1. **Royalty-Free Media:** Imagery is retrieved via Unsplash under royalty-free licenses to comply with copyright regulations.
2. **Audio/Video Playback:** Standard embedded YouTube links and royalty-free audio tracks (SoundHelix) are used to demonstrate video and podcast capabilities.
3. **Simulated Visitor Counter:** Initialized at a base threshold of 12,480 to realistically simulate an active fandom portal and incremented per unique session.
4. **GPS Geolocation:** Uses HTML5 `navigator.geolocation` with an automatic fallback to headquarters coordinates if the user denies location permissions.

---
© Aptech Limited • TechWiz 7 Competition Project • FandomVerse
