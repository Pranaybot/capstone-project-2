
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListService } from "../../../../services/work-area/list.service";
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
  @Input() list!: List;
  @Input() lists: List[] = [];
  @Input() maxLists: number = 10;
  @Output() updateList = new EventEmitter<{ id: string, name: string }>();
  @Output() deleteList = new EventEmitter<string>();
  @Output() addCard = new EventEmitter<{ listId: string, card: Card }>();
  @Output() addList = new EventEmitter<{ name: string, cards: Card[] }>();

  constructor(private listService: ListService) {}

  ngOnInit(): void {}

  updateListName(list: List): void {
      if (list && list.id && list.name !== undefined) {
      this.updateList.emit({ id: list.id, name: list.name });
    }
  }

  deleteListItem(id: string | undefined): void {
    if (id) {
      this.deleteList.emit(id);
    }
  }

  addCardToList(listId: string): void {
    this.addCard.emit({
      listId: listId,
      card: { username: '', title: 'New Card', description: '', activity: '' }
    });
  }

  addNewList(name: string): void {
    this.addList.emit({ name: name, cards: [] });
  }
}

