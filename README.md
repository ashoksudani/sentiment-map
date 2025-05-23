# Sentiment Map Dashboard

This project visualizes sentiment data on an interactive world map using React, amCharts 5, and Tailwind CSS.

## Getting Started

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd sentiment-map
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the development server

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### 4. Project Structure

- `src/` — Main source code (components, context, pages, etc.)
- `public/geo_sentiments.csv` — Sentiment data file

### 5. Environment

- Node.js 18+ recommended
- Modern browser (Chrome, Firefox, Safari, Edge)

### 6. Customization

- To update sentiment data, replace `public/geo_sentiments.csv` with your own data.
- To change map appearance, edit `src/components/MapChart.tsx` and related components.

---

## Scripts

- `npm run dev` — Start development server with hot reload
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally

---

## Troubleshooting

- If you encounter issues with dependencies, try deleting `node_modules` and `package-lock.json`, then run `npm install` again.
- For Tailwind CSS issues, ensure you have `tailwind.config.js` and `postcss.config.js` in your project root.

---

## License

This project is for technical assessment and demo purposes. For commercial use of amCharts, please obtain a proper license.