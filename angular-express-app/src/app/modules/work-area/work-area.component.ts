import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service'; // Adjust the path as needed
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
export class WorkAreaComponent implements OnInit{
  welcomeMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.welcomeMessage = data['message'];
      this.messageService.showMessage(this.welcomeMessage);
    });
  }

}
