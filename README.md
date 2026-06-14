# Krown Level Enterprises

Community sustainability through agriculture education, wellness education, financial literacy, and self-defense.

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **TailwindCSS 3** — Utility-first CSS
- **Framer Motion** — Animations
- **Lucide React** — Icons
- **React Helmet Async** — SEO / meta tags
- **React Intersection Observer** — Scroll-triggered animations
- **Express + MongoDB** — Admin backend, sessions, editable content
- **Amazon S3 + Sharp** — Media library storage and image optimization
- **Resend** — Contact form email delivery

## Design System

Atomic design hierarchy:

| Layer       | Count | Path                          |
|-------------|-------|-------------------------------|
| Atoms       | 11    | `src/components/atoms/`       |
| Molecules   | 10    | `src/components/molecules/`   |
| Organisms   | 17    | `src/components/organisms/`   |
| Templates   | 1     | `src/components/templates/`   |
| Pages       | 1     | `src/components/pages/`       |

## Theme

- **Fonts:** Gloock (headings), Bebas Neue (eyebrows/h6/blockquotes), Red Hat Text (body)
- **Type Scale:** Perfect Fourth (1.333)
- **Colors:** Brand purple, deep indigo, gold, forest green — derived from the KLE logo
- **Modes:** Dark and light themes via CSS custom properties + Tailwind `dark:` class

## Quick Start

```bash
npm install
npm run dev
```

The Vite dev server still runs the frontend only. Run the API/server separately when working on backend behavior:

```bash
cp .env.example .env
npm run dev:server
```

## Build

```bash
npm run build
npm start
```

`npm start` serves the built Vite app from `dist/` and all `/api/*` routes from Express.

## Admin Backend

- Visit `/?edit` to open the admin portal.
- First setup requires `ADMIN_USERNAME` and `ADMIN_SETUP_CODE`, then saves a 12+ character password.
- MongoDB stores editable content, events, testimonials, settings, sessions, and media metadata.
- S3 stores uploaded originals and optimized WebP variants.
- Resend sends contact form submissions to `info@krownlevelent.com` with the visitor email as `replyTo`.
- If `MONGODB_URI` is missing, public pages fall back to the bundled default content and admin writes are disabled.

## Features

- Responsive single-page scroll site
- Dark/light theme toggle
- Sticky header with logo shrink on scroll
- Mobile FAB for VCF contact card download
- Scroll-triggered entrance animations on every section
- Galaxy/starry night gradient backgrounds
- SEO: Open Graph, Twitter Cards, JSON-LD structured data
- Golden ratio Perfect Fourth type scale
- Full atomic design component hierarchy
