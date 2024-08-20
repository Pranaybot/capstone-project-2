import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListService } from "../../../../services/work-area/list.service";
import { CardService } from '../../../../services/work-area/card.service';
import { List } from "../../../../shared/models/list";
import { Card } from "../../../../shared/models/card";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from "./card/card.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent
  ]
})
export class ListComponent implements OnInit {
  @Input() lists: List[] = [];
  @Input() maxLists: number = 10;

  constructor(
    private listService: ListService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    const lists = this.listService.get_all_lists();
    lists.forEach(list => {
      this.lists.push(list);
    });
    
    // Only add default lists if the list array is empty
    if (this.lists.length === 0) {
      this.addDefaultLists();
    }
  }

  addDefaultLists(): void {
    const defaultLists: { name: string, cards: Card[] }[] = [
      { name: 'To Do', cards: [] },
      { name: 'In Progress', cards: [] },
      { name: 'Done', cards: [] }
    ];

    defaultLists.forEach(list => {
      this.addNewList(list.name);
    });
  }

  updateListName(list: List): void {
    if (list && list.id && list.name) {
      this.listService.update_list(list.id, list.name);
    }
  }

  deleteListItem(id: string | undefined): void {
    if (id) {
      this.listService.delete_list(id);
    }
  }

  addCardToList(listId: string): void {
    if (listId) {
      this.cardService.add_card(
        listId, 
        {username: '', title: 'New Card', description: '', activity: ''}
      )
    }
  }

  addNewList(name: string): void {
    if (this.lists.length < this.maxLists) {
      this.listService.add_list(name, []);
    }
  }
}
