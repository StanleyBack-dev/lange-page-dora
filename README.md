# Dora — Landing page

Public marketing site of **Dora** (Next.js 16, App Router, Tailwind v4), with
the same visual identity as the app. The page is statically rendered for
speed and SEO; only the header, the interactive demo, the contact form and
the scroll effects hydrate.

```
Browser ──▶ Landing (Next.js BFF: /api/leads, /api/events) ──(LANDING_API_KEY)──▶ backend-dora (GraphQL, `landing` module)
```

The landing page has its own API key (`LANDING_API_KEY`): backend-dora
accepts it only on the landing mutations, never on the app's API.

The landing page has no database of its own: the contact form and the
analytics live in backend-dora's `landing` module (tables `tb_landing_leads`
and `tb_landing_events`), which e-mails each lead through Brevo to
`LANDING_LEADS_INBOX` (suporte.doragestao@gmail.com).

## Run locally

1. backend-dora running on `http://localhost:4000` with its migrations applied.
2. `cp .env.example .env.local` and set `LANDING_API_KEY` (same as the
   backend's) and the contact channels.
3. `npm install && npm run dev` → http://localhost:3001

## Structure

```
src/
├── app/                 page, /privacidade, API routes, robots, sitemap, manifest, OG image
├── server/              BFF ("server-only"): env, backend GraphQL client, services
├── features/
│   ├── landing/         sections (components) and texts (content)
│   ├── contact/         the contact form
│   └── analytics/       the anonymous tracker
├── design-system/       tokens-based shared components
└── shared/              contracts (zod) and public config (site, contacts)
```

## Analytics

First-party and anonymous (no cookies, no IP; Do Not Track / GPC respected):

- `page_view`, `scroll_depth` (25/50/75/100) — automatic;
- `section_view` — any element with `data-track-section="<name>"`;
- `click` — any element with `data-track="<target>:<place>"`
  (`whatsapp`, `email`, `instagram`… count as contact clicks);
- `demo_step`, `video_play`, `video_complete`;
- `form_start`, `form_submit`, `form_success`, `form_error`.

The platform administrator reads them through the backend queries
`landingMetrics(days)` and `landingLeads(days, page)`.

## Content

- Texts: `src/features/landing/content/landing-content.ts`.
- Demo videos: `src/features/landing/content/videos.ts` (YouTube id or an
  mp4 in `public/videos`); the section and the VideoObject structured data
  show them automatically.
- Contact channels and social networks: `NEXT_PUBLIC_*` variables; an empty
  one is hidden.

## Checks

`npx prettier --check src`, `npx tsc --noEmit -p .`, `npx eslint src --quiet`,
`npx next build`.
