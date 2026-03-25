import { useState, useCallback } from 'react';
import { MENU_ITEMS, type MenuItem } from '../data/menu';
import { track } from '../lib/analytics';

export interface SearchResult {
  items: MenuItem[];
  banner?: string;
  explanation?: string;
}

async function aiSearch(query: string): Promise<SearchResult> {
  if (!query.trim()) return { items: MENU_ITEMS };

  const lower = query.toLowerCase();

  // ── Fast local filters (no API call) ──

  if (lower.includes('sin gluten') || lower.includes('celíaco') || lower.includes('gluten free')) {
    return {
      items: MENU_ITEMS.filter(i => i.isGlutenFree),
      banner: 'Opciones sin gluten',
    };
  }

  if (lower.includes('firma') || lower.includes('platillo firma') || lower.includes('signature')) {
    return {
      items: MENU_ITEMS.filter(i => i.isSignature),
      banner: 'Platillos firma',
    };
  }

  if (lower.includes('chef') || lower.includes('recomienda') || lower.includes('recomendación')) {
    return {
      items: MENU_ITEMS.filter(i => i.isChefPick || i.isSignature),
      banner: 'Recomendados del chef',
      explanation: 'Selección de platillos favoritos del chef y firmas de la casa.',
    };
  }

  if (lower.includes('no muy picante') || lower.includes('sin picante') || lower.includes('no picante')) {
    return {
      items: MENU_ITEMS.filter(i =>
        !i.name.toLowerCase().includes('spicy') &&
        !i.desc.toLowerCase().includes('spicy') &&
        !i.desc.toLowerCase().includes('picante')
      ),
      banner: 'Sin picante',
    };
  }

  if (lower.includes('compartir') || lower.includes('para la mesa')) {
    return {
      items: MENU_ITEMS.filter(i =>
        i.category === 'entradas' || i.category === 'rollos-esp' || i.category === 'platos'
      ),
      banner: 'Para compartir',
    };
  }

  if (lower.includes('vegetariano') || lower.includes('sin carne') || lower.includes('vegetal')) {
    return {
      items: MENU_ITEMS.filter(i =>
        i.desc.toLowerCase().includes('vegetal') ||
        i.desc.toLowerCase().includes('aguacate') ||
        i.desc.toLowerCase().includes('pepino') ||
        i.name.toLowerCase().includes('vegetal')
      ),
      banner: 'Opciones vegetarianas',
    };
  }

  if (lower.includes('postre') || lower.includes('dulce') || lower.includes('algo dulce')) {
    return {
      items: MENU_ITEMS.filter(i => i.category === 'postres'),
      banner: 'Postres',
    };
  }

  // ── Ingredient search ──
  const ingredients = ['aguacate', 'salmón', 'salmon', 'atún', 'atun', 'camarón', 'camaron',
    'hamachi', 'cangrejo', 'callo', 'pulpo', 'anguila', 'mango', 'pepino', 'queso'];
  for (const ing of ingredients) {
    if (lower.includes(ing)) {
      const matches = MENU_ITEMS.filter(i =>
        i.name.toLowerCase().includes(ing) ||
        i.desc.toLowerCase().includes(ing)
      );
      if (matches.length > 0) {
        return { items: matches, banner: `Platillos con ${ing}` };
      }
    }
  }

  // ── Complex queries: Claude API ──
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: `Eres el sommelier y experto en el menú de Sushi IWA.
Dado una búsqueda del usuario y la lista de IDs de platillos disponibles, devuelve un JSON con:
{
  "ids": ["id1", "id2"],
  "banner": "texto corto del filtro",
  "explanation": "por qué estos platillos"
}
Menú disponible (ID: Nombre — Categoría):
${MENU_ITEMS.map(i => `${i.id}: ${i.name} (${i.category})`).join('\n')}
Responde SOLO con el JSON, sin markdown ni explicaciones.`,
        messages: [{ role: 'user', content: query }],
      }),
    });
    const data = await response.json();
    const parsed = JSON.parse(data.content[0].text);
    const matched = MENU_ITEMS.filter(i => parsed.ids?.includes(i.id));
    if (matched.length > 0) {
      return {
        items: matched,
        banner: parsed.banner,
        explanation: parsed.explanation,
      };
    }
  } catch {
    // fallthrough to text search
  }

  // ── Fallback: text search ──
  return {
    items: MENU_ITEMS.filter(i =>
      i.name.toLowerCase().includes(lower) ||
      i.desc.toLowerCase().includes(lower) ||
      i.badge.toLowerCase().includes(lower)
    ),
  };
}

export default function AIMenuSearch({
  onResults,
}: {
  onResults: (result: SearchResult) => void;
}) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const handleSearch = useCallback(async (q: string) => {
    if (q === lastQuery) return;
    setLastQuery(q);
    if (!q.trim()) { onResults({ items: MENU_ITEMS }); return; }

    setLoading(true);
    track('menu_searched', { query: q.substring(0, 50) });
    const result = await aiSearch(q);
    onResults(result);
    setLoading(false);
  }, [lastQuery, onResults]);

  return (
    <div style={{ position: 'relative', maxWidth: '440px' }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
        onBlur={() => handleSearch(query)}
        placeholder="Buscar: 'sin gluten', 'con aguacate', '¿qué recomiendas?'..."
        aria-label="Buscar platillo con inteligencia artificial"
        style={{
          width: '100%',
          background: 'rgba(184,146,42,0.05)',
          border: '0.5px solid rgba(184,146,42,0.2)',
          padding: '12px 44px 12px 16px',
          color: '#f4efe6',
          fontSize: '13px',
          fontFamily: '"DM Sans", sans-serif',
          outline: 'none',
        }}
      />
      <div style={{
        position: 'absolute', right: '14px', top: '50%',
        transform: 'translateY(-50%)',
        color: loading ? '#b8922a' : '#7a7670',
        fontSize: '16px',
        transition: 'color 0.2s',
      }}>
        {loading ? '...' : '⌕'}
      </div>
    </div>
  );
}
