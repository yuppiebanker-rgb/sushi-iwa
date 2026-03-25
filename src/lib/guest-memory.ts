import { supabase } from './supabase';

export interface GuestMemory {
  name?: string;
  phone?: string;
  lastVisit?: string;
  visitCount?: number;
  favoriteItems?: string[];
  loyaltyStamps?: number;
  specialOccasion?: string;
  dietaryNotes?: string;
}

// ── localStorage (anonymous, device-specific) ──

export function saveGuestLocal(data: Partial<GuestMemory>) {
  const existing = getGuestLocal();
  const updated = { ...existing, ...data };
  localStorage.setItem('iwa_guest', JSON.stringify(updated));
}

export function getGuestLocal(): GuestMemory | null {
  try {
    const raw = localStorage.getItem('iwa_guest');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── Supabase (by phone number, cross-device) ──

export async function lookupGuest(phone: string): Promise<GuestMemory | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from('guests')
    .select('*')
    .eq('phone', phone.replace(/\D/g, ''))
    .single();
  if (!data) return null;
  return {
    name: data.name,
    phone: data.phone,
    lastVisit: data.last_visit,
    visitCount: data.visit_count,
    favoriteItems: data.favorite_items,
    loyaltyStamps: data.loyalty_stamps,
    dietaryNotes: data.dietary_notes,
  };
}

export async function updateGuestVisit(phone: string, items?: string[]) {
  if (!supabase) return;
  const clean = phone.replace(/\D/g, '');
  const existing = await lookupGuest(clean);

  if (existing) {
    await supabase.from('guests').update({
      visit_count: (existing.visitCount || 0) + 1,
      last_visit: new Date().toISOString(),
      favorite_items: [
        ...(existing.favoriteItems || []),
        ...(items || []),
      ].slice(-20),
    }).eq('phone', clean);
  } else {
    await supabase.from('guests').insert({
      phone: clean,
      visit_count: 1,
      last_visit: new Date().toISOString(),
      favorite_items: items || [],
    });
  }
}
