import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../../shared/dto/flight';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent {
  @Input() flight: Flight | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() viewRoute = new EventEmitter<void>();
}
