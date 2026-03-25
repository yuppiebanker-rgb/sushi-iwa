import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const MESSAGES: Record<string, (name: string) => string> = {
  birthday: (name: string) =>
    `いわ *Sushi IWA*\n\n¡Hola ${name}! 🎂\n\nNos enteramos que pronto es tu cumpleaños. En IWA nos encantaría celebrarlo contigo.\n\n¿Reservamos tu mesa especial?\n\n👉 sushi-iwa.com/#reservar\n\n_Con cariño, el equipo IWA いわ_`,
  anniversary: (name: string) =>
    `いわ *Sushi IWA*\n\n¡Hola ${name}! 💍\n\nSe acerca una fecha especial para ti. Permítenos hacer de esa noche algo inolvidable en IWA.\n\n¿Reservamos tu mesa para la ocasión?\n\n👉 sushi-iwa.com/#reservar\n\n_El equipo IWA いわ_`,
};

Deno.serve(async () => {
  const today = new Date();
  const in7days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const targetMonth = in7days.getMonth() + 1;
  const targetDay = in7days.getDate();

  // Find guests with upcoming special occasions
  const { data: guests } = await supabase
    .from('guests')
    .select('*')
    .not('special_occasions', 'is', null);

  const toNotify: { guest: Record<string, unknown>; type: string }[] = [];

  for (const guest of (guests || [])) {
    const occasions = guest.special_occasions || {};
    for (const [type, dateStr] of Object.entries(occasions)) {
      if (!dateStr) continue;
      const d = new Date(dateStr as string);
      if (d.getMonth() + 1 === targetMonth && d.getDate() === targetDay) {
        toNotify.push({ guest, type });
      }
    }
  }

  // Queue birthday/anniversary messages
  for (const { guest, type } of toNotify) {
    const msgFn = MESSAGES[type];
    if (!msgFn || !guest.phone) continue;

    const msg = msgFn((guest.name as string) || 'amigo');

    await supabase.from('whatsapp_queue').insert({
      phone: guest.phone,
      message: msg,
      type: `birthday_${type}`,
      status: 'pending',
      scheduled_for: new Date().toISOString(),
    });
  }

  return new Response(JSON.stringify({ notified: toNotify.length }));
});
