# stinson-tools

Internal sales manager tools for Stinson Services.
Hosted on Vercel. Deployed automatically on every push to `main`.

## Live URLs

| Tool | URL |
|------|-----|
| Sales Manager home | `yourdomain.com/sales-manager` |
| Weekly Sales Review | `yourdomain.com/sales-manager/weekly-review` |
| Weekly 1-on-1 Agenda | `yourdomain.com/sales-manager/1on1-agenda` |

## Structure

```
stinson-tools/
├── index.html                          ← redirects to /sales-manager
├── vercel.json                         ← security headers + URL routing
├── sales-manager/
│   ├── index.html                      ← tools directory / home page
│   ├── weekly-review/
│   │   └── index.html                  ← pipeline review tool
│   └── 1on1-agenda/
│       └── index.html                  ← SLII meeting agenda tool
└── assets/
    ├── css/
    │   └── stinson.css                 ← shared design system
    └── js/
        └── shared.js                   ← shared utilities
```

## Adding a new tool

1. Create a new folder under `sales-manager/` e.g. `sales-manager/estimator/`
2. Add an `index.html` inside it
3. Link the shared CSS and JS at the top:
   ```html
   <link rel="stylesheet" href="../../assets/css/stinson.css">
   <script src="../../assets/js/shared.js"></script>
   ```
4. Add a rewrite rule to `vercel.json`
5. Add a card to `sales-manager/index.html`
6. Push to GitHub — Vercel deploys automatically

## Deployment

- **Host**: Vercel (connected to this GitHub repo)
- **Auto-deploy**: Every push to `main` branch
- **Custom domain**: Set in Vercel dashboard → Settings → Domains
- **HTTPS**: Automatic via Vercel

## Security

All tools are static HTML — no backend, no database, no user data stored.
Security headers applied via `vercel.json`. For login-gating, add
Cloudflare Access in front of the Vercel domain (free up to 50 users).

## Tech stack

- Pure HTML, CSS, JavaScript — no build step, no dependencies
- Shared design tokens in `assets/css/stinson.css`
- Shared utilities in `assets/js/shared.js`
- Fonts: DM Serif Display, DM Mono, Instrument Sans (Google Fonts)
