//import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service'; // Adjust the path as needed
import { WorkspaceTitleComponent} from './workspace-title/workspace-title.component';
import { CommonModule } from '@angular/common';

//import { ListComponent} from './list/list.component';
//import { List } from "../../../../shared/models/list";

@Component({
  selector: 'app-workspace',
  standalone: true,
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  imports: [
    WorkspaceTitleComponent,
    CommonModule
  ]
})
export class WorkspaceComponent implements OnInit {
//export class WorkspaceComponent {
  @Input() welcomeMessage: string = '';
  currentMessage: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.message$.subscribe(message => {
      this.currentMessage = message;
    });
  }
  /*
  lists: List[] = [];

  constructor() { }

  ngOnInit(): void { }

  onListsChange(lists: List[]): void {
    this.lists = lists;
  }
  */
}
