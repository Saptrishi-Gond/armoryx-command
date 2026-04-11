<div align="center">

  <h1 align="center">Vanguard Intelligence OS</h1>

  <p align="center">
    <strong>Premium Global Defense & Military Asset Tracking Platform</strong>
  </p>

  <p align="center">
    <a href="#about-the-platform">About</a> •
    <a href="#core-modules">Modules</a> •
    <a href="#technology-stack">Tech Stack</a> •
    <a href="#getting-started">Installation</a>
  </p>

</div>

---

## About the Platform

**Vanguard Intelligence** (formerly World Armory) is a secure, cinematic Global Defense OS SaaS platform designed to monitor, rank, and analyze world weapon systems and national deployments.

Styled as a high-end command center interface, the platform diverges from traditional dashboards by integrating immersive interactive weapon showcases, deep-dive tactical matrices, community voting systems, and real-time strategic intelligence. The aesthetic embraces "glassmorphism", neon-tactical accents (Vanguard Cyan & Night Vision Green), and rapid micro-animations, targeting a premium enterprise aesthetic.

## Core Modules

The architecture is divided into the following primary intelligence nodes:

* 🌐 **Command Center (`/`)**: The main global overview dashboard featuring an interactive world map heatmap, active live feeds, and trending strategic weapon deployments.
* 📊 **Intelligence Registry (`/rankings`)**: High-contrast, dynamic data tables sorting the world's most capable global assets based on user votes and hard data (power, speed, stealth).
* ⚔️ **Engagement Matrix (`/compare`)**: Advanced side-by-side radar analysis of global weapon systems, matching up adversaries visually.
* 🔍 **Explore (`/explore`)**: Full arsenal browser with granular sub-type filtering, grid/table views, and real-time search.
* 🌍 **National Powers (`/countries`)**: Deep-dive nation intelligence, detailing asset allocations across distinct warfighting sectors (Naval, Aircraft, Drones, etc.).
* 🔬 **Weapon Node (`/weapon/[name]`)**: Individual asset dossiers featuring tactical HUD overlays, performance radar charts, and scoring breakdowns.
* 🌳 **War Domains (`/war-domains`)**: Complete military taxonomy tree covering Land, Naval, Air, Space, Cyber, Electronic, Nuclear, and Chemical warfare domains.

## Technology Stack

### Core Frameworks
* **React 18** with **Vite 5** — Fast HMR and optimized builds
* **TypeScript 5** — Strict typing across all components and data
* **React Router 6** — Client-side routing with nested layouts

### UI & Styling
* **Tailwind CSS v3** — Utility-first styling with custom Vanguard design tokens
* **Framer Motion** — Fluid state-driven animations and micro-interactions
* **Lucide React** — Tactical icon system
* **shadcn/ui** — Accessible component primitives

### Data Visualization
* **Recharts** — Radar, bar, pie, and line charts for analytics
* **React Simple Maps** — Interactive SVG world map

### Quality Assurance
* **Vitest** & **React Testing Library** — Component validation
* **Playwright** — End-to-end testing

---

## Getting Started

### Prerequisites
Node.js 18+ and npm/bun installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd worldarmory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open** `http://localhost:8080`

### Production Build
```bash
npm run build
```

### Run Tests
```bash
npm run test
```

---

*Vanguard Intelligence OS — Global Defense Monitoring System*
