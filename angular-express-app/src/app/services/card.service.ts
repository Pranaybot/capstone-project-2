/*
// src/app/services/card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Card } from '../shared/models/card';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseService {
  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  add_card(listId: string, card: Card): void {
    this.http.post<void>(`${this.apiUrl}/card/${listId}/cards`, 
    card).subscribe((response: any) => {
      if (response.redirect) {
        this.router.navigate([response.redirect]);
      }
    });
  }

  update_card(cardId: string, card: Card): void {
    this.http.post<void>(`${this.apiUrl}/card/${cardId}`, 
    card).subscribe((response: any) => {
      if (response.redirect) {
        this.router.navigate([response.redirect]);
      }
    });
  }

  delete_card(listId: string, cardId: string): void {
    this.http.delete<void>(`${this.apiUrl}/card/${listId}/cards/${cardId}`).subscribe(
    (response: any) => {
        if (response.redirect) {
        this.router.navigate([response.redirect]);
      }
    });
  }
}
*/

