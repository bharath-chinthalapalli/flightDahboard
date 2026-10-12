import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sidebar = false;
  sidebarCollapsed = false;
  isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  darkMode = false;
  get navigationOpen(): boolean {
    return this.isDesktop ? !this.sidebarCollapsed : this.sidebar;
  }

  @HostListener('window:resize')
  updateViewport(): void {
    this.isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  }

  toggleNavigation(): void {
    if (this.isDesktop) {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    } else {
      this.sidebar = !this.sidebar;
    }
  }
  readonly today = new Date();
  // Sample navigation data until feature pages are available.
  allModules = [
    { name: 'Dashboard', selected: true, icon: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z' },
    { name: 'Flights', selected: false, icon: 'm22 2-7 20-4-9-9-4Z M22 2 11 13' },
    { name: 'Airports', selected: false, icon: 'M12 3v12 M8 7l4-4 4 4 M3 15l9-4 9 4v3l-9-2-9 2z M8 21h8' },
    { name: 'Reports', selected: false, icon: 'M9 5H5v16h14V5h-4 M9 3h6v4H9z M8 12h8 M8 16h5' },
    { name: 'Settings', selected: false, icon: 'M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0' }
  ];
  selectModule(menuItem: DashboardComponent['allModules'][number]): void {
    this.allModules.forEach(item => item.selected = item === menuItem);
    this.sidebar = false;
  }
}
