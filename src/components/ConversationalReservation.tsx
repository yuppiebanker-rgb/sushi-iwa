import { useState, useRef, useEffect } from 'react';
import { track } from '../lib/analytics';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `Eres el asistente de reservaciones de Sushi IWA, el mejor restaurante japonés de San Pedro Garza García, Monterrey.

Tu personalidad: cálido, eficiente, con un toque de elegancia japonesa. Usas "いわ" ocasionalmente como firma.

Información del restaurante:
- Ubicación principal: Av. Fundadores 955, Sienna Tower 2° piso, San Pedro G.G.
- Horario: Lunes, Miércoles, Jueves, Viernes, Sábado, Domingo: 1:45pm – 10:30pm
- CERRADO los martes
- Capacidad: 12 asientos en la barra
- También tenemos sucursales en: Saltillo, Hermosillo, Cd. Obregón
- WhatsApp: +52 81 1123 9849

Tu objetivo: recopilar en conversación natural:
1. Fecha y hora deseada
2. Número de personas (máx 12)
3. Sucursal preferida (default: Monterrey)
4. Nombre del comensal
5. Número de WhatsApp para confirmar
6. Ocasión especial (opcional: cumpleaños, aniversario, etc.)

Cuando tengas toda la información, genera un mensaje de confirmación y un link de WhatsApp con el resumen completo.

Formato del mensaje WhatsApp al finalizar:
"Hola IWA! Quisiera reservar:
📅 Fecha: [fecha]
🕐 Hora: [hora]
👥 Personas: [número]
📍 Sucursal: [sucursal]
👤 Nombre: [nombre]
🎉 Ocasión: [ocasión o 'Ninguna especial']
¡Gracias!"

IMPORTANTE:
- Si piden martes, informa que cerramos y sugiere el día más cercano
- Si el grupo es mayor a 12, sugiere el paquete de eventos privados
- Responde siempre en español
- Mantén las respuestas cortas (max 3 líneas)
- Usa emojis con moderación y elegancia`;

export default function ConversationalReservation() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Bienvenido a Sushi IWA! いわ\n\nSoy tu asistente de reservaciones. ¿Para cuándo y cuántas personas deseas reservar?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMsg, timestamp: new Date() },
    ];
    setMessages(newMessages);
    setLoading(true);

    track('reservation_started', { source: 'ai_chat' });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply =
        data.content?.[0]?.text ||
        'Lo siento, hubo un error. Por favor intenta de nuevo.';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply, timestamp: new Date() },
      ]);

      // Detect if AI generated a WhatsApp message
      if (reply.includes('Hola IWA!') || reply.includes('wa.me')) {
        track('reservation_completed', { method: 'ai_chat' });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Disculpa, tuve un problema técnico. ¿Prefieres hacer tu reservación directamente por WhatsApp?',
          timestamp: new Date(),
        },
      ]);
      setShowFallback(true);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  // Extract WhatsApp message from AI response if present
  const getWhatsAppLink = () => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.role !== 'assistant') return null;
    if (!lastMsg.content.includes('Hola IWA!')) return null;
    const match = lastMsg.content.match(/Hola IWA![\s\S]+?(?=\n\n|$)/);
    if (!match) return null;
    return `https://wa.me/528111239849?text=${encodeURIComponent(match[0])}`;
  };

  const waLink = getWhatsAppLink();

  return (
    <div
      style={{
        maxWidth: '560px',
        margin: '0 auto',
        border: '0.5px solid rgba(184,146,42,0.2)',
        background: '#0f0e0c',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '0.5px solid rgba(184,146,42,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            background: 'rgba(184,146,42,0.1)',
            border: '0.5px solid rgba(184,146,42,0.3)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Noto Serif JP", serif',
            fontSize: '14px',
            color: '#b8922a',
          }}
        >
          い
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: '#f4efe6' }}>
            Asistente IWA
          </div>
          <div
            style={{
              fontSize: '10px',
              color: '#4ade80',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                background: '#22c55e',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
            Disponible ahora
          </div>
        </div>
        {/* Fallback to form button */}
        <button
          onClick={() => setShowFallback(true)}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: '#7a7670',
            fontSize: '10px',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            padding: '4px 8px',
          }}
        >
          Usar formulario →
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          height: '320px',
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '10px 14px',
                background:
                  msg.role === 'user' ? 'rgba(184,146,42,0.15)' : '#1a1714',
                border: '0.5px solid',
                borderColor:
                  msg.role === 'user'
                    ? 'rgba(184,146,42,0.3)'
                    : 'rgba(255,255,255,0.06)',
                fontSize: '13px',
                color: msg.role === 'user' ? '#f4efe6' : '#d4cfc8',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display: 'flex', gap: '4px', padding: '8px 0' }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#b8922a',
                  animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {/* WhatsApp CTA */}
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track('reservation_whatsapp_opened', { source: 'ai_chat' })
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#25D366',
              padding: '12px 18px',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Confirmar por WhatsApp
          </a>
        )}

        {showFallback && (
          <div
            style={{
              fontSize: '11px',
              color: '#7a7670',
              textAlign: 'center',
              padding: '8px',
            }}
          >
            <a href="#reservation-form" style={{ color: '#b8922a' }}>
              Ir al formulario de reservación →
            </a>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          borderTop: '0.5px solid rgba(184,146,42,0.12)',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe tu reservación..."
          style={{
            flex: 1,
            background: '#0f0e0c',
            border: 'none',
            padding: '14px 16px',
            color: '#f4efe6',
            fontSize: '13px',
            fontFamily: '"DM Sans", sans-serif',
            outline: 'none',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            background: input.trim()
              ? '#b8922a'
              : 'rgba(184,146,42,0.15)',
            border: 'none',
            padding: '14px 20px',
            color: input.trim() ? '#0c0b09' : '#7a7670',
            cursor: input.trim() ? 'pointer' : 'default',
            fontSize: '14px',
            transition: 'all 0.2s',
            fontWeight: 500,
          }}
        >
          →
        </button>
      </div>

      <style>{`
        @keyframes typingDot {
          0%,100%{opacity:.3;transform:translateY(0)}
          50%{opacity:1;transform:translateY(-4px)}
        }
      `}</style>
    </div>
  );
}
