import { useState } from 'react';

const OCCASIONS = [
  { id: 'birthday', label: '🎂 Cumpleaños', hasDate: true },
  { id: 'anniversary', label: '💍 Aniversario', hasDate: true },
  { id: 'business', label: '🥂 Cena de negocios', hasDate: false },
  { id: 'graduation', label: '🎓 Graduación', hasDate: false },
  { id: 'none', label: 'Ninguna especial', hasDate: false },
];

export default function BirthdayCapture({
  onChange,
}: {
  onChange: (data: { type: string; date?: string } | null) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [date, setDate] = useState('');

  const handleSelect = (id: string, hasDate: boolean) => {
    setSelected(id);
    if (id === 'none') { onChange(null); return; }
    onChange({ type: id, date: hasDate ? date : undefined });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{
        fontSize: '10px', letterSpacing: '0.25em',
        textTransform: 'uppercase', color: '#b8922a',
        marginBottom: '12px',
      }}>¿Celebran algo especial? (opcional)</div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px',
        marginBottom: selected && selected !== 'none' ? '12px' : '0',
      }}>
        {OCCASIONS.map(occ => (
          <button
            key={occ.id}
            type="button"
            onClick={() => handleSelect(occ.id, occ.hasDate)}
            style={{
              background: selected === occ.id
                ? 'rgba(184,146,42,0.15)'
                : 'rgba(184,146,42,0.04)',
              border: `0.5px solid ${selected === occ.id ? '#b8922a' : 'rgba(184,146,42,0.15)'}`,
              color: selected === occ.id ? '#f4efe6' : '#7a7670',
              padding: '8px 14px', cursor: 'pointer',
              fontSize: '12px', fontFamily: '"DM Sans"',
              transition: 'all 0.2s', minHeight: '36px',
            }}
          >{occ.label}</button>
        ))}
      </div>

      {/* Date picker for birthday/anniversary */}
      {selected && selected !== 'none' &&
       OCCASIONS.find(o => o.id === selected)?.hasDate && (
        <div>
          <div style={{
            fontSize: '10px', color: '#7a7670',
            marginBottom: '6px', letterSpacing: '0.1em',
          }}>¿Cuándo es la fecha exacta?</div>
          <input
            type="date"
            value={date}
            onChange={e => {
              setDate(e.target.value);
              onChange({ type: selected!, date: e.target.value });
            }}
            style={{
              background: 'rgba(184,146,42,0.04)',
              border: '0.5px solid rgba(184,146,42,0.2)',
              color: '#f4efe6', padding: '10px 14px',
              fontSize: '13px', fontFamily: '"DM Sans"',
              outline: 'none', cursor: 'pointer',
            }}
          />
          <div style={{
            fontSize: '10px', color: '#7a7670',
            marginTop: '6px', fontStyle: 'italic',
          }}>
            Te enviaremos un mensaje especial una semana antes いわ
          </div>
        </div>
      )}
    </div>
  );
}
