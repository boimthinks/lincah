# Graph Report - .  (2026-08-02)

## Corpus Check
- 243 files · ~112,805 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 231 nodes · 225 edges · 40 communities (14 shown, 26 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Astro - @Astrojs/React - @Astrojs/Sit...
- Features - Fleet - Floatingwhatsapp
- Astro:Content - Blogcontent - Blogtoc
- Dom - Dom.Iterable - Es2022
- Autoprefixer - Esbuild - Vite
- Faq - Faq() - Faqitem
- Packageon - Name - Private
- Content.Config - Blogcollection - Cit...
- Blogcard - Categorybadgecolor - Categ...
- Types - Bookingdetails - Faqitem
- Bookingform - Bookingform() - Booking...
- App - App
- Auth - Auth
- Bottomnav - Bottomnav
- Cards - Cards
- Charts - Charts
- Icons - Icon
- Modal - Modal
- Navbar - Navbar
- Tables - Tables
- Toast - Toast
- Config - App Config
- Dashboard - Dashboardpage
- Expenses - Expensespage
- Login - Loginpage
- Logs - Logspage
- Notas - Notaspage
- Passengers - Passengerspage
- Reports - Reportspage
- Settings - Settingspage
- Vendors - Vendorspage
- Router - Router
- Supabase
- Dates - Dateutils
- Helpers - Helpers
- Static Assets

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `scripts` - 8 edges
3. `lib` - 4 edges
4. `@astrojs/react` - 2 edges
5. `@astrojs/sitemap` - 2 edges
6. `@google/genai` - 2 edges
7. `@tailwindcss/postcss` - 2 edges
8. `@tailwindcss/vite` - 2 edges
9. `@vitejs/plugin-react` - 2 edges
10. `astro` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (40 total, 26 thin omitted)

### Community 0 - "Astro - @Astrojs/React - @Astrojs/Sit..."
Cohesion: 0.07
Nodes (29): astro, @astrojs/react, @astrojs/sitemap, dotenv, express, @google/genai, motion, dependencies (+21 more)

### Community 1 - "Features - Fleet - Floatingwhatsapp"
Cohesion: 0.10
Nodes (9): CTAS, encodedText, Route, RoutesPricesProps, quickLinks, filteredRoutes, originalFromName, routesData (+1 more)

### Community 2 - "Astro:Content - Blogcontent - Blogtoc"
Cohesion: 0.09
Nodes (6): tocHeadings, otherPosts, string, categoryLabels, formattedDate, relatedPosts

### Community 3 - "Dom - Dom.Iterable - Es2022"
Cohesion: 0.11
Nodes (18): DOM, DOM.Iterable, ES2022, compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules (+10 more)

### Community 4 - "Autoprefixer - Esbuild - Vite"
Cohesion: 0.11
Nodes (18): autoprefixer, esbuild, vite, devDependencies, autoprefixer, esbuild, tailwindcss, tsx (+10 more)

### Community 5 - "Faq - Faq() - Faqitem"
Cohesion: 0.11
Nodes (8): FaqItem, FAQProps, HeroProps, Route, faqsData, routesData, testimonialsData, vehiclesData

### Community 6 - "Packageon - Name - Private"
Cohesion: 0.15
Nodes (12): name, private, scripts, astro, build, clean, dev, lint (+4 more)

### Community 7 - "Content.Config - Blogcollection - Cit..."
Cohesion: 0.18
Nodes (10): blogCollection, cityImagesCollection, collections, districtsCollection, faqCollection, hotelsCollection, publicTransportCollection, routesCollection (+2 more)

### Community 8 - "Blogcard - Categorybadgecolor - Categ..."
Cohesion: 0.22
Nodes (4): categoryBadgeColor, categoryLabels, formattedDate, posts

### Community 9 - "Types - Bookingdetails - Faqitem"
Cohesion: 0.33
Nodes (5): BookingDetails, FaqItem, RouteItem, Testimonial, Vehicle

## Knowledge Gaps
- **117 isolated node(s):** `App`, `Auth`, `BottomNav`, `Cards`, `Charts` (+112 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Astro - @Astrojs/React - @Astrojs/Sit...` to `Autoprefixer - Esbuild - Vite`, `Packageon - Name - Private`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Autoprefixer - Esbuild - Vite` to `Packageon - Name - Private`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `App`, `Auth`, `BottomNav` to the rest of the system?**
  _117 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Astro - @Astrojs/React - @Astrojs/Sit...` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Features - Fleet - Floatingwhatsapp` be split into smaller, more focused modules?**
  _Cohesion score 0.10256410256410256 - nodes in this community are weakly interconnected._
- **Should `Astro:Content - Blogcontent - Blogtoc` be split into smaller, more focused modules?**
  _Cohesion score 0.09486166007905138 - nodes in this community are weakly interconnected._
- **Should `Dom - Dom.Iterable - Es2022` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._