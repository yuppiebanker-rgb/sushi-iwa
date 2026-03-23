import { useState } from 'react';
import SEO from '../components/SEO';

const WHATSAPP = '528111239849';

interface CardOption {
  amount: number;
  label: string;
  popular?: boolean;
}

const CARDS: CardOption[] = [
  { amount: 500, label: 'Una cena íntima' },
  { amount: 1000, label: 'La experiencia completa', popular: true },
  { amount: 2000, label: 'Una noche inolvidable' },
];

export default function GiftCards() {
  const [selected, setSelected] = useState<number | null>(null);
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected === null) return;
    const msg = encodeURIComponent(
      `Hola IWA! Quiero una gift card:\nMonto: $${selected.toLocaleString()} MXN\nDe: ${sender}\nPara: ${recipient}\nMensaje: ${message}\n¿Cómo procedo con el pago?`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  };

  return (
    <>
      <SEO
        title="Gift Cards — Sushi IWA"
        description="Regala una experiencia gastronómica japonesa. Gift cards digitales de Sushi IWA desde $500 MXN."
        path="/gift-cards"
      />

      <style>{giftCSS}</style>

      {/* A) HERO */}
      <section className="gc-hero">
        <div className="gc-hero-watermark">いわ</div>
        <div className="gc-hero-content">
          <div className="gc-eyebrow"><span className="gc-eyebrow-line" /><span>Gift Cards</span></div>
          <h1 className="gc-hero-title">El regalo perfecto · <em>いわ</em></h1>
          <p className="gc-hero-sub">Una experiencia gastronómica japonesa para quien más quieres.</p>
        </div>
      </section>

      {/* B) CARD SELECTOR */}
      <section className="gc-section">
        <h2 className="gc-heading">Elige tu Gift Card</h2>
        <div className="gc-cards">
          {CARDS.map(c => (
            <button
              key={c.amount}
              className={`gc-card ${selected === c.amount ? 'gc-card--active' : ''}`}
              onClick={() => setSelected(c.amount)}
              type="button"
            >
              {c.popular && <span className="gc-popular">Más Popular</span>}
              <div className="gc-card-inner">
                <div className="gc-card-watermark">いわ</div>
                <div className="gc-card-amount">${c.amount.toLocaleString()}</div>
                <div className="gc-card-currency">MXN</div>
              </div>
              <p className="gc-card-label">{c.label}</p>
              <span className="gc-card-btn">Seleccionar</span>
            </button>
          ))}
        </div>
      </section>

      {/* C) PERSONALIZATION FORM */}
      {selected !== null && (
        <section className="gc-section gc-form-section">
          <div className="gc-form-card">
            <h2 className="gc-heading">Personaliza tu regalo</h2>

            {/* Preview card */}
            <div className="gc-preview">
              <div className="gc-preview-watermark">いわ</div>
              <div className="gc-preview-brand">SUSHI IWA</div>
              <div className="gc-preview-amount">${selected.toLocaleString()}</div>
              <div className="gc-preview-currency">MXN</div>
              {recipient && <div className="gc-preview-to">Para: {recipient}</div>}
              {message && <div className="gc-preview-msg">"{message}"</div>}
            </div>

            <form onSubmit={handleSubmit} className="gc-form">
              <label>
                <span>De</span>
                <input type="text" value={sender} onChange={e => setSender(e.target.value)} placeholder="Tu nombre" required />
              </label>
              <label>
                <span>Para</span>
                <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Nombre del destinatario" required />
              </label>
              <label>
                <span>Mensaje personal</span>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Escribe un mensaje especial..."
                  maxLength={150}
                  rows={3}
                />
                <span className="gc-charcount">{message.length}/150</span>
              </label>
              <label>
                <span>Fecha de entrega</span>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </label>
              <label>
                <span>Email del destinatario <em>(opcional)</em></span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@ejemplo.com" />
              </label>
              <button type="submit" className="gc-submit">Solicitar Gift Card →</button>
            </form>
          </div>
        </section>
      )}

      {/* D) HOW IT WORKS */}
      <section className="gc-section">
        <h2 className="gc-heading">¿Cómo funciona?</h2>
        <div className="gc-steps">
          {[
            { num: '01', title: 'Elige monto y personaliza', desc: 'Selecciona la denominación ideal y agrega un mensaje personal.' },
            { num: '02', title: 'Generamos un código único', desc: 'Creamos tu gift card con un código exclusivo de canje.' },
            { num: '03', title: 'Envío por WhatsApp', desc: 'Recibe la gift card digital lista para compartir.' },
            { num: '04', title: 'Redime en cualquier IWA', desc: 'Presenta el código en cualquier sucursal de Sushi IWA.' },
          ].map(s => (
            <div className="gc-step" key={s.num}>
              <span className="gc-step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* F) NOTE */}
      <section className="gc-section gc-note-section">
        <div className="gc-note">
          <p>Actualmente procesamos pedidos vía WhatsApp.</p>
          <p className="gc-note-soon">Próximamente: pago en línea disponible.</p>
        </div>
      </section>
    </>
  );
}

const giftCSS = `
.gc-hero {
  position: relative;
  min-height: 55vh;
  display: flex; align-items: center; justify-content: center;
  text-align: center;
  padding: 120px 24px 80px;
  overflow: hidden;
  background: var(--ink);
}
.gc-hero-watermark {
  position: absolute;
  font-family: var(--font-jp); font-size: min(30vw, 320px); font-weight: 200;
  color: rgba(184,146,42,0.04); pointer-events: none; user-select: none;
}
.gc-hero-content { position: relative; z-index: 1; max-width: 640px; }
.gc-eyebrow {
  display: flex; align-items: center; justify-content: center; gap: 14px;
  margin-bottom: 24px;
  font-size: 9.5px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold);
}
.gc-eyebrow-line { width: 36px; height: 0.5px; background: var(--gold); }
.gc-hero-title {
  font-family: var(--font-d); font-size: clamp(34px, 6.5vw, 66px); font-weight: 300;
  color: var(--cream); line-height: 1.1; margin-bottom: 18px;
}
.gc-hero-title em {
  font-style: normal; font-family: var(--font-jp); font-weight: 200;
  color: var(--gold-light);
}
.gc-hero-sub {
  font-size: 15px; line-height: 1.7; color: rgba(244,239,230,0.5); max-width: 460px; margin: 0 auto;
}
.gc-section {
  padding: 80px 24px;
  max-width: 1040px; margin: 0 auto;
}
.gc-heading {
  font-family: var(--font-d); font-size: clamp(26px, 4vw, 42px); font-weight: 300;
  color: var(--cream); text-align: center; margin-bottom: 44px;
}
.gc-cards {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px; max-width: 900px; margin: 0 auto;
}
.gc-card {
  position: relative;
  background: var(--warm); border: 1px solid var(--border); border-radius: 16px;
  padding: 0; text-align: center; cursor: pointer;
  transition: border-color 0.3s, transform 0.2s;
  display: flex; flex-direction: column; overflow: hidden;
  font-family: var(--font-b); color: var(--cream);
}
.gc-card:hover { border-color: rgba(184,146,42,0.4); transform: translateY(-2px); }
.gc-card--active { border-color: var(--gold); box-shadow: 0 0 24px rgba(184,146,42,0.12); }
.gc-popular {
  position: absolute; top: 14px; right: 14px; z-index: 2;
  background: var(--gold); color: var(--ink);
  font-size: 9px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
  padding: 5px 10px; border-radius: 4px;
}
.gc-card-inner {
  position: relative; overflow: hidden;
  aspect-ratio: 1.586; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  background: linear-gradient(145deg, rgba(184,146,42,0.08) 0%, var(--warm) 100%);
  border-bottom: 0.5px solid var(--border);
}
.gc-card-watermark {
  position: absolute;
  font-family: var(--font-jp); font-size: 120px; font-weight: 200;
  color: rgba(184,146,42,0.05); pointer-events: none;
}
.gc-card-amount {
  font-family: var(--font-d); font-size: 52px; font-weight: 300;
  color: var(--gold); position: relative;
}
.gc-card-currency {
  font-size: 12px; letter-spacing: 0.3em; color: rgba(184,146,42,0.5);
  margin-top: 4px; position: relative;
}
.gc-card-label {
  padding: 18px 20px 12px; font-size: 14px; color: rgba(244,239,230,0.55);
}
.gc-card-btn {
  display: block; padding: 14px; font-size: 12px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--gold); border-top: 0.5px solid var(--border);
}
.gc-card--active .gc-card-btn { background: var(--gold); color: var(--ink); }
.gc-form-section { display: flex; justify-content: center; }
.gc-form-card {
  background: var(--warm); border: 0.5px solid var(--border); border-radius: 16px;
  padding: 48px 40px; width: 100%; max-width: 520px;
}
.gc-form-card .gc-heading { margin-bottom: 28px; }
.gc-form { display: flex; flex-direction: column; gap: 20px; }
.gc-form label { display: flex; flex-direction: column; gap: 6px; position: relative; }
.gc-form label > span {
  font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
}
.gc-form label > span em { font-style: normal; color: rgba(244,239,230,0.3); text-transform: none; letter-spacing: 0; font-size: 10px; }
.gc-form input, .gc-form textarea {
  background: rgba(244,239,230,0.04); border: 0.5px solid var(--border); border-radius: 8px;
  padding: 14px 16px; font-family: var(--font-b); font-size: 15px; color: var(--cream);
  outline: none; transition: border-color 0.2s; resize: none;
}
.gc-form input:focus, .gc-form textarea:focus { border-color: var(--gold); }
.gc-charcount {
  position: absolute; bottom: 10px; right: 12px;
  font-size: 10px; color: rgba(244,239,230,0.25); letter-spacing: 0; text-transform: none;
}
.gc-submit {
  margin-top: 8px; padding: 16px; background: var(--gold); color: var(--ink);
  border: none; border-radius: 8px; font-size: 14px; font-weight: 500;
  letter-spacing: 0.08em; cursor: pointer; transition: background 0.2s;
}
.gc-submit:hover { background: var(--gold-light); }
.gc-preview {
  position: relative; overflow: hidden;
  aspect-ratio: 1.586; border-radius: 12px;
  border: 1px solid var(--gold);
  background: linear-gradient(160deg, rgba(184,146,42,0.1) 0%, var(--ink) 60%);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  margin-bottom: 32px; padding: 24px;
}
.gc-preview-watermark {
  position: absolute; font-family: var(--font-jp); font-size: 140px; font-weight: 200;
  color: rgba(184,146,42,0.06); pointer-events: none;
}
.gc-preview-brand {
  font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
  color: rgba(244,239,230,0.3); margin-bottom: 12px; position: relative;
}
.gc-preview-amount {
  font-family: var(--font-d); font-size: 56px; font-weight: 300;
  color: var(--gold); position: relative;
}
.gc-preview-currency {
  font-size: 11px; letter-spacing: 0.3em; color: rgba(184,146,42,0.5);
  margin-top: 4px; position: relative;
}
.gc-preview-to {
  margin-top: 16px; font-size: 13px; color: rgba(244,239,230,0.4); position: relative;
}
.gc-preview-msg {
  margin-top: 6px; font-family: var(--font-d); font-style: italic; font-size: 14px;
  color: rgba(244,239,230,0.3); position: relative; max-width: 260px; text-align: center;
}
.gc-steps {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;
}
.gc-step {
  text-align: center; padding: 28px 20px;
  background: var(--warm); border: 0.5px solid var(--border); border-radius: 12px;
}
.gc-step-num {
  display: block; font-family: var(--font-d); font-size: 28px; font-weight: 300;
  color: var(--gold); margin-bottom: 10px;
}
.gc-step h3 {
  font-family: var(--font-d); font-size: 18px; font-weight: 400;
  color: var(--cream); margin-bottom: 8px;
}
.gc-step p { font-size: 13px; line-height: 1.7; color: rgba(244,239,230,0.45); }
.gc-note-section { text-align: center; }
.gc-note {
  background: var(--warm); border: 0.5px solid var(--border); border-radius: 12px;
  padding: 32px; max-width: 480px; margin: 0 auto;
}
.gc-note p { font-size: 14px; color: rgba(244,239,230,0.5); line-height: 1.7; }
.gc-note-soon { color: var(--gold); margin-top: 6px; }
@media (max-width: 600px) {
  .gc-form-card { padding: 36px 24px; }
  .gc-preview { aspect-ratio: auto; min-height: 200px; }
}
`;
