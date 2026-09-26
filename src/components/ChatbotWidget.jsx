import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

/**
 * Custom VerseBot Logo SVG
 * Bespoke, human-crafted cyberpunk-anime emblem with glowing gradients
 * and friendly optical visor. Distinct and premium, avoiding generic AI templates.
 */
function VerseBotLogo({ size = 32 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="VerseBot Crest"
    >
      <defs>
        <linearGradient id="vbGrad1" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00f2fe" />
          <stop offset="0.45" stopColor="#4facfe" />
          <stop offset="0.8" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="vbVisorGrad" x1="12" y1="16" x2="36" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#050814" />
          <stop offset="1" stopColor="#0b1021" />
        </linearGradient>
        <filter id="vbGlowOptic" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hex-Shield Geometric Base */}
      <path 
        d="M24 3L41 12V28C41 37 24 45 24 45C24 45 7 37 7 28V12L24 3Z" 
        fill="url(#vbGrad1)" 
      />
      <path 
        d="M24 5L39 13.2V27.5C39 35.2 24 42.5 24 42.5C24 42.5 9 35.2 9 27.5V13.2L24 5Z" 
        stroke="rgba(255,255,255,0.45)" 
        strokeWidth="1.2" 
        fill="none" 
      />

      {/* Visor Area */}
      <path 
        d="M13 18C13 15.5 15.5 14 18 14H30C32.5 14 35 15.5 35 18V27C35 30 32.5 31.5 30 31.5H18C15.5 31.5 13 30 13 27V18Z" 
        fill="url(#vbVisorGrad)" 
        stroke="rgba(0, 242, 254, 0.5)"
        strokeWidth="1"
      />

      {/* Expressive Twin Optics with Electric Mint Glow */}
      <circle cx="19" cy="22.5" r="3.2" fill="#00f2fe" filter="url(#vbGlowOptic)" />
      <circle cx="29" cy="22.5" r="3.2" fill="#00f2fe" filter="url(#vbGlowOptic)" />
      <circle cx="19.8" cy="21.5" r="1.1" fill="#ffffff" />
      <circle cx="29.8" cy="21.5" r="1.1" fill="#ffffff" />

      {/* Expressive Smile Curve */}
      <path 
        d="M21 27.5C22.2 29 25.8 29 27 27.5" 
        stroke="#00f2fe" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />

      {/* Head Antenna Node */}
      <circle cx="24" cy="9" r="1.8" fill="#00f2fe" />
      <line x1="24" y1="9" x2="24" y2="13.5" stroke="#00f2fe" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * ChatbotWidget Component
 * Fulfills SRS Requirement:
 * "A floating chatbot widget available across the site that answers frequently asked questions,
 * recommends content based on stated interests, and guides users to relevant pages using
 * a responsive, rule-based, pre-scripted dataset."
 */
export default function ChatbotWidget({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [faqData, setFaqData] = useState(null);
  const chatbotRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Load knowledge base from public/data/chatbot_faq.json
  useEffect(() => {
    fetch('/data/chatbot_faq.json')
      .then(res => res.json())
      .then(data => {
        setFaqData(data);
        setMessages([
          {
            id: 'init-1',
            sender: 'bot',
            text: data.welcomeMessage || "Hello fellow fan! 👋 I'm VerseBot, your FandomVerse navigator. Ask me anything about Anime, Gaming, Movies, Events, or Merch!",
            action: null
          }
        ]);
      })
      .catch(err => {
        console.error("Failed to load chatbot dataset:", err);
      });
  }, []);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Close chatbot when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (
        chatbotRef.current && 
        !chatbotRef.current.contains(e.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close chatbot on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle sending a message (user text or quick reply click)
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // 1. Append user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // 2. Process through pre-scripted rule matcher
    setTimeout(() => {
      let botResponseText = faqData?.defaultFallback || "I'm here to help you navigate FandomVerse! Try asking about Anime, Gaming, Movies, Events, or Bookmarks.";
      let suggestedAction = null;

      if (faqData && Array.isArray(faqData.faqDatabase)) {
        const lowerQuery = query.toLowerCase();

        // Find best match in FAQ dataset
        const matchedItem = faqData.faqDatabase.find(item => {
          return item.keywords.some(kw => lowerQuery.includes(kw.toLowerCase()));
        });

        if (matchedItem) {
          botResponseText = matchedItem.answer;
          if (matchedItem.suggestedPage) {
            suggestedAction = {
              page: matchedItem.suggestedPage,
              category: matchedItem.suggestedCategory || null,
              label: `Open ${matchedItem.suggestedCategory ? matchedItem.suggestedCategory.toUpperCase() : matchedItem.suggestedPage.toUpperCase()}`
            };
          }
        }
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        action: suggestedAction
      };

      setMessages(prev => [...prev, botMsg]);
    }, 450);
  };

  // Reset chat conversation
  const handleResetChat = () => {
    if (faqData) {
      setMessages([
        {
          id: `init-${Date.now()}`,
          sender: 'bot',
          text: faqData.welcomeMessage || "Chat reset! How can I assist you today?",
          action: null
        }
      ]);
    }
  };

  return (
    <div className="chatbot-float-launcher">
      {/* Floating Toggle Launcher Button */}
      <button 
        ref={toggleBtnRef}
        type="button" 
        className={`chatbot-toggle-btn ${isOpen ? 'active-open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        title={isOpen ? "Close VerseBot (Esc)" : "Open VerseBot Virtual Assistant"}
        aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
      >
        {isOpen ? (
          <X size={26} color="#ffffff" strokeWidth={2.6} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <VerseBotLogo size={36} />
          </div>
        )}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="chatbot-window" ref={chatbotRef} role="dialog" aria-label="VerseBot AI Assistant">
          {/* Header */}
          <div className="chatbot-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <VerseBotLogo size={34} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.96rem', color: '#fff', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>VerseBot</span>
                  <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', background: 'rgba(0,242,254,0.18)', color: '#00f2fe', border: '1px solid rgba(0,242,254,0.45)', fontWeight: 700 }}>
                    AI GUIDE
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#00f2fe', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                  <span className="live-indicator" style={{ width: '6px', height: '6px' }}></span>
                  <span style={{ color: 'var(--text-muted)' }}>FandomVerse Companion</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Reset Conversation Button */}
              <button 
                type="button" 
                onClick={handleResetChat} 
                className="chatbot-ctrl-btn"
                title="Reset Conversation"
                aria-label="Reset Conversation"
              >
                <RotateCcw size={15} />
              </button>

              {/* Close Button in Header */}
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="chatbot-header-close-btn"
                title="Close VerseBot (Esc)"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="chatbot-messages-area">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                <div>{msg.text}</div>
                {msg.action && (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(msg.action.page, msg.action.category);
                      setIsOpen(false);
                    }}
                    style={{
                      marginTop: '0.65rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'rgba(0, 242, 254, 0.15)',
                      color: '#00f2fe',
                      border: '1px solid rgba(0, 242, 254, 0.4)',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{msg.action.label}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Replies Carousel */}
          {faqData?.quickReplies && (
            <div className="quick-replies-tray">
              {faqData.quickReplies.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  className="quick-reply-btn"
                  onClick={() => handleSendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Text Input Bar */}
          <form 
            className="chatbot-input-bar" 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
          >
            <input
              type="text"
              className="chatbot-text-input"
              placeholder="Ask about anime, games, trailers, merch..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              aria-label="Chat input"
            />
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ padding: '0.55rem 0.85rem' }}
              aria-label="Send Message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
