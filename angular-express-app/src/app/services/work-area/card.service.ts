import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../../shared/models/card';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  // Adds a new card to a specific list
  add_card(listId: string, card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/card/${listId}/cards`, card);
  }

  // Updates an existing card in a specific list
  update_card(listId: string, cardId: string, card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/card/${listId}/cards/${cardId}`, card);
  }

  // Deletes a card from a specific list
  delete_card(listId: string, cardId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/card/${listId}/cards/${cardId}`);
  }
}
