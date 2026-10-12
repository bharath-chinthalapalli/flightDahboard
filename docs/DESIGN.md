# SkyTrack: Design Explanation

## Purpose and information hierarchy

SkyTrack is a demonstration aviation operations workspace. It supports the primary controller workflow: understand the fleet, find a flight, inspect its position and route, and check its operational details. The supplied visual reference informed the arrangement of four status cards above a large geographic map, a flight detail panel to the right, and a flight table underneath. The existing sidebar, topbar toggle, and card structure are retained so the additions belong to the current application.

The four cards provide a stable fleet summary. Their values come from the same data as the map and table: 20 flights, 15 active, three delayed, and two arrived. Active means en route or boarding; delayed is a separate bucket. Keeping the cards independent of filters avoids mistaking a narrow search result for the entire fleet. The map's track count and table's flight count describe the current filtered result instead.

## Layout and visual language

The map is the largest workspace element. On wide desktop screens, a two-to-one grid places it next to the details panel. On smaller desktops and tablets, the panels stack, giving the map enough width for readable geographic context. The table scrolls horizontally inside its own container, rather than widening the whole page. Pagination limits the initial table to eight flights.

A navy navigation rail establishes the application identity, while pale page backgrounds, white panels, thin borders, and modest shadows distinguish the work surfaces. Blue identifies navigation and route actions. Green indicates en route flights, red indicates delays, amber indicates boarding, and slate indicates arrivals. Every colored status also has a visible text label, so interpretation does not depend on color alone. The cards preserve the user's layout while replacing hand-entered numbers with derived counts.

Compact uppercase labels establish a distinction between field names and operational values. Flight numbers and airport codes carry stronger emphasis than supporting airport names. Consistent panel padding and gaps keep the fairly dense table and detail panel readable. The interface explicitly labels the data as mocked and all schedule values as UTC.

## Flight discovery and selection

Search by callsign and the three airport/status filters combine with AND semantics. The topbar uses typed Reactive Forms and a short debounce, so typing does not repeatedly rebuild the map on every keystroke. Clear filters provides an immediate way back to the complete dataset. Empty results produce explanatory text on both the map and table, and remove any route that no longer belongs to the result.

Flight selection is shared by the map, table, and detail panel. A plane marker has a descriptive accessible title, and its popup shows flight number, callsign, origin, destination, and status. Selecting a marker or row highlights the aircraft, draws a dashed origin-to-destination route, identifies the airport endpoints, and centers the map on the selected aircraft. A highlighted row helps users retain context when moving between the geographic and tabular views.

The details panel presents the requested identity, aircraft, airports, status, and estimated times, plus mock altitude, speed, and route progress. Closing the panel clears the selection and route. The full-route action fits both endpoints; Fit all restores the overview of filtered aircraft. These are distinct actions because close inspection of one aircraft and inspection of its whole journey require different map extents.

## Accessibility and responsive behavior

Controls have accessible names, visible keyboard focus, and meaningful button semantics. Search and filters have labels even when their compact presentation omits visible field captions. The table uses Material header, sort, and paginator controls; flight-number buttons provide keyboard selection even though mouse users can click anywhere on a row. The detail panel announces changes politely. Status text, legends, and UTC labels communicate information independently of icons and color.

Desktop sidebar collapse frees space for the workspace. On tablet portrait layouts, navigation is an overlay with an outside-close control; hidden navigation is inert to prevent keyboard focus entering offscreen controls. The sidebar remains scrollable without a visible scrollbar. A ResizeObserver updates Leaflet's dimensions when the sidebar changes, preventing blank map edges. Map wheel zoom is disabled so scrolling through the dashboard does not accidentally change the map.

## Implementation choices and limits

Reusable Angular components isolate Leaflet's imperative rendering from the details and table. A typed service owns RxJS data, filtering, and selection streams, avoiding separate mock copies and conflicting states. Angular Material supplies the data table, paginator, sort controls, buttons, and progress indicator. The dashboard remains lazy-loaded through Angular routing.

Twenty deterministic mock records make demonstrations and regression checks repeatable. Geographic tiles need internet access, while markers and route overlays continue working if tiles fail. Positions and straight route lines are illustrative rather than live telemetry or flight planning information. Dark mode applies to the operational surfaces while leaving the base map readable. Animation, marker clustering, dispatch workflows, and live weather are optional future enhancements.
