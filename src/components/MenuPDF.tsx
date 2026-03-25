import { useRef } from 'react';
import { MENU_ITEMS, CATEGORIES, CATEGORY_ORDER, DRINKS, type MenuCategory, type DrinkSection, type DrinkGroup } from '../data/menu';
import { track } from '../lib/analytics';

export default function MenuPDF() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generatePDF = () => {
    track('menu_pdf_downloaded');
    const iframe = iframeRef.current;
    if (!iframe) return;

    const categorySections = CATEGORY_ORDER.map((cat: MenuCategory) => {
      const meta = CATEGORIES[cat];
      const items = MENU_ITEMS.filter(i => i.category === cat);
      if (!items.length) return '';
      return `
  <div class="category">
    <div class="category-header">
      <span class="category-jp">${meta.jp}</span>
      <span class="category-name">${meta.label}</span>
      <div class="category-line"></div>
    </div>
    ${items.map(item => `
    <div class="item">
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ''}
        <div class="item-badges">
          ${item.isGlutenFree ? '<span class="badge">GF</span>' : ''}
          ${item.isSeasonal ? '<span class="badge">Temporada</span>' : ''}
          ${item.isSignature ? '<span class="badge">Firma</span>' : ''}
          ${item.isChefPick ? '<span class="badge">Chef</span>' : ''}
        </div>
      </div>
      <div class="item-price">${item.price}</div>
    </div>`).join('')}
  </div>`;
    }).join('');

    const drinkSections = DRINKS.map((section: DrinkSection) => `
  <div class="category">
    <div class="category-header">
      <span class="category-jp">${section.jp}</span>
      <span class="category-name">${section.title}</span>
      <div class="category-line"></div>
    </div>
    ${section.cols.flat().map((group: DrinkGroup) => `
    <div class="drink-group">
      <div class="drink-group-label">${group.label}</div>
      ${group.items.map(d => `
      <div class="item">
        <div class="item-info">
          <div class="item-name">${d.name}</div>
          ${d.sub ? `<div class="item-desc">${d.sub}</div>` : ''}
        </div>
        <div class="item-price">${d.price}</div>
      </div>`).join('')}
    </div>`).join('')}
  </div>`).join('');

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Menú · Sushi IWA</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #0c0b09;
    color: #f4efe6;
    font-family: 'DM Sans', sans-serif;
    font-size: 10pt;
    line-height: 1.5;
  }
  @page {
    size: A4;
    margin: 18mm 16mm;
  }

  /* COVER PAGE */
  .cover {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    page-break-after: always;
    border: 0.5pt solid rgba(184,146,42,0.3);
    padding: 40pt;
  }
  .cover-jp { font-size: 48pt; color: #b8922a; font-family: 'Cormorant Garamond', serif; font-weight: 300; margin-bottom: 8pt; }
  .cover-name { font-size: 22pt; letter-spacing: 0.3em; color: #f4efe6; font-family: 'Cormorant Garamond', serif; font-weight: 300; margin-bottom: 6pt; }
  .cover-sub { font-size: 8pt; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(184,146,42,0.6); margin-bottom: 24pt; }
  .cover-line { width: 40pt; height: 0.5pt; background: #b8922a; margin: 16pt auto; }
  .cover-location { font-size: 9pt; color: rgba(244,239,230,0.4); }
  .cover-url { font-size: 9pt; color: #b8922a; margin-top: 4pt; }

  /* CATEGORY */
  .category { page-break-inside: avoid; margin-bottom: 24pt; }
  .category-header {
    display: flex; align-items: center; gap: 12pt;
    margin-bottom: 10pt;
    padding-bottom: 4pt;
    border-bottom: 0.5pt solid rgba(184,146,42,0.2);
  }
  .category-jp {
    font-size: 11pt; color: rgba(184,146,42,0.4);
    margin-right: 4pt;
  }
  .category-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15pt; font-style: italic; font-weight: 300;
    color: #f4efe6;
  }
  .category-line { flex: 1; height: 0.5pt; background: rgba(184,146,42,0.15); }

  /* ITEM */
  .item {
    display: flex; justify-content: space-between;
    align-items: baseline;
    padding: 5pt 0;
    border-bottom: 0.3pt solid rgba(184,146,42,0.06);
  }
  .item-info { flex: 1; }
  .item-name { font-family: 'Cormorant Garamond', serif; font-size: 11pt; color: #f4efe6; }
  .item-desc { font-size: 8pt; color: rgba(244,239,230,0.4); margin-top: 1pt; }
  .item-badges { display: flex; gap: 4pt; margin-top: 2pt; }
  .badge { font-size: 6pt; letter-spacing: 0.15em; text-transform: uppercase; color: #b8922a; border: 0.3pt solid rgba(184,146,42,0.4); padding: 1pt 4pt; }
  .item-price { font-family: 'Cormorant Garamond', serif; font-size: 12pt; color: #b8922a; margin-left: 16pt; white-space: nowrap; }

  /* DRINK GROUP */
  .drink-group { margin-bottom: 12pt; }
  .drink-group-label {
    font-size: 9pt; letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(184,146,42,0.5); margin-bottom: 4pt;
  }

  /* FOOTER */
  .footer { margin-top: 24pt; padding-top: 10pt; border-top: 0.5pt solid rgba(184,146,42,0.15); text-align: center; font-size: 7pt; color: rgba(244,239,230,0.3); }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<!-- COVER -->
<div class="cover">
  <div class="cover-jp">いわ</div>
  <div class="cover-name">SUSHI IWA</div>
  <div class="cover-sub">Cocina Japonesa · San Pedro, Monterrey</div>
  <div class="cover-line"></div>
  <div class="cover-location">Av. Fundadores 955, Sienna Tower 2° piso · San Pedro Garza García, N.L.</div>
  <div class="cover-location">L/Mi/J/V/S/D · 1:45pm – 10:30pm · Cerramos los martes</div>
  <div class="cover-url">sushi-iwa.com · +52 81 1123 9849</div>
</div>
<!-- MENU -->
${categorySections}
<!-- DRINKS -->
${drinkSections}
<!-- FOOTER -->
<div class="footer">
  Precios en pesos mexicanos (MXN) · IVA incluido · Menú sujeto a cambios sin previo aviso<br/>
  © ${new Date().getFullYear()} Sushi IWA · sushi-iwa.com
</div>
</body>
</html>`;

    iframe.contentDocument!.open();
    iframe.contentDocument!.write(html);
    iframe.contentDocument!.close();
    setTimeout(() => iframe.contentWindow!.print(), 500);
  };

  return (
    <>
      <button
        className="pdf-btn"
        onClick={generatePDF}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(184,146,42,0.08)',
          border: '0.5px solid rgba(184,146,42,0.25)',
          color: '#b8922a', padding: '10px 18px',
          cursor: 'pointer', fontSize: '10px',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          fontFamily: '"DM Sans"', transition: 'all 0.2s',
          minHeight: '44px',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(184,146,42,0.15)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(184,146,42,0.08)')}
      >
        ↓ Descargar Menú PDF
      </button>
      <iframe ref={iframeRef} style={{ display: 'none' }} title="menu-pdf" />
    </>
  );
}
