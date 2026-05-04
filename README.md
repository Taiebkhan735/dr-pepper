# Dr Pepper Concept Site (Vite + Tailwind)

This project is built with **Vite** and **Tailwind CSS**. It **will not render correctly** if you open `index.html` with VSCode **Live Server** from the project root, because Live Server does **not**:

- compile Tailwind directives from `src/input.css`
- bundle JavaScript imports from `node_modules` (e.g. `gsap`)

## Run locally (recommended)

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (typically `http://localhost:5173`).

## Use Live Server (only if you serve the build output)

1. Build the site:

```bash
npm run build
```

2. In VSCode, right-click **`dist/index.html`** → **Open with Live Server**

This works because `dist/` contains the compiled CSS and bundled JS assets.

## Other commands

```bash
npm run preview
```

`preview` serves the `dist/` build using Vite’s preview server.

