// Analytics event types for Sushi IWA
export type IWAEvent =
  | 'reservation_started'
  | 'reservation_step_2'
  | 'reservation_step_3'
  | 'reservation_completed'
  | 'reservation_whatsapp_opened'
  | 'menu_viewed'
  | 'menu_item_clicked'
  | 'menu_searched'
  | 'menu_filter_used'
  | 'gallery_opened'
  | 'whatsapp_widget_opened'
  | 'whatsapp_quick_reply_clicked'
  | 'loyalty_page_visited'
  | 'gift_card_selected'
  | 'events_inquiry_submitted'
  | 'newsletter_subscribed'
  | 'chef_story_read'
  | 'location_map_clicked'
  | 'qr_generated'
  | 'staff_portal_accessed'
  | 'reservation_deposit_started'
  | 'reservation_deposit_completed';

interface EventProps {
  [key: string]: string | number | boolean;
}

export function track(event: IWAEvent, props?: EventProps) {
  // Plausible
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(event, { props });
  }

  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, props);
  }

  // Console in dev
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${event}`, props);
  }
}

// Track menu item views (called from MenuModal)
export function trackMenuItem(name: string, category: string, price: string) {
  track('menu_item_clicked', { name, category, price });
}

// Detect UTM traffic source from URL parameters
export function detectTrafficSource(): string {
  const params = new URLSearchParams(window.location.search);
  const utm = params.get('utm_source');
  if (utm) {
    track('reservation_started', { source: utm });
    return utm;
  }
  return 'direct';
}

// Track reservation funnel
export function trackReservationStep(step: 1 | 2 | 3, data?: {
  location?: string;
  time?: string;
  party_size?: number;
}) {
  const events: Record<number, IWAEvent> = {
    1: 'reservation_started',
    2: 'reservation_step_2',
    3: 'reservation_step_3',
  };
  track(events[step], data);
}
