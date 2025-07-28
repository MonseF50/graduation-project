# Copilot Instructions for AI Agents

## Project Overview
- This is an Angular-based eCommerce web application (Angular CLI v19.2.12).
- The main app code is in `src/app/`, organized by feature: `pages/`, `layouts/`, `shared/`, and `core/`.
- Static assets (images, fonts, i18n) are in `public/`.
- The project supports server-side rendering (see `main.server.ts`, `server.ts`).

## Key Workflows
- **Start Dev Server:**
  - Use `ng serve` or `npm start` (see tasks.json) to run locally at `http://localhost:4200/`.
- **Build:**
  - Run `ng build` to output to `dist/`.
- **Unit Tests:**
  - Run `ng test` (Karma runner).
- **E2E Tests:**
  - Run `ng e2e` (framework not included by default).

## Code Organization & Patterns
- **Pages:**
  - Each feature/page (e.g., `cart`, `login`, `not-founded`) is in its own folder under `src/app/pages/`.
  - Example: `not-founded` page uses a custom navbar and error image, with navigation links.
- **Layouts:**
  - Shared UI layouts (navbar, footer, etc.) in `src/app/layouts/`.
- **Shared Components:**
  - Reusable UI elements in `src/app/shared/components/`.
- **Core Services:**
  - App-wide services, guards, and interceptors in `src/app/core/`.
- **Styling:**
  - Global styles in `src/styles.css` and `src/app/global/_variables.scss`.
  - Font assets in `public/fonts/`.
- **Internationalization:**
  - Language files in `public/i18n/` (e.g., `en.json`, `ar.json`).

## Conventions & Integration
- **Routing:**
  - Route configs in `app.routes.ts` and `app.routes.server.ts`.
- **Component Naming:**
  - Use Angular CLI conventions: `ng generate component <name>`.
- **Assets:**
  - Reference images and fonts using `/images/` and `/fonts/` paths.
- **Environment Configs:**
  - Use `src/app/core/environments/` for environment-specific settings.
- **Server-Side Rendering:**
  - Entry points: `main.server.ts`, `server.ts`.

## External Dependencies
- Managed via `package.json`.
- Angular CLI, Karma (unit tests), and other dependencies as listed.

## Example: Adding a New Page
1. Run `ng generate component pages/new-page`.
2. Add route in `app.routes.ts`.
3. Place assets in `public/images/` or `public/fonts/` as needed.
4. Use shared/layout components for consistent UI.

---

**For questions or unclear patterns, review `README.md` or ask for clarification.**
