import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlightMapComponent } from './flight-map/flight-map.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightTableComponent } from './flight-table/flight-table.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainDashboardComponent,
    TopBarComponent,
    FlightMapComponent,
    FlightDetailsComponent,
    FlightTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressBarModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
