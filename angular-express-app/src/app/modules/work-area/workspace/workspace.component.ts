import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { WorkspaceTitleComponent} from './workspace-title/workspace-title.component';
import { CommonModule } from '@angular/common';
import { ListComponent} from './list/list.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  imports: [
    WorkspaceTitleComponent,
    CommonModule,
    ListComponent
  ]
})
export class WorkspaceComponent {
  @Input() backgroundColor: string = '#f1f2f6';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  ngOnChanges() {
    console.log('Background color changed to:', this.backgroundColor);
  }

  // Method to update the color if needed
  changeBackgroundColor(color: string) {
    this.backgroundColor = color;
  }
} 
