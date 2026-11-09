# Vyshnavi Madala — Portfolio

AI/ML Engineer, Software Engineer, and Data Analyst developer portfolio built with a dark, technical Signal HUD aesthetic.

**Live site:** https://vyshnavimadala-portfolio.vercel.app/

Built during the placement training program at [TAP Academy](https://thetapacademy.com/) (full-stack development, AI and augmented reality training).

## Tech Stack
- **React 19** — Component-driven frontend architecture
- **Vite** — High-performance bundling and development server
- **Tailwind CSS 4** — Utility-first styling with `@theme` design tokens
- **GSAP + ScrollTrigger** — Coordinated choreography, pin-scrolling, and entrance reveals
- **Lenis** — Hardware-accelerated smooth scrolling unified with GSAP's ticker
- **Three.js** — Interactive 3D signal core centerpiece with custom shaders and line loops
- **EmailJS** — Terminal contact form dispatch with mailto fallback

## Run Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/Vyshu-coder/vyshnavimadala.git
cd vyshnavimadala
npm install
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Environment Variables

Create a `.env.local` file in the root directory for EmailJS form handling:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```
