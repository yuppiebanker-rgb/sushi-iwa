export default function StickyPhotoSection() {
  const BLOCKS = [
    {
      jp: '新鮮',
      title: 'Frescura sin compromiso',
      body: 'Cada pieza en IWA comienza con una pregunta: ¿qué hace que este ingrediente sea extraordinario? No añadimos. Revelamos.',
    },
    {
      jp: '職人',
      title: 'El arte del itamae',
      body: 'Nuestro chef Pedro aprendió que el sushi no se hace. Se descubre. Cada corte, cada temperatura, cada proporción es deliberada.',
    },
    {
      jp: '経験',
      title: 'Una experiencia íntima',
      body: '12 asientos. Una barra. El chef frente a ti. IWA no es un restaurante de volumen. Es una conversación entre el cocinero y el comensal.',
    },
    {
      jp: '岩',
      title: 'いわ — permanencia',
      body: 'いわ significa roca en japonés. Lo que construimos aquí está hecho para durar. Sabores que se quedan contigo.',
    },
  ];

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '200vh',
      }}
      className="sticky-section"
    >
      {/* LEFT — sticky photo */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}>
        <img
          src="/images/chef-rolling.jpg"
          alt="Chef Sushi IWA"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.72) saturate(0.85)',
          }}
        />
        {/* Gold overlay at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(12,11,9,0.7), transparent)',
        }} />
      </div>

      {/* RIGHT — scrolling text blocks */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#0c0b09',
      }}>
        {BLOCKS.map((block, i) => (
          <div
            key={i}
            data-reveal
            style={{
              padding: 'clamp(60px,8vh,100px) clamp(32px,5vw,72px)',
              borderBottom: i < BLOCKS.length - 1
                ? '0.5px solid rgba(184,146,42,0.1)'
                : 'none',
            }}
          >
            {/* Japanese character */}
            <div style={{
              fontFamily: '"Noto Serif JP", serif',
              fontSize: '11px',
              fontWeight: 200,
              letterSpacing: '0.4em',
              color: 'rgba(184,146,42,0.5)',
              marginBottom: '20px',
            }}>{block.jp}</div>

            {/* Title */}
            <h3 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(28px,3.5vw,44px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#f4efe6',
              marginBottom: '20px',
              lineHeight: 1.1,
            }}>{block.title}</h3>

            {/* Body */}
            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(244,239,230,0.5)',
              lineHeight: 1.8,
              maxWidth: '380px',
            }}>{block.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
