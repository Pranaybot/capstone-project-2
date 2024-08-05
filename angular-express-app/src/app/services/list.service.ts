/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../services/base.service"
import { List } from '../shared/models/list';
import { Card } from '../shared/models/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  get_all_lists(): Observable<List[]> {
    return this.http.get<List[]>(`${this.baseUrl}/list/`);
  }

  add_list(name: string, cards: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/list/add_list`, { name, cards });
  }

  update_list(id: string, name: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/list/update_list`, { id, name });
  }

  delete_list(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/list/${id}`);
  }

  add_card(listId: string, card: Card): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/list/${listId}/cards`, card);
  }

}
*/

