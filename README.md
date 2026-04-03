# WorkPulse – Job Search Platform

A mobile-first job searching web app built with vanilla HTML, CSS, and JavaScript. Ready to deploy on Vercel in minutes.

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI (Recommended)
```bash
npm install -g vercel
cd jobhunt
vercel
```
Follow the prompts — it will give you a live URL instantly.

### Option 2: GitHub + Vercel Dashboard
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → "New Project"
3. Import your GitHub repo
4. Click **Deploy** — done!

---

## 📱 Features

- **Welcome / Splash Screen** – App intro with stats and CTA
- **Register Screen** – Job Seeker or Employer modes
- **Login Screen** – With guest access option
- **Home Feed** – Featured jobs + full job listing
- **Category Filters** – Tech, Design, Marketing, Finance, Remote
- **Search** – Live text filter
- **Job Detail** – Full description, requirements, perks
- **Save Jobs** – Bookmark jobs for later
- **Apply** – One-tap apply flow

## 📁 File Structure
```
jobhunt/
├── index.html     # All screens (SPA)
├── style.css      # Mobile-first premium dark UI
├── app.js         # App logic, data, routing
├── vercel.json    # Vercel deployment config
└── README.md
```

## 🎨 Design System
- **Colors**: Deep navy dark theme with indigo/violet accents
- **Fonts**: Syne (headings) + DM Sans (body)
- **Animations**: Smooth slide transitions + fade-up reveals

## 🔧 Customization
- Edit `JOBS` array in `app.js` to add real job listings
- Connect a real backend (Supabase, Firebase, etc.) by replacing the `handleLogin` / `handleRegister` functions
- Add real API calls in the `applyJob()` function