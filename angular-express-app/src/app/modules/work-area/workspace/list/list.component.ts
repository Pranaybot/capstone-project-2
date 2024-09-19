import { Component, OnInit, Input} from '@angular/core';
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
    this.listService.get_all_lists().subscribe((lists: List[]) => {
      this.lists = lists;
  
      // Only add default lists if the list array is empty
      if (this.lists.length === 0) {
        this.addDefaultLists();
      }
    });
  }
  

  addDefaultLists(): void {
    const defaultLists: { name: string, username: string, title: string, 
      description: string, activity: string }[] = [
      { name: 'To Do', username: '', title: 'New Card', description: '', activity: ''}, 
      { name: 'In Progress', username: '', title: 'New Card', description: '', activity: ''}, 
      { name: 'Done', username: '', title: 'New Card', description: '', activity: ''}
    ];

    defaultLists.forEach(list => {
      this.addNewList(list.name, list.username, list.title, 
        list.activity, list.description);
    });
  }

  updateListName(list: List): void {
    if (list && list.id && list.name) {
      this.listService.update_list(list.id, list.name).subscribe((list: List) => {
        const index = this.lists.findIndex(l => l.id === list.id);
        if (index !== -1) {
          this.lists[index] = list;
        }
      });
    }
  }

  deleteListItem(list: List): void {

    if (!list.id) {
      console.error('List ID is undefined. Cannot delete card.');
      return;
    }
  
    this.listService.delete_list(list.id).subscribe(() => {
      this.lists = this.lists.filter(l => l.id !== list.id);
    });
  }

  addCardToList(list: List): void {

    if (!list.id) {
      console.error('List ID is undefined. Cannot delete card.');
      return;
    }

    this.cardService.add_card(list.id, { username: '', title: 'New Card', description: '', activity: '' })
      .subscribe((card: Card) => {
        const list = this.lists.find(l => l.id === list.id); // Use `find` instead of `filter`
        if (list) {
          list.cards.push(card);
        }
      });
  }
  

  addNewList(name: string, username: string, title: string, description: string, activity: string): void {
    if (this.lists.length < this.maxLists) {
      this.listService.add_list(name, username, title, description, activity).subscribe((list: List) => {
          this.lists.push(list);
      });
    }
  }
}
