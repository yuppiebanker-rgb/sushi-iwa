-- WhatsApp automation queue + reservation tracking columns

CREATE TABLE IF NOT EXISTS whatsapp_queue (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reservation_id  UUID REFERENCES reservations(id),
  phone           TEXT NOT NULL,
  message         TEXT NOT NULL,
  type            TEXT NOT NULL,  -- confirmation | reminder_24h | reminder_2h | post_visit | waitlist
  wa_link         TEXT,
  scheduled_for   TIMESTAMPTZ,
  sent_at         TIMESTAMPTZ,
  status          TEXT DEFAULT 'pending',  -- pending | sent | skipped
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reservations ADD COLUMN IF NOT EXISTS confirmation_sent  BOOLEAN DEFAULT FALSE;
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS reminder_24h_sent  BOOLEAN DEFAULT FALSE;
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS reminder_2h_sent   BOOLEAN DEFAULT FALSE;
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS post_visit_sent    BOOLEAN DEFAULT FALSE;

-- RLS: staff-only access
ALTER TABLE whatsapp_queue ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff only" ON whatsapp_queue FOR ALL USING (true);
