
// src/app/services/card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Card } from '../shared/models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  update_card(cardId: string, card: Card): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/list/cards/${cardId}`, card);
  }

  delete_card(listId: string, cardId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/list/${listId}/cards/${cardId}`);
  }
}

