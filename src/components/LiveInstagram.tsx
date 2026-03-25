import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

const STATIC_POSTS: Post[] = [
  { id: '1', media_type: 'IMAGE', media_url: '/images/curricanes-spoons.jpg', permalink: 'https://instagram.com/sushi.iwa', caption: 'Curricanes de salmón', timestamp: new Date().toISOString() },
  { id: '2', media_type: 'IMAGE', media_url: '/images/hamachi-jalap.jpg', permalink: 'https://instagram.com/sushi.iwa', caption: 'Hamachi Jalapeño', timestamp: new Date().toISOString() },
  { id: '3', media_type: 'IMAGE', media_url: '/images/chef-plating.jpg', permalink: 'https://instagram.com/sushi.iwa', caption: 'En la barra', timestamp: new Date().toISOString() },
  { id: '4', media_type: 'IMAGE', media_url: '/images/iwa-roll.jpg', permalink: 'https://instagram.com/sushi.iwa', caption: 'IWA Roll', timestamp: new Date().toISOString() },
  { id: '5', media_type: 'IMAGE', media_url: '/images/fermedina.jpg', permalink: 'https://instagram.com/sushi.iwa', caption: 'La barra IWA', timestamp: new Date().toISOString() },
  { id: '6', media_type: 'IMAGE', media_url: '/images/no-name.jpg', permalink: 'https://instagram.com/sushi.iwa', caption: 'No Name Roll', timestamp: new Date().toISOString() },
  { id: '7', media_type: 'IMAGE', media_url: '/images/temaki-hold.jpg', permalink: 'https://instagram.com/sushi.iwa', caption: 'Temaki', timestamp: new Date().toISOString() },
  { id: '8', media_type: 'IMAGE', media_url: '/images/rainbow-roll.jpg', permalink: 'https://instagram.com/sushi.iwa', caption: 'Rainbow Roll', timestamp: new Date().toISOString() },
  { id: '9', media_type: 'IMAGE', media_url: '/images/mochis.jpg', permalink: 'https://instagram.com/sushi.iwa', caption: 'Mochis', timestamp: new Date().toISOString() },
];

export default function LiveInstagram() {
  const [posts, setPosts] = useState<Post[]>(STATIC_POSTS);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.functions.invoke('instagram-feed')
      .then(({ data }) => {
        if (data?.data?.length) {
          setPosts(data.data.slice(0, 9));
          setLive(true);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section style={{ padding: 'clamp(48px,6vw,80px) 0' }}>
      <div style={{
        textAlign: 'center',
        padding: '0 clamp(20px,5vw,52px)',
        marginBottom: '28px',
      }}>
        <a
          href="https://instagram.com/sushi.iwa"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            textDecoration: 'none',
          }}
        >
          <span style={{
            fontSize: '9px', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#b8922a',
          }}>@sushi.iwa</span>
          {live && (
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#22c55e', display: 'inline-block',
              animation: 'blink 1.5s ease-in-out infinite',
            }}/>
          )}
        </a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2px',
      }}>
        {posts.slice(0, 9).map(post => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', position: 'relative', aspectRatio: '1', overflow: 'hidden' }}
          >
            <img
              src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
              alt={post.caption?.slice(0, 60) || 'Sushi IWA Instagram'}
              loading="lazy"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.78) saturate(0.85)',
                transition: 'filter 0.4s ease, transform 0.5s ease',
              }}
              onMouseEnter={e => {
                const t = e.target as HTMLImageElement;
                t.style.filter = 'brightness(0.95) saturate(1)';
                t.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                const t = e.target as HTMLImageElement;
                t.style.filter = 'brightness(0.78) saturate(0.85)';
                t.style.transform = 'scale(1)';
              }}
            />
            {post.media_type === 'VIDEO' && (
              <div style={{
                position: 'absolute', top: '8px', right: '8px',
                color: 'rgba(244,239,230,0.8)', fontSize: '12px',
              }}>▶</div>
            )}
          </a>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a
          href="https://instagram.com/sushi.iwa"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: '"DM Sans"', fontSize: '10px',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: '#b8922a', textDecoration: 'none',
            borderBottom: '0.5px solid rgba(184,146,42,0.35)',
            paddingBottom: '3px',
          }}
        >Seguir en Instagram →</a>
      </div>
    </section>
  );
}
