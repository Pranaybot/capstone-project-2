
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../services/base.service"
import { List } from '../shared/models/list';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ListService extends BaseService {

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  get_all_lists(): Observable<List[]> {
    return this.http.get<List[]>(`${this.apiUrl}/list/`);
  }

  add_list(name: string, cards: any): void {
    this.http.post<void>(`${this.apiUrl}/list/add_list`, 
    { name, cards }).subscribe((response: any) => {
      if (response.redirect) {
        this.router.navigate([response.redirect]);
      }
    });
  }

  update_list(id: string, name: string): void {
    this.http.post<void>(`${this.apiUrl}/list/update_list`, 
    { id, name }).subscribe((response: any) => {
      if (response.redirect) {
        this.router.navigate([response.redirect]);
      }
    });
  }

  delete_list(id: string): void {
    this.http.delete<void>(`${this.apiUrl}/list/${id}`).subscribe((response: any) => {
      if (response.redirect) {
        this.router.navigate([response.redirect]);
      }
    });
  }

}


