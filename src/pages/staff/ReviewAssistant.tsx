import { useState } from 'react';
import './staff.css';

interface Review {
  id: number;
  stars: number;
  text: string;
  platform: string;
  response?: string;
  loading?: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  { id: 1, stars: 5, text: 'Los curricanes de salmón son lo mejor que he comido en Monterrey. El chef Pedro explica cada platillo. 100% recomendado.', platform: 'Google' },
  { id: 2, stars: 4, text: 'Excelente sushi, un poco caro pero vale la pena. El No Name Roll es increíble.', platform: 'Google' },
  { id: 3, stars: 3, text: 'La comida muy buena pero el servicio fue lento. Esperamos 40 min para que nos atendieran.', platform: 'TripAdvisor' },
  { id: 4, stars: 5, text: 'Hidden gem en San Pedro. El ambiente es íntimo y el pescado fresco. Ya quiero regresar.', platform: 'Google' },
  { id: 5, stars: 2, text: 'Los precios son altos para lo que sirven. El rollo IWA no me convenció.', platform: 'TripAdvisor' },
];

function generateResponse(review: Review): string {
  // Client-side generated responses (Claude API would be used in production)
  if (review.stars >= 4) {
    return `¡Muchas gracias por tu visita y por tus palabras! Nos alegra muchísimo que hayas disfrutado tu experiencia en IWA. ${review.stars === 5 ? 'Tu reseña nos motiva a seguir mejorando cada día.' : 'Seguimos trabajando para ofrecerte lo mejor.'} Te esperamos pronto de vuelta.\n\nEquipo IWA いわ`;
  } else if (review.stars === 3) {
    return `Agradecemos tu visita y tu retroalimentación honesta. Nos disculpamos sinceramente por los tiempos de espera — no es el estándar que buscamos. Ya estamos tomando medidas para mejorar nuestro servicio. Nos encantaría que nos dieras otra oportunidad.\n\nEquipo IWA いわ`;
  } else {
    return `Lamentamos mucho que tu experiencia no haya cumplido tus expectativas. Tu opinión es muy importante para nosotros y la tomamos muy en serio. Nos gustaría invitarte a regresar para demostrar que podemos hacerlo mejor. Por favor contáctanos directamente al +52 81 1123 9849.\n\nEquipo IWA いわ`;
  }
}

export default function ReviewAssistant() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const generate = (id: number) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, loading: true } : r));
    // Simulate API delay
    setTimeout(() => {
      setReviews(prev => prev.map(r => r.id === id ? { ...r, loading: false, response: generateResponse(r) } : r));
    }, 800);
  };

  const updateResponse = (id: number, text: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, response: text } : r));
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <div className="sp-header">
        <div>
          <div className="sp-subtitle">Reseñas</div>
          <h1 className="sp-title">Asistente de Reseñas</h1>
        </div>
      </div>
      <p style={{ fontSize: 11, color: 'var(--mist)', marginBottom: 24 }}>
        Genera respuestas profesionales para las reseñas de Google y TripAdvisor.
      </p>

      {reviews.map(review => (
        <div className="sp-card" key={review.id} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ color: 'var(--gold)', fontSize: 16, letterSpacing: 2 }}>
              {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
            </div>
            <span className="sp-badge sp-badge--gray">{review.platform}</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--cream)', lineHeight: 1.65, marginBottom: 12 }}>"{review.text}"</p>

          {!review.response && !review.loading && (
            <button className="sp-btn sp-btn--gold" onClick={() => generate(review.id)}>Generar respuesta</button>
          )}
          {review.loading && <span style={{ fontSize: 11, color: 'var(--gold)' }}>Generando respuesta...</span>}

          {review.response && (
            <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: 12, marginTop: 8 }}>
              <div style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Respuesta sugerida</div>
              <textarea
                className="sp-textarea"
                value={review.response}
                onChange={e => updateResponse(review.id, e.target.value)}
                style={{ minHeight: 100 }}
              />
              <div className="sp-actions">
                <button className="sp-btn sp-btn--gold sp-btn--sm" onClick={() => copy(review.response!)}>Copiar respuesta</button>
                <button className="sp-btn sp-btn--sm" onClick={() => generate(review.id)}>Regenerar</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
