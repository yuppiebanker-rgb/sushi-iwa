/**
 * Supabase Edge Function — reservation-followup
 *
 * Runs on a cron schedule (every 15 min) and queues WhatsApp messages
 * for reservations that need confirmation, reminders, or review requests.
 *
 * Messages are inserted into `whatsapp_queue` for staff approval.
 * When Meta Business API is configured, switch to auto-send.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ── WhatsApp templates (inlined to avoid cross-boundary import in Deno) ──

const WA_TEMPLATES = {
  CONFIRMATION: (d: {
    name: string;
    date: string;
    time: string;
    party: number;
    location: string;
  }) =>
    `いわ Sushi IWA — Confirmación\n` +
    `Hola ${d.name}! 🍣\n\n` +
    `Tu reservación está registrada:\n` +
    `📅 *${d.date}* a las *${d.time}*\n` +
    `👥 *${d.party} personas*\n` +
    `📍 *${d.location}*\n\n` +
    `Te esperamos. Si necesitas hacer cambios, responde este mensaje.\n` +
    `Sushi IWA · ${d.location}`,

  REMINDER_24H: (d: { name: string; time: string; party: number }) =>
    `いわ Sushi IWA — Recordatorio\n` +
    `Hola ${d.name}!\n\n` +
    `Te recordamos que mañana tienes reservación a las *${d.time}* para *${d.party} personas*. 🍣\n\n` +
    `¿Necesitas hacer algún cambio? Escríbenos aquí.\n` +
    `¡Nos vemos mañana!`,

  REMINDER_2H: (d: { name: string; time: string }) =>
    `いわ Sushi IWA\n` +
    `Hola ${d.name} — tu reservación es en 2 horas, a las *${d.time}*.\n\n` +
    `📍 Av. Fundadores 955, Sienna Tower 2° piso\n` +
    `🚗 Hay estacionamiento disponible\n\n` +
    `¡Te esperamos!`,

  POST_VISIT_REVIEW: (d: { name: string }) =>
    `いわ Sushi IWA\n` +
    `Hola ${d.name}, esperamos que hayas disfrutado tu visita esta noche.\n\n` +
    `Nos ayudaría mucho si pudieras dejarnos una reseña en Google — solo toma 1 minuto:\n` +
    `⭐ https://g.page/r/SUSHI_IWA_GOOGLE_ID/review\n\n` +
    `Muchas gracias. Hasta pronto いわ`,

  WAITLIST_NOTIFY: (d: {
    name: string;
    date: string;
    time: string;
    party: number;
  }) =>
    `いわ Sushi IWA — ¡Hay lugar!\n` +
    `Hola ${d.name}! 🍣\n\n` +
    `Se liberó una mesa para *${d.party} personas* el *${d.date}* a las *${d.time}*.\n\n` +
    `¿La tomas? Responde SÍ en los próximos 15 minutos para confirmar.\n` +
    `(Si no respondes, ofreceremos la mesa al siguiente en lista)`,
};

function buildWALink(phone: string, message: string): string {
  const clean = phone.replace(/\D/g, '');
  const withCountry = clean.startsWith('52') ? clean : `52${clean}`;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}`;
}

// ── Supabase client ──

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// ── Helpers ──

interface Reservation {
  id: string;
  guest_name: string;
  guest_phone: string;
  reservation_date: string;
  reservation_time: string;
  reservation_datetime: string;
  party_size: number;
  location: string;
  status: string;
}

const MS_MINUTE = 60_000;
const MS_HOUR = 60 * MS_MINUTE;

function formatDateES(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

async function enqueue(
  res: Reservation,
  msg: string,
  type: string,
  scheduledFor: Date,
) {
  await supabase.from('whatsapp_queue').insert({
    reservation_id: res.id,
    phone: res.guest_phone,
    message: msg,
    type,
    wa_link: buildWALink(res.guest_phone, msg),
    scheduled_for: scheduledFor.toISOString(),
    status: 'pending',
  });
}

// ── Main processor ──

async function processReservations() {
  const now = new Date();
  let processed = 0;

  // ── CONFIRMATION: new reservations not yet confirmed ──
  const { data: newRes } = await supabase
    .from('reservations')
    .select('*')
    .eq('status', 'pending')
    .eq('confirmation_sent', false);

  for (const res of (newRes ?? []) as Reservation[]) {
    const msg = WA_TEMPLATES.CONFIRMATION({
      name: res.guest_name,
      date: formatDateES(res.reservation_date),
      time: res.reservation_time,
      party: res.party_size,
      location: res.location || 'Monterrey',
    });
    await enqueue(res, msg, 'confirmation', now);
    await supabase
      .from('reservations')
      .update({ confirmation_sent: true })
      .eq('id', res.id);
    processed++;
  }

  // ── 24H REMINDER ──
  const in24h = new Date(now.getTime() + 24 * MS_HOUR);
  const in24hEnd = new Date(in24h.getTime() + 30 * MS_MINUTE);

  const { data: remind24 } = await supabase
    .from('reservations')
    .select('*')
    .eq('status', 'confirmed')
    .eq('reminder_24h_sent', false)
    .gte('reservation_datetime', in24h.toISOString())
    .lte('reservation_datetime', in24hEnd.toISOString());

  for (const res of (remind24 ?? []) as Reservation[]) {
    const msg = WA_TEMPLATES.REMINDER_24H({
      name: res.guest_name,
      time: res.reservation_time,
      party: res.party_size,
    });
    await enqueue(res, msg, 'reminder_24h', in24h);
    await supabase
      .from('reservations')
      .update({ reminder_24h_sent: true })
      .eq('id', res.id);
    processed++;
  }

  // ── 2H REMINDER ──
  const in2h = new Date(now.getTime() + 2 * MS_HOUR);
  const in2hEnd = new Date(in2h.getTime() + 30 * MS_MINUTE);

  const { data: remind2 } = await supabase
    .from('reservations')
    .select('*')
    .eq('status', 'confirmed')
    .eq('reminder_2h_sent', false)
    .gte('reservation_datetime', in2h.toISOString())
    .lte('reservation_datetime', in2hEnd.toISOString());

  for (const res of (remind2 ?? []) as Reservation[]) {
    const msg = WA_TEMPLATES.REMINDER_2H({
      name: res.guest_name,
      time: res.reservation_time,
    });
    await enqueue(res, msg, 'reminder_2h', in2h);
    await supabase
      .from('reservations')
      .update({ reminder_2h_sent: true })
      .eq('id', res.id);
    processed++;
  }

  // ── POST-VISIT REVIEW (ended 2+ hours ago) ──
  const twoHoursAgo = new Date(now.getTime() - 2 * MS_HOUR);
  const twoHoursAgoEnd = new Date(twoHoursAgo.getTime() + 30 * MS_MINUTE);

  const { data: postVisit } = await supabase
    .from('reservations')
    .select('*')
    .eq('status', 'completed')
    .eq('post_visit_sent', false)
    .gte('reservation_datetime', twoHoursAgoEnd.toISOString())
    .lte('reservation_datetime', twoHoursAgo.toISOString());

  for (const res of (postVisit ?? []) as Reservation[]) {
    const msg = WA_TEMPLATES.POST_VISIT_REVIEW({ name: res.guest_name });
    await enqueue(res, msg, 'post_visit', now);
    await supabase
      .from('reservations')
      .update({ post_visit_sent: true })
      .eq('id', res.id);
    processed++;
  }

  // ── WAITLIST NOTIFY (recent cancellations) ──
  const fifteenMinAgo = new Date(now.getTime() - 15 * MS_MINUTE);

  const { data: cancelled } = await supabase
    .from('reservations')
    .select('*')
    .eq('status', 'cancelled')
    .gte('cancelled_at', fifteenMinAgo.toISOString());

  for (const res of (cancelled ?? []) as Reservation[]) {
    const { data: waitlist } = await supabase
      .from('waitlist')
      .select('*')
      .eq('party_size', res.party_size)
      .eq('preferred_date', res.reservation_date)
      .eq('notified', false)
      .limit(1);

    for (const entry of waitlist ?? []) {
      const msg = WA_TEMPLATES.WAITLIST_NOTIFY({
        name: entry.guest_name,
        date: formatDateES(res.reservation_date),
        time: res.reservation_time,
        party: res.party_size,
      });
      await enqueue(res, msg, 'waitlist', now);
      await supabase
        .from('waitlist')
        .update({ notified: true })
        .eq('id', entry.id);
      processed++;
    }
  }

  return { processed, timestamp: now.toISOString() };
}

// ── HTTP handler ──

Deno.serve(async (_req) => {
  try {
    const result = await processReservations();
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});
