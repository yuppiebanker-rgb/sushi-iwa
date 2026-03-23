export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  platform: 'google' | 'tripadvisor';
}

export const FEATURED_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Daniela Garza',
    rating: 5,
    text: 'Los curricanes de salmón son absolutamente impresionantes. El pescado es fresco, el servicio impecable y el ambiente íntimo es perfecto para una cena especial. Ya van 3 veces que regresamos.',
    date: 'Febrero 2025',
    platform: 'google',
  },
  {
    id: '2',
    author: 'Ricardo Montemayor',
    rating: 5,
    text: 'El No Name Roll cambió mi perspectiva del sushi en Monterrey. El chef Pedro explica cada platillo con pasión genuina. Sin duda el mejor japonés de SPGG.',
    date: 'Enero 2025',
    platform: 'google',
  },
  {
    id: '3',
    author: 'Fernanda López',
    rating: 5,
    text: 'Celebramos nuestro aniversario y fue una noche perfecta. El Hamachi Jalapeño es una experiencia que no se olvida. La barra de 12 asientos te hace sentir en Tokio.',
    date: 'Marzo 2025',
    platform: 'google',
  },
  {
    id: '4',
    author: 'Carlos Treviño',
    rating: 4,
    text: 'Excelente calidad de ingredientes y presentación impecable. El Hamachi Curry es mi favorito. Un poco de espera en hora pico pero vale cada minuto.',
    date: 'Diciembre 2024',
    platform: 'google',
  },
  {
    id: '5',
    author: 'Sofía Hernández',
    rating: 5,
    text: 'El ambiente es íntimo y sofisticado, el sake de calidad excepcional y los platillos son obras de arte. IWA es el secreto mejor guardado de San Pedro.',
    date: 'Enero 2025',
    platform: 'tripadvisor',
  },
];

export const GOOGLE_RATING = { score: 4.6, count: 847 };
