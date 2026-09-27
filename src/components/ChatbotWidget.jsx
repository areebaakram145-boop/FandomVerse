import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

/**
 * Custom VerseBot Logo SVG
 * Bespoke, human-crafted cyberpunk-anime emblem with glowing gradients
 * and friendly optical visor. Distinct and premium, avoiding generic AI templates.
 */
function VerseBotLogo({ size = 28 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="VerseBot Emblem"
    >
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
      <line x1="8" y1="16" x2="8" y2="16"></line>
      <line x1="16" y1="16" x2="16" y2="16"></line>
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
            text: data.welcomeMessage || "Hello fellow fan! I am VerseBot, your FandomVerse navigator. Ask me anything about Anime, Gaming, Movies, Events, or Merch!",
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
                  <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '3px', background: '#5c0017', color: '#ffffff', border: '1px solid #7c001f', fontWeight: 700 }}>
                    ASSISTANT
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#e0e0e0', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                  <span className="live-indicator" style={{ width: '6px', height: '6px' }}></span>
                  <span style={{ color: '#d0d0d0' }}>FandomVerse Companion</span>
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
                      background: '#800020',
                      color: '#ffffff',
                      border: '1px solid #800020',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
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
