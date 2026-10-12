import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { FlightService } from '../../../shared/services/flight.service';
import { FlightOptions } from '../../../shared/dto/dashboard-dto';
import { Flight } from '../../../shared/dto/flight';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent {
  readonly vm$ = combineLatest([
    this.flightService.flights$,
    this.flightService.filteredFlights$,
    this.flightService.selectedFlight$,
  ]).pipe(
    map(([allFlights, flights, selected]) => ({
      flights,
      selected,
      optionList: this.getStatusCards(allFlights),
    })),
  );

  constructor(public readonly flightService: FlightService) {}

  private getStatusCards(flights: Flight[]): FlightOptions[] {
    const enRouteCount = flights.filter((flight) => flight.status === 'En Route').length;
    const boardingCount = flights.filter((flight) => flight.status === 'Boarding').length;
    const arrivedCount = flights.filter((flight) => flight.status === 'Arrived').length;
    const delayedFlights = flights.filter((flight) => flight.status === 'Delayed');
    const totalDelay = delayedFlights.reduce((sum, flight) => sum + flight.delayMinutes, 0);
    const averageDelay = delayedFlights.length ? Math.round(totalDelay / delayedFlights.length) : 0;

    return [
      {
        name: 'Total Flights',
        count: flights.length,
        subName: 'Scheduled today',
        subCount: `${flights.length} flights`,
        statusColor: 'blue',
        icon: 'flight',
      },
      {
        name: 'Active Flights',
        count: enRouteCount + boardingCount,
        subName: `${enRouteCount} En Route`,
        subCount: `${boardingCount} Boarding`,
        statusColor: 'green',
        icon: 'flight_takeoff',
      },
      {
        name: 'Delayed Flights',
        count: delayedFlights.length,
        subName: 'Average delay',
        subCount: `+${averageDelay} min`,
        statusColor: 'red',
        icon: 'schedule',
      },
      {
        name: 'Arrived Flights',
        count: arrivedCount,
        subName: 'Turnaround operations',
        subCount: 'On ground',
        statusColor: 'blue',
        icon: 'check_circle_outline',
      },
    ];
  }
}
