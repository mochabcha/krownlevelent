# Krown Level Enterprises

Community sustainability through wellness, agriculture, and self-defense.

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **TailwindCSS 3** — Utility-first CSS
- **Framer Motion** — Animations
- **Lucide React** — Icons
- **React Helmet Async** — SEO / meta tags
- **React Intersection Observer** — Scroll-triggered animations

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

## Build

```bash
npm run build
npm run preview
```

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
