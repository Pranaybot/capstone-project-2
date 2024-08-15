// card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Card } from '../shared/models/card';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseService {
  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  add_card(listId: string, card: Card): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/card/${listId}/cards`, card);
  }

  update_card(cardId: string, card: Card): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/card/${cardId}`, card);
  }

  delete_card(listId: string, cardId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/card/${listId}/cards/${cardId}`);
  }
}
