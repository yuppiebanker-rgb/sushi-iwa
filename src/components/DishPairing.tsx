import { useState, useEffect } from 'react';
import { MENU_ITEMS } from '../data/menu';

const PAIRINGS: Record<string, { name: string; reason: string }[]> = {
  'curricanes-salmon': [
    { name: 'No Name Roll', reason: 'Contraste de texturas perfecto' },
    { name: 'Sake Junmai', reason: 'Umami complementario' },
  ],
  'hamachi-jalap': [
    { name: 'IWA Roll', reason: 'Ambos platillos firma de la casa' },
    { name: 'Sake Nigori', reason: 'El sake suave balancea el picante' },
  ],
  'iwa-roll': [
    { name: 'Hamachi Jalapeño', reason: 'El dúo más pedido de la barra' },
    { name: 'Temaki Spicy', reason: 'Mismos sabores, diferente textura' },
  ],
  'curricanes-spicy': [
    { name: 'Edamame', reason: 'Frescura para equilibrar el picante' },
    { name: 'Sake Junmai Daiginjo', reason: 'Limpio, suaviza el spicy' },
  ],
  'sashimi-salmon': [
    { name: 'Nigiri Salmón', reason: 'Mismo ingrediente, dos técnicas' },
    { name: 'Sake Junmai', reason: 'Clásico maridaje japonés' },
  ],
  'rainbow-roll': [
    { name: 'Sopa Miso', reason: 'Caldo caliente con roll frío' },
    { name: 'Curricanes de Salmón', reason: 'Doble textura premium' },
  ],
};

async function generatePairing(itemName: string, category: string): Promise<{ name: string; reason: string }[]> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 150,
      system: `Eres el sommelier de Sushi IWA. Para el platillo dado, sugiere 2 maridajes del menú.
Menú: ${MENU_ITEMS.map(i => i.name).join(', ')}
Responde SOLO con JSON: [{"name": "...", "reason": "..."}]`,
      messages: [{ role: 'user', content: `Maridaje para: ${itemName} (${category})` }],
    }),
  });
  const data = await response.json();
  return JSON.parse(data.content[0].text);
}

export default function DishPairing({ itemId, itemName, category }: {
  itemId: string;
  itemName: string;
  category: string;
}) {
  const [pairings, setPairings] = useState<{ name: string; reason: string }[] | null>(
    PAIRINGS[itemId] || null
  );

  useEffect(() => {
    if (!pairings) {
      generatePairing(itemName, category).then(setPairings).catch(() => {});
    }
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!pairings?.length) return null;

  return (
    <div style={{
      marginTop: '20px',
      paddingTop: '16px',
      borderTop: '0.5px solid rgba(184,146,42,0.12)',
    }}>
      <div style={{
        fontSize: '9px',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#b8922a',
        marginBottom: '12px',
      }}>Marida bien con</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {pairings.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{
              width: '4px', height: '4px', borderRadius: '50%',
              background: '#b8922a', marginTop: '6px', flexShrink: 0,
            }} />
            <div>
              <span style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '15px',
                color: '#f4efe6',
              }}>{p.name} </span>
              <span style={{ fontSize: '11px', color: '#7a7670' }}>
                — {p.reason}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
