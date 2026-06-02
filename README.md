# YekBûn — Web App

Public-facing web app for [yekbun.app](https://yekbun.app) — the landing page, login,
and user dashboard for the YekBûn Kurdish social platform.

This repo is the **frontend only**. It talks to the Laravel backend at
`api.appdash.yekbun.org` via REST.

---

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** + **framer-motion**
- **React Query** for data fetching + caching
- **react-router-dom** for routing
- **axios** for HTTP

## Getting started

```bash
# 1. Install deps
npm install     # or: bun install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local — set VITE_API_URL

# 3. Run dev server
npm run dev     # http://localhost:8080
```

## Environment variables

| Var | Description |
|---|---|
| `VITE_API_URL` | Backend base URL (e.g. `https://api.appdash.yekbun.org/api`). Required. |

For local backend development, point at `http://localhost:8000/api` (matches
`php artisan serve` default).

## Project structure

```
src/
├── App.tsx              # Router + providers
├── main.tsx             # Entry
├── lib/
│   ├── api.ts           # Axios client + 401 interceptor
│   └── utils.ts
├── hooks/
│   ├── use-auth.ts          # useLogin, useOtpSend, useOtpVerify, useLogout
│   ├── use-current-user.ts  # Identity adapter (matches old userProfile shape)
│   ├── use-wallet.ts        # /wallet/dashboard, /wallet/payments
│   └── use-landing.ts       # Public landing data (shops, music, polls, feed, ...)
├── pages/
│   ├── Landing.tsx          # Marketing landing
│   ├── Login.tsx            # OTP-based login (2-step)
│   ├── Pricing.tsx
│   └── dashboard/           # Authenticated user dashboard
├── components/
│   ├── landing/             # Landing sections
│   ├── layout/              # Navbar, DashboardLayout, Footer
│   ├── ui/                  # shadcn primitives
│   └── PwaInstallBanner.tsx
└── data/
    ├── mock.ts              # Mock data — used as fallback when backend is empty
    └── dummy*.ts            # Per-section mock data
```

## Authentication

Login is **passwordless OTP**:

1. User enters email → `POST /api/otp-login/send` → 6-digit code emailed
2. User enters code → `POST /api/otp-login/verify` → JWT returned
3. Token stored in `localStorage` under `yekbun_user_token`
4. `axios` request interceptor attaches `Authorization: Bearer <token>` automatically
5. 401 from server → token cleared + redirect to `/login`

In **debug mode** (`APP_DEBUG=true` on the backend), the OTP code comes back in the
send response under `dev_code` and gets toasted so devs can test without an SMTP
server.

## Data sources

Each section either reads from the backend or falls back to mock data when the
backend is empty / errors out — the UI never renders a blank slate.

| Section | Backend endpoint | Hook |
|---|---|---|
| Wallet dashboard | `GET /api/wallet/dashboard` | `useWalletDashboard` |
| Wallet payments | `GET /api/wallet/payments` | `useWalletPayments` |
| Partner shops | `GET /api/zercash/shops` | `usePartnerShops` |
| Artists | `GET /api/get-artists-public` | `useLandingArtists` |
| Music tracks | `GET /api/get-all-songs-public` | `useLandingMusic` |
| Videos | `GET /api/get-all-videos-public` | `useLandingVideos` |
| Polls | `GET /api/voting-public` | `useLandingPolls*` |
| Social feed | `GET /api/public-feeds` | `useLandingFeed*` |

## Build & deploy

```bash
npm run build         # outputs to ./dist
npm run preview       # serve the built bundle locally
```

The build produces a single-page app under `dist/`. Upload that to any static host
(Plesk, Vercel, Netlify, S3+CloudFront, ...). Make sure the host rewrites unknown
paths to `index.html` so client-side routing works (otherwise deep links 404).

**Plesk note**: enable "Rewrite engine" + add a rule mapping `^(?!.*\.).*$` → `/index.html`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server (port 8080) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint |
| `npm run test` | Vitest run |

## Related repos

- **Admin dashboard** — `YekbunPro/YekBunDashboard` (separate repo)
- **Backend** — Laravel 12 + MongoDB (separate repo)
