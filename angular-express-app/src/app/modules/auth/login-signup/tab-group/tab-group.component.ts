import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss'
})
export class TabGroupComponent {
  @Input() activeTab: string = 'signup';  // Default value
  @Output() tabSelected = new EventEmitter<string>();

  onTabSelected(tab: string) {
    this.tabSelected.emit(tab);
  }

}
