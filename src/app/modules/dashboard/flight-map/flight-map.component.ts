import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import * as L from 'leaflet';
import { Flight } from '../../../shared/dto/flight';

@Component({
  selector: 'app-flight-map',
  templateUrl: './flight-map.component.html',
  styleUrls: ['./flight-map.component.scss'],
  // Leaflet creates its own DOM nodes, so scope these styles with the component selector.
  encapsulation: ViewEncapsulation.None,
})
export class FlightMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() flights: Flight[] = [];
  @Input() selected: Flight | null = null;
  @Output() flightSelected = new EventEmitter<Flight>();
  @ViewChild('mapHost', { static: true }) mapHost!: ElementRef<HTMLDivElement>;
  tileError = false;
  private map?: L.Map;
  private tracks = L.layerGroup();
  private route = L.layerGroup();
  private resizeObserver?: ResizeObserver;
  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.map = L.map(this.mapHost.nativeElement, {
        scrollWheelZoom: false,
        minZoom: 2,
        maxZoom: 12,
      }).setView([24, 65], 3);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
        .on('tileerror', () => this.zone.run(() => (this.tileError = true)))
        .addTo(this.map);
      this.tracks.addTo(this.map);
      this.route.addTo(this.map);
      this.drawFlights();
      this.resizeObserver = new ResizeObserver(() => this.map?.invalidateSize({ pan: false }));
      this.resizeObserver.observe(this.mapHost.nativeElement);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;
    this.drawFlights();
    if (changes['selected'] && this.selected) {
      this.map.setView(this.selected.position, Math.max(this.map.getZoom(), 4), { animate: false });
    }
  }
  private drawFlights(): void {
    this.tracks.clearLayers();
    this.route.clearLayers();
    for (const flight of this.flights) {
      const statusClass = flight.status.toLowerCase().replace(' ', '-');
      const selected = this.selected?.id === flight.id;
      const marker = L.marker(flight.position, {
        title: `${flight.id} · ${flight.callsign} · ${flight.origin.code} to ${flight.destination.code} · ${flight.status}`,
        alt: `Select flight ${flight.id}`,
        zIndexOffset: selected ? 1000 : 0,
        icon: L.divIcon({
          className: `flight-marker ${statusClass}${selected ? ' selected' : ''}`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m21 16-8-5V4a1 1 0 0 0-2 0v7l-8 5v2l8-2v4l-2 1v1l3-1 3 1v-1l-2-1v-4l8 2z"/></svg>',
        }),
      });
      const popup = document.createElement('div');
      for (const text of [
        flight.id,
        `Callsign: ${flight.callsign}`,
        `Origin: ${flight.origin.code} · ${flight.origin.city}`,
        `Destination: ${flight.destination.code} · ${flight.destination.city}`,
        `Status: ${flight.status}`,
      ]) {
        const line = document.createElement('div');
        line.textContent = text;
        popup.appendChild(line);
      }
      marker.bindPopup(popup).bindTooltip(flight.id, { direction: 'right', offset: [13, 0] });
      // Selection redraws markers; reopen the popup on the newly selected marker.
      marker.on('click', () => this.zone.run(() => this.flightSelected.emit(flight)));
      marker.addTo(this.tracks);
      if (selected) marker.openPopup();
    }
    if (this.selected) {
      L.polyline([this.selected.origin.position, this.selected.destination.position], {
        color: '#087eae',
        weight: 3,
        dashArray: '8 7',
        opacity: 0.85,
      }).addTo(this.route);
      for (const airport of [this.selected.origin, this.selected.destination]) {
        L.circleMarker(airport.position, {
          radius: 5,
          color: '#087eae',
          fillColor: '#fff',
          fillOpacity: 1,
          weight: 2,
        })
          .bindTooltip(airport.code, { permanent: true, direction: 'bottom' })
          .addTo(this.route);
      }
    }
  }

  showRoute(): void {
    if (this.map && this.selected)
      this.map.fitBounds(
        L.latLngBounds([this.selected.origin.position, this.selected.destination.position]),
        { padding: [55, 55], maxZoom: 6, animate: false },
      );
  }
  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
  }
}
