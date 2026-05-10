# Kassem Mansour Co. — Website Refactor (2026)

A production-quality architectural marketing website for KMC Lebanon.

## Tech Stack
- **Framework:** React 19 + Vite (High-performance SPA)
- **Styling:** Tailwind CSS 4.0
- **Animations:** motion (Framer Motion)
- **Typography:** Fraunces (Display) & Manrope (Body) via Google Fonts
- **Routing:** React Router v7

## Project Structure
- `/src/pages`: Individual route components (Home, About, Work, etc.)
- `/src/components`: Shared UI elements (Header, Footer, CustomCursor, WhatsAppButton)
- `/src/lib/utils.ts`: Tailwind CSS utility helpers
- `/src/index.css`: Global styles, brand colors, and typography integration

## Customization

### Swapping Images
Images currently use high-quality Unsplash placeholders. To swap with professional photography:
1. Open the relevant page in `/src/pages/`
2. Locate the `img` tags or project data arrays
3. Replace the `src` URLs with your local assets or CDN links

### Updating Case Studies
Project data for the portfolio modal is located in `/src/pages/Work.tsx`. You can add or modify projects in the `PROJECTS` array.

### Colors
Brand colors are defined as CSS variables in `/src/index.css` under `@theme`. Modifying these will update the entire site's palette instantly.

## Deployment
This app is ready for deployment to any static hosting or Node.js environment. 
For Hostinger:
1. `npm install`
2. `npm run build`
3. Upload the contents of `dist/` to your public directory (or follow Hostinger's Node.js flow if using a custom server).

---
© Kassem Mansour Co. · Beirut · Lebanon
