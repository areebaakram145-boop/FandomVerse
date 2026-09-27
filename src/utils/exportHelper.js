/**
 * exportHelper.js
 * Utility to export bookmarked items and session notes as formatted TXT, Excel (.xls), and CSV files.
 * Fulfills SRS Requirement: "Export bookmarks as a formatted list."
 */

/**
 * Escapes characters for XML Spreadsheet format
 */
function escapeXml(unsafe) {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Export bookmarks as a human-readable formatted TXT document
 */
export function exportBookmarksAsText(bookmarks, sessionNotes = {}) {
  if (!bookmarks || bookmarks.length === 0) {
    alert("You don't have any bookmarked items to export yet!");
    return;
  }

  let content = "========================================================\n";
  content += "          FANDOMVERSE - MY BOOKMARKED FAVORITES         \n";
  content += `          Exported on: ${new Date().toLocaleString()}     \n`;
  content += "========================================================\n\n";

  bookmarks.forEach((item, index) => {
    content += `[${index + 1}] ${item.title || item.name}\n`;
    content += `    Category:    ${item.category ? item.category.toUpperCase() : 'General'}\n`;
    if (item.type) content += `    Type:        ${item.type}\n`;
    if (item.franchise) content += `    Franchise:   ${item.franchise}\n`;
    if (item.price !== undefined && item.price !== null) content += `    Price:       $${Number(item.price).toFixed(2)}\n`;
    if (item.date) content += `    Event Date:  ${item.date}\n`;
    if (item.bookmarkedAt) content += `    Saved On:    ${new Date(item.bookmarkedAt).toLocaleDateString()}\n`;

    const note = sessionNotes[item.id];
    if (note) {
      content += `    Personal Note: "${note}" (Session Note)\n`;
    }
    content += "--------------------------------------------------------\n";
  });

  content += `\nTotal Bookmarks: ${bookmarks.length} item(s)\n`;
  content += "Generated via FandomVerse Web Portal (Aptech TechWiz 7)\n";

  triggerDownload(content, "text/plain;charset=utf-8", `fandomverse_bookmarks_${Date.now()}.txt`);
}

/**
 * Export bookmarks as an Excel spreadsheet (.xls / XML Spreadsheet 2003)
 * Opens natively in Microsoft Excel, Google Sheets, LibreOffice, and Numbers with styled headers & columns.
 */
export function exportBookmarksAsExcel(bookmarks, sessionNotes = {}) {
  if (!bookmarks || bookmarks.length === 0) {
    alert("You don't have any bookmarked items to export yet!");
    return;
  }

  const exportDate = new Date().toLocaleString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Title>FandomVerse Bookmarks Export</Title>
  <Author>FandomVerse Portal</Author>
  <Created>${new Date().toISOString()}</Created>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Header">
   <Font ss:Bold="1" ss:Color="#FFFFFF" ss:Size="11" ss:FontName="Segoe UI"/>
   <Interior ss:Color="#800020" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#800020"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#4a0013"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#4a0013"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#4a0013"/>
   </Borders>
  </Style>
  <Style ss:ID="TitleBanner">
   <Font ss:Bold="1" ss:Color="#800020" ss:Size="14" ss:FontName="Segoe UI"/>
   <Interior ss:Color="#161616" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="SubBanner">
   <Font ss:Italic="1" ss:Color="#94A3B8" ss:Size="9" ss:FontName="Segoe UI"/>
   <Interior ss:Color="#161616" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="Data">
   <Font ss:Size="10" ss:FontName="Segoe UI" ss:Color="#0F172A"/>
   <Alignment ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>
  <Style ss:ID="DataCenter">
   <Font ss:Size="10" ss:FontName="Segoe UI" ss:Color="#0F172A"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>
  <Style ss:ID="DataPrice">
   <Font ss:Size="10" ss:FontName="Segoe UI" ss:Color="#0F172A"/>
   <NumberFormat ss:Format="&quot;$&quot;#,##0.00"/>
   <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>
 </Styles>
 <Worksheet ss:Name="Bookmarks">
  <Table>
   <Column ss:Width="35"/>
   <Column ss:Width="220"/>
   <Column ss:Width="110"/>
   <Column ss:Width="100"/>
   <Column ss:Width="150"/>
   <Column ss:Width="85"/>
   <Column ss:Width="110"/>
   <Column ss:Width="100"/>
   <Column ss:Width="260"/>

   <!-- Title Row -->
   <Row ss:Height="26">
    <Cell ss:MergeAcross="8" ss:StyleID="TitleBanner">
     <Data ss:Type="String"> FandomVerse Portal - Bookmarked Favorites</Data>
    </Cell>
   </Row>
   <Row ss:Height="18">
    <Cell ss:MergeAcross="8" ss:StyleID="SubBanner">
     <Data ss:Type="String"> Exported on: ${escapeXml(exportDate)} • Total Saved Items: ${bookmarks.length}</Data>
    </Cell>
   </Row>

   <!-- Column Headers -->
   <Row ss:Height="26">
    <Cell ss:StyleID="Header"><Data ss:Type="String">#</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Title / Item Name</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Category</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Type</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Franchise / Realm</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Price</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Event Date</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Saved On</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Personal Session Note</Data></Cell>
   </Row>
`;

  bookmarks.forEach((item, idx) => {
    const title = escapeXml(item.title || item.name || 'Untitled');
    const category = escapeXml(item.category ? item.category.toUpperCase() : 'GENERAL');
    const type = escapeXml(item.type || 'Bookmark');
    const franchise = escapeXml(item.franchise || item.universe || 'N/A');
    const priceVal = (item.price !== undefined && item.price !== null) ? Number(item.price) : null;
    const dateVal = escapeXml(item.date || 'N/A');
    const savedOn = escapeXml(item.bookmarkedAt ? new Date(item.bookmarkedAt).toLocaleDateString() : 'Recent');
    const note = escapeXml(sessionNotes[item.id] || '');

    xml += `   <Row ss:Height="20">
    <Cell ss:StyleID="DataCenter"><Data ss:Type="Number">${idx + 1}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${title}</Data></Cell>
    <Cell ss:StyleID="DataCenter"><Data ss:Type="String">${category}</Data></Cell>
    <Cell ss:StyleID="DataCenter"><Data ss:Type="String">${type}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${franchise}</Data></Cell>
`;
    if (priceVal !== null && !isNaN(priceVal)) {
      xml += `    <Cell ss:StyleID="DataPrice"><Data ss:Type="Number">${priceVal.toFixed(2)}</Data></Cell>\n`;
    } else {
      xml += `    <Cell ss:StyleID="DataCenter"><Data ss:Type="String">-</Data></Cell>\n`;
    }

    xml += `    <Cell ss:StyleID="DataCenter"><Data ss:Type="String">${dateVal}</Data></Cell>
    <Cell ss:StyleID="DataCenter"><Data ss:Type="String">${savedOn}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${note || 'None'}</Data></Cell>
   </Row>\n`;
  });

  xml += `  </Table>
 </Worksheet>
</Workbook>`;

  triggerDownload(xml, "application/vnd.ms-excel;charset=utf-8", `fandomverse_bookmarks_${Date.now()}.xls`);
}

/**
 * Internal helper to trigger browser download
 */
function triggerDownload(content, mimeType, filename) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
