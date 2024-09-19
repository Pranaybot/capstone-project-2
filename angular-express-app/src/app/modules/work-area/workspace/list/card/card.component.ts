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
  isEditing: boolean = false; // Track edit mode in the component itself

  constructor(private cardService: CardService) {}

  editCard(): void {
    this.isEditing = true; // Set edit mode
  }

  saveCard(card: Card, list: List): void {

    if (!card.id || !list.id) {
      console.error('Card ID or List ID is undefined. Cannot update card.');
      return;
    }

    this.cardService.update_card(list.id, card.id, this.card).subscribe((updatedCard: Card) => {
      if (list.cards) { // Check if cards is defined
        const index = list.cards.findIndex(c => c.id === updatedCard.id);
        if (index !== -1) {
          list.cards[index] = updatedCard;
        }
      } else {
        console.error('List cards are undefined.');
      }
    });

    this.isEditing = false; // Exit edit mode
  }

  cancelEdit(): void {
    this.isEditing = false; // Exit edit mode
  }

  deleteCard(list: List): void {
    if (!this.card.id || !list.id) {
      console.error('Card ID or List ID is undefined. Cannot delete card.');
      return;
    }

    this.cardService.delete_card(list.id, this.card.id).subscribe(() => {
      if (this.list.cards) { // Check if cards is defined before filtering
        this.list.cards = this.list.cards.filter((c: Card) => c.id !== this.card.id);
      } else {
        console.error('List cards are undefined.');
      }
    });
  }
}
