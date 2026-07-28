
# TASK INSTRUCTION FOR AI AGENT: FIX SEARCH CONSOLE CANONICAL ISSUES

## PROJECT CONTEXT
- Domain: https://lincahtravel.web.id
- Framework: Astro.js
- Problem: Google Search Console reported "Duplicate without user-selected canonical" for 81 routes (including two-way travel routes like `/baturaja/palembang/` and `/palembang/baturaja/`, blog posts, and destination pages).
- Goal: Implement dynamic, accurate, and absolute `<link rel="canonical">` tags across all pages, enforce consistent trailing slash handling, and auto-generate an updated `sitemap.xml`.

---

## EXECUTION STEPS

### STEP 1: CONFIGURATION AT `astro.config.mjs`
1. Open `astro.config.mjs`.
2. Ensure the `site` property is strictly set to `'https://lincahtravel.web.id'` (no trailing slash in domain definition).
3. Set `trailingSlash: 'always'` to enforce trailing slashes across all generated canonical URLs and routes.
4. Verify or add `@astrojs/sitemap` integration to automatically build a valid sitemap.
   - If `@astrojs/sitemap` is missing from `astro.config.mjs`, import and add it into the `integrations` array.

Example expected state for `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: '[https://lincahtravel.web.id](https://lincahtravel.web.id)',
  trailingSlash: 'always',
  integrations: [sitemap()],
});

```

---

### STEP 2: IMPLEMENT DYNAMIC CANONICAL TAG IN MAIN LAYOUT

1. Locate the main base layout file (e.g., `src/layouts/Layout.astro` or `src/layouts/BaseLayout.astro`).
2. Update the layout script component (`---`) to handle canonical URL generation:
* Accept an optional `canonical` prop of type `string` (allows individual page overrides if needed).
* Get the current path using `Astro.url.pathname`.
* Construct the default canonical URL using `new URL(Astro.url.pathname, Astro.site)`.
* Resolve final canonical URL: if `Astro.props.canonical` is supplied, use `new URL(Astro.props.canonical, Astro.site).href`; otherwise, use the default URL's `.href`.


3. In the `<head>` section of the HTML template, add or replace the canonical tag with:
```html
<link rel="canonical" href={canonicalURL} />

```



Example implementation for `src/layouts/Layout.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
  canonical?: string;
}

const { title, description, canonical } = Astro.props;

// Construct full absolute canonical URL with guaranteed trailing slash structure
const rawCanonical = canonical || Astro.url.pathname;
const canonicalURL = new URL(rawCanonical, Astro.site).href;
---

<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}

    <!-- Canonical Tag -->
    <link rel="canonical" href={canonicalURL} />
  </head>
  <body>
    <slot />
  </body>
</html>

```

---

### STEP 3: AUDIT & UPDATE DYNAMIC ROUTE PAGES

1. Search all page components inside `src/pages/` (especially dynamic routes like `[asal]/[tujuan].astro`, `[slug].astro`, and `blog/[...slug].astro`).
2. Ensure EVERY page uses the main Layout component (`Layout.astro`).
3. Verify that pages do NOT manually hardcode any separate `<link rel="canonical">` inside their body or local head elements, to avoid duplicate canonical tag declarations.

---

### STEP 4: VERIFICATION & VALIDATION

1. Run `npm run build` or `astro build` to generate the production build in the `dist/` directory.
2. Inspect generated HTML files in `dist/` (e.g., `dist/baturaja/palembang/index.html` and `dist/blog/index.html`):
* Check that `<link rel="canonical" href="https://lincahtravel.web.id/baturaja/palembang/" />` exists inside `<head>`.
* Confirm that every canonical URL starts with `https://lincahtravel.web.id` and ends with a trailing slash `/`.


3. Verify that `dist/sitemap-index.xml` or `dist/sitemap-0.xml` is generated properly.

---

## CONSTRAINTS & RULES FOR AGENT

* DO NOT use relative URLs in the `href` attribute of the `<link rel="canonical">` tag. Always use full, absolute URLs starting with `https://lincahtravel.web.id`.
* DO NOT remove existing page props or styles in `Layout.astro`.
* DO NOT duplicate canonical tags across child components.

```

```
