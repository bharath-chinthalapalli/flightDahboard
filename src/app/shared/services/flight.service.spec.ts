import { firstValueFrom } from 'rxjs';
import { MOCK_FLIGHTS } from '../data/mock-flights';
import { EMPTY_FILTERS, filterFlights, FlightService } from './flight.service';

describe('FlightService', () => {
  it('provides 20 unique flights with valid coordinates and consistent status counts', () => {
    expect(new Set(MOCK_FLIGHTS.map((f) => f.id)).size).toBe(20);
    expect(MOCK_FLIGHTS.filter((f) => f.status === 'En Route').length).toBe(12);
    expect(MOCK_FLIGHTS.filter((f) => f.status === 'Delayed').length).toBe(3);
    expect(
      MOCK_FLIGHTS.every(
        (f) =>
          f.position[0] >= -90 &&
          f.position[0] <= 90 &&
          f.position[1] >= -180 &&
          f.position[1] <= 180,
      ),
    ).toBeTrue();
  });
  it('combines callsign search with all three filters', () => {
    const result = filterFlights(MOCK_FLIGHTS, {
      search: '  emirates ',
      status: 'En Route',
      origin: 'DXB',
      destination: 'BLR',
    });
    expect(result.map((f) => f.id)).toEqual(['EK568']);
  });
  it('returns an empty array when filters conflict', () => {
    expect(
      filterFlights(MOCK_FLIGHTS, { ...EMPTY_FILTERS, origin: 'BLR', destination: 'BLR' }),
    ).toEqual([]);
  });
  it('shares the selected flight and clears it when filters exclude it', async () => {
    const service = new FlightService();
    service.selectFlight(MOCK_FLIGHTS[2]);
    expect((await firstValueFrom(service.selectedFlight$))?.id).toBe('EK215');
    service.updateFilters({ ...EMPTY_FILTERS, status: 'Arrived' });
    expect(await firstValueFrom(service.selectedFlight$)).toBeNull();
    expect((await firstValueFrom(service.filteredFlights$)).length).toBe(2);
    service.updateFilters(EMPTY_FILTERS);
    expect((await firstValueFrom(service.filteredFlights$)).length).toBe(20);
    expect(await firstValueFrom(service.selectedFlight$)).toBeNull();
  });
  it('can clear selection without changing the flight list', async () => {
    const service = new FlightService();
    service.selectFlight(null);
    expect(await firstValueFrom(service.selectedFlight$)).toBeNull();
    expect((await firstValueFrom(service.filteredFlights$)).length).toBe(20);
  });
});
