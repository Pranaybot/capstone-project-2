
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

  //gets all lists in json format
  get_all_lists(): {
    return this.http.get(`${this.apiUrl}/list/`);
  }

  //gets new list in json format
  add_list(name: string, cards: any) {
    this.http.post(`${this.apiUrl}/list/add_list`, { name, cards })
  }

  //gets updated list in json format
  update_list(id: string, name: string) {
    this.http.post(`${this.apiUrl}/list/update_list`, { id, name })
  }

  //deletes list and passes id to delete function in list component to remove list from this.lists
  delete_list(id: string) {
    this.http.delete(`${this.apiUrl}/list/${id}`);
  }

}
