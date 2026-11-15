/**
 * Vercel Serverless Function: B2B partner inquiries from /pl/inverness-med
 *
 * Route: POST /api/b2b-lead
 *
 * Delivery channels (each is used when its env vars are set on Vercel):
 *  - E-mail:   RESEND_API_KEY -> e-mail to LEAD_EMAIL_TO (default piercinggentle@gmail.com).
 *              Without a verified domain Resend only delivers to the e-mail the Resend
 *              account was created with, so create that account on piercinggentle@gmail.com.
 *              LEAD_EMAIL_FROM is optional (default: onboarding@resend.dev).
 *  - Sanity:   SANITY_API_TOKEN (Editor token) -> stores a `b2bLead` document.
 *              IDs start with "leads." so they stay private even if the dataset is public.
 *  - Telegram: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID -> instant notification.
 *
 * Returns 200 when at least one channel accepted the lead, otherwise 500,
 * and the page then offers to send the same data via WhatsApp.
 */

type VercelRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: any;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
};

const SANITY_PROJECT_ID = 'nfwijj0y';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

async function saveToSanity(lead: Record<string, string>): Promise<boolean> {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) return false;

  const id = `leads.${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            create: {
              _id: id,
              _type: 'b2bLead',
              ...lead,
              status: 'new',
              submittedAt: new Date().toISOString(),
            },
          },
        ],
      }),
    }
  );
  return res.ok;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Digits for wa.me / tel: links; a bare 9-digit Polish number gets the 48 prefix. */
function intlDigits(phone: string): string {
  const digits = phone.replace(/\D/g, '').replace(/^00/, '');
  return digits.length === 9 ? `48${digits}` : digits;
}

async function sendEmail(lead: Record<string, string>): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.LEAD_EMAIL_TO || 'piercinggentle@gmail.com';
  const from = process.env.LEAD_EMAIL_FROM || 'Inverness MED dla salonów <onboarding@resend.dev>';
  const phoneDigits = intlDigits(lead.phone);

  const rows: Array<[string, string]> = [
    ['Imię', lead.name],
    ['Telefon', lead.phone],
    ['Miasto', lead.city],
    ['Salon', lead.salon || '—'],
    ['Wiadomość', lead.message || '—'],
  ];
  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#0a2f5e">Nowe zapytanie od salonu</h2>
    <table style="font-family:Arial,sans-serif;font-size:15px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#5b6b80;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
        )
        .join('')}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:15px">
      <a href="https://wa.me/${phoneDigits}">Napisz na WhatsApp</a> · <a href="tel:+${phoneDigits}">Zadzwoń</a>
    </p>
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#5b6b80">Formularz: gentlepiercing.pl${escapeHtml(lead.page || '/pl/inverness-med')}</p>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Zapytanie B2B: ${lead.salon || lead.name}, ${lead.city}`,
      html,
      text,
    }),
  });
  if (!res.ok) console.error('b2b-lead: Resend error', res.status, await res.text());
  return res.ok;
}

async function notifyTelegram(lead: Record<string, string>): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return false;

  const phoneDigits = intlDigits(lead.phone);
  const lines = [
    '<b>Nowe zapytanie B2B (dla salonów)</b>',
    `Imię: ${escapeHtml(lead.name)}`,
    `Miasto: ${escapeHtml(lead.city)}`,
    lead.salon ? `Salon: ${escapeHtml(lead.salon)}` : '',
    `Telefon: ${escapeHtml(lead.phone)}`,
    lead.message ? `Wiadomość: ${escapeHtml(lead.message)}` : '',
    phoneDigits ? `WhatsApp: https://wa.me/${phoneDigits}` : '',
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  return res.ok;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }
  body = body || {};

  // Honeypot: pretend success so bots don't retry.
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  const lead = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 30),
    salon: clean(body.salon, 120),
    city: clean(body.city, 80),
    message: cleanMultiline(body.message, 1000),
    page: clean(body.page, 120),
  };

  if (!lead.name || !lead.city || lead.phone.replace(/\D/g, '').length < 9) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (body.consent !== true) {
    return res.status(400).json({ error: 'Consent required' });
  }

  const results = await Promise.allSettled([sendEmail(lead), saveToSanity(lead), notifyTelegram(lead)]);
  const delivered = results.some((r) => r.status === 'fulfilled' && r.value === true);

  if (!delivered) {
    console.error('b2b-lead: no delivery channel accepted the lead', results);
    return res.status(500).json({ error: 'Lead could not be delivered' });
  }

  return res.status(200).json({ ok: true });
}
