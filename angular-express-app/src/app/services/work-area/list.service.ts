import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../../shared/models/list';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ListService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  // Gets all lists
  get_all_lists(): Observable<List[]> {
    return this.http.get<List[]>(`${this.apiUrl}/list/`);
  }

  // Adds a new list
  add_list(name: string, cards: any[]): Observable<List> {
    return this.http.post<List>(`${this.apiUrl}/list/add_list`, { name, cards });
  }

  // Updates an existing list
  update_list(id: string, name: string): Observable<List> {
    return this.http.post<List>(`${this.apiUrl}/list/update_list`, { id, name });
  }

  // Deletes a list
  delete_list(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/list/${id}`);
  }
}
