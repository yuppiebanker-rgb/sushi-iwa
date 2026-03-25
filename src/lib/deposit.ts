export interface DepositConfig {
  required: boolean;
  amount: number;
  reason: string;
  currency: 'MXN';
}

export function getDepositConfig(
  date: Date,
  partySize: number,
  isChefTable: boolean
): DepositConfig {
  if (isChefTable) {
    return { required: true, amount: 500, reason: 'Mesa del Chef — reservación especial', currency: 'MXN' };
  }

  const day = date.getDay(); // 0=Sun, 5=Fri, 6=Sat
  if (day === 0 || day === 5 || day === 6) {
    return { required: true, amount: 200, reason: 'Fin de semana — alta demanda', currency: 'MXN' };
  }

  if (partySize >= 6) {
    return { required: true, amount: 300, reason: 'Grupo de 6 o más personas', currency: 'MXN' };
  }

  return { required: false, amount: 0, reason: '', currency: 'MXN' };
}

// Create Stripe checkout session via Supabase Edge Function
export async function createDepositSession(params: {
  reservationId: string;
  amount: number;
  guestName: string;
  guestEmail: string;
  date: string;
  time: string;
  party: number;
}): Promise<{ url: string }> {
  const { supabase } = await import('./supabase');
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .functions.invoke('create-deposit-session', { body: params });

  if (error) throw error;
  return data;
}
