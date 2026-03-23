import { useState, useMemo } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { MENU_ITEMS, CATEGORIES, CATEGORY_ORDER, type MenuCategory } from '../data/menu';
import SEO from '../components/SEO';
import './Gallery.css';

interface GalleryImage {
  src: string;
  label: string;
  category: string;
}

// Build gallery from menu data — unique images only
function buildGallery(): Map<MenuCategory, GalleryImage[]> {
  const seen = new Set<string>();
  const map = new Map<MenuCategory, GalleryImage[]>();

  for (const cat of CATEGORY_ORDER) {
    const items = MENU_ITEMS.filter(i => i.category === cat);
    const images: GalleryImage[] = [];
    for (const item of items) {
      if (!seen.has(item.image)) {
        seen.add(item.image);
        images.push({ src: `/images/${item.image}`, label: item.name, category: cat });
      }
    }
    if (images.length > 0) map.set(cat, images);
  }

  // Add extra images not in menu
  const extraImages = [
    { file: 'chef-plating.jpg', label: 'Chef plating', cat: 'entradas' as MenuCategory },
    { file: 'chef-rolling.jpg', label: 'Chef rolling', cat: 'entradas' as MenuCategory },
    { file: 'chef-arranging.jpg', label: 'Chef arranging', cat: 'entradas' as MenuCategory },
    { file: 'interior.jpg', label: 'Interior', cat: 'entradas' as MenuCategory },
    { file: 'iwa-roll2.jpg', label: 'IWA Roll alt', cat: 'rollos-gf' as MenuCategory },
    { file: 'iwa-roll3.jpg', label: 'IWA Roll platter', cat: 'rollos-gf' as MenuCategory },
    { file: 'fermedina2.jpg', label: "Fermedina's Roll alt", cat: 'rollos-gf' as MenuCategory },
  ];
  for (const ex of extraImages) {
    if (!seen.has(ex.file)) {
      seen.add(ex.file);
      const arr = map.get(ex.cat) || [];
      arr.push({ src: `/images/${ex.file}`, label: ex.label, category: ex.cat });
      map.set(ex.cat, arr);
    }
  }

  return map;
}

export default function Gallery() {
  const gallery = useMemo(buildGallery, []);
  const allImages = useMemo(() => Array.from(gallery.values()).flat(), [gallery]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const openAt = (src: string) => {
    const idx = allImages.findIndex(i => i.src === src);
    setLightboxIndex(idx);
  };

  return (
    <div className="gal-page">
      <SEO
        title="Galería — Sushi IWA | Fotos de nuestros platillos"
        description="Explora las fotos de Sushi IWA: rolls, sashimi, curricanes, y la experiencia del chef."
        path="/galeria"
      />

      <div className="gal-hero">
        <div className="gal-hero-bg" style={{ backgroundImage: `url(/images/chef-rolling.jpg)` }} />
        <div className="gal-hero-ov" />
        <div className="gal-hero-c">
          <div className="gal-hero-tag">Galería fotográfica</div>
          <h1 className="gal-hero-h">La <em>experiencia</em> visual</h1>
        </div>
      </div>

      <div className="gal-body">
        {CATEGORY_ORDER.map(cat => {
          const images = gallery.get(cat);
          if (!images || images.length === 0) return null;
          const meta = CATEGORIES[cat];
          return (
            <section key={cat} className="gal-section">
              <div className="gal-sh">
                <span className="gal-jp">{meta.jp}</span>
                <span className="gal-label">{meta.label}</span>
              </div>
              <div className="gal-grid">
                {images.map(img => (
                  <div className="gal-cell" key={img.src} onClick={() => openAt(img.src)}>
                    <img src={img.src} alt={img.label} loading="lazy" />
                    <div className="gal-overlay">
                      <span>{img.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={allImages.map(i => ({ src: i.src, alt: i.label }))}
      />
    </div>
  );
}
