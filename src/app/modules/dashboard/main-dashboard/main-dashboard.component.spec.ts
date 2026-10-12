import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashboardComponent } from './main-dashboard.component';
import { DashboardModule } from '../dashboard.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { firstValueFrom } from 'rxjs';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardModule, NoopAnimationsModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(MainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('calculates KPIs from all flights while filtering the workspace', async () => {
    component.flightService.updateFilters({
      search: '',
      status: 'Delayed',
      origin: '',
      destination: '',
    });
    const vm = await firstValueFrom(component.vm$);
    expect(vm.optionList.map((card) => card.count)).toEqual([20, 15, 3, 2]);
    expect(vm.flights.length).toBe(3);
  });
});
