import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Input() darkMode = false;
  @Input() menuOpen = false;
  @Output() menuToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();
  search = '';
  status = '';
  origin = '';
  destination = '';
  profileOpen = false;
  readonly statuses = ['En Route', 'Delayed', 'Arrived', 'Boarding'];
  readonly airports = ['BLR', 'DEL', 'BOM', 'HYD', 'MAA', 'LHR', 'DXB', 'SIN'];
}
