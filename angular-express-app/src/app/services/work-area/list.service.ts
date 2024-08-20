
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../base.service"

@Injectable({
  providedIn: 'root'
})
export class ListService extends BaseService {

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  get_all_lists(): {
    return this.http.get(`${this.apiUrl}/list/`);
  }

  add_list(name: string, cards: any): void {
    this.http.post<void>(`${this.apiUrl}/list/add_list`, { name, cards })
  }

  update_list(id: string, name: string): void {
    this.http.post<void>(`${this.apiUrl}/list/update_list`, { id, name })
  }

  delete_list(id: string): void {
    this.http.delete<void>(`${this.apiUrl}/list/${id}`);
  }

}
