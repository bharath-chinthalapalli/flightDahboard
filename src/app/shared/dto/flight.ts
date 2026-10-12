export type FlightStatus = 'En Route' | 'Delayed' | 'Boarding' | 'Arrived';
export interface Airport {
  code: string;
  city: string;
  name: string;
  position: [number, number];
}
export interface Flight {
  id: string;
  callsign: string;
  airline: string;
  aircraft: string;
  origin: Airport;
  destination: Airport;
  status: FlightStatus;
  departure: string;
  arrival: string;
  position: [number, number];
  progress: number;
  altitude: number;
  speed: number;
  delayMinutes: number;
}
export interface FlightFilters {
  search: string;
  status: string;
  origin: string;
  destination: string;
}
