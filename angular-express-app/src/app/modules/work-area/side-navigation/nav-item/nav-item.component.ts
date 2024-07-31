import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  imports: [
    CommonModule
  ],
  standalone: true
})
export class NavItemComponent {
  @Input() icon: string;
  @Input() label: string;
  @Input() type: string;
}
