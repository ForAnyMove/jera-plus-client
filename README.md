# Jera Plus Client Web Application

Official client-facing web application for **Jera Plus** — international trading company in petroleum products (LPG, Diesel, Gasoline, Base Oils), petrochemicals, polymers, agricultural flax seed, and mineral raw materials.

---

## 🌟 Key Features

- **High-Performance Architecture:** React 18 powered by Vite.
- **Multilingual Support:** Instant language toggle (English / Russian) across the entire UI.
- **Dual Visual Themes:** Seamless toggle between Day and Night themes.
- **Dynamic Content Engine:** Automatically pulls products, services, news, careers, company stats, and SEO metadata from the backend API, with automatic fallback to high-quality cached data if offline.
- **Lead Capture & Inquiries:**
  - Interactive "Request a Quote" modal with prefilled product/service topics.
  - Interactive contact form with bot-trap honeypot protection.
  - Newsletter subscription banner connecting to the backend subscriber list.
- **Dynamic SEO:** Synchronizes `<title>` and `<meta name="description">` in real time with active language and CMS settings.
- **Production Routing:** Includes `vercel.json` with SPA rewrite rules for zero 404s on refresh or deep links.

---

## 🛠 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment (optional):**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *Note: In local development, if `VITE_API_URL` is omitted, Vite automatically proxies `/api` and `/uploads` to `http://localhost:5000`.*

3. **Start local dev server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your client repository.
4. Framework Preset will be automatically detected as **Vite**.
5. In **Environment Variables**, add:
   - `VITE_API_URL`: URL of your Render backend (e.g. `https://jera-plus-api.onrender.com`)
6. Click **Deploy**.

*Note: `vercel.json` is preconfigured to handle SPA routing seamlessly.*

---

## 📦 Git Push Commands
```bash
git init
git add .
git commit -m "feat: production client web app with dynamic content, newsletter, and Vercel config"
git branch -M main
git remote add origin <YOUR_FRONT_REPO_URL>
git push -u origin main
```
