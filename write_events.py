import base64, os

content = base64.b64decode(
"aW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7CmltcG9ydCBTRU8gZnJvbSAnLi4v"
"Y29tcG9uZW50cy9TRU8nOwppbXBvcnQgJy4vRXZlbnRzLmNzcyc7Cgpjb25zdCBXQV9OVU1C"
"RVIJPSA1MjgxMTEyMzk4NDknOwoKY29uc3QgZXZlbnRUeXBlcyA9IFsKICB7CiAgICB0YWc6"
).decode("utf-8")

# Just write the file directly with proper content
with open("src/pages/Events.tsx", "w", encoding="utf-8") as f:
    f.write("""import { useState } from 'react';
import SEO from '../components/SEO';
import './Events.css';

const WA_NUMBER = '528111239849';

const eventTypes = [
  {
    tag: 'Experiencia exclusiva',
    title: 'Mesa del Chef',
    quote: 'La barra completa, para ti y tus invitados.',
    items: [
      'Hasta 12 personas en la barra de sushi',
      'Men\\u00fa degustaci\\u00f3n dise\\u00f1ado por el chef',
      'Sake pairing disponible',
      'Duraci\\u00f3n: 2.5 \\u2013 3 horas',
    ],
    price: 'Desde $850 MXN por persona',
    icon: 'chef',
  },
  {
    tag: 'Celebraci\\u00f3n privada',
    title: 'Cena Privada',
    quote: 'El sal\\u00f3n completo, una noche exclusiva.',
    items: [
      'Hasta 40 personas',
      'Men\\u00fa personalizado o carta completa',
      'Decoraci\\u00f3n especial disponible',
      'Servicio de meseros dedicados',
    ],
    price: 'Desde $650 MXN por persona',
    icon: 'table',
  },
  {
    tag: 'Fuera del restaurante',
    title: 'Catering Ejecutivo',
    quote: 'IWA en tu oficina o evento.',
    items: [
      'Monterrey y \\u00e1rea metropolitana',
      'Sets de sushi, sashimi y rollos',
      'Men\\u00fa m\\u00ednimo $8,000 MXN',
      'Equipo de preparaci\\u00f3n en sitio',
      'Coordinaci\\u00f3n incluida',
    ],
    price: 'Desde $8,000 MXN',
    icon: 'briefcase',
  },
];
""")

print("OK - partial write test")
