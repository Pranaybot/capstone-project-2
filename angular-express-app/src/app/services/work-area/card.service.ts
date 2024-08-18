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

  add_card(listId: string, card: Card): void {
    this.http.post<void>
      (`${this.apiUrl}/card/${listId}/cards`, card)
      .subscribe((res: any) => {
        if (!res.error) {
          this.router.navigate(["/list"]);
        }
      });
  }

  update_card(cardId: string, card: Card): void {
    this.http.post<void>
    (`${this.apiUrl}/card/${cardId}`, card).subscribe((res: any) => {
      if (!res.error) {
        this.router.navigate(["/list"]);
      }
    });
  }

  delete_card(listId: string, cardId: string): void {
    this.http.delete<void>
    (`${this.apiUrl}/card/${listId}/cards/${cardId}`).
    subscribe((res: any) => {
      if (!res.error) {
        this.router.navigate(["/list"]);
      }
    });
  }
}
