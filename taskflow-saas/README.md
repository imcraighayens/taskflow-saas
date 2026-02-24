# TaskFlow SaaS (Next.js + Supabase)

## Overview

TaskFlow SaaS is a modern task management platform built with **Next.js 13**, **Supabase**, and **Tailwind CSS**.  It is designed to support multiple users and teams out of the box, with full authentication, row‑level security, and optimistic UI updates.  The frontend is implemented using Next.js’ App Router and React Server/Client components, while Supabase provides authentication, storage, and a PostgreSQL database with Row Level Security.

> **Note:** This repository includes the source code for the frontend only.  A running Supabase project is required to back the app.  See the _Supabase Setup_ section below for instructions on creating tables and policies.

## Features

- **Multi‑user authentication** – sign up, sign in, sign out, and session persistence via Supabase Auth.
- **Per‑user tasks** – tasks are scoped to the currently signed‑in user by default, and only the user (or their team) can view or modify them.
- **Team support** – users can belong to multiple teams.  Tasks can be assigned to a team, allowing all members of that team to collaborate on the task board.
- **Row Level Security (RLS)** – Supabase PostgreSQL RLS policies ensure that data is never leaked across users or teams.  Even if the client queries a table directly, only permitted rows are returned.
- **Optimistic UI updates** – new tasks appear immediately in the board before the database confirms persistence.  If the insert fails, the UI rolls back gracefully.
- **Board and list views** – replicate the board/list/overview views from the original TaskFlow demo, with drag‑and‑drop reordering (via `@dnd-kit/core`) and category counts.
- **Responsive design with Tailwind** – dark/light mode toggles and modern UI components.

## Project Structure

```
taskflow-saas/
├── README.md              – you are here
├── package.json           – dependencies and scripts
├── tsconfig.json          – TypeScript configuration
├── next.config.js         – Next.js config
├── .env.local.example     – environment variables template
├── src/
│   ├── app/
│   │   ├── layout.tsx       – App Router root layout
│   │   ├── page.tsx         – public landing page (sign in or redirect)
│   │   └── dashboard/
│   │       ├── layout.tsx   – dashboard layout with navbar
│   │       ├── page.tsx     – board view
│   │       ├── list.tsx     – list view
│   │       └── overview.tsx – overview view
│   ├── components/
│   │   ├── Auth.tsx         – sign‑in/sign‑up UI component
│   │   ├── Board.tsx        – board view implementation
│   │   ├── TaskCard.tsx     – UI for individual tasks
│   │   └── TaskForm.tsx     – modal form for creating/editing tasks
│   ├── lib/
│   │   ├── supabaseClient.ts – Supabase client initialisation
│   │   └── queries.ts       – hooks for tasks and teams
│   └── types.ts            – shared type definitions
└── …
```

## Supabase Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com/) and note your project URL and anon/service keys.  Copy the anon key into `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and the project URL as `NEXT_PUBLIC_SUPABASE_URL`.  The service role key should be stored securely (not in the client) but will be needed when applying database migrations.

2. **Create tables and relationships.**  Use the SQL editor in Supabase to execute the following statements:

```sql
-- users table is automatically managed by Supabase Auth

create table if not exists public.teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  owner uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now()
);

create table if not exists public.team_members (
  team_id uuid references public.teams(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text default 'member',
  primary key (team_id, user_id)
);

create table if not exists public.tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade, -- owner
  team_id uuid references public.teams(id) on delete set null,
  title text not null,
  description text,
  status text default 'todo', -- 'todo', 'in-progress', 'done'
  priority text default 'mid', -- 'high','mid','low'
  tag text default 'dev', -- category
  due date,
  fav boolean default false,
  assignee text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

3. **Enable Row Level Security and policies.**  Supabase disables access by default when RLS is enabled, so we need explicit policies.  The following SQL enables RLS and allows users to manage their own tasks or tasks belonging to their teams:

```sql
alter table public.tasks enable row level security;

-- Policy: users can view their own tasks or tasks for teams they belong to
create policy "Task read access" on public.tasks
for select
to authenticated
using (
  user_id = auth.uid() OR
  (team_id is not null AND team_id in (
    select team_id from public.team_members where user_id = auth.uid()
  ))
);

-- Policy: users can insert tasks for themselves or for teams they belong to
create policy "Task insert access" on public.tasks
for insert
to authenticated
with check (
  user_id = auth.uid() OR
  (team_id is not null AND team_id in (
    select team_id from public.team_members where user_id = auth.uid()
  ))
);

-- Policy: users can update tasks they own or tasks in their teams
create policy "Task update access" on public.tasks
for update
to authenticated
using (
  user_id = auth.uid() OR
  (team_id is not null AND team_id in (
    select team_id from public.team_members where user_id = auth.uid()
  ))
);

-- Policy: users can delete tasks they own
create policy "Task delete access" on public.tasks
for delete
to authenticated
using ( user_id = auth.uid() );
```

4. **Create team membership policies.**  Similarly enable RLS on `teams` and `team_members` tables so that users can read teams they belong to and owners can manage memberships.  See `database.sql` in this repo for full policies.

## Running the App

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials.

3. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.  When you first visit the site you will be prompted to sign in or sign up.  After authenticating, you’ll land on the dashboard with a board view of your tasks.  You can create tasks, drag them between columns, mark them done, and invite teammates.

## Notes on Optimistic Updates

The hooks in `src/lib/queries.ts` wrap Supabase RPCs with [SWR](https://swr.vercel.app/) to provide data fetching, caching, and optimistic UI.  For example, when creating a task the client immediately updates the local cache and shows the new task at the top of the board.  If the Supabase insert fails the cache rolls back to its previous state.

## Acknowledgements

This project is inspired by the original TaskFlow demo UI.  It modernises the architecture for a SaaS context, using Next.js App Router, Supabase for authentication and database, and Tailwind CSS for styling.