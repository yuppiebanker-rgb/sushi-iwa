// ── WhatsApp message templates for reservation lifecycle ──

export const WA_TEMPLATES = {
  /** Sent immediately after reservation is created */
  CONFIRMATION: (data: {
    name: string;
    date: string;
    time: string;
    party: number;
    location: string;
  }) =>
    `いわ Sushi IWA — Confirmación\n` +
    `Hola ${data.name}! 🍣\n\n` +
    `Tu reservación está registrada:\n` +
    `📅 *${data.date}* a las *${data.time}*\n` +
    `👥 *${data.party} personas*\n` +
    `📍 *${data.location}*\n\n` +
    `Te esperamos. Si necesitas hacer cambios, responde este mensaje.\n` +
    `Sushi IWA · ${data.location}`,

  /** Sent 24 hours before reservation */
  REMINDER_24H: (data: { name: string; time: string; party: number }) =>
    `いわ Sushi IWA — Recordatorio\n` +
    `Hola ${data.name}!\n\n` +
    `Te recordamos que mañana tienes reservación a las *${data.time}* para *${data.party} personas*. 🍣\n\n` +
    `¿Necesitas hacer algún cambio? Escríbenos aquí.\n` +
    `¡Nos vemos mañana!`,

  /** Sent 2 hours before reservation */
  REMINDER_2H: (data: { name: string; time: string }) =>
    `いわ Sushi IWA\n` +
    `Hola ${data.name} — tu reservación es en 2 horas, a las *${data.time}*.\n\n` +
    `📍 Av. Fundadores 955, Sienna Tower 2° piso\n` +
    `🚗 Hay estacionamiento disponible\n\n` +
    `¡Te esperamos!`,

  /** Sent 2 hours after reservation end time */
  POST_VISIT_REVIEW: (data: { name: string }) =>
    `いわ Sushi IWA\n` +
    `Hola ${data.name}, esperamos que hayas disfrutado tu visita esta noche.\n\n` +
    `Nos ayudaría mucho si pudieras dejarnos una reseña en Google — solo toma 1 minuto:\n` +
    `⭐ https://g.page/r/SUSHI_IWA_GOOGLE_ID/review\n\n` +
    `Muchas gracias. Hasta pronto いわ`,

  /** Sent to waitlist when cancellation detected */
  WAITLIST_NOTIFY: (data: {
    name: string;
    date: string;
    time: string;
    party: number;
  }) =>
    `いわ Sushi IWA — ¡Hay lugar!\n` +
    `Hola ${data.name}! 🍣\n\n` +
    `Se liberó una mesa para *${data.party} personas* el *${data.date}* a las *${data.time}*.\n\n` +
    `¿La tomas? Responde SÍ en los próximos 15 minutos para confirmar.\n` +
    `(Si no respondes, ofreceremos la mesa al siguiente en lista)`,
};

/** Generate wa.me link with pre-filled message */
export function buildWALink(phone: string, message: string): string {
  const clean = phone.replace(/\D/g, '');
  const withCountry = clean.startsWith('52') ? clean : `52${clean}`;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}`;
}
