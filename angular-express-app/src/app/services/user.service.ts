import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../services/base.service"

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

}
