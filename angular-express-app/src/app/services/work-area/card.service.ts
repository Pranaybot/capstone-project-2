// card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Card } from '../../shared/models/card';
import { Router } from "@angular/router";
import { subscribe } from 'diagnostics_channel';

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseService {
  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  //gets new card in json format
  add_card(listId: string, card: Card) {
    this.http.post(`${this.apiUrl}/card/${listId}/cards`, card);
  }

  //gets updated card in json format
  update_card(cardId: string, card: Card) {
    this.http.post(`${this.apiUrl}/card/${cardId}`, card);
  }

  //deletes card and passes id to delete function in card component to remove card from this.cards
  delete_card(listId: string, cardId: string) {
    this.http.delete(`${this.apiUrl}/card/${listId}/cards/${cardId}`);
  }
}
