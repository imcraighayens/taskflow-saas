# Kodesk - Modern Task Management Dashboard

A high-performance, beautifully crafted task management dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- **Interactive Kanban Board**: Drag and drop tasks between stages.
- **List View**: Sortable and filterable table of all tasks.
- **Database View**: Raw data explorer for tasks, features, and activity logs.
- **Marketplace**: Browse and install modular features.
- **Dark/Light Mode**: Persistent theme switching.
- **Project Filtering**: Filter tasks by department (Design, Dev, Data, etc.).
- **Supabase Ready**: Pre-configured Supabase client for backend integration.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Backend**: Supabase (Integration ready)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd kodesk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The project is ready to be deployed on platforms like Vercel, Netlify, or Railway.

```bash
npm run build
```

The build output will be in the `dist/` directory.

## License

MIT
