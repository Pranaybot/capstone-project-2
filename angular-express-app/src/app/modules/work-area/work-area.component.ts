import { Component } from '@angular/core';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { WorkspaceComponent} from './workspace/workspace.component';
import { WorkspaceTitleComponent } from './workspace/workspace-title/workspace-title.component';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [
    SideNavigationComponent,
    WorkspaceComponent,
    WorkspaceTitleComponent
  ],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.scss'
})
export class WorkAreaComponent {

}
