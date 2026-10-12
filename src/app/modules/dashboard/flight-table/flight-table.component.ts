import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Flight } from '../../../shared/dto/flight';

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.scss'],
})
export class FlightTableComponent implements AfterViewInit, OnChanges {
  @Input() flights: Flight[] = [];
  @Input() selectedId: string | null = null;
  @Output() flightSelected = new EventEmitter<Flight>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly columns = [
    'id',
    'callsign',
    'origin',
    'destination',
    'status',
    'departure',
    'arrival',
    'aircraft',
    'actions',
  ];
  readonly dataSource = new MatTableDataSource<Flight>();
  constructor() {
    this.dataSource.sortingDataAccessor = (flight, property) => {
      if (property === 'origin' || property === 'destination') return flight[property].code;
      return String(flight[property as keyof Flight]);
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flights']) {
      this.dataSource.data = this.flights;
      this.paginator?.firstPage();
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  exportCsv(): void {
    const columns = [
      'Flight',
      'Callsign',
      'Origin',
      'Destination',
      'Status',
      'ETD UTC',
      'ETA UTC',
      'Aircraft',
    ];
    const rows = this.flights.map((f) => [
      f.id,
      f.callsign,
      f.origin.code,
      f.destination.code,
      f.status,
      f.departure,
      f.arrival,
      f.aircraft,
    ]);
    const csv = [columns, ...rows]
      .map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'skytrack-flights.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}
