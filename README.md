# NeoLife - Personal AI Dashboard

A personal life dashboard for Herbert Cuba Garcia, built with Next.js, Tailwind CSS, and real data.

## Features

- 📊 **Dashboard** - Overview of goals, habits, finances, and opportunities
- 🎯 **Goals** - Track personal and professional goals with progress
- ✅ **Habits** - Build consistency with habit tracking and streaks
- 💰 **Finances** - Complete financial overview with net worth calculation
- 🚀 **Opportunities** - Pipeline for consulting clients and business deals
- 🤖 **AI Insights** - AI-generated recommendations based on your data

## Herbert's Data Included

- Goals: Consulting practice, apartment flip, LinkedIn growth, health goals
- Habits: Gym, running, LinkedIn posts, sleep tracking
- Finances: Salary, investments (250K AI stocks, 700K pension), properties (14MSEK villa, 2.45MSEK apartment)
- Opportunities: Marbella consulting, Fractional CTO clients, Startup OLÉ speaking

## Tech Stack

- Next.js 14 with App Router
- Tailwind CSS with custom Neo-brutalism theme
- TypeScript
- Lucide React for icons

## Getting Started

```bash
cd /Users/herbertcubagarcia/clawd/neolife
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Project Structure

```
neolife/
├── app/
│   ├── page.tsx           # Dashboard
│   ├── goals/page.tsx     # Goals tracking
│   ├── habits/page.tsx    # Habit tracking
│   ├── finances/page.tsx  # Financial overview
│   ├── opportunities/page.tsx  # Pipeline management
│   ├── layout.tsx         # Root layout with sidebar
│   └── globals.css        # Global styles
├── components/
│   ├── Dashboard.tsx      # Main dashboard component
│   └── Sidebar.tsx        # Navigation sidebar
├── lib/
│   └── data.ts            # Herbert's real data and helpers
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Design

Dark theme with acid green accents (Neo-brutalism style). Mobile-first responsive design.

## Future Enhancements

- [ ] Connect to real backend (Supabase)
- [ ] Add OpenAI API for real AI insights
- [ ] Mobile app with React Native
- [ ] Push notifications for habits
- [ ] Integration with external APIs (Avanza, calendar)

---

Built with ❤️ for Herbert
