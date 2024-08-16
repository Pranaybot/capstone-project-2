import { Component } from '@angular/core';
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
  
}
