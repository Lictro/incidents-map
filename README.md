Incidents Map

This project was developed as part of a technical challenge to recreate an incident management app.

The application allows users to:

- Visualize incidents on an interactive Mapbox map
- Create new incidents directly from the map
- Manage incident information including priority, description, location, and due dates
- View project insights through a dashboard with key metrics and statistics
- Track incident status, approvals, assignments, and resolution performance

Environment
- Create `.env.local` with your Mapbox token:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.<your_token_here>
```

Run
- `npm run dev` — development server
- `npm run build` — production build
- `npm start` — run production
- `npx tsc --noEmit` — type check

Project layout (key paths)
- `app/` — Next.js App Router routes and layout
- `src/components/IncidentMap` — Mapbox map and markers
- `src/components/CreateIncidentModal` — incident creation form
- `src/components/Dashboard` — dashboard widgets
- `src/data/incidents.mock.json` — seed data
- `src/store/incidents.store.ts` — zustand store
- `src/types/incident.ts` — `Incident` type

Notes
- Priority values used in the app are Spanish: `baja | media | alta`.
- CSS Modules: wrap global element selectors with `:global()` to avoid Turbopack/Next errors.
- Mapbox: ensure the map container has an explicit height for correct rendering.

That's it — run `npm run dev` to start developing.
