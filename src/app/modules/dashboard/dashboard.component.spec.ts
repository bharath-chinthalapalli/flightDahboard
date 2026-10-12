import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardModule } from './dashboard.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardModule, NoopAnimationsModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('collapses and expands desktop navigation', () => {
    component.isDesktop = true;
    component.toggleNavigation();
    expect(component.navigationOpen).toBeFalse();
    component.toggleNavigation();
    expect(component.navigationOpen).toBeTrue();
  });
});
