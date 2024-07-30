import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-tab-content',
  standalone: true,
  imports: [],
  templateUrl: './tab-content.component.html',
  styleUrl: './tab-content.component.scss'
})
export class TabContentComponent {
  @Input() activeTab: string;
}
