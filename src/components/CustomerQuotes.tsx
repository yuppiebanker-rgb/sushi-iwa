import { useState, useEffect } from 'react';
import { FEATURED_REVIEWS, GOOGLE_RATING } from '../data/reviews';
import GoogleRating from './GoogleRating';
import './CustomerQuotes.css';

export default function CustomerQuotes() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % FEATURED_REVIEWS.length);
        setAnimating(false);
      }, 350);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const review = FEATURED_REVIEWS[current];

  return (
    <section className="cq">
      <div className="cq-label">
        <span className="cq-line" />
        Lo que dicen nuestros comensales
        <span className="cq-line" />
      </div>

      <div className={`cq-quote ${animating ? 'cq-quote--out' : ''}`}>
        <blockquote className="cq-text">"{review.text}"</blockquote>
        <cite className="cq-cite">— {review.author} · {review.date}</cite>
      </div>

      <div className="cq-dots">
        {FEATURED_REVIEWS.map((_, i) => (
          <button
            key={i}
            className={`cq-dot ${i === current ? 'cq-dot--active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Reseña ${i + 1}`}
          />
        ))}
      </div>

      <div className="cq-rating">
        <a href="https://g.page/sushi-iwa" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <GoogleRating score={GOOGLE_RATING.score} count={GOOGLE_RATING.count} size="lg" />
        </a>
      </div>
    </section>
  );
}
