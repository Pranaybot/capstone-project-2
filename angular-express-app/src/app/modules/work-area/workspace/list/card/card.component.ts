
import { Component, Input } from '@angular/core';
import { CardService } from "../../../../../services/work-area/card.service";
import { Card } from "../../../../../shared/models/card";
import { List } from "../../../../../shared/models/list";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CardComponent {
  @Input() list!: List;
  @Input() card!: Card;

  constructor(private cardService: CardService) {}

  editCard(card: Card): void {
    card.isEditing = true;
    card.editingUsername = card.username;
    card.editingTitle = card.title;
    card.editingDescription = card.description;
    card.editingActivity = card.activity;
  }
  

  saveCard(card: Card, list: List): void {
    if (!card.id || !list.id) {
      console.error('Card ID or List ID is undefined. Cannot update card.');
      return;
    }
  
    card.isEditing = false;
    card.username = card.editingUsername ?? card.username;
    card.title = card.editingTitle ?? card.title;
    card.description = card.editingDescription ?? card.description;
    card.activity = card.editingActivity ?? card.activity;
  
    this.cardService.update_card(list.id, card.id, card).subscribe((updatedCard: Card) => {
      if (list.cards) {
        const index = list.cards.findIndex(c => c.id === updatedCard.id);
        if (index !== -1) {
          list.cards[index] = updatedCard;
        }
      }
    });
  }
  
  

  cancelEdit(card: Card): void {
    card.isEditing = false;
  }

  deleteCard(list: List, card: Card): void {

    if (!card.id || !list.id) {
      console.error('Card ID or List ID is undefined. Cannot update card.');
      return;
    }
  
    this.cardService.delete_card(list.id, card.id).subscribe(() => {
      if (this.list.cards) {
        this.list.cards = this.list.cards.filter((c: Card) => c.id !== card.id);
      }
    });
  }
  
}

