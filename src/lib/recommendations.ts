export interface RecommendationContext {
  hour: number;
  dayOfWeek: number;
  partySize?: number;
  isWeekend: boolean;
  isSeasonal: boolean;
}

export function getContext(): RecommendationContext {
  const now = new Date();
  const dayOfWeek = now.getDay();
  return {
    hour: now.getHours(),
    dayOfWeek,
    isWeekend: dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6,
    isSeasonal: true,
  };
}

interface Recommendation {
  title: string;
  reason: string;
  items: string[];
  cta: string;
  urgency?: string;
}

export function getRecommendation(ctx: RecommendationContext): Recommendation {
  const { hour, isWeekend, isSeasonal, partySize = 2 } = ctx;

  // Early afternoon (2-5pm) → lighter dishes
  if (hour >= 14 && hour < 17) {
    return {
      title: 'Para esta tarde',
      reason: 'Ideal para comenzar',
      items: ['curricanes-salmon', 'temaki-spicy-tuna', 'hamachi-jalap'],
      cta: 'Ver platillos de tarde',
    };
  }

  // Prime time (7-10pm) + weekend → signature + sake
  if (hour >= 19 && isWeekend) {
    return {
      title: 'La noche de fin de semana',
      reason: 'Lo más pedido los viernes y sábados',
      items: ['iwa-roll', 'no-name-roll', 'curricanes-salmon', 'fermedinas-roll'],
      cta: 'Ver el menú completo',
      urgency: 'Quedan pocas mesas esta noche',
    };
  }

  // Seasonal → highlight hamachi
  if (isSeasonal) {
    return {
      title: 'De temporada ahora',
      reason: 'Hamachi directo de Japón — solo por tiempo limitado',
      items: ['hamachi-jalap', 'hamachi-curry'],
      cta: 'Ver Hamachi en el menú',
      urgency: 'Disponible esta semana',
    };
  }

  // Large group
  if (partySize >= 4) {
    return {
      title: 'Para tu mesa de ' + partySize,
      reason: 'Perfectos para compartir entre varios',
      items: ['iwa-roll', 'fermedinas-roll', 'curricanes-mixtos', 'sashimi-mixto'],
      cta: 'Ver platillos para compartir',
    };
  }

  // Default → signatures
  return {
    title: 'Los favoritos de IWA',
    reason: 'Los platillos que definen nuestra cocina',
    items: ['curricanes-salmon', 'hamachi-jalap', 'no-name-roll', 'iwa-roll'],
    cta: 'Ver el menú',
  };
}
