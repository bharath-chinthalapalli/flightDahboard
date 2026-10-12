# Demo checklist

1. Open the dashboard: confirm 20 total, 15 active, 3 delayed, 2 arrived, and 20 map markers.
2. Select AI101 in the table. Check AIRINDIA101, DEL to LHR, aircraft B787-8, UTC times, and a highlighted map route.
3. Click View full flight route, then Fit all. Select a plane directly and inspect its popup.
4. Search `emirates`, status En Route, origin DXB, destination BLR: only EK568 remains on map and table.
5. Change destination to DXB: the map and table show an empty state and the selection clears.
6. Clear filters, sort by callsign, navigate to the next table page, and select a flight. The page should remain selected.
7. Export CSV: verify 20 data rows with no filters, or only matching rows with filters.
8. Collapse and expand the sidebar; map tiles should fill the resized map area. Toggle dark mode.
9. Repeat at desktop 1440 px and tablet portrait 820 px widths. Tablet panels stack and the table scrolls inside its container.

Screenshots in `screenshots/` show the verified desktop and tablet layouts. The data is a fixed mock schedule, not live flight operations.
