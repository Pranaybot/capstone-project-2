import { Component, OnInit } from '@angular/core';
import { List } from "../../../../shared/models/list";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  lists: List[] = [];

  constructor() { }

  ngOnInit(): void { }

  onListsChange(lists: List[]): void {
    this.lists = lists;
  }
}
