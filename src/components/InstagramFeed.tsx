// TODO: Replace with live Instagram Basic Display API feed once OAuth credentials are obtained from the client
import { useTranslation } from 'react-i18next';
import './InstagramFeed.css';

const CURATED = [
  'curricanes-spoons.jpg', 'hamachi-jalap.jpg', 'iwa-roll.jpg',
  'no-name.jpg', 'fermedina.jpg', 'chef-plating.jpg',
  'temaki-hold.jpg', 'rainbow-roll.jpg', 'mochis.jpg',
];

const IG_URL = 'https://instagram.com/sushi.iwa';

export default function InstagramFeed() {
  const { t } = useTranslation();
  return (
    <section className="ig-feed">
      <div className="ig-header">
        <div className="ig-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <div>
          <div className="ig-title">{t('ig.title')}</div>
          <div className="ig-sub">{t('ig.sub')}</div>
        </div>
      </div>

      <div className="ig-grid">
        {CURATED.map(file => (
          <a key={file} className="ig-cell" href={IG_URL} target="_blank" rel="noopener noreferrer">
            <img src={`/images/${file}`} alt="@sushi.iwa" loading="lazy" />
            <div className="ig-overlay">
              <span>@sushi.iwa</span>
            </div>
          </a>
        ))}
      </div>

      <div className="ig-cta-wrap">
        <a className="ig-cta" href={IG_URL} target="_blank" rel="noopener noreferrer">
          {t('ig.cta')}
        </a>
      </div>
    </section>
  );
}
