import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarComponent],
      imports: [CommonModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('applies reactive filters after the search debounce', fakeAsync(() => {
    const service = TestBed.inject(FlightService);
    const update = spyOn(service, 'updateFilters');
    component.filters.controls.search.setValue('INDIGO');
    tick(150);
    expect(update).toHaveBeenCalledWith({
      search: 'INDIGO',
      status: '',
      origin: '',
      destination: '',
    });
    component.clearFilters();
    tick(150);
    expect(update).toHaveBeenCalledWith({ search: '', status: '', origin: '', destination: '' });
  }));
});
