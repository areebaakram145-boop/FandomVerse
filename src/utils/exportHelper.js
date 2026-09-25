/**
 * exportHelper.js
 * Utility to export bookmarked items and their session notes as a formatted text file.
 * Fulfills SRS Requirement: "Export bookmarks as a formatted list."
 */

export function exportBookmarksAsText(bookmarks, sessionNotes) {
  if (!bookmarks || bookmarks.length === 0) {
    alert("You don't have any bookmarked items to export yet!");
    return;
  }

  // Create human-readable formatted text
  let content = "========================================================\n";
  content += "          FANDOMVERSE - MY BOOKMARKED FAVORITES         \n";
  content += `          Exported on: ${new Date().toLocaleString()}     \n`;
  content += "========================================================\n\n";

  bookmarks.forEach((item, index) => {
    content += `[${index + 1}] ${item.title || item.name}\n`;
    content += `    Category:    ${item.category ? item.category.toUpperCase() : 'General'}\n`;
    if (item.type) content += `    Type:        ${item.type}\n`;
    if (item.franchise) content += `    Franchise:   ${item.franchise}\n`;
    if (item.price) content += `    Price:       $${item.price.toFixed(2)}\n`;
    if (item.date) content += `    Event Date:  ${item.date}\n`;
    if (item.bookmarkedAt) content += `    Saved On:    ${new Date(item.bookmarkedAt).toLocaleDateString()}\n`;

    // Check if there is an active session note
    const note = sessionNotes[item.id];
    if (note) {
      content += `    Personal Note: "${note}" (Session Note)\n`;
    }
    content += "--------------------------------------------------------\n";
  });

  content += `\nTotal Bookmarks: ${bookmarks.length} item(s)\n`;
  content += "Generated via FandomVerse Web Portal (Aptech TechWiz 7)\n";

  // Trigger download using standard Blob and download anchor
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `fandomverse_bookmarks_${Date.now()}.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
