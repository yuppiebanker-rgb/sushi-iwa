import { useState } from 'react';
import SEO from '../components/SEO';

const WHATSAPP = '528111239849';
const STAMPS_TOTAL = 10;

export default function Loyalty() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = phone.startsWith('+') ? phone : `+52${phone.replace(/\D/g, '')}`;
    const msg = encodeURIComponent(
      `Hola IWA! Me gustaría unirme al Club de Leales.\nNombre: ${name}\nWhatsApp: ${fullPhone}\n¡Gracias!`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Club IWA — Programa de Lealtad · Sushi IWA"
        description="Únete al Club de Leales de Sushi IWA. 10 visitas = curricanes gratis. Sin app, solo tu número."
        path="/loyalty"
      />

      <style>{loyaltyCSS}</style>

      {/* A) HERO */}
      <section className="ly-hero">
        <div className="ly-hero-watermark">いわ</div>
        <div className="ly-hero-content">
          <div className="ly-eyebrow"><span className="ly-eyebrow-line" /><span>Programa de Lealtad</span></div>
          <h1 className="ly-hero-title">いわ · Club de Leales</h1>
          <p className="ly-hero-sub">Tu lealtad merece ser recompensada. Sin apps, sin complicaciones.</p>
        </div>
      </section>

      {/* B) HOW IT WORKS */}
      <section className="ly-section">
        <h2 className="ly-heading">¿Cómo funciona?</h2>
        <div className="ly-steps">
          {[
            { num: '01', title: 'Registra tu número', desc: 'Da tu número de WhatsApp en el restaurante o regístrate aquí.' },
            { num: '02', title: 'Acumula visitas', desc: 'Nuestro staff registra cada visita desde el portal interno.' },
            { num: '03', title: 'Redime tu regalo', desc: '10 visitas = una orden de curricanes gratis ($310 valor).' },
          ].map(s => (
            <div className="ly-step" key={s.num}>
              <span className="ly-step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* C) REGISTRATION FORM */}
      <section className="ly-section ly-form-section">
        <div className="ly-form-card">
          <h2 className="ly-heading">Únete al Club</h2>
          {submitted ? (
            <div className="ly-success">
              <span className="ly-success-icon">✦</span>
              <p>¡Te redirigimos a WhatsApp! Confirma tu registro con nuestro equipo.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ly-form">
              <label>
                <span>Nombre</span>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" required />
              </label>
              <label>
                <span>WhatsApp</span>
                <div className="ly-phone-row">
                  <span className="ly-prefix">+52</span>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="81 1234 5678" required />
                </div>
              </label>
              <button type="submit" className="ly-submit">Unirse al Club IWA</button>
            </form>
          )}
        </div>
      </section>

      {/* D) BENEFITS */}
      <section className="ly-section">
        <h2 className="ly-heading">Beneficios</h2>
        <div className="ly-benefits">
          {[
            { icon: '✦', title: '10 visitas = Curricanes gratis', desc: 'Una orden completa de nuestros icónicos curricanes ($310 valor).' },
            { icon: '◈', title: 'Acceso anticipado', desc: 'Sé el primero en probar nuestro menú de temporada.' },
            { icon: '◆', title: 'Eventos exclusivos', desc: 'Notificaciones de cenas privadas, degustaciones y lanzamientos.' },
          ].map(b => (
            <div className="ly-benefit" key={b.title}>
              <span className="ly-benefit-icon">{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* E) STAMP DISPLAY */}
      <section className="ly-section ly-stamps-section">
        <h2 className="ly-heading">Tu Tarjeta de Sellos</h2>
        <div className="ly-stamp-card">
          <div className="ly-stamp-card-brand">いわ</div>
          <div className="ly-stamps">
            {Array.from({ length: STAMPS_TOTAL }).map((_, i) => (
              <div className="ly-stamp ly-stamp--empty" key={i}>
                <span>{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="ly-stamp-msg">Visita IWA para comenzar a coleccionar sellos.</p>
        </div>
      </section>

      {/* F) FAQ */}
      <section className="ly-section ly-faq-section">
        <h2 className="ly-heading">Preguntas Frecuentes</h2>
        <div className="ly-faq">
          {[
            { q: '¿Caduca mi tarjeta de lealtad?', a: 'No. Tus visitas se acumulan sin fecha de caducidad.' },
            { q: '¿Puedo transferir mis visitas?', a: 'Las visitas están ligadas a tu número de WhatsApp y no son transferibles.' },
            { q: '¿En qué sucursales aplica?', a: 'El programa aplica en todas las sucursales de Sushi IWA.' },
            { q: '¿Cómo sé cuántas visitas tengo?', a: 'Pregunta a cualquier miembro de nuestro staff o envíanos un WhatsApp.' },
            { q: '¿Necesito descargar una app?', a: 'No. Todo funciona con tu número de WhatsApp, sin apps.' },
          ].map(f => (
            <details className="ly-faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

const loyaltyCSS = `
.ly-hero {
  position: relative;
  min-height: 60vh;
  display: flex; align-items: center; justify-content: center;
  text-align: center;
  padding: 120px 24px 80px;
  overflow: hidden;
  background: var(--ink);
}
.ly-hero-watermark {
  position: absolute;
  font-family: var(--font-jp); font-size: min(30vw, 320px); font-weight: 200;
  color: rgba(184,146,42,0.04); pointer-events: none; user-select: none;
}
.ly-hero-content { position: relative; z-index: 1; max-width: 640px; }
.ly-eyebrow {
  display: flex; align-items: center; justify-content: center; gap: 14px;
  margin-bottom: 24px;
  font-size: 9.5px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold);
}
.ly-eyebrow-line { width: 36px; height: 0.5px; background: var(--gold); }
.ly-hero-title {
  font-family: var(--font-d); font-size: clamp(36px, 7vw, 72px); font-weight: 300;
  color: var(--cream); line-height: 1.05; margin-bottom: 18px;
}
.ly-hero-sub {
  font-size: 15px; line-height: 1.7; color: rgba(244,239,230,0.5); max-width: 440px; margin: 0 auto;
}
.ly-section {
  padding: 80px 24px;
  max-width: 960px; margin: 0 auto;
}
.ly-heading {
  font-family: var(--font-d); font-size: clamp(28px, 4vw, 44px); font-weight: 300;
  color: var(--cream); text-align: center; margin-bottom: 48px;
}
.ly-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 32px; }
.ly-step {
  background: var(--warm); border: 0.5px solid var(--border); border-radius: 12px;
  padding: 36px 28px; text-align: center;
}
.ly-step-num {
  display: block; font-family: var(--font-d); font-size: 32px; font-weight: 300;
  color: var(--gold); margin-bottom: 12px;
}
.ly-step h3 {
  font-family: var(--font-d); font-size: 20px; font-weight: 400;
  color: var(--cream); margin-bottom: 10px;
}
.ly-step p { font-size: 13.5px; line-height: 1.7; color: rgba(244,239,230,0.5); }
.ly-form-section { display: flex; justify-content: center; }
.ly-form-card {
  background: var(--warm); border: 0.5px solid var(--border); border-radius: 16px;
  padding: 48px 40px; width: 100%; max-width: 460px;
}
.ly-form-card .ly-heading { margin-bottom: 32px; }
.ly-form { display: flex; flex-direction: column; gap: 20px; }
.ly-form label { display: flex; flex-direction: column; gap: 6px; }
.ly-form label > span {
  font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
}
.ly-form input {
  background: rgba(244,239,230,0.04); border: 0.5px solid var(--border); border-radius: 8px;
  padding: 14px 16px; font-family: var(--font-b); font-size: 15px; color: var(--cream);
  outline: none; transition: border-color 0.2s;
}
.ly-form input:focus { border-color: var(--gold); }
.ly-phone-row { display: flex; align-items: center; gap: 0; }
.ly-prefix {
  background: rgba(184,146,42,0.1); border: 0.5px solid var(--border);
  border-radius: 8px 0 0 8px; padding: 14px 12px;
  font-size: 14px; color: var(--gold); flex-shrink: 0;
}
.ly-phone-row input { border-radius: 0 8px 8px 0; flex: 1; }
.ly-submit {
  margin-top: 8px; padding: 16px; background: var(--gold); color: var(--ink);
  border: none; border-radius: 8px; font-size: 14px; font-weight: 500;
  letter-spacing: 0.08em; cursor: pointer; transition: background 0.2s;
}
.ly-submit:hover { background: var(--gold-light); }
.ly-success { text-align: center; padding: 24px 0; }
.ly-success-icon { font-size: 36px; color: var(--gold); display: block; margin-bottom: 16px; }
.ly-success p { font-size: 14px; color: rgba(244,239,230,0.6); line-height: 1.7; }
.ly-benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 28px; }
.ly-benefit {
  background: var(--warm); border: 0.5px solid var(--border); border-radius: 12px;
  padding: 36px 28px; text-align: center;
}
.ly-benefit-icon { font-size: 28px; color: var(--gold); display: block; margin-bottom: 14px; }
.ly-benefit h3 {
  font-family: var(--font-d); font-size: 19px; font-weight: 400;
  color: var(--cream); margin-bottom: 10px;
}
.ly-benefit p { font-size: 13.5px; line-height: 1.7; color: rgba(244,239,230,0.5); }
.ly-stamps-section { text-align: center; }
.ly-stamp-card {
  background: var(--warm); border: 1px solid var(--border); border-radius: 20px;
  padding: 48px 36px; max-width: 520px; margin: 0 auto; position: relative;
  overflow: hidden;
}
.ly-stamp-card-brand {
  font-family: var(--font-jp); font-size: 80px; font-weight: 200;
  color: rgba(184,146,42,0.06); position: absolute; right: 20px; top: 50%;
  transform: translateY(-50%); pointer-events: none;
}
.ly-stamps {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;
  max-width: 360px; margin: 0 auto 24px; position: relative;
}
.ly-stamp {
  width: 56px; height: 56px; border-radius: 50%; display: flex;
  align-items: center; justify-content: center; margin: 0 auto;
  font-family: var(--font-d); font-size: 14px;
}
.ly-stamp--empty {
  border: 1.5px dashed rgba(184,146,42,0.25); color: rgba(184,146,42,0.25);
}
.ly-stamp--filled {
  background: var(--gold); color: var(--ink); border: none; font-size: 20px;
}
.ly-stamp-msg { font-size: 13px; color: rgba(244,239,230,0.4); margin-top: 8px; }
.ly-faq { max-width: 600px; margin: 0 auto; }
.ly-faq-item { border-bottom: 0.5px solid var(--border); padding: 20px 0; }
.ly-faq-item summary {
  font-family: var(--font-d); font-size: 18px; font-weight: 400;
  color: var(--cream); cursor: pointer; list-style: none;
  display: flex; justify-content: space-between; align-items: center;
}
.ly-faq-item summary::-webkit-details-marker { display: none; }
.ly-faq-item summary::after { content: '+'; color: var(--gold); font-size: 22px; }
.ly-faq-item[open] summary::after { content: '\\2212'; }
.ly-faq-item p {
  font-size: 14px; line-height: 1.7; color: rgba(244,239,230,0.5);
  margin-top: 12px; padding-right: 24px;
}
@media (max-width: 600px) {
  .ly-form-card { padding: 36px 24px; }
  .ly-stamp-card { padding: 36px 20px; }
  .ly-stamps { gap: 12px; }
  .ly-stamp { width: 48px; height: 48px; }
}
`;
