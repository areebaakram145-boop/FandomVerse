/**
 * storage.js
 * Simple helper functions to work with Browser LocalStorage and SessionStorage.
 * 
 * SRS Rule:
 * 1. Bookmarks & Visitor Counter are stored in LocalStorage (persistent across browser sessions).
 * 2. Personal Notes attached to bookmarks are stored in SessionStorage (cleared when session ends).
 */

// Keys used in storage
const VISITOR_KEY = 'fandomverse_visitor_count';
const BOOKMARKS_KEY = 'fandomverse_bookmarks';
const NOTES_KEY = 'fandomverse_session_notes';

/**
 * Get the current simulated visitor count and increment it by 1 on new visits.
 */
export function getAndIncrementVisitorCount() {
  try {
    const rawCount = localStorage.getItem(VISITOR_KEY);
    // If not set yet, initialize at a realistic base number (e.g. 12,480)
    let currentCount = rawCount ? parseInt(rawCount, 10) : 12480;
    
    // Check if counted in this session to avoid inflating on rapid refresh
    const sessionVisited = sessionStorage.getItem('has_counted_visit');
    if (!sessionVisited) {
      currentCount += 1;
      localStorage.setItem(VISITOR_KEY, currentCount.toString());
      sessionStorage.setItem('has_counted_visit', 'true');
    }
    
    return currentCount;
  } catch (error) {
    console.error('Error accessing localStorage for visitor counter:', error);
    return 12481;
  }
}

/**
 * Retrieve all saved bookmarks from LocalStorage
 * Returns an array of items: [{ id, title, type, category, image, ... }]
 */
export function getSavedBookmarks() {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading bookmarks from localStorage:', error);
    return [];
  }
}

/**
 * Save an updated list of bookmarks to LocalStorage
 */
export function saveBookmarks(bookmarksList) {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarksList));
  } catch (error) {
    console.error('Error saving bookmarks to localStorage:', error);
  }
}

/**
 * Toggle a bookmark: if exists, remove it; if not, add it.
 * Returns { isBookmarked: boolean, updatedList: array }
 */
export function toggleBookmarkItem(item) {
  const currentList = getSavedBookmarks();
  const existsIndex = currentList.findIndex(b => b.id === item.id);
  
  let updatedList;
  let isBookmarked;
  
  if (existsIndex > -1) {
    // Remove from bookmarks
    updatedList = currentList.filter(b => b.id !== item.id);
    isBookmarked = false;
  } else {
    // Add to bookmarks with timestamp
    updatedList = [...currentList, { ...item, bookmarkedAt: new Date().toISOString() }];
    isBookmarked = true;
  }
  
  saveBookmarks(updatedList);
  return { isBookmarked, updatedList };
}

/**
 * Retrieve personal notes from SessionStorage
 * Notes format: { [itemId]: "user's private note text" }
 */
export function getSessionNotes() {
  try {
    const data = sessionStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading session notes:', error);
    return {};
  }
}

/**
 * Save a personal note for a specific bookmarked item into SessionStorage
 */
export function saveSessionNote(itemId, noteText) {
  try {
    const currentNotes = getSessionNotes();
    if (!noteText || noteText.trim() === '') {
      delete currentNotes[itemId];
    } else {
      currentNotes[itemId] = noteText.trim();
    }
    sessionStorage.setItem(NOTES_KEY, JSON.stringify(currentNotes));
    return currentNotes;
  } catch (error) {
    console.error('Error saving session note:', error);
    return {};
  }
}
