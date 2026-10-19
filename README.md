# Component Library · Accordion

```bash
npm install
npm run dev
```

## Structure (feature-based)

```
src/
├── main.jsx                  entry point
├── app/App.jsx               composes the features into the page
├── styles/index.css          design tokens + global styles
├── features/
│   ├── accordion/            Accordion, AccordionItem, Highlight, FAQ data, option/default config
│   ├── options/              sidebar with all the accordion controls
│   ├── search/               Hero + SearchForm
│   ├── status/               RingStat (live status rings)
│   ├── code-preview/         CodeBlock + useCopyToClipboard
│   └── theme/                useTheme (light/dark)
└── shared/
    ├── components/           Icon, Select, Checkbox (reusable, feature-agnostic)
    └── hooks/                useMediaQuery
```

Rules: a feature exposes its public API through its own `index.js`; features import
from other features only via that `index.js`, and `shared/` never imports from `features/`.
The `@` alias points to `src/`.

## Deploy to GitHub Pages

1. Push the project to a GitHub repo (branch `main`).
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Every push to `main` builds and publishes the site (see `.github/workflows/deploy.yml`).
