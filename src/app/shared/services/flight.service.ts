import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, shareReplay } from 'rxjs';
import { AIRPORTS, MOCK_FLIGHTS } from '../data/mock-flights';
import { Flight, FlightFilters } from '../dto/flight';

export const EMPTY_FILTERS: FlightFilters = { search: '', status: '', origin: '', destination: '' };
export function filterFlights(flights: Flight[], filters: FlightFilters): Flight[] {
  const search = filters.search.trim().toLowerCase();
  return flights.filter(
    (flight) =>
      (!search || flight.callsign.toLowerCase().includes(search)) &&
      (!filters.status || flight.status === filters.status) &&
      (!filters.origin || flight.origin.code === filters.origin) &&
      (!filters.destination || flight.destination.code === filters.destination),
  );
}

@Injectable({ providedIn: 'root' })
export class FlightService {
  readonly airports = [...AIRPORTS].sort((a, b) => a.code.localeCompare(b.code));
  readonly statuses = ['En Route', 'Delayed', 'Boarding', 'Arrived'];
  private readonly flightsSubject = new BehaviorSubject<Flight[]>(MOCK_FLIGHTS);
  private readonly filtersSubject = new BehaviorSubject<FlightFilters>(EMPTY_FILTERS);
  private readonly selectedFlightId = new BehaviorSubject<string | null>(MOCK_FLIGHTS[0].id);
  readonly flights$ = this.flightsSubject.asObservable();
  readonly filteredFlights$ = combineLatest([this.flightsSubject, this.filtersSubject]).pipe(
    map(([flights, filters]) => filterFlights(flights, filters)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  // Selection clears when it no longer belongs to the filtered result.
  readonly selectedFlight$ = combineLatest([this.filteredFlights$, this.selectedFlightId]).pipe(
    map(([flights, id]) => flights.find((f) => f.id === id) ?? null),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  updateFilters(filters: FlightFilters): void {
    if (
      this.selectedFlightId.value &&
      !filterFlights(this.flightsSubject.value, filters).some(
        (f) => f.id === this.selectedFlightId.value,
      )
    ) {
      this.selectedFlightId.next(null);
    }
    this.filtersSubject.next(filters);
  }
  selectFlight(flight: Flight | null): void {
    this.selectedFlightId.next(flight?.id ?? null);
  }
}
