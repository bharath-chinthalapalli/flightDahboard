# SkyTrack Flight Operations Dashboard

An Angular 16 dashboard with 20 mock flights, a Leaflet map, linked flight details, and an Angular Material operations table. No backend or credentials are required.

Repository: https://github.com/bharath-chinthalapalli/flightDahboard

## Setup

Use Node.js 18.16+ (18.x) and npm 9 for this Angular 16 project.

```sh
npm ci
npm start
```

Open http://localhost:4200/dashboard/mainDashboard. The root URL redirects to the dashboard. Internet access is needed for OpenStreetMap tiles and the existing Google-hosted fonts/icons. Mock data, filters, table, and route overlays run locally; a tile failure displays an explanatory notice.

## Build and test

```sh
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

The production build goes to `dist/flight-dashboard`. Tests need an installed Chrome browser; set `CHROME_BIN` to its executable if auto-discovery fails. Deploy with an SPA fallback to `index.html` so deep links work.

## Using the dashboard

- Search by callsign, then combine status, origin, and destination filters. Clear filters restores all 20 flights.
- Select a plane or a table row to view details, highlight its route, and center the map on the aircraft. Plane popups include flight number, callsign, origin, destination, and status.
- Use **View full flight route** to fit both airports, or **Fit all** to fit the filtered aircraft positions. Map zoom buttons and keyboard navigation are supported; wheel zoom is disabled to keep page scrolling predictable.
- Sort the Material table by its column headings. Its paginator supports 8, 16, or 20 rows. **Export CSV** exports every filtered flight, including those on other pages.
- Collapse/expand the sidebar from the topbar. Tablet navigation uses an overlay. Dark mode changes the dashboard surfaces; the geographic map stays light for readability.

## Data and KPI definitions

Data is in `src/app/shared/data/mock-flights.ts`, with typed models in `src/app/shared/dto/flight.ts`.

The fixed demo contains **20 total**, **15 active** (12 en route + 3 boarding), **3 delayed**, and **2 arrived** flights. KPI cards always summarize the full dataset; filters change the map and table. Delayed flights are counted separately from active flights. The average delay is 36 minutes.

All ETD/ETA values are a fixed demonstration schedule in UTC, not today's live operational estimates. Aircraft positions are interpolated between airports, not real tracking data. Routes are illustrative straight polylines, not approved airway paths. Selection clears if filtering excludes the selected flight.

## Architecture

- `FlightService`: RxJS subjects and shared streams for the flight list, combined filters, and selected flight. Components consume observables or use inputs/outputs.
- `TopBarComponent`: typed Reactive Forms, debounced filter changes, and subscription cleanup using Angular 16's `takeUntilDestroyed`.
- `MainDashboardComponent`: derives KPI values and composes the map, details, and table.
- `FlightMapComponent`: Leaflet markers, popups, route polylines and airport endpoints. Cleans up map resources and uses `ResizeObserver` after sidebar/viewport changes.
- `FlightDetailsComponent`: reusable selected-flight panel with typed inputs and explicit actions.
- `FlightTableComponent`: Material table, sorting, pagination, selection, and CSV export.
- `DashboardModule`: lazy-loaded routing and required Material modules.

See [design explanation](docs/DESIGN.md) and [demo checklist](docs/DEMO.md). Screenshots are in [docs/screenshots](docs/screenshots).

## Dependencies and attribution

Leaflet 1.9.4 and Angular Material 16 are used. Geographic tiles are provided by OpenStreetMap with visible attribution. References: [Leaflet 1.9.4 API](https://leafletjs.com/reference-1.9.4.html), [Angular Material table](https://v16.material.angular.dev/components/table/overview), and [Angular reactive forms](https://angular.dev/guide/forms/reactive-forms).

The sidebar's Flights, Airports, Reports, and Settings items remain demonstration navigation; the implemented feature page is the routed operations dashboard. Weather in the sidebar is labeled as demo data. Playback, clustering, and weather overlays are outside this implementation.

Production build passes with advisory warnings: Leaflet 1.9 is distributed as CommonJS, and the initial bundle is approximately 550 kB against the project's 500 kB warning budget (the 1 MB error limit is met). The existing Angular 16 dependency tree also has npm audit advisories; updating the major framework version is a separate maintenance task.

## Component styles

Each dashboard component keeps its template and styles in its own `.component.html` and `.component.scss` files. `styles.scss` contains only the Leaflet stylesheet import, Tailwind directives, and page/font defaults. Dark styles belong to their respective components. The map stylesheet is scoped under `app-flight-map` because Leaflet creates marker and popup elements outside Angular's template rendering.

The component stylesheet sizes (approximately 2.9–3.1 kB) exceed the current 2 kB advisory budget but stay below the 4 kB error limit. No budgets were increased during the refactor.
