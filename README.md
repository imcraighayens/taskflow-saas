# Loop - Smart Investing

A modern banking and investment mobile app built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Features

- Clean, modern UI inspired by premium fintech apps
- Login with email/phone toggle
- Dashboard with balance card and quick actions
- Real-time market listings with mini charts
- Portfolio tracker with holdings and P&L
- Asset detail view with interactive charts and performance metrics
- Profile management
- Fully responsive mobile-first design
- Client-side state management with Zustand

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3
- **State:** Zustand with localStorage persistence
- **Icons:** Lucide React
- **Deployment:** Netlify

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/             # Next.js App Router pages
│   ├── login/       # Authentication
│   └── (app)/       # Protected app routes
│       ├── home/    # Dashboard
│       ├── markets/ # Market listings
│       ├── portfolio/ # User holdings
│       ├── asset/[id]/ # Asset detail
│       └── profile/ # Settings
├── components/      # Reusable UI components
├── store/           # Zustand state stores
├── lib/             # Types, utilities, mock data
└── hooks/           # Custom React hooks
```
