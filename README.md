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

Styled as a high-end command center interface, the platform diverges from traditional dashboards by integrating immersive interactive weapon showcases, deep-dive tactical matrices, node-based neural-hub community systems, and real-time strategic intelligence. The aesthetic embraces "glassmorphism", neon-tactical accents (Vanguard Cyan & Night Vision Green), and rapid micro-animations, targeting a $500K enterprise aesthetic.

## Core Modules

The architecture is divided into the following primary intelligence nodes:

* 🌐 **Command Center (`/`)**: The main global overview dashboard featuring an interactive world map heatmap, active live feeds, and trending strategic weapon deployments.
* 📊 **Intelligence Registry (`/rankings`)**: High-contrast, dynamic data tables sorting the world's most capable global assets based on user votes and hard data (power, speed, stealth).
* ⚔️ **Engagement Matrix (`/compare`)**: Advanced side-by-side radar analysis of global weapon systems, matching up adversaries visually.
* 🛠️ **Defense Simulator (`/simulator`)**: An interactive HUD with budget management where users can craft and balance their ultimate strategic military fleet.
* 🌍 **National Powers (`/countries`)**: Deep-dive nation intelligence, detailing asset allocations across distinct warfighting sectors (Naval, Aircraft, Drones, etc.).
* 🔬 **Weapon Node (`/weapon/[name]`)**: Individual asset dossiers featuring tactical HUD overlays, performance radar charts, and scoring breakdowns.
* 👥 **Neural Hub (`/community`)**: A secure, Discord-inspired community coordination platform with channels, trending intel, and operator leaderboards.
* 🔒 **Secure Auth (`/login`, `/register`)**: Encrypted access portals utilizing premium animated glass panels.
* 🔍 **Explore (`/explore`)**: Full arsenal browser with granular sub-type filtering, grid/table views, and real-time search.
* 🌳 **War Domains (`/war-domains`)**: Complete military taxonomy tree covering Land, Naval, Air, Space, Cyber, Electronic, Nuclear, and Chemical warfare domains.

## Technology Stack

Vanguard OS is built on cutting-edge Web technologies optimized for maximum cinematic performance.

### Core Frameworks
* **[React 18](https://react.dev/)**: The underlying UI library powering instantaneous state.
* **[Vite 5](https://vitejs.dev/)**: Lightning-fast HMR and optimized production builds.
* **[TypeScript 5](https://www.typescriptlang.org/)**: Ensuring strict typing across components and data arrays.

### UI & Styling
* **[Tailwind CSS v3](https://tailwindcss.com/)**: Utility-first styling bound by specific Vanguard design tokens.
* **[Framer Motion](https://www.framer.com/motion/)**: The backbone of fluid, state-driven animations, page transitions, and interactive UI micro-interactions.
* **[Lucide React](https://lucide.dev/)**: Scalable icon integration matching the tactical aesthetic.
* **[shadcn/ui](https://ui.shadcn.com/)**: Accessible component primitives with custom Vanguard theming.

### Data Visualization
* **[Recharts](https://recharts.org/)**: Powering radar, bar, pie, and line charts across intelligence nodes.
* **[React Simple Maps](https://www.react-simple-maps.io/)**: Generating interactive, scalable global vector maps for national footprints.

### Quality Assurance
* **[Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)**: Integrated for rigorous core component validation.
* **[Playwright](https://playwright.dev/)**: End-to-end testing for full user flow verification.

---

## Getting Started

### Prerequisites
Make sure you have Node.js 18+ installed.

### Installation

1. **Clone the Source Core**
   ```bash
   git clone <repository_url>
   cd vanguard-os
   ```

2. **Initialize Dependencies**
   ```bash
   npm install
   ```

3. **Boot the Neural Node**
   ```bash
   npm run dev
   ```

4. **Access the HUD**
   Open your browser and navigate to `http://localhost:8080`.

### Production Deployment
```bash
npm run build
```

### Run Integrity Scans (Tests)
```bash
npm run test
```

---

*Created for Vanguard Intelligence Group*
