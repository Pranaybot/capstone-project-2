
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../base.service"
import { List } from '../../shared/models/list';
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
    { name, cards }).subscribe((res: any) => {
      if (!res.error) {
        this.router.navigate(["/list"]);
      }
    });
  }

  update_list(id: string, name: string): void {
    this.http.post<void>(`${this.apiUrl}/list/update_list`, 
    { id, name }).subscribe((res: any) => {
      if (!res.error) {
        this.router.navigate(["/list"]);
      }
    });
  }

  delete_list(id: string): void {
    this.http.delete<void>(`${this.apiUrl}/list/${id}`)
    .subscribe((res: any) => {
      if (!res.error) {
        this.router.navigate(["/list"]);
      }
    });
  }

}


