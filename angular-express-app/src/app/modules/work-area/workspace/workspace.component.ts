import { Component } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
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
//export class WorkspaceComponent implements OnInit {
export class WorkspaceComponent {
  /*
  lists: List[] = [];

  constructor() { }

  ngOnInit(): void { }

  onListsChange(lists: List[]): void {
    this.lists = lists;
  }
  */
}
