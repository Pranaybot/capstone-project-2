// src/app/components/card/card.component.ts
import { Component, Input } from '@angular/core';
import { CardService } from "../../../../../../services/card.service";
import { Card } from "../../../../../../shared/models/card";
import { List } from "../../../../../../shared/models/list";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
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

  saveCard(card: Card): void {
    if (!card.id) {
      // Handle the case where card.id is undefined, e.g., log an error or assign a default value
      console.error('Card ID is undefined. Cannot update card.');
      return;
    }

    card.isEditing = false;
    card.username = card.editingUsername ?? card.username;
    card.title = card.editingTitle ?? card.title;
    card.description = card.editingDescription ?? card.description;
    card.activity = card.editingActivity ?? card.activity;
    this.cardService.update_card(card.id, card).subscribe(() => {
      // Handle success if needed
    });
  }

  cancelEdit(card: Card): void {
    card.isEditing = false;
  }

  deleteCard(listId: string, cardId: string): void {
    this.cardService.delete_card(listId, cardId).subscribe(() => {
      // Handle success if needed
    });
  }
}
